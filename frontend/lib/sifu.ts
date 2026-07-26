// SIFU — Smart Interview Feedback & Upskilling.
// Shared types + a deterministic heuristic evaluation used as the graceful
// fallback whenever the real Claude call is unavailable (no key or an error),
// so the demo never breaks.

export type Verdict = 'strong' | 'solid' | 'needs-work'

export interface StarCoverage {
  situation: boolean
  task: boolean
  action: boolean
  result: boolean
}

export interface SifuFeedback {
  score: number            // 0-100
  verdict: Verdict
  summary: string
  strengths: string[]
  improvements: string[]
  star: StarCoverage
  source: 'ai' | 'simulated'
}

export const verdictMeta: Record<Verdict, { label: string; color: string; bg: string }> = {
  'strong': { label: 'Strong answer', color: '#00b894', bg: '#f0faf8' },
  'solid': { label: 'Solid — sharpen it', color: '#f39c12', bg: '#fffaf0' },
  'needs-work': { label: 'Needs work', color: '#ff4757', bg: '#fff0f1' },
}

// Deterministic, offline evaluation. Not as good as the model, but believable
// and instant — used when ANTHROPIC_API_KEY is absent or the API errors.
export function heuristicFeedback(answer: string, type?: string): Omit<SifuFeedback, 'source'> {
  const words = answer.trim().split(/\s+/).filter(Boolean)
  const wc = words.length
  const lower = answer.toLowerCase()
  const hasNumbers = /\d/.test(answer)
  const behavioral = type === 'Behavioral' || type === 'Situational'

  const star: StarCoverage = {
    situation: /\b(when|situation|project|time|at my|during|we were|there was)\b/.test(lower),
    task: /\b(needed|had to|responsible|goal|task|my job|objective|deadline)\b/.test(lower),
    action: /\b(i (did|built|led|decided|implemented|proposed|created|organised|organized|coordinated|wrote|fixed|reviewed)|so i|then i|i started)\b/.test(lower),
    result: hasNumbers || /\b(result|outcome|achieved|improved|reduced|increased|delivered|shipped|learned|saved|grew)\b/.test(lower),
  }
  const starCount = Object.values(star).filter(Boolean).length

  let score = 40
  if (wc >= 40) score += 15
  if (wc >= 80) score += 10
  if (hasNumbers) score += 12
  if (behavioral) score += starCount * 6
  else score += Math.min(20, Math.round(wc / 6))
  score = Math.max(20, Math.min(96, score))

  const verdict: Verdict = score >= 78 ? 'strong' : score >= 55 ? 'solid' : 'needs-work'

  const strengths: string[] = []
  if (wc >= 40) strengths.push('Good length — you gave enough detail to be substantive.')
  if (hasNumbers) strengths.push('You quantified impact with a number, which makes the answer memorable.')
  if (behavioral && starCount >= 3) strengths.push('Clear STAR structure — the story is easy to follow.')
  if (!strengths.length) strengths.push('You engaged directly with the question rather than going off-topic.')

  const improvements: string[] = []
  if (wc < 40) improvements.push('Expand your answer — aim for 45–90 seconds of spoken content.')
  if (!hasNumbers) improvements.push('Add a concrete number or measurable outcome to prove impact.')
  if (behavioral && !star.result) improvements.push('End with a clear result — what changed because of what you did?')
  if (behavioral && !star.action) improvements.push('Spell out YOUR specific actions, not just what the team did.')
  if (!improvements.length) improvements.push('Tighten the opening so your key point lands in the first sentence.')

  return {
    score,
    verdict,
    summary: behavioral
      ? `Covered ${starCount} of 4 STAR elements. ${verdict === 'strong' ? 'Strong, well-structured story.' : verdict === 'solid' ? 'Solid base — sharpen the weak spots below.' : 'Needs more structure and specifics.'}`
      : `${verdict === 'strong' ? 'Clear and well-explained.' : verdict === 'solid' ? 'Reasonable answer with room to go deeper.' : 'Add depth and a concrete example.'}`,
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 3),
    star,
  }
}
