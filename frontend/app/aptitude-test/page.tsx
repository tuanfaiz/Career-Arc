'use client'
import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import AnimalQuiz from '@/components/AnimalQuiz'
import { animals, questions, ANIMAL_STORAGE_KEY, type AnimalKey } from '@/lib/animalTest'
import { PawPrint, ChevronRight, RefreshCw, Briefcase, TrendingUp, ExternalLink } from 'lucide-react'

export default function YourAnimalTestPage() {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro')
  const [resultKey, setResultKey] = useState<AnimalKey | null>(null)
  const [savedResult, setSavedResult] = useState<AnimalKey | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(ANIMAL_STORAGE_KEY)
    if (saved && saved in animals) setSavedResult(saved as AnimalKey)
  }, [])

  function startTest() { setStep('test'); setResultKey(null) }

  function handleComplete(animal: AnimalKey) {
    setResultKey(animal)
    setSavedResult(animal)
    setStep('result')
  }

  const shownResult = resultKey ?? savedResult
  const a = shownResult ? animals[shownResult] : null

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Saved result banner */}
        {savedResult && step === 'intro' && (
          <div className="rounded-2xl p-4 flex items-center gap-4 flex-wrap" style={{ background: animals[savedResult].bg, boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: `1px solid ${animals[savedResult].color}33` }}>
            <div className="text-3xl">{animals[savedResult].emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: animals[savedResult].color }}>Your Work Animal</div>
              <div className="font-black" style={{ color: '#2d3436' }}>{animals[savedResult].title}</div>
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
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#8A6D1F', boxShadow: '4px 4px 10px rgba(138,109,31,0.3)' }}>
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#2d3436' }}>The YourAnimal Test</h2>
                  <p className="text-sm mt-1" style={{ color: '#4a5568' }}>{questions.length} questions · 5 minutes · Discover which work animal you are — and the career trajectory it predicts.</p>
                  <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: '#8A6D1F18', color: '#8A6D1F' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#8A6D1F' }} />
                    Mandatory · Official Talentbank assessment
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.entries(animals) as [AnimalKey, typeof animals.Lion][]).map(([key, an]) => (
                <div key={key} className="rounded-2xl p-5" style={{ background: an.bg, boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: `1px solid ${an.color}22` }}>
                  <div className="text-2xl mb-2">{an.emoji}</div>
                  <div className="font-black text-sm mb-1" style={{ color: '#2d3436' }}>{an.title}</div>
                  <div className="text-xs" style={{ color: '#4a5568' }}>{an.tagline}</div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {an.traits.slice(0, 2).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: `${an.color}18`, color: an.color }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={startTest}
              className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2"
              style={{ background: '#8A6D1F', boxShadow: '6px 6px 14px rgba(138,109,31,0.35)' }}>
              <PawPrint className="w-4 h-4" /> Start the Test <ChevronRight className="w-4 h-4" />
            </button>

            <a href="https://yourworkanimal.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-xs font-medium" style={{ color: '#4a5568' }}>
              Powered by YourWork Animal · yourworkanimal.com <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Test */}
        {step === 'test' && (
          <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <AnimalQuiz onComplete={handleComplete} />
          </div>
        )}

        {/* Result */}
        {step === 'result' && a && shownResult && (
          <div className="space-y-5">
            {/* Hero result */}
            <div className="card-screw rounded-2xl p-6 sm:p-8 text-center" style={{ background: a.bg, boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: `1px solid ${a.color}33` }}>
              <div className="text-6xl mb-4">{a.emoji}</div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: a.color }}>Your Work Animal</div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: '#2d3436' }}>{a.title}</h2>
              <p className="text-base font-medium italic mb-5" style={{ color: '#4a5568' }}>&ldquo;{a.tagline}&rdquo;</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {a.traits.map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: `${a.color}18`, color: a.color, border: `1px solid ${a.color}33` }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Predicted trajectory */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: a.bg, boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: `1px solid ${a.color}33` }}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5" style={{ color: a.color }} />
                <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Predicted Career Trajectory</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#2d3436' }}>{a.trajectory}</p>
            </div>

            {/* Work style */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: '#2d3436' }}>How You Work</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#2d3436' }}>{a.workStyle}</p>
            </div>

            {/* Ideal roles */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5" style={{ color: a.color }} />
                <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Roles You Were Built For</h3>
              </div>
              <div className="flex flex-col gap-2">
                {a.idealRoles.map((role, i) => (
                  <div key={role} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <span className="w-5 h-5 rounded-lg flex items-center justify-center text-xs font-black font-mono flex-shrink-0" style={{ background: `${a.color}22`, color: a.color }}>{i + 1}</span>
                    <span className="text-sm font-medium" style={{ color: '#2d3436' }}>{role}</span>
                    {i === 0 && <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-lg" style={{ background: `${a.color}22`, color: a.color }}>Best fit</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* All animals */}
            <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: '#2d3436' }}>The 5 Work Animals</h3>
              <div className="grid grid-cols-5 gap-2">
                {(Object.entries(animals) as [AnimalKey, typeof animals.Lion][]).map(([key, an]) => (
                  <div key={key} className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                    style={{ background: '#e0e5ec', boxShadow: key === shownResult ? `inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff, 0 0 0 2px ${an.color}` : 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <span className="text-xl">{an.emoji}</span>
                    <span className="text-xs font-bold leading-tight" style={{ color: key === shownResult ? an.color : '#4a5568' }}>{an.title.replace('The ', '')}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={startTest}
              className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest btn-press flex items-center justify-center gap-2"
              style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <RefreshCw className="w-4 h-4" /> Retake Test
            </button>

            <p className="text-center text-xs font-medium" style={{ color: '#4a5568' }}>
              Your animal is saved to your profile and shown to employers as a culture-fit signal.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
