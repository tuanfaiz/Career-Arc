// Candidate application tracking (localStorage-backed for the prototype).

export interface MyApplication {
  jobId: string
  appliedDate: string
  status: 'Submitted'
}

const KEY = 'myApplications'

export function readMyApplications(): MyApplication[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}

export function hasApplied(jobId: string): boolean {
  return readMyApplications().some(a => a.jobId === jobId)
}

export function addApplication(jobId: string): void {
  const apps = readMyApplications()
  if (apps.some(a => a.jobId === jobId)) return
  const appliedDate = new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })
  apps.push({ jobId, appliedDate, status: 'Submitted' })
  localStorage.setItem(KEY, JSON.stringify(apps))
}
