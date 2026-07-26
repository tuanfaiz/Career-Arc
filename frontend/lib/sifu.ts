// SIFU — Smart Interview Feedback & Upskilling.
// Shared types + a deterministic heuristic evaluation used as the graceful
// fallback whenever the real Claude call is unavailable (no key or an error),
// so the demo never breaks.

export type QType = 'Technical' | 'Behavioral' | 'Situational'

export interface InterviewQuestion {
  q: string
  answer: string
}

// Fallback question bank — used when the AI question generator has no key or errors.
export const questionBank: Record<QType, InterviewQuestion[]> = {
  Technical: [
    { q: 'Explain the difference between `==` and `===` in JavaScript. When would you use one over the other?', answer: '`===` checks both value AND type (strict equality) — always prefer this. `==` does type coercion before comparing (e.g., `0 == false` is true), which causes subtle bugs. Only use `==` when you intentionally want to allow type coercion, such as checking for both `null` and `undefined` at once (`value == null`).' },
    { q: 'What is the React virtual DOM and how does it improve performance?', answer: 'The virtual DOM is a lightweight in-memory copy of the real DOM. When state changes, React re-renders the virtual DOM, diffs it against the previous version (reconciliation), then applies only the minimal set of real DOM updates needed. This batching avoids expensive full-page repaints.' },
    { q: 'Walk me through how you would optimize a slow-loading React application.', answer: '1) Profile with React DevTools to find re-renders. 2) Memoize heavy components with React.memo / useMemo / useCallback. 3) Code-split with dynamic imports. 4) Virtualize long lists (react-window). 5) Optimize images (WebP, lazy loading). 6) Move heavy logic out of the render cycle.' },
    { q: 'Explain RESTful API design principles. What is the difference between PUT and PATCH?', answer: 'REST uses stateless HTTP, resource-based URLs, and standard verbs. PUT replaces the entire resource (idempotent, sends full payload). PATCH updates only specified fields (partial update). Use PATCH when only a few fields change to save bandwidth and avoid accidentally nulling unset fields.' },
    { q: 'What is database normalization and when would you intentionally denormalize?', answer: 'Normalization removes data redundancy (1NF→3NF) to ensure consistency and reduce update anomalies. Denormalize when read performance is critical and data rarely changes — for example, storing a pre-computed order total avoids expensive JOINs on every dashboard load. Always benchmark before denormalizing.' },
  ],
  Behavioral: [
    { q: 'Tell me about a time you had to meet a very tight deadline. How did you handle it?', answer: 'Use STAR: Situation (sprint with half team on leave) → Task (deliver feature in 3 days) → Action (cut scope to MVP, daily standups with stakeholder, worked focused hours) → Result (shipped on time, stakeholder approved). Emphasize communication and prioritisation — not just "I worked overtime".' },
    { q: 'Describe a situation where you disagreed with a teammate\'s technical decision. What did you do?', answer: 'Show maturity: you raised the concern privately first (not in public Slack), backed it with data or a proof-of-concept, listened to their reasoning, and ultimately deferred or found a compromise. Interviewers want collaborative disagreement, not avoidance or aggression.' },
    { q: 'Share a project you\'re most proud of and your specific contribution.', answer: 'Pick something with measurable impact. Structure: what it was → why it mattered → YOUR specific role (avoid "we did everything") → what you learned. End with the outcome: "Reduced load time by 40%, which improved user retention by 15%." Numbers make it memorable.' },
    { q: 'Tell me about a time you received critical feedback. How did you respond?', answer: 'Don\'t say "I can\'t think of any." Show self-awareness: you received feedback (code review, performance review), you felt defensive initially (honest), you reflected and recognised the validity, you took concrete action to improve. Prove growth with a follow-up result.' },
    { q: 'Describe a time you had to learn a new technology quickly under pressure.', answer: 'Frame it as resourcefulness: you identified the fastest path to competence (official docs, not YouTube), built a minimal spike/POC first, asked targeted questions to teammates instead of spending hours guessing, and delivered. Show you can learn independently without hand-holding.' },
  ],
  Situational: [
    { q: 'Your production server goes down at 2 AM and you\'re on-call. Walk me through your exact response.', answer: '1) Acknowledge the alert immediately (SLA clock starts). 2) Check monitoring — is it infra, code, or data issue? 3) Roll back last deployment if recent. 4) Escalate to team if >15 min unresolved. 5) Communicate status to stakeholders proactively. 6) Post-incident write a blameless post-mortem. Calmness and process matter most here.' },
    { q: 'A client requests a feature you know will create serious technical debt. What do you do?', answer: 'Don\'t just say no or silently comply. Quantify the debt ("this will add ~2 weeks of refactoring later"), propose a slightly longer but clean alternative, and let the client decide with full information. If they still insist, document the trade-off and set a "debt payment" sprint for Q+1.' },
    { q: 'Two days from a critical deadline, you discover a core feature is fundamentally broken. What do you do?', answer: 'Immediately surface it — never hide it hoping it fixes itself. Assess: can it be descoped for this release? Can a workaround ship? Communicate to PM with options and time estimates, not just "we have a problem." Propose a fallback (feature flag, limited rollout) so the launch isn\'t fully blocked.' },
    { q: 'You\'re asked to review a junior developer\'s PR and it has fundamental architectural problems. How do you give feedback?', answer: 'Assume positive intent. Start with what\'s good (1-2 genuine things). Explain the WHY behind each concern — don\'t just say "this is wrong," show the failure scenario. Offer a concrete suggestion. Invite discussion, don\'t mandate. The goal is the junior learning, not proving you\'re smarter.' },
    { q: 'Your team cannot agree on which framework to use for a new project and you\'re losing days. How do you move forward?', answer: 'Timeboxed spike: each advocate builds the same small feature in their preferred stack in 2 hours, then demos it. Evaluate on: team familiarity, hiring pool, performance, ecosystem. Then the tech lead makes a decision and documents it. Disagree-and-commit beats endless debate.' },
  ],
}

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
