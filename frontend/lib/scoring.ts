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
