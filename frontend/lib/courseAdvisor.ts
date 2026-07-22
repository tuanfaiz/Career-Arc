// Course Advisor — for 16-18 year olds who don't know what to study yet.
// Answers "what should I study?" BEFORE they commit 4 years and RM40k to a course.
// Every course also carries a non-degree route, because ~65% of Gen Alpha say
// they don't intend to go to university.

import type { AnimalKey } from './animalTest'

export const INTERESTS = [
  'Building things',
  'Helping people',
  'Numbers & data',
  'Design & creativity',
  'Business & money',
  'Health & medicine',
  'Environment',
  'Media & storytelling',
  'Teaching others',
] as const

export const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Biology',
  'Chemistry',
  'ICT / Computing',
  'Art & Design',
  'Economics / Accounts',
  'Languages',
] as const

export type Interest = (typeof INTERESTS)[number]
export type Subject = (typeof SUBJECTS)[number]
export type Demand = 'hot' | 'stable' | 'cooling'

export interface Course {
  id: string
  name: string
  field: string
  interests: Interest[]
  subjects: Subject[]
  animals: AnimalKey[]
  careers: string[]
  demand: Demand
  startingSalary: string
  /** What the job market actually rewards in this field 5 years out. */
  durability: string
  /** The non-degree route to roughly the same careers. */
  skillsRoute: { label: string; detail: string; months: number }
}

export const demandMeta: Record<Demand, { label: string; color: string; bg: string; icon: string }> = {
  hot: { label: 'High demand', color: '#00b894', bg: '#f0faf8', icon: '🔥' },
  stable: { label: 'Stable', color: '#0984e3', bg: '#f0f7ff', icon: '⚖️' },
  cooling: { label: 'Cooling — be careful', color: '#f39c12', bg: '#fffaf0', icon: '⚠️' },
}

export const courses: Course[] = [
  {
    id: 'cs', name: 'Computer Science', field: 'ICT & Computing',
    interests: ['Building things', 'Numbers & data'],
    subjects: ['Mathematics', 'ICT / Computing', 'Physics'],
    animals: ['Owl', 'Lion', 'Fox'],
    careers: ['Software Engineer', 'Data Engineer', 'Security Analyst', 'AI Engineer'],
    demand: 'hot', startingSalary: 'RM 3,800 – 5,500',
    durability: 'AI writes code now, so raw coding matters less. What holds value: system design, debugging real production problems, and knowing what to build.',
    skillsRoute: { label: 'Software bootcamp + portfolio', detail: 'Employers in Malaysia increasingly hire on a GitHub portfolio and a technical test rather than the degree itself.', months: 9 },
  },
  {
    id: 'data', name: 'Data Science & Analytics', field: 'ICT & Computing',
    interests: ['Numbers & data', 'Business & money'],
    subjects: ['Mathematics', 'ICT / Computing', 'Economics / Accounts'],
    animals: ['Owl', 'Wolf'],
    careers: ['Data Analyst', 'BI Developer', 'Data Scientist', 'Risk Analyst'],
    demand: 'hot', startingSalary: 'RM 3,500 – 5,200',
    durability: 'Dashboard-building is being automated. The durable part is asking the right question and explaining the answer to non-technical people.',
    skillsRoute: { label: 'SQL + Power BI certification', detail: 'A strong SQL and Power BI/Tableau certificate plus 3 real projects can reach analyst roles without a degree.', months: 6 },
  },
  {
    id: 'nursing', name: 'Nursing & Allied Health', field: 'Health Sciences',
    interests: ['Helping people', 'Health & medicine'],
    subjects: ['Biology', 'Chemistry'],
    animals: ['Dolphin', 'Wolf'],
    careers: ['Registered Nurse', 'Physiotherapist', 'Medical Lab Technologist'],
    demand: 'hot', startingSalary: 'RM 2,800 – 4,200',
    durability: 'One of the hardest fields to automate — hands-on care plus human trust. Ageing population means demand keeps rising.',
    skillsRoute: { label: 'Diploma in Nursing', detail: 'A 3-year diploma reaches registered practice; you can top up to a degree later while already earning.', months: 36 },
  },
  {
    id: 'eng', name: 'Mechanical / Electrical Engineering', field: 'Engineering',
    interests: ['Building things', 'Environment'],
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    animals: ['Owl', 'Wolf', 'Lion'],
    careers: ['Design Engineer', 'Plant Engineer', 'Automation Engineer'],
    demand: 'stable', startingSalary: 'RM 3,000 – 4,500',
    durability: 'Physical infrastructure still needs humans. Pair it with automation/PLC or renewable-energy skills to stay ahead.',
    skillsRoute: { label: 'Technical diploma + certification', detail: 'A polytechnic diploma plus vendor certification (Siemens, Autodesk) reaches technician and junior engineer roles.', months: 30 },
  },
  {
    id: 'design', name: 'Design & User Experience', field: 'Design & Media',
    interests: ['Design & creativity', 'Building things', 'Media & storytelling'],
    subjects: ['Art & Design', 'ICT / Computing'],
    animals: ['Fox', 'Dolphin'],
    careers: ['UI/UX Designer', 'Product Designer', 'Brand Designer'],
    demand: 'stable', startingSalary: 'RM 3,000 – 4,500',
    durability: 'AI can generate visuals; it cannot decide what a confused user actually needs. Research and judgement are the safe part, pure execution is not.',
    skillsRoute: { label: 'UX certification + 3 case studies', detail: 'Design hires almost entirely on portfolio. A Google UX certificate plus 3 real case studies is often enough.', months: 6 },
  },
  {
    id: 'business', name: 'Business Administration', field: 'Business & Finance',
    interests: ['Business & money', 'Helping people'],
    subjects: ['Economics / Accounts', 'Mathematics', 'Languages'],
    animals: ['Lion', 'Dolphin'],
    careers: ['Business Analyst', 'Operations Executive', 'Marketing Executive'],
    demand: 'cooling', startingSalary: 'RM 2,800 – 4,000',
    durability: 'Very common degree, so graduates compete on volume. Only worth it if you pair it with a hard skill — data, finance, or a language.',
    skillsRoute: { label: 'Specialise instead', detail: 'Rather than a general business degree, a focused qualification (ACCA, digital marketing, supply-chain) competes far better.', months: 12 },
  },
  {
    id: 'accounting', name: 'Accounting & Finance', field: 'Business & Finance',
    interests: ['Numbers & data', 'Business & money'],
    subjects: ['Economics / Accounts', 'Mathematics'],
    animals: ['Wolf', 'Owl'],
    careers: ['Auditor', 'Financial Analyst', 'Tax Consultant'],
    demand: 'stable', startingSalary: 'RM 3,000 – 4,500',
    durability: 'Bookkeeping is automating fast; advisory, audit judgement and regulation are not. Chase the professional qualification, not just the degree.',
    skillsRoute: { label: 'ACCA / CAT professional route', detail: 'ACCA can be started right after SPM/STPM and is often valued above a generic finance degree.', months: 30 },
  },
  {
    id: 'psych', name: 'Psychology', field: 'Social Sciences',
    interests: ['Helping people', 'Teaching others'],
    subjects: ['Biology', 'Languages'],
    animals: ['Dolphin', 'Owl'],
    careers: ['HR Executive', 'Counsellor', 'UX Researcher', 'Clinical Psychologist'],
    demand: 'stable', startingSalary: 'RM 2,600 – 3,800',
    durability: 'Mental-health demand is rising, but clinical practice needs a masters. Without it, the strongest exits are HR and user research.',
    skillsRoute: { label: 'HR certification', detail: 'If counselling is not the goal, an HR or people-operations certificate reaches the same jobs faster.', months: 9 },
  },
  {
    id: 'education', name: 'Education & Teaching', field: 'Education',
    interests: ['Teaching others', 'Helping people'],
    subjects: ['Languages', 'Mathematics', 'Biology'],
    animals: ['Dolphin', 'Wolf'],
    careers: ['Teacher', 'Curriculum Developer', 'Corporate Trainer', 'EdTech Specialist'],
    demand: 'stable', startingSalary: 'RM 2,800 – 4,000',
    durability: 'Teaching content is being commoditised by AI; managing a classroom of real teenagers is not. Very high job security in the public sector.',
    skillsRoute: { label: 'TESL / training certificate', detail: 'A TESL or professional training certificate opens tuition, corporate training and EdTech without a full degree.', months: 12 },
  },
  {
    id: 'enviro', name: 'Environmental Science', field: 'Sciences',
    interests: ['Environment', 'Numbers & data', 'Helping people'],
    subjects: ['Biology', 'Chemistry', 'Mathematics'],
    animals: ['Owl', 'Fox'],
    careers: ['ESG Analyst', 'Sustainability Consultant', 'Environmental Officer'],
    demand: 'hot', startingSalary: 'RM 3,000 – 4,500',
    durability: 'ESG reporting is becoming mandatory for listed companies in Malaysia — this field is growing from near-zero and is under-supplied.',
    skillsRoute: { label: 'ESG reporting certification', detail: 'Sustainability reporting certificates are new enough that certified non-graduates are still being hired.', months: 8 },
  },
]

export interface CourseMatch {
  course: Course
  fitScore: number
  reasons: string[]
}

/**
 * Pure scoring function — same style as compatibility() in lib/scoring.ts.
 * Interests weigh most (what you enjoy), then subjects (what you're good at),
 * then work animal (how you like to work).
 */
export function matchCourses(
  interests: string[],
  subjects: string[],
  animal: AnimalKey | null,
): CourseMatch[] {
  return courses
    .map(course => {
      const hitInterests = course.interests.filter(i => interests.includes(i))
      const hitSubjects = course.subjects.filter(s => subjects.includes(s))
      const animalHit = animal ? course.animals.includes(animal) : false

      const interestScore = interests.length ? (hitInterests.length / Math.min(interests.length, course.interests.length)) * 55 : 0
      const subjectScore = subjects.length ? (hitSubjects.length / Math.min(subjects.length, course.subjects.length)) * 30 : 0
      const animalScore = animalHit ? 15 : 0

      const reasons: string[] = []
      if (hitInterests.length) reasons.push(`You picked ${hitInterests.map(i => `“${i.toLowerCase()}”`).join(' and ')}`)
      if (hitSubjects.length) reasons.push(`Builds on ${hitSubjects.join(', ')}`)
      if (animalHit && animal) reasons.push(`Suits a ${animal} work style`)
      if (course.demand === 'hot') reasons.push('Currently in high demand in Malaysia')

      return {
        course,
        fitScore: Math.min(100, Math.round(interestScore + subjectScore + animalScore)),
        reasons,
      }
    })
    .sort((a, b) => b.fitScore - a.fitScore)
}
