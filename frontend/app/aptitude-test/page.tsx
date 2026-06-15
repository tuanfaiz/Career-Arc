'use client'
import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Brain, ChevronRight, RefreshCw, CheckCircle, Briefcase } from 'lucide-react'

type PersonalityKey = 'Architect' | 'Connector' | 'Builder' | 'Visionary' | 'Guardian'

const personalities: Record<PersonalityKey, {
  emoji: string; title: string; tagline: string
  traits: string[]; workStyle: string
  idealRoles: string[]; color: string; bg: string
}> = {
  Architect: {
    emoji: '🏗️', title: 'The Architect', tagline: 'You design systems others cannot see yet',
    traits: ['Analytical', 'Systematic', 'Precision-focused', 'Deep thinker'],
    workStyle: 'You think in frameworks and first principles. Given a vague problem, you map it into a structured system before writing a single line of code or word. You work best with clear specs, quiet focus time, and genuinely hard problems. You find energy in complexity that makes others freeze.',
    idealRoles: ['Software Engineer', 'Data Scientist', 'Systems Architect', 'Security Engineer', 'Quantitative Analyst'],
    color: '#6c5ce7', bg: '#f5f3ff',
  },
  Connector: {
    emoji: '🤝', title: 'The Connector', tagline: 'You make teams greater than the sum of their parts',
    traits: ['Empathetic', 'Collaborative', 'Communicative', 'People-first'],
    workStyle: 'You read rooms, build trust quickly, and turn potential conflict into alignment. You are often the invisible reason a cross-functional project actually works. You need human connection and genuine collaboration to do your best work — a solo role drains you fast.',
    idealRoles: ['Product Manager', 'HR Business Partner', 'Account Manager', 'UX Researcher', 'Customer Success Lead'],
    color: '#00b894', bg: '#f0faf8',
  },
  Builder: {
    emoji: '🔨', title: 'The Builder', tagline: 'You ship when others are still planning',
    traits: ['Execution-focused', 'Pragmatic', 'High-output', 'Results-driven'],
    workStyle: 'You have a low tolerance for analysis paralysis. You would rather ship a working v1 and iterate than perfect something that never ships. Ownership, speed, and clear deliverables are your fuel. You thrive when scope is defined and the path is mostly yours to run.',
    idealRoles: ['Full Stack Developer', 'DevOps Engineer', 'Project Manager', 'Operations Lead', 'Startup Generalist'],
    color: '#e17055', bg: '#fff5f3',
  },
  Visionary: {
    emoji: '💡', title: 'The Visionary', tagline: 'You see the future before it arrives',
    traits: ['Creative', 'Big-picture', 'Innovative', 'Challenge-driven'],
    workStyle: 'You get bored with the status quo and energised by unexplored territory. You ask "why not?" before "how?". You need creative latitude and a team willing to take big swings — and you need to see your ideas influence real direction, not just get noted and forgotten.',
    idealRoles: ['Product Designer', 'Growth Strategist', 'Startup Founder', 'R&D Engineer', 'Innovation Lead'],
    color: '#f39c12', bg: '#fffcf0',
  },
  Guardian: {
    emoji: '🛡️', title: 'The Guardian', tagline: 'You are the reason nothing falls through the cracks',
    traits: ['Detail-oriented', 'Thorough', 'Process-driven', 'Risk-aware'],
    workStyle: 'You catch what others miss and take quiet pride in flawless delivery. You think in checklists, documentation, and edge cases. You need clear ownership boundaries and a team that respects process — nothing frustrates you more than corners being cut.',
    idealRoles: ['QA Engineer', 'Compliance Officer', 'Business Analyst', 'Technical Writer', 'Finance Manager'],
    color: '#0984e3', bg: '#f0f7ff',
  },
}

type Option = { text: string; type: PersonalityKey }
type Question = { q: string; options: Option[] }

const questions: Question[] = [
  {
    q: 'When starting a new project, you typically...',
    options: [
      { text: 'Map out the entire system architecture before writing a single line', type: 'Architect' },
      { text: 'Talk to all stakeholders to understand everyone\'s needs first', type: 'Connector' },
      { text: 'Start building immediately and figure it out along the way', type: 'Builder' },
      { text: 'Research widely and explore unconventional angles on the problem', type: 'Visionary' },
      { text: 'Create detailed documentation, timelines, and a risk register', type: 'Guardian' },
    ]
  },
  {
    q: 'A teammate proposes a flawed solution in a meeting. You...',
    options: [
      { text: 'Point out the logical gaps with data and specific evidence', type: 'Architect' },
      { text: 'Ask questions to fully understand their thinking before responding', type: 'Connector' },
      { text: 'Suggest a faster working alternative and push to decide now', type: 'Builder' },
      { text: 'Reframe the entire problem and propose a different angle', type: 'Visionary' },
      { text: 'Request that it goes through a proper structured review process', type: 'Guardian' },
    ]
  },
  {
    q: 'Your ideal work environment is...',
    options: [
      { text: 'Quiet and independent — deep, complex problems to solve alone', type: 'Architect' },
      { text: 'Open and social — frequent team interaction and collaboration', type: 'Connector' },
      { text: 'Fast-paced, high-ownership, with very clear deliverables', type: 'Builder' },
      { text: 'Creative and experimental, with minimal process constraints', type: 'Visionary' },
      { text: 'Structured and predictable, with clear processes and expectations', type: 'Guardian' },
    ]
  },
  {
    q: 'What stresses you out most at work?',
    options: [
      { text: 'Vague requirements and unclear technical specifications', type: 'Architect' },
      { text: 'Poor team dynamics or unresolved interpersonal tension', type: 'Connector' },
      { text: 'Slow decisions, endless meetings, and no visible progress', type: 'Builder' },
      { text: 'Repetitive work with no room to explore or innovate', type: 'Visionary' },
      { text: 'Being rushed into decisions without proper process or review', type: 'Guardian' },
    ]
  },
  {
    q: 'In a group project, you naturally become...',
    options: [
      { text: 'The one who designs how all the pieces technically connect', type: 'Architect' },
      { text: 'The one who keeps team morale and communication flowing', type: 'Connector' },
      { text: 'The one who actually gets things shipped on time', type: 'Builder' },
      { text: 'The one who challenges assumptions and proposes bold ideas', type: 'Visionary' },
      { text: 'The one who tracks progress and makes sure nothing is missed', type: 'Guardian' },
    ]
  },
  {
    q: 'You feel most accomplished when you...',
    options: [
      { text: 'Solve a technically hard problem that stumped everyone else', type: 'Architect' },
      { text: 'Help someone on the team grow or overcome a real challenge', type: 'Connector' },
      { text: 'Ship something significant, ahead of schedule', type: 'Builder' },
      { text: 'Launch something that genuinely did not exist before', type: 'Visionary' },
      { text: 'Deliver a piece of work that is completely flawless', type: 'Guardian' },
    ]
  },
  {
    q: 'When learning something new, you prefer to...',
    options: [
      { text: 'Read the full documentation and understand it deeply first', type: 'Architect' },
      { text: 'Learn alongside others, asking lots of questions as you go', type: 'Connector' },
      { text: 'Build something with it immediately — learn entirely by doing', type: 'Builder' },
      { text: 'Explore adjacent ideas and understand the bigger picture first', type: 'Visionary' },
      { text: 'Follow a structured course with clear milestones and checkpoints', type: 'Guardian' },
    ]
  },
  {
    q: 'How do you prefer to receive feedback?',
    options: [
      { text: 'Specific and data-backed — show exactly where the logic broke', type: 'Architect' },
      { text: 'As a two-way conversation where we explore it together', type: 'Connector' },
      { text: 'Short and direct — tell me what to fix and I will fix it', type: 'Builder' },
      { text: 'High-level and conceptual — focus on the overall direction', type: 'Visionary' },
      { text: 'Written and detailed with specific examples I can reference', type: 'Guardian' },
    ]
  },
  {
    q: 'When making a difficult decision, you rely most on...',
    options: [
      { text: 'Data analysis and first-principles reasoning', type: 'Architect' },
      { text: 'Team input and stakeholder alignment', type: 'Connector' },
      { text: 'Past experience and gut instinct', type: 'Builder' },
      { text: 'Intuition about emerging trends and future possibilities', type: 'Visionary' },
      { text: 'Established rules, precedents, and risk frameworks', type: 'Guardian' },
    ]
  },
  {
    q: 'Which best describes your relationship with rules and process?',
    options: [
      { text: 'I follow them if they make logical sense — otherwise I redesign them', type: 'Architect' },
      { text: 'I adapt them based on what works for the people involved', type: 'Connector' },
      { text: 'I move fast and deal with process blockers when they appear', type: 'Builder' },
      { text: 'Rules are starting points — I am interested in what lies beyond them', type: 'Visionary' },
      { text: 'Good processes exist for a reason — I respect and uphold them', type: 'Guardian' },
    ]
  },
]

function calcResult(answers: (PersonalityKey | null)[]): PersonalityKey {
  const count: Record<PersonalityKey, number> = { Architect: 0, Connector: 0, Builder: 0, Visionary: 0, Guardian: 0 }
  answers.forEach(a => { if (a) count[a]++ })
  return (Object.entries(count).sort((a, b) => b[1] - a[1])[0][0]) as PersonalityKey
}

const STORAGE_KEY = 'careerAptitudeResult'

export default function AptitudeTestPage() {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(PersonalityKey | null)[]>(Array(questions.length).fill(null))
  const [selected, setSelected] = useState<PersonalityKey | null>(null)
  const [savedResult, setSavedResult] = useState<PersonalityKey | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && saved in personalities) setSavedResult(saved as PersonalityKey)
  }, [])

  function startTest() { setStep('test'); setCurrent(0); setAnswers(Array(questions.length).fill(null)); setSelected(null) }

  function selectAnswer(type: PersonalityKey) { setSelected(type) }

  function nextQuestion() {
    if (!selected) return
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
    } else {
      const result = calcResult(newAnswers)
      localStorage.setItem(STORAGE_KEY, result)
      setSavedResult(result)
      setStep('result')
    }
  }

  const pct = Math.round(((current + (selected ? 1 : 0)) / questions.length) * 100)
  const resultKey = step === 'result' ? calcResult(answers) : savedResult
  const p = resultKey ? personalities[resultKey] : null

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Saved result banner */}
        {savedResult && step === 'intro' && (
          <div className="rounded-2xl p-4 flex items-center gap-4 flex-wrap" style={{ background: personalities[savedResult].bg, boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: `1px solid ${personalities[savedResult].color}33` }}>
            <div className="text-3xl">{personalities[savedResult].emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: personalities[savedResult].color }}>Your Career Personality</div>
              <div className="font-black" style={{ color: '#2d3436' }}>{personalities[savedResult].title}</div>
            </div>
            <button onClick={startTest}
              className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider btn-press flex-shrink-0"
              style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
              Retake
            </button>
          </div>
        )}

        {/* Intro */}
        {step === 'intro' && (
          <div className="space-y-6">
            <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#6c5ce7', boxShadow: '4px 4px 10px rgba(108,92,231,0.3)' }}>
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#2d3436' }}>Career Aptitude Test</h2>
                  <p className="text-sm mt-1" style={{ color: '#4a5568' }}>10 questions · 3 minutes · Discover which of 5 career personalities fits you — and which roles you were built for.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.entries(personalities) as [PersonalityKey, typeof personalities.Architect][]).map(([key, p]) => (
                <div key={key} className="rounded-2xl p-5" style={{ background: p.bg, boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: `1px solid ${p.color}22` }}>
                  <div className="text-2xl mb-2">{p.emoji}</div>
                  <div className="font-black text-sm mb-1" style={{ color: '#2d3436' }}>{p.title}</div>
                  <div className="text-xs" style={{ color: '#4a5568' }}>{p.tagline}</div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {p.traits.slice(0, 2).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: `${p.color}18`, color: p.color }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={startTest}
              className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2"
              style={{ background: '#6c5ce7', boxShadow: '6px 6px 14px rgba(108,92,231,0.35)' }}>
              <Brain className="w-4 h-4" /> Start the Test <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Test */}
        {step === 'test' && (
          <div className="space-y-5">
            {/* Progress */}
            <div className="card-screw rounded-2xl p-5" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: '#4a5568' }}>Question {current + 1} of {questions.length}</span>
                <span className="text-xs font-mono font-bold" style={{ color: '#6c5ce7' }}>{pct}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6c5ce7, #a29bfe)' }} />
              </div>
            </div>

            {/* Question */}
            <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <p className="text-base sm:text-lg font-bold leading-snug mb-6" style={{ color: '#2d3436' }}>
                {questions[current].q}
              </p>
              <div className="space-y-3">
                {questions[current].options.map((opt, i) => {
                  const isSelected = selected === opt.type
                  return (
                    <button key={i} onClick={() => selectAnswer(opt.type)}
                      className="w-full text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-150 btn-press flex items-start gap-3"
                      style={{
                        background: '#e0e5ec',
                        color: isSelected ? '#6c5ce7' : '#2d3436',
                        boxShadow: isSelected ? 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff' : '4px 4px 8px #babecc, -4px -4px 8px #ffffff',
                        border: isSelected ? '1px solid #6c5ce744' : '1px solid transparent',
                      }}>
                      <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black font-mono"
                        style={{ background: isSelected ? '#6c5ce7' : '#e0e5ec', color: isSelected ? 'white' : '#4a5568', boxShadow: isSelected ? 'none' : '2px 2px 4px #babecc, -2px -2px 4px #ffffff' }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {isSelected && <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#6c5ce7' }} />}
                    </button>
                  )
                })}
              </div>

              <button onClick={nextQuestion} disabled={!selected}
                className="mt-6 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2 transition-all"
                style={{ background: '#6c5ce7', boxShadow: '6px 6px 14px rgba(108,92,231,0.35)', opacity: selected ? 1 : 0.4 }}>
                {current < questions.length - 1 ? <>Next Question <ChevronRight className="w-4 h-4" /></> : <>See My Result <ChevronRight className="w-4 h-4" /></>}
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {step === 'result' && p && resultKey && (
          <div className="space-y-5">
            {/* Hero result */}
            <div className="card-screw rounded-2xl p-6 sm:p-8 text-center" style={{ background: p.bg, boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: `1px solid ${p.color}33` }}>
              <div className="text-5xl mb-4">{p.emoji}</div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: p.color }}>Your Career Personality</div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: '#2d3436' }}>{p.title}</h2>
              <p className="text-base font-medium italic mb-5" style={{ color: '#4a5568' }}>&ldquo;{p.tagline}&rdquo;</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {p.traits.map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}33` }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Work style */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: '#2d3436' }}>How You Work</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#2d3436' }}>{p.workStyle}</p>
            </div>

            {/* Ideal roles */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5" style={{ color: p.color }} />
                <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Roles You Were Built For</h3>
              </div>
              <div className="flex flex-col gap-2">
                {p.idealRoles.map((role, i) => (
                  <div key={role} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <span className="w-5 h-5 rounded-lg flex items-center justify-center text-xs font-black font-mono flex-shrink-0" style={{ background: `${p.color}22`, color: p.color }}>{i + 1}</span>
                    <span className="text-sm font-medium" style={{ color: '#2d3436' }}>{role}</span>
                    {i === 0 && <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-lg" style={{ background: `${p.color}22`, color: p.color }}>Best fit</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* All types */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: '#2d3436' }}>The 5 Career Personalities</h3>
              <div className="grid grid-cols-5 gap-2">
                {(Object.entries(personalities) as [PersonalityKey, typeof personalities.Architect][]).map(([key, pt]) => (
                  <div key={key} className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                    style={{ background: '#e0e5ec', boxShadow: key === resultKey ? `inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff, 0 0 0 2px ${pt.color}` : 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <span className="text-xl">{pt.emoji}</span>
                    <span className="text-xs font-bold leading-tight" style={{ color: key === resultKey ? pt.color : '#4a5568' }}>{pt.title.replace('The ', '')}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={startTest}
              className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest btn-press flex items-center justify-center gap-2"
              style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <RefreshCw className="w-4 h-4" /> Retake Test
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
