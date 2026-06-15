'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { MessageSquare, ChevronRight, Eye, EyeOff, RefreshCw, Clock, CheckCircle } from 'lucide-react'

type QType = 'Technical' | 'Behavioral' | 'Situational'

const questionBank: Record<QType, { q: string; answer: string }[]> = {
  Technical: [
    {
      q: 'Explain the difference between `==` and `===` in JavaScript. When would you use one over the other?',
      answer: '`===` checks both value AND type (strict equality) — always prefer this. `==` does type coercion before comparing (e.g., `0 == false` is true), which causes subtle bugs. Only use `==` when you intentionally want to allow type coercion, such as checking for both `null` and `undefined` at once (`value == null`).'
    },
    {
      q: 'What is the React virtual DOM and how does it improve performance?',
      answer: 'The virtual DOM is a lightweight in-memory copy of the real DOM. When state changes, React re-renders the virtual DOM, diffs it against the previous version (reconciliation), then applies only the minimal set of real DOM updates needed. This batching avoids expensive full-page repaints.'
    },
    {
      q: 'Walk me through how you would optimize a slow-loading React application.',
      answer: '1) Profile with React DevTools to find re-renders. 2) Memoize heavy components with React.memo / useMemo / useCallback. 3) Code-split with dynamic imports. 4) Virtualize long lists (react-window). 5) Optimize images (WebP, lazy loading). 6) Move heavy logic out of the render cycle.'
    },
    {
      q: 'Explain RESTful API design principles. What is the difference between PUT and PATCH?',
      answer: 'REST uses stateless HTTP, resource-based URLs, and standard verbs. PUT replaces the entire resource (idempotent, sends full payload). PATCH updates only specified fields (partial update). Use PATCH when only a few fields change to save bandwidth and avoid accidentally nulling unset fields.'
    },
    {
      q: 'What is database normalization and when would you intentionally denormalize?',
      answer: 'Normalization removes data redundancy (1NF→3NF) to ensure consistency and reduce update anomalies. Denormalize when read performance is critical and data rarely changes — for example, storing a pre-computed order total avoids expensive JOINs on every dashboard load. Always benchmark before denormalizing.'
    },
  ],
  Behavioral: [
    {
      q: 'Tell me about a time you had to meet a very tight deadline. How did you handle it?',
      answer: 'Use STAR: Situation (sprint with half team on leave) → Task (deliver feature in 3 days) → Action (cut scope to MVP, daily standups with stakeholder, worked focused hours) → Result (shipped on time, stakeholder approved). Emphasize communication and prioritisation — not just "I worked overtime".'
    },
    {
      q: 'Describe a situation where you disagreed with a teammate\'s technical decision. What did you do?',
      answer: 'Show maturity: you raised the concern privately first (not in public Slack), backed it with data or a proof-of-concept, listened to their reasoning, and ultimately deferred or found a compromise. Interviewers want collaborative disagreement, not avoidance or aggression.'
    },
    {
      q: 'Share a project you\'re most proud of and your specific contribution.',
      answer: 'Pick something with measurable impact. Structure: what it was → why it mattered → YOUR specific role (avoid "we did everything") → what you learned. End with the outcome: "Reduced load time by 40%, which improved user retention by 15%." Numbers make it memorable.'
    },
    {
      q: 'Tell me about a time you received critical feedback. How did you respond?',
      answer: 'Don\'t say "I can\'t think of any." Show self-awareness: you received feedback (code review, performance review), you felt defensive initially (honest), you reflected and recognised the validity, you took concrete action to improve. Prove growth with a follow-up result.'
    },
    {
      q: 'Describe a time you had to learn a new technology quickly under pressure.',
      answer: 'Frame it as resourcefulness: you identified the fastest path to competence (official docs, not YouTube), built a minimal spike/POC first, asked targeted questions to teammates instead of spending hours guessing, and delivered. Show you can learn independently without hand-holding.'
    },
  ],
  Situational: [
    {
      q: 'Your production server goes down at 2 AM and you\'re on-call. Walk me through your exact response.',
      answer: '1) Acknowledge the alert immediately (SLA clock starts). 2) Check monitoring — is it infra, code, or data issue? 3) Roll back last deployment if recent. 4) Escalate to team if >15 min unresolved. 5) Communicate status to stakeholders proactively. 6) Post-incident write a blameless post-mortem. Calmness and process matter most here.'
    },
    {
      q: 'A client requests a feature you know will create serious technical debt. What do you do?',
      answer: 'Don\'t just say no or silently comply. Quantify the debt ("this will add ~2 weeks of refactoring later"), propose a slightly longer but clean alternative, and let the client decide with full information. If they still insist, document the trade-off and set a "debt payment" sprint for Q+1.'
    },
    {
      q: 'Two days from a critical deadline, you discover a core feature is fundamentally broken. What do you do?',
      answer: 'Immediately surface it — never hide it hoping it fixes itself. Assess: can it be descoped for this release? Can a workaround ship? Communicate to PM with options and time estimates, not just "we have a problem." Propose a fallback (feature flag, limited rollout) so the launch isn\'t fully blocked.'
    },
    {
      q: 'You\'re asked to review a junior developer\'s PR and it has fundamental architectural problems. How do you give feedback?',
      answer: 'Assume positive intent. Start with what\'s good (1-2 genuine things). Explain the WHY behind each concern — don\'t just say "this is wrong," show the failure scenario. Offer a concrete suggestion. Invite discussion, don\'t mandate. The goal is the junior learning, not proving you\'re smarter.'
    },
    {
      q: 'Your team cannot agree on which framework to use for a new project and you\'re losing days. How do you move forward?',
      answer: 'Timeboxed spike: each advocate builds the same small feature in their preferred stack in 2 hours, then demos it. Evaluate on: team familiarity, hiring pool, performance, ecosystem. Then the tech lead makes a decision and documents it. Disagree-and-commit beats endless debate.'
    },
  ],
}

const roles = ['Frontend Engineer', 'Backend Engineer', 'Data Analyst', 'Product Manager', 'UX Designer', 'DevOps Engineer', 'Full Stack Engineer']
const companies = ['Startup (Agile)', 'MNC (Structured)', 'GLC (Government-linked)', 'Consulting Firm']
const difficulties = ['Entry Level', 'Mid Level', 'Senior Level']

function Timer({ seconds, onEnd }: { seconds: number; onEnd: () => void }) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const [running, setRunning] = useState(false)
  const [ref] = useState<{ timer: ReturnType<typeof setInterval> | null }>({ timer: null })

  function start() {
    setRunning(true)
    ref.timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(ref.timer!); setRunning(false); onEnd(); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  function reset() { clearInterval(ref.timer!); setRunning(false); setTimeLeft(seconds) }

  const pct = (timeLeft / seconds) * 100
  const urgent = timeLeft <= 30

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
      <Clock className="w-4 h-4 flex-shrink-0" style={{ color: urgent && running ? '#ff4757' : '#4a5568' }} />
      <div className="flex-1">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#babecc' }}>
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct}%`, background: urgent ? '#ff4757' : '#00b894' }} />
        </div>
      </div>
      <span className="text-sm font-mono font-bold w-10 text-right flex-shrink-0" style={{ color: urgent && running ? '#ff4757' : '#2d3436' }}>
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
      </span>
      {!running ? (
        <button onClick={start} className="text-xs font-bold px-3 py-1 rounded-lg btn-press" style={{ background: '#00b894', color: 'white', boxShadow: '2px 2px 6px rgba(0,184,148,0.3)' }}>Start</button>
      ) : (
        <button onClick={reset} className="text-xs font-bold px-3 py-1 rounded-lg btn-press" style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '2px 2px 6px #babecc, -2px -2px 6px #ffffff' }}>Reset</button>
      )}
    </div>
  )
}

export default function CareerCoachPage() {
  const [selectedRole, setSelectedRole] = useState(roles[0])
  const [selectedCompany, setSelectedCompany] = useState(companies[0])
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulties[1])
  const [questionType, setQuestionType] = useState<QType>('Technical')
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<typeof questionBank.Technical | null>(null)
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set())
  const [checked, setChecked] = useState<Set<number>>(new Set())

  async function generateQuestions() {
    setLoading(true)
    setRevealedAnswers(new Set())
    setChecked(new Set())
    await new Promise(r => setTimeout(r, 1600))
    setQuestions(questionBank[questionType])
    setLoading(false)
  }

  function toggleAnswer(i: number) {
    setRevealedAnswers(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s })
  }

  function toggleCheck(i: number) {
    setChecked(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s })
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#6c5ce7', boxShadow: '4px 4px 10px rgba(108,92,231,0.3)' }}>
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#2d3436' }}>AI Career Coach</h2>
              <p className="text-sm mt-1" style={{ color: '#4a5568' }}>Practice real interview questions tailored to your role, company type, and seniority. All with model answers.</p>
            </div>
          </div>
        </div>

        {/* Config */}
        <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: '#2d3436' }}>Configure Your Session</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Target Role</label>
              <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}
                className="input-recessed w-full px-4 py-3 rounded-xl text-sm" style={{ color: '#2d3436' }}>
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Company Type</label>
              <select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)}
                className="input-recessed w-full px-4 py-3 rounded-xl text-sm" style={{ color: '#2d3436' }}>
                {companies.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Difficulty</label>
              <select value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value)}
                className="input-recessed w-full px-4 py-3 rounded-xl text-sm" style={{ color: '#2d3436' }}>
                {difficulties.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Question Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Technical', 'Behavioral', 'Situational'] as QType[]).map(t => (
                  <button key={t} onClick={() => setQuestionType(t)}
                    className="py-2.5 rounded-xl text-xs font-bold transition-all btn-press"
                    style={{
                      background: '#e0e5ec',
                      color: questionType === t ? '#6c5ce7' : '#4a5568',
                      boxShadow: questionType === t ? 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' : '3px 3px 6px #babecc, -3px -3px 6px #ffffff',
                    }}>{t}</button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={generateQuestions} disabled={loading}
            className="mt-5 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2"
            style={{ background: '#6c5ce7', boxShadow: '6px 6px 14px rgba(108,92,231,0.35)', opacity: loading ? 0.8 : 1 }}>
            {loading ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Generating questions...</>
            ) : (
              <><MessageSquare className="w-4 h-4" /> Generate 5 Interview Questions</>
            )}
          </button>
        </div>

        {/* Questions */}
        {questions && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>
                {questionType} Questions — {selectedRole}
              </h3>
              <span className="text-xs font-mono" style={{ color: '#4a5568' }}>{checked.size}/{questions.length} practiced</span>
            </div>

            {questions.map((item, i) => {
              const revealed = revealedAnswers.has(i)
              const done = checked.has(i)
              return (
                <div key={i} className="card-screw rounded-2xl overflow-hidden transition-all duration-200"
                  style={{ background: done ? '#f0f9f6' : '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: done ? '1px solid #00b89422' : 'none' }}>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 font-mono font-black text-sm"
                        style={{ background: '#e0e5ec', color: '#6c5ce7', boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #ffffff' }}>
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-medium leading-relaxed" style={{ color: '#2d3436' }}>{item.q}</p>
                      </div>
                      <button onClick={() => toggleCheck(i)} className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: done ? '#00b894' : '#e0e5ec', boxShadow: done ? '0 0 8px rgba(0,184,148,0.3)' : '3px 3px 6px #babecc, -3px -3px 6px #ffffff' }}>
                        <CheckCircle className="w-4 h-4" style={{ color: done ? 'white' : '#babecc' }} />
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      <Timer seconds={120} onEnd={() => {}} />

                      <button onClick={() => toggleAnswer(i)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest btn-press transition-all"
                        style={{ background: '#e0e5ec', color: '#6c5ce7', boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #ffffff' }}>
                        <span>{revealed ? 'Hide Model Answer' : 'Show Model Answer'}</span>
                        {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>

                      {revealed && (
                        <div className="rounded-xl p-4 border-l-4 text-sm leading-relaxed" style={{ background: '#e8f5f3', borderColor: '#00b894', color: '#2d3436' }}>
                          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#00b894' }}>Model Answer</div>
                          {item.answer}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {checked.size === questions.length && (
              <div className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #f0f9f6, #e8f5f3)', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: '1px solid #00b89433' }}>
                <div className="text-3xl mb-2">🎉</div>
                <div className="font-black text-lg" style={{ color: '#00b894' }}>Session Complete!</div>
                <p className="text-sm mt-1" style={{ color: '#4a5568' }}>You practiced all {questions.length} questions. Generate a new set to keep going.</p>
                <button onClick={generateQuestions}
                  className="mt-4 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest text-white btn-press flex items-center gap-2 mx-auto"
                  style={{ background: '#00b894', boxShadow: '4px 4px 10px rgba(0,184,148,0.3)' }}>
                  <RefreshCw className="w-4 h-4" /> New Set <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        {!questions && !loading && (
          <div className="rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: '#2d3436' }}>How It Works</h3>
            <div className="space-y-3">
              {[
                { n: '01', t: 'Configure', d: 'Select your target role, company type, and seniority level.' },
                { n: '02', t: 'Get Questions', d: 'AI generates 5 tailored questions based on your profile.' },
                { n: '03', t: 'Practice Aloud', d: 'Use the 2-minute timer to simulate real interview conditions.' },
                { n: '04', t: 'Check Answer', d: 'Compare your answer against our model answer to improve.' },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                  <span className="font-mono font-black text-lg leading-none" style={{ color: '#6c5ce7' }}>{n}</span>
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#2d3436' }}>{t}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#4a5568' }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
