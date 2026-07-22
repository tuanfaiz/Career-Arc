'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { defaultProfile } from '@/lib/careerData'
import {
  STORY_PROMPTS, MAX_SECONDS, activePromptIndex, formatClock,
  readStoryVideo, saveStoryVideo, setSessionBlobUrl, getSessionBlobUrl,
  type StoryVideoMeta,
} from '@/lib/storyVideo'
import {
  Video, Circle, Square, RotateCcw, Check, ShieldCheck, AlertTriangle, Building2, School,
} from 'lucide-react'

type Phase = 'idle' | 'recording' | 'recorded'

export default function StoryVideoPage() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [elapsed, setElapsed] = useState(0)
  const [simulated, setSimulated] = useState(false)
  const [cameraNote, setCameraNote] = useState<string | null>(null)
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null)
  const [meta, setMeta] = useState<StoryVideoMeta | null>(null)
  const [saved, setSaved] = useState(false)
  const [initials, setInitials] = useState('AH')
  const [shareEmployers, setShareEmployers] = useState(true)
  const [shareUniversities, setShareUniversities] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Load saved state + user initials
  useEffect(() => {
    const existing = readStoryVideo()
    if (existing) {
      setMeta(existing)
      setSimulated(existing.mode === 'simulated')
      setShareEmployers(existing.shareWithEmployers)
      setShareUniversities(existing.shareWithUniversities)
      setPhase('recorded')
      setElapsed(existing.durationSec)
      setPlaybackUrl(getSessionBlobUrl())
    }
    try {
      const raw = localStorage.getItem('careerProfile')
      const name: string = raw ? (JSON.parse(raw).name ?? defaultProfile.name) : defaultProfile.name
      setInitials(name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase())
    } catch { /* keep default */ }
  }, [])

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
  }, [])

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  // Cleanup on unmount
  useEffect(() => () => { clearTimer(); stopTracks() }, [clearTimer, stopTracks])

  function finishRecording(mode: 'real' | 'simulated', duration: number) {
    clearTimer()
    setPhase('recorded')
    setSaved(false)
    setMeta({
      recordedAt: new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' }),
      durationSec: duration,
      mode,
      shareWithEmployers: shareEmployers,
      shareWithUniversities: shareUniversities,
    })
  }

  function runTimer(onDone: () => void) {
    setElapsed(0)
    timerRef.current = setInterval(() => {
      setElapsed(prev => {
        const next = prev + 1
        if (next >= MAX_SECONDS) { onDone() ; return MAX_SECONDS }
        return next
      })
    }, 1000)
  }

  function startSimulated(note: string) {
    setSimulated(true)
    setCameraNote(note)
    setPhase('recording')
    runTimer(() => finishRecording('simulated', MAX_SECONDS))
  }

  async function startRecording() {
    setSaved(false)
    setPlaybackUrl(null)

    const supported = typeof navigator !== 'undefined'
      && !!navigator.mediaDevices?.getUserMedia
      && typeof MediaRecorder !== 'undefined'

    if (!supported) {
      startSimulated('No camera available on this device — running a simulated recording so you can still see the flow.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      streamRef.current = stream
      setSimulated(false)
      setCameraNote(null)
      setPhase('recording')

      // attach preview after the element renders
      setTimeout(() => {
        if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.muted = true }
      }, 0)

      chunksRef.current = []
      const recorder = new MediaRecorder(stream)
      recorderRef.current = recorder
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        setSessionBlobUrl(url)
        setPlaybackUrl(url)
        stopTracks()
      }
      recorder.start()
      runTimer(() => stopRecording())
    } catch {
      startSimulated('Camera permission was declined — running a simulated recording so the demo still works.')
    }
  }

  function stopRecording() {
    clearTimer()
    const duration = Math.max(1, elapsed)
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop()
      finishRecording('real', duration)
    } else {
      finishRecording(simulated ? 'simulated' : 'real', duration)
    }
  }

  function reRecord() {
    setPhase('idle'); setElapsed(0); setSaved(false)
    setPlaybackUrl(null); setSessionBlobUrl(null); setMeta(null)
  }

  function save() {
    if (!meta) return
    const updated = { ...meta, shareWithEmployers: shareEmployers, shareWithUniversities: shareUniversities }
    saveStoryVideo(updated)
    setMeta(updated)
    setSaved(true)
  }

  const activeIdx = phase === 'recording' ? activePromptIndex(elapsed) : -1
  const pct = Math.min(100, (elapsed / MAX_SECONDS) * 100)
  const dateChip = meta?.recordedAt ?? new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: '#7a8699' }}>My Story Video</div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: '#2d3436' }}>
              Let people meet the person behind the profile.
            </h2>
            <p className="text-sm mt-1.5 max-w-2xl" style={{ color: '#4a5568' }}>
              A guided 60-second video about your aspiration, motivation and the problem you want to solve.
            </p>
          </div>
          <span className="px-3.5 py-2 rounded-xl text-xs font-mono flex-shrink-0" style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
            {dateChip}
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Recorder */}
          <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="relative rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #dfe4ec 0%, #cfd6e2 100%)', boxShadow: 'inset 6px 6px 14px #babecc, inset -6px -6px 14px #ffffff', aspectRatio: '16 / 10' }}>

              {/* Live preview */}
              {phase === 'recording' && !simulated && (
                <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
              )}

              {/* Playback */}
              {phase === 'recorded' && playbackUrl && (
                <video src={playbackUrl} controls playsInline className="absolute inset-0 w-full h-full object-cover" />
              )}

              {/* Avatar for idle / simulated / no-blob states */}
              {(phase === 'idle' || (phase === 'recording' && simulated) || (phase === 'recorded' && !playbackUrl)) && (
                <div className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-black"
                  style={{ background: '#f5c9a6', color: '#2d3436', boxShadow: '6px 6px 14px rgba(0,0,0,0.12)' }}>
                  {initials}
                </div>
              )}

              {/* Recording chrome */}
              {phase === 'recording' && (
                <>
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(45,52,54,0.75)' }}>
                    <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#ff4757' }} />
                    <span className="text-xs font-mono font-bold text-white">REC {formatClock(elapsed)} / {formatClock(MAX_SECONDS)}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ background: 'rgba(0,0,0,0.15)' }}>
                    <div className="h-full transition-all duration-1000 ease-linear" style={{ width: `${pct}%`, background: '#ff4757' }} />
                  </div>
                </>
              )}

              {/* Recorded badge */}
              {phase === 'recorded' && !playbackUrl && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-mono font-bold" style={{ background: 'rgba(45,52,54,0.75)', color: '#fff' }}>
                  {formatClock(meta?.durationSec ?? MAX_SECONDS)} recorded
                </div>
              )}

              {/* Controls */}
              <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                {phase === 'idle' && (
                  <button onClick={startRecording}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold btn-press"
                    style={{ background: '#ffffff', color: '#2d3436', boxShadow: '0 6px 16px rgba(0,0,0,0.18)' }}>
                    <Circle className="w-3 h-3 fill-current" style={{ color: '#ff4757' }} /> Start recording
                  </button>
                )}
                {phase === 'recording' && (
                  <button onClick={stopRecording}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold btn-press"
                    style={{ background: '#ff4757', color: '#fff', boxShadow: '0 6px 16px rgba(255,71,87,0.4)' }}>
                    <Square className="w-3.5 h-3.5 fill-current" /> Stop
                  </button>
                )}
              </div>
            </div>

            {/* Camera fallback note */}
            {cameraNote && (
              <div className="mt-4 flex items-start gap-2.5 px-4 py-3 rounded-xl" style={{ background: '#fffaf0', border: '1px solid #f39c1244' }}>
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#f39c12' }} />
                <p className="text-xs" style={{ color: '#2d3436' }}>{cameraNote}</p>
              </div>
            )}

            {/* Post-record actions */}
            {phase === 'recorded' && (
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button onClick={save}
                  className="flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-widest btn-press flex items-center justify-center gap-2"
                  style={saved
                    ? { background: '#00b894', color: '#fff', boxShadow: '4px 4px 10px rgba(0,184,148,0.3)' }
                    : { background: '#ff4757', color: '#fff', boxShadow: '4px 4px 10px rgba(255,71,87,0.3)' }}>
                  {saved ? <><Check className="w-4 h-4" /> Saved to profile</> : <><Check className="w-4 h-4" /> Save to profile</>}
                </button>
                <button onClick={reRecord}
                  className="flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-widest btn-press flex items-center justify-center gap-2"
                  style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                  <RotateCcw className="w-4 h-4" /> Re-record
                </button>
              </div>
            )}

            {/* Privacy */}
            <div className="mt-5 pt-5" style={{ borderTop: '1px solid #d1d9e6' }}>
              <div className="flex items-center gap-1.5 mb-3">
                <ShieldCheck className="w-4 h-4" style={{ color: '#00b894' }} />
                <p className="text-xs" style={{ color: '#4a5568' }}>
                  <strong style={{ color: '#2d3436' }}>Private by default.</strong> You decide which employers, universities or programmes can view it.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <Toggle on={shareEmployers} onClick={() => setShareEmployers(v => !v)} icon={Building2} label="Visible to employers" />
                <Toggle on={shareUniversities} onClick={() => setShareUniversities(v => !v)} icon={School} label="Visible to universities" />
              </div>
            </div>
          </div>

          {/* Guide */}
          <div className="card-screw rounded-2xl p-5 sm:p-6 h-fit" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: '#7a8699' }}>Your 60-second guide</div>
            <h3 className="text-lg font-black mb-1" style={{ color: '#2d3436' }}>Be specific, honest and human.</h3>
            <p className="text-xs mb-4" style={{ color: '#4a5568' }}>
              {phase === 'recording' ? 'Follow along — the highlighted prompt is where you should be now.' : 'Roughly 15 seconds each.'}
            </p>

            <div className="flex flex-col gap-2.5">
              {STORY_PROMPTS.map((p, i) => {
                const active = i === activeIdx
                const done = activeIdx > i
                return (
                  <div key={p.n} className="flex items-start gap-3 p-3.5 rounded-xl transition-all duration-300"
                    style={{
                      background: active ? '#fff4f5' : '#e0e5ec',
                      boxShadow: active
                        ? '0 0 0 2px #ff4757, 4px 4px 10px rgba(255,71,87,0.15)'
                        : 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff',
                    }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black font-mono"
                      style={{
                        background: active ? '#ff4757' : done ? '#00b894' : '#f0f2f5',
                        color: active || done ? '#fff' : '#4a5568',
                        boxShadow: active || done ? 'none' : '2px 2px 4px #babecc, -2px -2px 4px #ffffff',
                      }}>
                      {done ? <Check className="w-3.5 h-3.5" /> : p.n}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold" style={{ color: '#2d3436' }}>{p.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#4a5568' }}>{p.hint}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 px-4 py-3 rounded-xl flex items-start gap-2" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
              <Video className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#ff4757' }} />
              <p className="text-xs" style={{ color: '#4a5568' }}>
                Employers see this next to your readiness score — it&apos;s what a resume can&apos;t show.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function Toggle({ on, onClick, icon: Icon, label }: { on: boolean; onClick: () => void; icon: React.ElementType; label: string }) {
  return (
    <button onClick={onClick}
      className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl btn-press transition-all"
      style={{
        background: '#e0e5ec',
        boxShadow: on ? 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff, 0 0 0 2px #00b894' : '4px 4px 8px #babecc, -4px -4px 8px #ffffff',
      }}>
      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: on ? '#00b894' : '#4a5568' }} />
      <span className="text-xs font-bold flex-1 text-left" style={{ color: on ? '#00b894' : '#4a5568' }}>{label}</span>
      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: on ? '#00b894' : '#babecc' }}>
        {on && <Check className="w-2.5 h-2.5 text-white" />}
      </span>
    </button>
  )
}
