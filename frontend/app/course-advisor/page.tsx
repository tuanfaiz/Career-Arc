'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import { INTERESTS, SUBJECTS, matchCourses, demandMeta, type CourseMatch } from '@/lib/courseAdvisor'
import { animals, ANIMAL_STORAGE_KEY, type AnimalKey } from '@/lib/animalTest'
import {
  Compass, ChevronRight, ChevronLeft, Check, Sparkles, GraduationCap,
  Briefcase, TrendingUp, RefreshCw, ShieldCheck, Route,
} from 'lucide-react'

type Step = 'interests' | 'subjects' | 'animal' | 'result'
const STEP_ORDER: Step[] = ['interests', 'subjects', 'animal', 'result']

export default function CourseAdvisorPage() {
  const [step, setStep] = useState<Step>('interests')
  const [interests, setInterests] = useState<string[]>([])
  const [subjects, setSubjects] = useState<string[]>([])
  const [animal, setAnimal] = useState<AnimalKey | null>(null)
  const [results, setResults] = useState<CourseMatch[]>([])

  // Pre-fill the work animal if they already took the YourAnimal test.
  useEffect(() => {
    const saved = localStorage.getItem(ANIMAL_STORAGE_KEY)
    if (saved && saved in animals) setAnimal(saved as AnimalKey)
  }, [])

  function toggle(list: string[], set: (v: string[]) => void, value: string) {
    set(list.includes(value) ? list.filter(v => v !== value) : [...list, value])
  }

  const idx = STEP_ORDER.indexOf(step)
  const canNext = step === 'interests' ? interests.length >= 1 : step === 'subjects' ? subjects.length >= 1 : true

  function next() {
    if (step === 'animal') {
      setResults(matchCourses(interests, subjects, animal).slice(0, 3))
      setStep('result')
    } else {
      setStep(STEP_ORDER[idx + 1])
    }
  }

  function restart() {
    setInterests([]); setSubjects([]); setResults([]); setStep('interests')
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #eef7f4 100%)', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: '1px solid #00b89433' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#00b894', boxShadow: '4px 4px 10px rgba(0,184,148,0.3)' }}>
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#2d3436' }}>What should I study?</h2>
              <p className="text-sm mt-1" style={{ color: '#4a5568' }}>
                Still in school? Answer 3 quick questions before you commit four years — and a PTPTN loan — to a course.
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        {step !== 'result' && (
          <div className="flex items-center gap-2">
            {(['interests', 'subjects', 'animal'] as Step[]).map((s, i) => (
              <div key={s} className="flex-1">
                <div className="h-1.5 rounded-full" style={{ background: i <= idx ? '#00b894' : '#d1d9e6' }} />
                <div className="text-xs mt-1.5 font-medium" style={{ color: i === idx ? '#00b894' : '#7a8699' }}>
                  {['What you enjoy', 'What you\'re good at', 'How you work'][i]}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Steps */}
        {step !== 'result' && (
          <div className="card-screw rounded-2xl p-6 sm:p-8 min-h-[300px]" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            {step === 'interests' && (
              <>
                <h3 className="text-lg font-black mb-1" style={{ color: '#2d3436' }}>What do you actually enjoy?</h3>
                <p className="text-sm mb-5" style={{ color: '#4a5568' }}>Pick as many as feel true. Be honest, not impressive.</p>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map(i => (
                    <Chip key={i} on={interests.includes(i)} onClick={() => toggle(interests, setInterests, i)}>{i}</Chip>
                  ))}
                </div>
              </>
            )}

            {step === 'subjects' && (
              <>
                <h3 className="text-lg font-black mb-1" style={{ color: '#2d3436' }}>Which subjects are you strongest in?</h3>
                <p className="text-sm mb-5" style={{ color: '#4a5568' }}>School subjects you do well in — or genuinely like.</p>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map(s => (
                    <Chip key={s} on={subjects.includes(s)} onClick={() => toggle(subjects, setSubjects, s)}>{s}</Chip>
                  ))}
                </div>
              </>
            )}

            {step === 'animal' && (
              <>
                <h3 className="text-lg font-black mb-1" style={{ color: '#2d3436' }}>How do you like to work?</h3>
                <p className="text-sm mb-5" style={{ color: '#4a5568' }}>
                  {animal ? 'We found your YourAnimal result — change it if you like.' : 'Pick the one that sounds most like you (optional).'}
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {(Object.entries(animals) as [AnimalKey, typeof animals.Lion][]).map(([key, a]) => (
                    <button key={key} onClick={() => setAnimal(animal === key ? null : key)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl btn-press"
                      style={{ background: '#e0e5ec', boxShadow: animal === key ? `inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff, 0 0 0 2px ${a.color}` : '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                      <span className="text-2xl">{a.emoji}</span>
                      <span className="text-xs font-bold" style={{ color: animal === key ? a.color : '#4a5568' }}>{key}</span>
                    </button>
                  ))}
                </div>
                {animal && (
                  <p className="text-xs mt-4" style={{ color: '#4a5568' }}>{animals[animal].tagline}</p>
                )}
              </>
            )}

            <div className="flex gap-3 mt-8">
              {idx > 0 && (
                <button onClick={() => setStep(STEP_ORDER[idx - 1])}
                  className="px-5 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest btn-press flex items-center gap-2"
                  style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button onClick={next} disabled={!canNext}
                className="flex-1 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2"
                style={{ background: '#00b894', boxShadow: '6px 6px 14px rgba(0,184,148,0.35)', opacity: canNext ? 1 : 0.4 }}>
                {step === 'animal' ? <>Show my courses <ChevronRight className="w-4 h-4" /></> : <>Continue <ChevronRight className="w-4 h-4" /></>}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {step === 'result' && (
          <div className="space-y-5">
            <div className="rounded-2xl p-5 flex items-start gap-3" style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #eef7f4 100%)', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: '1px solid #00b89433' }}>
              <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#00b894' }} />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#00b894' }}>AI · Your top 3 matches</div>
                <p className="text-sm" style={{ color: '#2d3436' }}>
                  Based on what you enjoy, what you&apos;re good at{animal ? `, and your ${animal} work style` : ''}. Each card also shows a
                  route that <strong>doesn&apos;t need a degree</strong> — university isn&apos;t the only way in.
                </p>
              </div>
            </div>

            {results.map((m, i) => {
              const d = demandMeta[m.course.demand]
              return (
                <div key={m.course.id} className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', borderTop: i === 0 ? '4px solid #00b894' : undefined }}>
                  <div className="flex items-start gap-4 mb-4 flex-wrap sm:flex-nowrap">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: i === 0 ? '#00b894' : '#e0e5ec', boxShadow: i === 0 ? '4px 4px 10px rgba(0,184,148,0.3)' : 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                      <GraduationCap className="w-5 h-5" style={{ color: i === 0 ? '#fff' : '#4a5568' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-black" style={{ color: '#2d3436' }}>{m.course.name}</h3>
                        {i === 0 && <span className="px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: '#00b89418', color: '#00b894' }}>Best fit</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: d.bg, color: d.color, border: `1px solid ${d.color}33` }}>{d.icon} {d.label}</span>
                        <span className="text-xs font-mono" style={{ color: '#4a5568' }}>Starting {m.course.startingSalary}</span>
                      </div>
                    </div>
                    <div className="text-center flex-shrink-0">
                      <div className="text-2xl font-black font-mono" style={{ color: '#00b894' }}>{m.fitScore}%</div>
                      <div className="text-xs" style={{ color: '#4a5568' }}>fit</div>
                    </div>
                  </div>

                  {/* Why it fits */}
                  {m.reasons.length > 0 && (
                    <div className="flex flex-col gap-1.5 mb-4">
                      {m.reasons.map(r => (
                        <div key={r} className="flex items-start gap-2 text-xs" style={{ color: '#4a5568' }}>
                          <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#00b894' }} />{r}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Careers */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a5568' }}>
                      <Briefcase className="w-3.5 h-3.5" /> Where it leads
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {m.course.careers.map(c => (
                        <span key={c} className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: '#e0e5ec', color: '#2d3436', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>{c}</span>
                      ))}
                    </div>
                  </div>

                  {/* Durability — the honest bit */}
                  <div className="rounded-xl p-4 mb-4" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#f39c12' }}>
                      <ShieldCheck className="w-3.5 h-3.5" /> Will this still matter in 10 years?
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#2d3436' }}>{m.course.durability}</p>
                  </div>

                  {/* Non-degree route */}
                  <div className="rounded-xl p-4" style={{ background: '#fffcf0', border: '1px solid #f39c1233' }}>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#8A6D1F' }}>
                      <Route className="w-3.5 h-3.5" /> Don&apos;t want university? · {m.course.skillsRoute.months} months
                    </div>
                    <div className="text-sm font-bold mb-1" style={{ color: '#2d3436' }}>{m.course.skillsRoute.label}</div>
                    <p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{m.course.skillsRoute.detail}</p>
                  </div>
                </div>
              )
            })}

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/career-path" className="flex-1 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2" style={{ background: '#ff4757', boxShadow: '4px 4px 10px rgba(255,71,87,0.3)' }}>
                <TrendingUp className="w-4 h-4" /> See the next 4 years
              </Link>
              <button onClick={restart} className="flex-1 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest btn-press flex items-center justify-center gap-2" style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                <RefreshCw className="w-4 h-4" /> Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="px-3.5 py-2 rounded-xl text-sm font-medium btn-press transition-all"
      style={{ background: on ? '#00b894' : '#e0e5ec', color: on ? '#fff' : '#4a5568', boxShadow: on ? '3px 3px 8px rgba(0,184,148,0.3)' : '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
      {on && <Check className="w-3 h-3 inline mr-1" />}{children}
    </button>
  )
}
