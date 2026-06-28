import {
  type Level, type CrsBreakdown, type Risk,
  computeCrs, riskOf, weakestComponent, CRS_LABELS,
} from './scoring'

// --- Onboarding level configuration -----------------------------------------

export type StepKey = 'level' | 'profile' | 'resume' | 'skills' | 'portfolio' | 'animal' | 'preference' | 'interview'

export interface LevelInfo {
  key: Level
  emoji: string
  label: string
  sub: string
  steps: StepKey[]              // which steps this level sees (after 'level')
  dashboardLead: 'jobs' | 'salary' | 'path'
  portfolioTarget: number      // # portfolio items expected
}

export const levels: LevelInfo[] = [
  { key: 'internship', emoji: '🎓', label: 'Internship Student', sub: 'Still studying, seeking internships',
    steps: ['profile', 'skills', 'portfolio', 'animal', 'preference'], dashboardLead: 'jobs', portfolioTarget: 1 },
  { key: 'fresh', emoji: '🚀', label: 'Fresh Graduate', sub: '0–1 years, looking for first role',
    steps: ['profile', 'resume', 'skills', 'portfolio', 'animal', 'preference', 'interview'], dashboardLead: 'jobs', portfolioTarget: 2 },
  { key: 'mid', emoji: '📈', label: 'Mid-Level', sub: '2–5 years, ready to level up',
    steps: ['profile', 'resume', 'skills', 'preference', 'interview'], dashboardLead: 'salary', portfolioTarget: 0 },
  { key: 'senior', emoji: '👑', label: 'Senior-Level', sub: '5+ years, evaluating moves',
    steps: ['profile', 'resume', 'skills', 'preference'], dashboardLead: 'path', portfolioTarget: 0 },
]

export const levelByKey: Record<Level, LevelInfo> = Object.fromEntries(levels.map(l => [l.key, l])) as Record<Level, LevelInfo>

export const SKILL_POOL = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Java', 'Go',
  'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'Figma', 'Tableau', 'Power BI',
  'Git', 'MongoDB', 'PostgreSQL', 'Agile', 'Communication', 'System Design',
]

// --- Candidate profile (shared by Candidate, Employer, University) -----------

export interface Candidate {
  id: string
  name: string
  initials: string
  level: Level
  programme: string
  university: string
  animal: string
  animalEmoji: string
  skills: string[]
  breakdown: CrsBreakdown
  applications: number
}

export interface ScoredCandidate extends Candidate {
  crs: number
  risk: Risk
  issue: string
  action: string
}

const ANIMALS: [string, string][] = [
  ['Lion', '🦁'], ['Owl', '🦉'], ['Dolphin', '🐬'], ['Fox', '🦊'], ['Wolf', '🐺'],
]

const ISSUE_BY_COMPONENT: Record<keyof CrsBreakdown, { issue: string; action: string }> = {
  resume: { issue: 'Weak resume structure', action: 'Resume clinic' },
  ats: { issue: 'Low ATS score', action: 'Resume clinic' },
  skillMatch: { issue: 'Skill gap vs target roles', action: 'Skill bootcamp' },
  portfolio: { issue: 'No / thin portfolio', action: 'Portfolio workshop' },
  activity: { issue: 'Very few applications', action: 'Career counselling' },
}

function mk(
  id: string, name: string, level: Level, programme: string,
  skills: string[], b: CrsBreakdown, applications: number, animalIdx: number,
): Candidate {
  return {
    id, name,
    initials: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
    level, programme, university: 'Universiti Putra Malaysia (UPM)',
    animal: ANIMALS[animalIdx][0], animalEmoji: ANIMALS[animalIdx][1],
    skills, breakdown: b, applications,
  }
}

const rawCandidates: Candidate[] = [
  mk('c1', 'Amirul Hakim', 'fresh', 'Computer Science', ['React', 'Node.js', 'Python', 'SQL', 'TypeScript'], { resume: 80, ats: 78, skillMatch: 74, portfolio: 60, activity: 65 }, 12, 0),
  mk('c2', 'Nurul Aina', 'fresh', 'Software Engineering', ['Java', 'Spring Boot', 'SQL', 'Git'], { resume: 70, ats: 66, skillMatch: 60, portfolio: 40, activity: 50 }, 6, 1),
  mk('c3', 'Fariz Azman', 'mid', 'Computer Science', ['Go', 'Kubernetes', 'AWS', 'PostgreSQL', 'System Design'], { resume: 88, ats: 84, skillMatch: 86, portfolio: 70, activity: 80 }, 9, 0),
  mk('c4', 'Sarah Tan', 'fresh', 'Information Systems', ['React', 'Figma', 'TypeScript'], { resume: 64, ats: 58, skillMatch: 55, portfolio: 35, activity: 40 }, 3, 2),
  mk('c5', 'Haziq Ibrahim', 'internship', 'Information Technology', ['Python', 'SQL'], { resume: 42, ats: 38, skillMatch: 36, portfolio: 10, activity: 20 }, 0, 4),
  mk('c6', 'Kavitha Raj', 'fresh', 'Data Science', ['Python', 'Tableau', 'SQL'], { resume: 72, ats: 70, skillMatch: 64, portfolio: 50, activity: 55 }, 7, 3),
  mk('c7', 'Lee Wei Jian', 'mid', 'Computer Science', ['Product Strategy', 'Agile', 'SQL', 'Figma'], { resume: 84, ats: 80, skillMatch: 78, portfolio: 60, activity: 75 }, 8, 2),
  mk('c8', 'Syafiqah Noor', 'internship', 'Business Analytics', ['Excel', 'SQL'], { resume: 38, ats: 34, skillMatch: 40, portfolio: 5, activity: 15 }, 0, 1),
  mk('c9', 'Tan Jia Xin', 'fresh', 'Computer Science', ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'], { resume: 82, ats: 86, skillMatch: 80, portfolio: 75, activity: 60 }, 10, 4),
  mk('c10', 'Daniel Wong', 'fresh', 'Software Engineering', ['Java', 'SQL'], { resume: 58, ats: 52, skillMatch: 48, portfolio: 30, activity: 35 }, 2, 0),
  mk('c11', 'Aisyah Rahman', 'internship', 'Design & Media', ['Figma', 'Adobe XD'], { resume: 44, ats: 40, skillMatch: 50, portfolio: 55, activity: 18 }, 1, 2),
  mk('c12', 'Rajesh Kumar', 'mid', 'Data Science', ['Python', 'TensorFlow', 'AWS', 'SQL'], { resume: 86, ats: 82, skillMatch: 84, portfolio: 68, activity: 70 }, 11, 1),
  mk('c13', 'Farah Lim', 'fresh', 'Information Systems', ['SQL', 'Power BI', 'Excel'], { resume: 66, ats: 60, skillMatch: 58, portfolio: 38, activity: 45 }, 4, 3),
  mk('c14', 'Iqbal Hassan', 'internship', 'Computer Science', ['Python', 'Git'], { resume: 40, ats: 36, skillMatch: 44, portfolio: 12, activity: 10 }, 0, 0),
  mk('c15', 'Chong Mei Ling', 'fresh', 'Software Engineering', ['React', 'Node.js', 'MongoDB', 'Express'], { resume: 76, ats: 74, skillMatch: 72, portfolio: 58, activity: 62 }, 8, 2),
  mk('c16', 'Adam Firdaus', 'senior', 'Computer Science', ['Go', 'AWS', 'System Design', 'Kubernetes', 'Microservices'], { resume: 92, ats: 88, skillMatch: 90, portfolio: 72, activity: 78 }, 5, 0),
  mk('c17', 'Priya Devi', 'fresh', 'Data Science', ['Python', 'SQL', 'Tableau', 'Power BI'], { resume: 70, ats: 68, skillMatch: 66, portfolio: 48, activity: 52 }, 6, 3),
  mk('c18', 'Hafiz Zulkifli', 'internship', 'Information Technology', ['HTML', 'CSS'], { resume: 36, ats: 30, skillMatch: 34, portfolio: 8, activity: 12 }, 0, 4),
  mk('c19', 'Wong Kai Le', 'fresh', 'Computer Science', ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'], { resume: 84, ats: 82, skillMatch: 82, portfolio: 66, activity: 68 }, 9, 1),
  mk('c20', 'Nabila Yusof', 'mid', 'Business Analytics', ['SQL', 'Power BI', 'Tableau', 'Communication'], { resume: 80, ats: 76, skillMatch: 74, portfolio: 55, activity: 72 }, 7, 2),
  mk('c21', 'Sufian Malik', 'fresh', 'Software Engineering', ['Java', 'Spring Boot', 'SQL', 'Docker'], { resume: 68, ats: 64, skillMatch: 62, portfolio: 42, activity: 48 }, 5, 0),
  mk('c22', 'Elaine Goh', 'internship', 'Design & Media', ['Figma', 'Prototyping'], { resume: 46, ats: 42, skillMatch: 52, portfolio: 48, activity: 22 }, 1, 3),
  mk('c23', 'Zikri Anuar', 'fresh', 'Computer Science', ['Python', 'TensorFlow', 'SQL'], { resume: 74, ats: 72, skillMatch: 70, portfolio: 52, activity: 58 }, 7, 4),
  mk('c24', 'Michelle Lai', 'senior', 'Information Systems', ['Product Strategy', 'SQL', 'Agile', 'Communication'], { resume: 90, ats: 86, skillMatch: 80, portfolio: 60, activity: 76 }, 4, 2),
]

export const candidates: ScoredCandidate[] = rawCandidates.map(c => {
  const crs = computeCrs(c.breakdown)
  const weak = weakestComponent(c.breakdown)
  const meta = ISSUE_BY_COMPONENT[weak]
  return { ...c, crs, risk: riskOf(crs), issue: meta.issue, action: meta.action }
})

// --- Default candidate profile (used when onboarding hasn't been completed) --

export const defaultProfile = {
  name: 'Amirul Hakim',
  level: 'fresh' as Level,
  programme: 'Computer Science',
  university: 'Universiti Putra Malaysia (UPM)',
  skills: ['React', 'Node.js', 'Python', 'SQL', 'TypeScript', 'Git'],
  breakdown: { resume: 78, ats: 78, skillMatch: 70, portfolio: 45, activity: 50 } as CrsBreakdown,
}

// --- University cohort (derived from the SAME candidates) --------------------

export const cohort = (() => {
  const n = candidates.length
  const avg = (f: (c: ScoredCandidate) => number) => Math.round(candidates.reduce((s, c) => s + f(c), 0) / n)
  return {
    count: n,
    avgCrs: avg(c => c.crs),
    atRisk: candidates.filter(c => c.risk === 'high').length,
    mediumRisk: candidates.filter(c => c.risk === 'medium').length,
    avgAts: avg(c => c.breakdown.ats),
    portfolioCompletion: avg(c => c.breakdown.portfolio),
    activity: avg(c => c.breakdown.activity),
  }
})()

export const programmesSummary = (() => {
  const groups: Record<string, ScoredCandidate[]> = {}
  candidates.forEach(c => { (groups[c.programme] ||= []).push(c) })
  return Object.entries(groups).map(([name, list]) => ({
    name,
    students: list.length,
    avgCrs: Math.round(list.reduce((s, c) => s + c.crs, 0) / list.length),
    riskCount: list.filter(c => c.risk === 'high').length,
  })).sort((a, b) => a.avgCrs - b.avgCrs)
})()

// --- Faculty skill gaps ------------------------------------------------------

export interface SkillGap {
  skill: string
  targetRoles: string[]
  affected: number
  intervention: string
  uplift: number
}

export const skillGaps: SkillGap[] = [
  { skill: 'Cloud (AWS/GCP)', targetRoles: ['Backend Engineer', 'DevOps', 'ML Engineer'], affected: 230, intervention: 'Cloud Practitioner bootcamp', uplift: 8 },
  { skill: 'SQL & Data Modelling', targetRoles: ['Data Analyst', 'BI Developer'], affected: 184, intervention: 'SQL clinic (3 sessions)', uplift: 7 },
  { skill: 'Power BI / Tableau', targetRoles: ['Data Analyst', 'Business Analyst'], affected: 156, intervention: 'Power BI clinic + employer case study', uplift: 6 },
  { skill: 'System Design', targetRoles: ['Senior Engineer', 'Tech Lead'], affected: 98, intervention: 'System design workshop', uplift: 9 },
  { skill: 'Communication & Interview', targetRoles: ['All roles'], affected: 312, intervention: 'Mock interview + communication workshop', uplift: 5 },
]

// --- Job detail enrichment (keyed by mockJobs id) ---------------------------

export interface JobDetail {
  level: Level
  workArrangement: string
  scope: string
  responsibilities: string[]
  niceToHave: string[]
}

export const jobDetails: Record<string, JobDetail> = {
  '1': { level: 'fresh', workArrangement: 'On-site', scope: 'Build and maintain enterprise web applications for Petronas digital transformation initiatives.', responsibilities: ['Develop features across the React + Node.js stack', 'Write tested, reviewable code', 'Collaborate with senior engineers on architecture'], niceToHave: ['AWS', 'Docker'] },
  '2': { level: 'fresh', workArrangement: 'Remote', scope: 'Work across the full stack on systems serving millions of Grab users daily.', responsibilities: ['Ship features end-to-end', 'Own services in production', 'Participate in on-call rotation'], niceToHave: ['Kubernetes', 'Go'] },
  '3': { level: 'fresh', workArrangement: 'Hybrid', scope: 'Modernise CIMB core banking systems and digital channels.', responsibilities: ['Develop Java/Spring Boot services', 'Integrate with Oracle databases', 'Support digital banking releases'], niceToHave: ['Microservices', 'Kafka'] },
  '4': { level: 'fresh', workArrangement: 'Remote', scope: 'Build performant UIs for AirAsia digital travel products.', responsibilities: ['Implement responsive React/Next.js interfaces', 'Partner with designers on UX', 'Optimise web performance'], niceToHave: ['Tailwind CSS', 'Testing'] },
  '5': { level: 'fresh', workArrangement: 'On-site', scope: 'Analyse gig-platform data to grow GoGet’s on-demand workforce.', responsibilities: ['Build dashboards and reports', 'Run SQL analyses', 'Present insights to stakeholders'], niceToHave: ['Tableau', 'Python'] },
  '6': { level: 'mid', workArrangement: 'On-site', scope: 'Engineer payment infrastructure powering millions of transactions.', responsibilities: ['Design Go microservices', 'Optimise Kafka/Redis pipelines', 'Ensure reliability at scale'], niceToHave: ['System Design', 'Observability'] },
  '7': { level: 'mid', workArrangement: 'Hybrid', scope: 'Lead product development for Axiata digital services across SEA.', responsibilities: ['Own product roadmap', 'Run discovery and define specs', 'Work with engineering and design'], niceToHave: ['SQL', 'Analytics'] },
  '8': { level: 'mid', workArrangement: 'Remote', scope: 'Build and maintain infrastructure powering the Maxis network.', responsibilities: ['Manage AWS infrastructure as code', 'Run CI/CD pipelines', 'Improve deployment reliability'], niceToHave: ['Terraform', 'Kubernetes'] },
  '9': { level: 'fresh', workArrangement: 'On-site', scope: 'Design intuitive experiences for Shopee shoppers.', responsibilities: ['Run user research', 'Produce wireframes and prototypes', 'Partner with engineers on delivery'], niceToHave: ['Design systems', 'Prototyping'] },
  '10': { level: 'mid', workArrangement: 'Remote', scope: 'Build ML models and pipelines for enterprise clients across ASEAN.', responsibilities: ['Develop and deploy ML models', 'Build MLOps pipelines', 'Collaborate with data engineers'], niceToHave: ['MLOps', 'PyTorch'] },
}

// --- Simulated AI text -------------------------------------------------------

const TARGET = 90

export function nextActionText(b: CrsBreakdown): string {
  const weak = weakestComponent(b)
  const gain = Math.round(((TARGET - b[weak]) * (weak === 'portfolio' ? 0.15 : weak === 'activity' ? 0.10 : 0.25)))
  const moves: Record<keyof CrsBreakdown, string> = {
    resume: 'Run your resume through the builder to fix structure and formatting',
    ats: 'Add the missing keywords flagged by the ATS Scanner',
    skillMatch: 'Pick up one in-demand skill (Cloud or SQL) to close your biggest gap',
    portfolio: 'Add one portfolio project with measurable impact',
    activity: 'Apply to 3 of your high-match jobs this week',
  }
  return `Your fastest win: ${moves[weak].toLowerCase()}. That single step could raise your readiness by about ${gain} points and unlock more recommended jobs.`
}

export function whyRecommendation(c: ScoredCandidate): string {
  const weak = weakestComponent(c.breakdown)
  return `${c.name.split(' ')[0]}’s readiness is dragged down most by ${CRS_LABELS[weak]} (${c.breakdown[weak]}/100). A ${c.action.toLowerCase()} targets that weakest component directly — the highest-leverage intervention for this student.`
}

export function universityInsight(): string {
  const worst = programmesSummary[0]
  return `${cohort.atRisk} students are at high risk this cohort. ${worst.name} needs the most support (avg readiness ${worst.avgCrs}, ${worst.riskCount} high-risk). Running a targeted portfolio + resume clinic for this group could lift cohort readiness by an estimated 6–8 points.`
}

export function jobVerdictText(verdict: 'strong' | 'close' | 'stretch', missing: string[]): string {
  if (verdict === 'strong') return 'Strong match. Your core skills map directly to this role’s stack. Apply now — and lead with a portfolio project that shows measurable impact.'
  if (verdict === 'close') return `Good fit with one gap. You meet most requirements but they want ${missing.slice(0, 2).join(' and ') || 'one more skill'}. Apply, and start a short module on it — closing this lifts your match toward ~90%.`
  return `Stretch role. You’re a few skills short for this level (${missing.slice(0, 3).join(', ')}). Worth applying only if you can show fast-learning evidence; otherwise target closer-match roles first.`
}
