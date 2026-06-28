'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { levels, levelByKey, SKILL_POOL, defaultProfile, type StepKey } from '@/lib/careerData'
import { computeCrs, riskOf, riskMeta, type Level, type CrsBreakdown } from '@/lib/scoring'
import {
  Target, ChevronRight, ChevronLeft, Check, Upload, FileText, Plus, Sparkles, PawPrint, Rocket,
} from 'lucide-react'

const SAMPLE_PROJECTS = ['Lokal-Map App (Hackathon)', 'SurveyLuhh Platform (Freelance)', 'Internal Dashboard (Internship)']
const ANIMALS: [string, string][] = [['Lion', '🦁'], ['Owl', '🦉'], ['Dolphin', '🐬'], ['Fox', '🦊'], ['Wolf', '🐺']]
const STEP_TITLES: Record<StepKey, string> = {
  level: 'Level', profile: 'Profile', resume: 'Resume', skills: 'Skills',
  portfolio: 'Portfolio', animal: 'YourAnimal', preference: 'Preferences', interview: 'Interview',
}

interface Data {
  level: Level | null
  name: string
  programme: string
  profileDone: boolean
  resumeReady: boolean
  skills: string[]
  portfolioItems: number
  animal: string | null
  prefRole: string | null
  prefMode: string | null
  preferenceDone: boolean
  interview: string | null
}

function derive(d: Data): CrsBreakdown {
  let resume = 0, ats = 0
  if (d.profileDone) { resume = 55; ats = 45 }
  if (d.resumeReady) { resume = 82; ats = 75 }
  const skillMatch = d.skills.length ? Math.min(100, 30 + d.skills.length * 9) : 0
  const portfolio = Math.min(100, d.portfolioItems * 45)
  let activity = 0
  if (d.animal) activity = Math.max(activity, 45)
  if (d.preferenceDone) activity = Math.max(activity, 72)
  if (d.interview) ats = Math.min(92, ats + 12)
  return { resume, ats, skillMatch, portfolio, activity }
}

export default function OnboardingPage() {
  const router = useRouter()
  const [stepIdx, setStepIdx] = useState(0)
  const [d, setD] = useState<Data>({
    level: null, name: defaultProfile.name, programme: defaultProfile.programme,
    profileDone: false, resumeReady: false, skills: [], portfolioItems: 0,
    animal: null, prefRole: null, prefMode: null, preferenceDone: false, interview: null,
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') !== 'true') router.push('/login')
  }, [router])

  const steps: StepKey[] = ['level', ...(d.level ? levelByKey[d.level].steps : [])]
  const current = steps[stepIdx]
  const breakdown = derive(d)
  const crs = computeCrs(breakdown)
  const risk = riskOf(crs)
  const rm = riskMeta[risk]

  function set<K extends keyof Data>(k: K, v: Data[K]) { setD(prev => ({ ...prev, [k]: v })) }
  function toggleSkill(s: string) { setD(prev => ({ ...prev, skills: prev.skills.includes(s) ? prev.skills.filter(x => x !== s) : [...prev.skills, s] })) }

  const canNext = (() => {
    if (current === 'level') return !!d.level
    if (current === 'skills') return d.skills.length >= 1
    return true
  })()

  function next() {
    // mark current step's done flag on advance
    if (current === 'profile') set('profileDone', true)
    if (current === 'preference') set('preferenceDone', true)
    if (stepIdx < steps.length - 1) {
      setStepIdx(stepIdx + 1)
    } else {
      finish()
    }
  }
  function back() { if (stepIdx > 0) setStepIdx(stepIdx - 1) }

  function finish() {
    const finalData = { ...d, profileDone: true, preferenceDone: true }
    const bd = derive(finalData)
    const profile = {
      name: d.name, level: d.level ?? 'fresh', programme: d.programme,
      university: defaultProfile.university,
      skills: d.skills.length ? d.skills : defaultProfile.skills,
      animal: d.animal, breakdown: bd,
    }
    localStorage.setItem('careerProfile', JSON.stringify(profile))
    localStorage.setItem('onboardingComplete', 'true')
    router.push('/dashboard')
  }

  function skip() {
    localStorage.setItem('careerProfile', JSON.stringify(defaultProfile))
    localStorage.setItem('onboardingComplete', 'true')
    router.push('/dashboard')
  }

  const inputCls = 'input-recessed w-full px-4 py-3 rounded-xl text-sm'

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#e0e5ec' }}>
      {/* Top bar */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 flex-shrink-0" style={{ background: '#e0e5ec', boxShadow: '0 4px 16px #babecc' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#ff4757', boxShadow: '3px 3px 6px rgba(255,71,87,0.3)' }}>
            <Target className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black" style={{ color: '#2d3436' }}>Career<span style={{ color: '#ff4757' }}>Arc</span></span>
        </div>
        <button onClick={skip} className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4a5568' }}>Skip for now →</button>
      </header>

      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 grid lg:grid-cols-[1fr_300px] gap-8">
        {/* Main */}
        <div className="space-y-6">
          {/* Stepper */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{
                    background: i === stepIdx ? '#ff4757' : '#e0e5ec',
                    color: i === stepIdx ? '#fff' : i < stepIdx ? '#00b894' : '#4a5568',
                    boxShadow: i === stepIdx ? '3px 3px 8px rgba(255,71,87,0.3)' : 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff',
                  }}>
                  {i < stepIdx ? <Check className="w-3 h-3" /> : <span className="font-mono">{i + 1}</span>}
                  <span className="hidden sm:inline">{STEP_TITLES[s]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Step card */}
          <div className="card-screw rounded-2xl p-6 sm:p-8 min-h-[360px]" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            {current === 'level' && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#2d3436' }}>Let&apos;s get you onboard 👋</h2>
                  <p className="text-sm mt-1" style={{ color: '#4a5568' }}>First, where are you in your career? This tailors the rest of your setup.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {levels.map(l => (
                    <button key={l.key} onClick={() => { set('level', l.key); setStepIdx(0) }}
                      className="text-left p-5 rounded-2xl btn-press transition-all"
                      style={{
                        background: '#e0e5ec',
                        boxShadow: d.level === l.key ? 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff, 0 0 0 2px #ff4757' : '6px 6px 12px #babecc, -6px -6px 12px #ffffff',
                      }}>
                      <div className="text-2xl mb-2">{l.emoji}</div>
                      <div className="font-black text-sm" style={{ color: d.level === l.key ? '#ff4757' : '#2d3436' }}>{l.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#4a5568' }}>{l.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {current === 'profile' && (
              <div className="space-y-5">
                <StepHead icon={FileText} title="Basic profile" sub="Confirm your details — we pre-filled what we could." />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Full Name</label>
                    <input className={inputCls} style={{ color: '#2d3436' }} value={d.name} onChange={e => set('name', e.target.value)} /></div>
                  <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Programme</label>
                    <input className={inputCls} style={{ color: '#2d3436' }} value={d.programme} onChange={e => set('programme', e.target.value)} /></div>
                  <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>University</label>
                    <input className={inputCls} style={{ color: '#2d3436' }} defaultValue={defaultProfile.university} /></div>
                  <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Level</label>
                    <input className={inputCls} style={{ color: '#2d3436' }} value={levelByKey[d.level!].label} readOnly /></div>
                </div>
              </div>
            )}

            {current === 'resume' && (
              <div className="space-y-5">
                <StepHead icon={Upload} title="Resume" sub="Upload your resume or use a sample so we can score it." />
                <div className="rounded-2xl p-8 flex flex-col items-center text-center" style={{ background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff', border: `2px dashed ${d.resumeReady ? '#00b894' : '#babecc'}` }}>
                  <Upload className="w-10 h-10 mb-3" style={{ color: d.resumeReady ? '#00b894' : '#4a5568' }} />
                  {d.resumeReady ? (
                    <p className="font-bold text-sm" style={{ color: '#00b894' }}>✓ Resume added — ATS scored</p>
                  ) : (
                    <>
                      <p className="font-bold text-sm mb-1" style={{ color: '#2d3436' }}>Drag &amp; drop your PDF</p>
                      <p className="text-xs mb-4" style={{ color: '#4a5568' }}>or</p>
                      <button onClick={() => set('resumeReady', true)} className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-white btn-press" style={{ background: '#ff4757', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>Use sample resume</button>
                    </>
                  )}
                </div>
              </div>
            )}

            {current === 'skills' && (
              <div className="space-y-5">
                <StepHead icon={Sparkles} title="Your skills" sub="Pick the skills you have. We use these to match you to jobs." />
                <div className="flex flex-wrap gap-2">
                  {SKILL_POOL.map(s => {
                    const on = d.skills.includes(s)
                    return (
                      <button key={s} onClick={() => toggleSkill(s)} className="px-3 py-1.5 rounded-xl text-sm font-medium btn-press transition-all"
                        style={{ background: on ? '#ff4757' : '#e0e5ec', color: on ? '#fff' : '#4a5568', boxShadow: on ? '3px 3px 8px rgba(255,71,87,0.3)' : '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                        {on && <Check className="w-3 h-3 inline mr-1" />}{s}
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs" style={{ color: '#4a5568' }}>{d.skills.length} selected {d.skills.length < 1 && '· pick at least one to continue'}</p>
              </div>
            )}

            {current === 'portfolio' && (
              <div className="space-y-5">
                <StepHead icon={Plus} title="Portfolio" sub={`Add ${levelByKey[d.level!].portfolioTarget || 'a few'} project${levelByKey[d.level!].portfolioTarget === 1 ? '' : 's'} to show real work.`} />
                <div className="space-y-2">
                  {SAMPLE_PROJECTS.slice(0, d.portfolioItems).map((p, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                      <Check className="w-4 h-4" style={{ color: '#00b894' }} />
                      <span className="text-sm font-medium" style={{ color: '#2d3436' }}>{p}</span>
                    </div>
                  ))}
                </div>
                {d.portfolioItems < 3 && (
                  <button onClick={() => set('portfolioItems', d.portfolioItems + 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest btn-press" style={{ background: '#e0e5ec', color: '#ff4757', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                    <Plus className="w-4 h-4" /> Add sample project
                  </button>
                )}
              </div>
            )}

            {current === 'animal' && (
              <div className="space-y-5">
                <StepHead icon={PawPrint} title="YourAnimal" sub="Pick your work animal (or take the full 40-question test later)." />
                <div className="grid grid-cols-5 gap-2">
                  {ANIMALS.map(([name, emoji]) => (
                    <button key={name} onClick={() => set('animal', name)} className="flex flex-col items-center gap-1.5 p-3 rounded-xl btn-press"
                      style={{ background: '#e0e5ec', boxShadow: d.animal === name ? 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff, 0 0 0 2px #8A6D1F' : '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                      <span className="text-2xl">{emoji}</span>
                      <span className="text-xs font-bold" style={{ color: d.animal === name ? '#8A6D1F' : '#4a5568' }}>{name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {current === 'preference' && (
              <div className="space-y-5">
                <StepHead icon={Target} title="Job preferences" sub="What are you looking for? This ranks your recommended jobs." />
                <div>
                  <label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Role type</label>
                  <div className="flex flex-wrap gap-2">
                    {['Software Engineer', 'Data / Analytics', 'Product', 'Design'].map(r => (
                      <Chip key={r} on={d.prefRole === r} onClick={() => set('prefRole', r)}>{r}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Work mode</label>
                  <div className="flex flex-wrap gap-2">
                    {['Remote', 'Hybrid', 'On-site'].map(m => (
                      <Chip key={m} on={d.prefMode === m} onClick={() => set('prefMode', m)}>{m}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {current === 'interview' && (
              <div className="space-y-5">
                <StepHead icon={Rocket} title="Interview readiness" sub="How prepared do you feel for interviews right now?" />
                <div className="grid sm:grid-cols-3 gap-3">
                  {[['Not yet', 'I haven\'t practised'], ['Some practice', 'A few mock rounds'], ['Confident', 'Ready to interview']].map(([t, s]) => (
                    <button key={t} onClick={() => set('interview', t)} className="text-left p-4 rounded-xl btn-press"
                      style={{ background: '#e0e5ec', boxShadow: d.interview === t ? 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff, 0 0 0 2px #ff4757' : '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                      <div className="font-bold text-sm" style={{ color: d.interview === t ? '#ff4757' : '#2d3436' }}>{t}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#4a5568' }}>{s}</div>
                    </button>
                  ))}
                </div>
                <p className="text-xs" style={{ color: '#4a5568' }}>The AI Career Coach can run mock interviews after onboarding.</p>
              </div>
            )}
          </div>

          {/* Nav */}
          <div className="flex gap-3">
            {stepIdx > 0 && (
              <button onClick={back} className="px-5 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest btn-press flex items-center gap-2" style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button onClick={next} disabled={!canNext}
              className="flex-1 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2"
              style={{ background: '#ff4757', boxShadow: '6px 6px 14px rgba(255,71,87,0.35)', opacity: canNext ? 1 : 0.4 }}>
              {stepIdx < steps.length - 1 ? <>Continue <ChevronRight className="w-4 h-4" /></> : <>Finish &amp; see my dashboard <ChevronRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>

        {/* Live CRS gauge */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="card-screw rounded-2xl p-6 text-center" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4a5568' }}>Career Readiness</div>
            <CrsRing value={crs} color={rm.color} />
            <div className="mt-3 inline-block px-3 py-1 rounded-lg text-xs font-bold" style={{ background: rm.bg, color: rm.color }}>{rm.label}</div>
            <div className="mt-5 space-y-2.5 text-left">
              {([['Resume', breakdown.resume], ['ATS', breakdown.ats], ['Skill Match', breakdown.skillMatch], ['Portfolio', breakdown.portfolio], ['Activity', breakdown.activity]] as [string, number][]).map(([label, v]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1" style={{ color: '#4a5568' }}><span>{label}</span><span className="font-mono font-bold">{v}</span></div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 1px 1px 2px #babecc, inset -1px -1px 2px #ffffff' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${v}%`, background: rm.color }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: '#4a5568' }}>Watch your score climb as you complete each step.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepHead({ icon: Icon, title, sub }: { icon: React.ElementType; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#ff4757', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h2 className="text-lg sm:text-xl font-black" style={{ color: '#2d3436' }}>{title}</h2>
        <p className="text-sm mt-0.5" style={{ color: '#4a5568' }}>{sub}</p>
      </div>
    </div>
  )
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="px-3 py-1.5 rounded-xl text-sm font-medium btn-press transition-all"
      style={{ background: on ? '#ff4757' : '#e0e5ec', color: on ? '#fff' : '#4a5568', boxShadow: on ? '3px 3px 8px rgba(255,71,87,0.3)' : '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
      {children}
    </button>
  )
}

function CrsRing({ value, color }: { value: number; color: string }) {
  const r = 52, c = 2 * Math.PI * r, off = c - (value / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#d1d9e6" strokeWidth="12" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off} style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s ease' }} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black font-mono" style={{ color }}>{value}</span>
        <span className="text-xs" style={{ color: '#4a5568' }}>/ 100</span>
      </div>
    </div>
  )
}
