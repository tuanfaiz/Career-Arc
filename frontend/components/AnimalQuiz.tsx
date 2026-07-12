'use client'
import { useState } from 'react'
import { questions, calcResult, ANIMAL_STORAGE_KEY, type AnimalKey } from '@/lib/animalTest'
import { ChevronRight, CheckCircle } from 'lucide-react'

// The 40-question YourAnimal quiz UI, reusable inside any card.
// Saves the result to localStorage and reports it via onComplete.
export default function AnimalQuiz({ onComplete }: { onComplete: (animal: AnimalKey) => void }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(AnimalKey | null)[]>(Array(questions.length).fill(null))
  const [selected, setSelected] = useState<AnimalKey | null>(null)

  const pct = Math.round(((current + (selected ? 1 : 0)) / questions.length) * 100)

  function nextQuestion() {
    if (!selected) return
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelected(newAnswers[current + 1] ?? null)
    } else {
      const result = calcResult(newAnswers)
      localStorage.setItem(ANIMAL_STORAGE_KEY, result)
      onComplete(result)
    }
  }

  function prevQuestion() {
    if (current === 0) return
    setCurrent(current - 1)
    setSelected(answers[current - 1] ?? null)
  }

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: '#4a5568' }}>Question {current + 1} of {questions.length}</span>
          <span className="text-xs font-mono font-bold" style={{ color: '#8A6D1F' }}>{pct}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #8A6D1F, #c9a94a)' }} />
        </div>
      </div>

      {/* Question */}
      <p className="text-base sm:text-lg font-bold leading-snug" style={{ color: '#2d3436' }}>
        {questions[current].q}
      </p>
      <div className="space-y-3">
        {questions[current].options.map((opt, i) => {
          const isSelected = selected === opt.type
          return (
            <button key={i} onClick={() => setSelected(opt.type)}
              className="w-full text-left px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-150 btn-press flex items-start gap-3"
              style={{
                background: '#e0e5ec',
                color: isSelected ? '#8A6D1F' : '#2d3436',
                boxShadow: isSelected ? 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff' : '4px 4px 8px #babecc, -4px -4px 8px #ffffff',
                border: isSelected ? '1px solid #8A6D1F44' : '1px solid transparent',
              }}>
              <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black font-mono"
                style={{ background: isSelected ? '#8A6D1F' : '#e0e5ec', color: isSelected ? 'white' : '#4a5568', boxShadow: isSelected ? 'none' : '2px 2px 4px #babecc, -2px -2px 4px #ffffff' }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt.text}</span>
              {isSelected && <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#8A6D1F' }} />}
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        {current > 0 && (
          <button onClick={prevQuestion}
            className="px-5 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest btn-press flex items-center justify-center"
            style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
            Back
          </button>
        )}
        <button onClick={nextQuestion} disabled={!selected}
          className="flex-1 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2 transition-all"
          style={{ background: '#8A6D1F', boxShadow: '6px 6px 14px rgba(138,109,31,0.35)', opacity: selected ? 1 : 0.4 }}>
          {current < questions.length - 1 ? <>Next Question <ChevronRight className="w-4 h-4" /></> : <>See My Result <ChevronRight className="w-4 h-4" /></>}
        </button>
      </div>
    </div>
  )
}
