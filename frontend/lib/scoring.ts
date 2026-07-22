// Career Readiness Score (CRS) — the single source of truth for the whole platform.
// The same number is shown to the candidate (readiness), employer (hiring signal),
// and university (risk flag).

export type Level = 'internship' | 'fresh' | 'mid' | 'senior'
export type Risk = 'high' | 'medium' | 'low'

export interface CrsBreakdown {
  resume: number      // 0-100
  ats: number         // 0-100
  skillMatch: number  // 0-100
  portfolio: number   // 0-100
  activity: number    // 0-100 (application activity)
}

export const CRS_WEIGHTS = {
  resume: 0.25,
  ats: 0.25,
  skillMatch: 0.25,
  portfolio: 0.15,
  activity: 0.10,
} as const

export const CRS_LABELS: Record<keyof CrsBreakdown, string> = {
  resume: 'Resume',
  ats: 'ATS Score',
  skillMatch: 'Skill Match',
  portfolio: 'Portfolio',
  activity: 'Application Activity',
}

export function computeCrs(b: CrsBreakdown): number {
  const raw =
    b.resume * CRS_WEIGHTS.resume +
    b.ats * CRS_WEIGHTS.ats +
    b.skillMatch * CRS_WEIGHTS.skillMatch +
    b.portfolio * CRS_WEIGHTS.portfolio +
    b.activity * CRS_WEIGHTS.activity
  return Math.round(raw)
}

export function riskOf(crs: number): Risk {
  if (crs < 50) return 'high'
  if (crs < 70) return 'medium'
  return 'low'
}

export const riskMeta: Record<Risk, { label: string; color: string; bg: string }> = {
  high: { label: 'High Risk', color: '#ff4757', bg: '#fff0f1' },
  medium: { label: 'Medium Risk', color: '#f39c12', bg: '#fffaf0' },
  low: { label: 'Low Risk', color: '#00b894', bg: '#f0faf8' },
}

// Returns the weakest CRS component — drives the "what to fix next" logic everywhere.
export function weakestComponent(b: CrsBreakdown): keyof CrsBreakdown {
  return (Object.keys(b) as (keyof CrsBreakdown)[]).reduce((min, k) => (b[k] < b[min] ? k : min), 'resume')
}

// --- Job compatibility -------------------------------------------------------

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9+#]/g, '')
}

export interface Compatibility {
  score: number
  have: string[]
  missing: string[]
}

// Pure function: candidate skills ∩ job required skills.
export function compatibility(candidateSkills: string[], jobSkills: string[]): Compatibility {
  const owned = candidateSkills.map(norm)
  const have: string[] = []
  const missing: string[] = []
  jobSkills.forEach(js => {
    const n = norm(js)
    const matched = owned.some(o => o === n || o.includes(n) || n.includes(o))
    if (matched) have.push(js)
    else missing.push(js)
  })
  const score = jobSkills.length ? Math.round((have.length / jobSkills.length) * 100) : 0
  return { score, have, missing }
}

// --- Candidate–Job Match Score ----------------------------------------------
// Different question from CRS. CRS asks "is this person job-ready at all?"
// (candidate only). This asks "does this person fit THIS role?" (candidate + job).
// Employers see both: readiness, then fit.

export const MATCH_WEIGHTS = {
  skills: 0.35,
  experience: 0.25,
  responsibilities: 0.15,
  tools: 0.10,
  education: 0.10,
  industry: 0.05,
} as const

export type MatchKey = keyof typeof MATCH_WEIGHTS

export const MATCH_LABELS: Record<MatchKey, string> = {
  skills: 'Required skills',
  experience: 'Relevant experience',
  responsibilities: 'Role similarity',
  tools: 'Tools & technologies',
  education: 'Education & certifications',
  industry: 'Industry knowledge',
}

export interface MatchCandidate {
  skills: string[]
  level: Level
  programme?: string
  prefRole?: string | null
}

export interface MatchJob {
  title: string
  skills: string[]
  level: Level
  industry: string
  responsibilities?: string[]
  niceToHave?: string[]
  education?: string[]
  roleFamily?: string
}

export interface MatchDimension {
  key: MatchKey
  label: string
  weight: number
  score: number
  detail: string
}

export interface MatchResult {
  score: number
  dimensions: MatchDimension[]
  matchedSkills: string[]
  missingSkills: string[]
}

const LEVEL_ORDER: Level[] = ['internship', 'fresh', 'mid', 'senior']

/** Programme → industries that programme naturally prepares you for. */
const industryAffinity: Record<string, string[]> = {
  'Computer Science': ['Tech / Ride-Hailing', 'AI & Big Data', 'Fintech', 'E-Commerce', 'Aviation Tech', 'Oil & Gas Tech', 'Telecommunications'],
  'Software Engineering': ['Tech / Ride-Hailing', 'Fintech', 'E-Commerce', 'Telecommunications', 'Aviation Tech'],
  'Data Science': ['AI & Big Data', 'Banking & Finance', 'Gig Economy', 'E-Commerce'],
  'Information Systems': ['Banking & Finance', 'Telecommunications', 'E-Commerce'],
  'Information Technology': ['Telecommunications', 'Tech / Ride-Hailing', 'Oil & Gas Tech'],
  'Business Analytics': ['Banking & Finance', 'Gig Economy', 'E-Commerce'],
  'Design & Media': ['E-Commerce', 'Tech / Ride-Hailing'],
}

/** Words that signal the kind of work a role involves. */
function tokens(s: string): string[] {
  return s.toLowerCase().split(/[^a-z0-9+#]+/).filter(w => w.length > 3)
}

export function matchScore(candidate: MatchCandidate, job: MatchJob): MatchResult {
  // 1. Required skills (35%)
  const skillComp = compatibility(candidate.skills, job.skills)

  // 2. Relevant experience (25%) — how far apart are the levels?
  const distance = Math.abs(LEVEL_ORDER.indexOf(candidate.level) - LEVEL_ORDER.indexOf(job.level))
  const expScore = distance === 0 ? 100 : distance === 1 ? 60 : distance === 2 ? 25 : 10
  const expDetail = distance === 0
    ? 'Your level matches the role exactly'
    : distance === 1 ? 'One level apart — reachable stretch'
    : 'Significant level gap for this role'

  // 3. Responsibilities / role similarity (15%)
  const jobWords = new Set([...tokens(job.title), ...(job.responsibilities ?? []).flatMap(tokens)])
  const mine = new Set([
    ...tokens(candidate.prefRole ?? ''),
    ...tokens(candidate.programme ?? ''),
    ...candidate.skills.flatMap(tokens),
  ])
  const shared = [...mine].filter(w => jobWords.has(w))
  const respScore = Math.min(100, 35 + shared.length * 18)
  const respDetail = shared.length
    ? `Overlaps on ${shared.slice(0, 3).join(', ')}`
    : 'Little overlap with your stated role interest'

  // 4. Tools & technologies (10%)
  const tools = job.niceToHave ?? []
  const toolComp = compatibility(candidate.skills, tools)
  const toolScore = tools.length ? toolComp.score : 70 // no tools listed = neutral
  const toolDetail = tools.length
    ? `${toolComp.have.length} of ${tools.length} preferred tools`
    : 'No specific tools required'

  // 5. Education & certifications (10%)
  const accepted = job.education ?? []
  const eduMatch = candidate.programme && accepted.some(e => e.toLowerCase() === candidate.programme!.toLowerCase())
  const eduRelated = candidate.programme && accepted.some(e =>
    tokens(e).some(t => tokens(candidate.programme!).includes(t)))
  const eduScore = eduMatch ? 100 : eduRelated ? 65 : accepted.length ? 35 : 70
  const eduDetail = eduMatch ? `${candidate.programme} is a preferred field`
    : eduRelated ? 'Related field of study'
    : accepted.length ? `Prefers ${accepted[0]}` : 'No specific requirement'

  // 6. Industry knowledge (5%)
  const affinity = industryAffinity[candidate.programme ?? ''] ?? []
  const indScore = affinity.includes(job.industry) ? 100 : 40
  const indDetail = affinity.includes(job.industry)
    ? `${job.industry} aligns with your background`
    : `Limited exposure to ${job.industry}`

  const dimensions: MatchDimension[] = [
    { key: 'skills', label: MATCH_LABELS.skills, weight: MATCH_WEIGHTS.skills, score: skillComp.score, detail: `${skillComp.have.length} of ${job.skills.length} required skills` },
    { key: 'experience', label: MATCH_LABELS.experience, weight: MATCH_WEIGHTS.experience, score: expScore, detail: expDetail },
    { key: 'responsibilities', label: MATCH_LABELS.responsibilities, weight: MATCH_WEIGHTS.responsibilities, score: respScore, detail: respDetail },
    { key: 'tools', label: MATCH_LABELS.tools, weight: MATCH_WEIGHTS.tools, score: toolScore, detail: toolDetail },
    { key: 'education', label: MATCH_LABELS.education, weight: MATCH_WEIGHTS.education, score: eduScore, detail: eduDetail },
    { key: 'industry', label: MATCH_LABELS.industry, weight: MATCH_WEIGHTS.industry, score: indScore, detail: indDetail },
  ]

  const score = Math.round(dimensions.reduce((sum, d) => sum + d.score * d.weight, 0))

  // A skill can be both required and a "nice to have" tool — dedupe so it is
  // never listed twice as a gap.
  const missingSkills = Array.from(new Set([...skillComp.missing, ...toolComp.missing]))

  return { score, dimensions, matchedSkills: skillComp.have, missingSkills }
}

export type ApplyVerdict = 'strong' | 'close' | 'stretch'

export function verdictOf(score: number): ApplyVerdict {
  if (score >= 85) return 'strong'
  if (score >= 60) return 'close'
  return 'stretch'
}

export const verdictMeta: Record<ApplyVerdict, { label: string; color: string; bg: string }> = {
  strong: { label: 'Strong apply', color: '#00b894', bg: '#f0faf8' },
  close: { label: 'Apply — close 1 gap', color: '#f39c12', bg: '#fffaf0' },
  stretch: { label: 'Stretch role', color: '#ff4757', bg: '#fff0f1' },
}
