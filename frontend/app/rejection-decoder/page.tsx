'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { MailOpen, Zap, RefreshCw, AlertTriangle, Lightbulb, ArrowRight, BookOpen, Heart } from 'lucide-react'

const SAMPLE_REJECTION = `Dear Amirul,

Thank you for taking the time to interview for the Software Engineer position at TechCorp Malaysia. We truly appreciated the opportunity to learn more about your background and experience.

After careful consideration, we have decided to move forward with other candidates whose experience more closely aligns with our current needs.

We were impressed by your enthusiasm and the skills you demonstrated during the process. We will keep your resume on file and encourage you to apply for future opportunities that may be a better fit for your profile.

We wish you all the best in your job search and future career endeavours.

Best regards,
Sarah Lim
HR Team, TechCorp Malaysia`

type DecodeResult = {
  realMeaning: string
  redFlags: { phrase: string; translation: string }[]
  lostPoints: string[]
  whatNext: string[]
  skillsToFocus: { skill: string; priority: 'high' | 'medium' }[]
  emotionalNote: string
  reapplyIn: string
}

const MOCK_DECODE: DecodeResult = {
  realMeaning: 'You were a strong candidate — likely 2nd or 3rd place. The chosen candidate had a more specific skill match for this particular role. This is NOT a "you are not good enough" rejection. It\'s a "someone fit slightly better right now" rejection.',
  redFlags: [
    { phrase: '"whose experience more closely aligns"', translation: 'Another candidate had more direct experience with our tech stack (likely AWS/Docker/K8s you were missing).' },
    { phrase: '"we will keep your resume on file"', translation: 'Standard courtesy phrase. They will not reach out. 94% of companies never revisit the pile.' },
    { phrase: '"better fit for your profile"', translation: 'Culture or team composition also played a role — not just skills.' },
    { phrase: '"impressed by your enthusiasm"', translation: 'Genuine positive signal. You came across well personally — the gap was technical, not personality.' },
  ],
  lostPoints: [
    'Missing cloud/DevOps skills (Docker, AWS, CI/CD) — likely mentioned in job description',
    'Portfolio may lack production-scale examples with measurable impact',
    'Technical round: system design depth possibly below senior expectations',
    'Salary expectation may have been above their approved band',
  ],
  whatNext: [
    'Reply with a gracious thank-you email and ask for ONE specific piece of feedback',
    'Connect with the interviewer on LinkedIn (not the generic HR contact)',
    'Re-apply in 6–12 months once you have more cloud project experience on your CV',
    'File this company in your "warm lead" list — you already passed screening and interview',
    'Do NOT apply for 3 other positions at the same company right now (looks desperate)',
  ],
  skillsToFocus: [
    { skill: 'AWS / Cloud Fundamentals', priority: 'high' },
    { skill: 'Docker & Containerization', priority: 'high' },
    { skill: 'System Design (Scale)', priority: 'high' },
    { skill: 'CI/CD Pipelines', priority: 'medium' },
    { skill: 'Portfolio: Production Projects', priority: 'medium' },
  ],
  emotionalNote: 'Getting rejected after an interview means you cleared the hardest filter — your CV and initial screening. Most people don\'t even get this far. This is data, not a verdict on your worth. The process is not perfectly fair. Keep going.',
  reapplyIn: '6–12 months',
}

export default function RejectionDecoderPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DecodeResult | null>(null)

  async function decode() {
    if (email.trim().length < 30) return
    setLoading(true)
    setResult(null)
    await new Promise(r => setTimeout(r, 1800))
    setResult(MOCK_DECODE)
    setLoading(false)
  }

  function loadSample() {
    setEmail(SAMPLE_REJECTION)
    setResult(null)
  }

  function reset() {
    setEmail('')
    setResult(null)
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#e17055', boxShadow: '4px 4px 10px rgba(225,112,85,0.3)' }}>
              <MailOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#2d3436' }}>Rejection Letter Decoder</h2>
              <p className="text-sm mt-1" style={{ color: '#4a5568' }}>Paste your rejection email. We translate HR corporate-speak into honest, actionable insights.</p>
            </div>
          </div>
        </div>

        {/* Input */}
        {!result && (
          <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4a5568' }}>Paste Rejection Email</label>
              <button onClick={loadSample}
                className="text-xs font-bold px-3 py-1.5 rounded-lg btn-press flex items-center gap-1.5"
                style={{ background: '#e0e5ec', color: '#e17055', boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #ffffff' }}>
                <BookOpen className="w-3 h-3" /> Load Sample
              </button>
            </div>
            <textarea
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Paste your rejection email here...&#10;&#10;e.g. &quot;Dear [Your Name], Thank you for applying to...&quot;"
              rows={10}
              className="w-full p-4 rounded-xl text-sm font-mono leading-relaxed input-recessed resize-none mb-4"
              style={{ color: '#2d3436' }}
            />
            <div className="flex gap-3">
              <button onClick={decode} disabled={loading || email.trim().length < 30}
                className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2"
                style={{
                  background: '#e17055',
                  boxShadow: '6px 6px 14px rgba(225,112,85,0.35)',
                  opacity: (loading || email.trim().length < 30) ? 0.6 : 1
                }}>
                {loading
                  ? <><RefreshCw className="w-4 h-4 animate-spin" /> Decoding...</>
                  : <><Zap className="w-4 h-4" /> Decode This Rejection</>}
              </button>
            </div>
            {email.trim().length > 0 && email.trim().length < 30 && (
              <p className="text-xs mt-2 text-center" style={{ color: '#4a5568' }}>Paste more of the email to decode it accurately.</p>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="rounded-2xl p-10 text-center" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="w-14 h-14 rounded-full mx-auto mb-5 border-4 border-[#babecc] border-t-[#e17055] animate-spin" />
            <p className="font-bold text-base" style={{ color: '#2d3436' }}>Decoding corporate HR speak...</p>
            <div className="mt-3 space-y-1 text-sm font-mono" style={{ color: '#4a5568' }}>
              <p>✓ Identifying polite rejection phrases</p>
              <p className="animate-pulse">⟳ Analysing what they really meant...</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-5">

            {/* What they REALLY meant */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', borderLeft: '4px solid #e17055' }}>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5" style={{ color: '#e17055' }} />
                <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#e17055' }}>What They Really Meant</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#2d3436' }}>{result.realMeaning}</p>
            </div>

            {/* Phrase decoder */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5" style={{ color: '#fdcb6e' }} />
                <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>HR Phrase Decoder</h3>
              </div>
              <div className="space-y-3">
                {result.redFlags.map((rf, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <div className="text-xs font-mono font-bold mb-1.5 italic" style={{ color: '#fdcb6e' }}>{rf.phrase}</div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#4a5568' }} />
                      <p className="text-sm" style={{ color: '#2d3436' }}>{rf.translation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Where you likely lost points */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5" style={{ color: '#ff4757' }} />
                <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Where You Likely Lost Points</h3>
              </div>
              <div className="space-y-2.5">
                {result.lostPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold font-mono" style={{ background: '#ff475722', color: '#ff4757' }}>{i + 1}</span>
                    <p className="text-sm" style={{ color: '#2d3436' }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills to focus on */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5" style={{ color: '#6c5ce7' }} />
                <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Skills to Focus On Next</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.skillsToFocus.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl text-xs font-bold"
                    style={{
                      background: s.priority === 'high' ? '#ff475718' : '#6c5ce718',
                      color: s.priority === 'high' ? '#ff4757' : '#6c5ce7',
                      border: `1px solid ${s.priority === 'high' ? '#ff475733' : '#6c5ce733'}`,
                    }}>
                    {s.priority === 'high' ? '🔥' : '📌'} {s.skill}
                  </span>
                ))}
              </div>
            </div>

            {/* What to do next */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', borderLeft: '4px solid #00b894' }}>
              <div className="flex items-center gap-2 mb-4">
                <ArrowRight className="w-5 h-5" style={{ color: '#00b894' }} />
                <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Your Action Plan</h3>
              </div>
              <div className="space-y-2.5">
                {result.whatNext.map((action, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold font-mono" style={{ background: '#00b89422', color: '#00b894' }}>{i + 1}</span>
                    <p className="text-sm" style={{ color: '#2d3436' }}>{action}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 px-4 py-2.5 rounded-xl flex items-center gap-2" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                <span className="text-xs font-mono" style={{ color: '#4a5568' }}>Earliest re-apply date:</span>
                <span className="text-xs font-mono font-bold" style={{ color: '#00b894' }}>{result.reapplyIn} from now</span>
              </div>
            </div>

            {/* Emotional note */}
            <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'linear-gradient(135deg, #f0f2f5, #f0f0ff)', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: '1px solid #6c5ce722' }}>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5" style={{ color: '#6c5ce7' }} />
                <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#6c5ce7' }}>A Note from Your Career Coach</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#2d3436' }}>{result.emotionalNote}</p>
            </div>

            {/* Decode another */}
            <button onClick={reset}
              className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest btn-press flex items-center justify-center gap-2"
              style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <RefreshCw className="w-4 h-4" /> Decode Another Rejection
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
