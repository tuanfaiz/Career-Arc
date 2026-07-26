import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { heuristicFeedback, type SifuFeedback } from '@/lib/sifu'

// The Anthropic Node SDK needs the Node.js runtime (not edge).
export const runtime = 'nodejs'

const SYSTEM = `You are SIFU (Smart Interview Feedback & Upskilling), an interview coach for Malaysian Gen Z job seekers. You evaluate a candidate's spoken-style answer to an interview question.

Be encouraging but honest — never inflate the score. Be specific to what the candidate actually wrote: reference their words, don't give generic advice. Keep every strength and improvement to one clear sentence.

For Behavioral and Situational questions, judge STAR coverage: Situation, Task, Action, Result. For Technical questions, judge correctness, depth, and clarity (STAR flags may all be false).`

// Structured-output schema. Note: JSON-schema numeric/length constraints are
// not enforced by the API, so ranges are described in the prompt/description.
const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    score: { type: 'integer', description: 'Overall answer quality from 0 to 100.' },
    verdict: { type: 'string', enum: ['strong', 'solid', 'needs-work'] },
    summary: { type: 'string', description: 'One or two sentences summarising the answer.' },
    strengths: { type: 'array', items: { type: 'string' }, description: '2-3 specific strengths.' },
    improvements: { type: 'array', items: { type: 'string' }, description: '2-3 concrete improvements.' },
    star: {
      type: 'object',
      additionalProperties: false,
      properties: {
        situation: { type: 'boolean' },
        task: { type: 'boolean' },
        action: { type: 'boolean' },
        result: { type: 'boolean' },
      },
      required: ['situation', 'task', 'action', 'result'],
    },
  },
  required: ['score', 'verdict', 'summary', 'strengths', 'improvements', 'star'],
} as const

export async function POST(req: NextRequest) {
  let body: { question?: string; answer?: string; role?: string; level?: string; questionType?: string }
  try { body = await req.json() } catch { return Response.json({ error: 'Bad request' }, { status: 400 }) }

  const { question = '', answer = '', role = '', level = '', questionType = '' } = body
  if (answer.trim().length < 10) {
    return Response.json({ error: 'Answer too short to evaluate.' }, { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  const fallback = (): SifuFeedback => ({ ...heuristicFeedback(answer, questionType), source: 'simulated' })

  // No key configured → graceful simulated evaluation (demo still works).
  if (!apiKey) return Response.json(fallback())

  try {
    const client = new Anthropic({ apiKey })
    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: SYSTEM,
      // effort:low keeps it fast for a live demo; format guarantees valid JSON.
      output_config: { effort: 'low', format: { type: 'json_schema', schema } },
      messages: [{
        role: 'user',
        content:
          `Role: ${role || 'n/a'} · Level: ${level || 'n/a'} · Question type: ${questionType || 'n/a'}\n\n` +
          `Interview question:\n${question}\n\n` +
          `Candidate's answer:\n${answer}`,
      }],
    } as Anthropic.MessageCreateParamsNonStreaming)

    const text = message.content.find((b): b is Anthropic.TextBlock => b.type === 'text')?.text ?? ''
    const parsed = JSON.parse(text) as Omit<SifuFeedback, 'source'>
    return Response.json({ ...parsed, source: 'ai' } satisfies SifuFeedback)
  } catch (err) {
    // Any failure (bad key, rate limit, network, refusal) → never break the demo.
    console.error('[SIFU] evaluation fell back to simulated:', err)
    return Response.json(fallback())
  }
}
