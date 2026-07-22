// My Story Video — a guided 60-second candidate video.
// The one place a candidate stops being a score and becomes a person.

export const MAX_SECONDS = 60

export interface StoryPrompt {
  n: number
  title: string
  hint: string
  /** When this prompt becomes the active one during recording (teleprompter). */
  startSec: number
}

export const STORY_PROMPTS: StoryPrompt[] = [
  { n: 1, title: 'Who are you?', hint: 'Your current stage and what has shaped your interest.', startSec: 0 },
  { n: 2, title: 'What problem interests you?', hint: 'Focus on an issue, not only a job title.', startSec: 15 },
  { n: 3, title: 'What are you doing about it?', hint: 'Share one project, skill or experience.', startSec: 30 },
  { n: 4, title: 'What opportunity are you seeking?', hint: 'Tell viewers how they can help you grow.', startSec: 45 },
]

export function activePromptIndex(elapsedSec: number): number {
  let idx = 0
  STORY_PROMPTS.forEach((p, i) => { if (elapsedSec >= p.startSec) idx = i })
  return idx
}

export interface StoryVideoMeta {
  recordedAt: string
  durationSec: number
  mode: 'real' | 'simulated'
  shareWithEmployers: boolean
  shareWithUniversities: boolean
}

const KEY = 'storyVideo'

export function readStoryVideo(): StoryVideoMeta | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as StoryVideoMeta) : null
  } catch { return null }
}

export function saveStoryVideo(meta: StoryVideoMeta): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(meta))
}

export function clearStoryVideo(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}

export function hasStoryVideo(): boolean {
  return readStoryVideo() !== null
}

// --- Session-scoped blob -----------------------------------------------------
// Blob URLs cannot be serialised to localStorage, so the actual recording lives
// in a module-level variable. It survives client-side navigation (candidate →
// employer role switch, which is what the demo needs) but not a hard reload,
// where consumers fall back to the placeholder player.

let sessionBlobUrl: string | null = null

export function setSessionBlobUrl(url: string | null): void {
  if (sessionBlobUrl && sessionBlobUrl !== url) URL.revokeObjectURL(sessionBlobUrl)
  sessionBlobUrl = url
}

export function getSessionBlobUrl(): string | null {
  return sessionBlobUrl
}

export function formatClock(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
