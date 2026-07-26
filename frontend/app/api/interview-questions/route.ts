import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { questionBank, type QType, type InterviewQuestion } from '@/lib/sifu'

export const runtime = 'nodejs'

const SYSTEM = `You are SIFU, an interview coach for Malaysian Gen Z job seekers. Generate realistic interview questions tailored to the given role, company type, seniority and question type.

For each question also write a concise model answer (2-4 sentences) that a strong candidate would give — practical and specific, not generic filler. For Behavioral and Situational questions, the model answer should follow the STAR structure (Situation, Task, Action, Result). Make the questions feel real for the Malaysian job market where relevant.`

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    questions: {
      type: 'array',
      description: 'The generated interview questions.',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          q: { type: 'string', description: 'The interview question.' },
          answer: { type: 'string', description: 'A concise model answer.' },
        },
        required: ['q', 'answer'],
      },
    },
  },
  required: ['questions'],
} as const

const TYPES: QType[] = ['Technical', 'Behavioral', 'Situational']

export async function POST(req: NextRequest) {
  let body: { role?: string; company?: string; level?: string; questionType?: string; count?: number }
  try { body = await req.json() } catch { return Response.json({ error: 'Bad request' }, { status: 400 }) }

  const role = body.role || 'Software Engineer'
  const company = body.company || 'Startup'
  const level = body.level || 'Entry Level'
  const questionType: QType = TYPES.includes(body.questionType as QType) ? (body.questionType as QType) : 'Technical'
  const count = Math.min(6, Math.max(3, body.count ?? 5))

  const apiKey = process.env.ANTHROPIC_API_KEY
  const fallback = () => Response.json({ questions: questionBank[questionType], source: 'simulated' })

  if (!apiKey) return fallback()

  try {
    const client = new Anthropic({ apiKey })
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2048,
      system: SYSTEM,
      output_config: { format: { type: 'json_schema', schema } },
      messages: [{
        role: 'user',
        content:
          `Role: ${role}\nCompany type: ${company}\nSeniority: ${level}\nQuestion type: ${questionType}\n\n` +
          `Generate exactly ${count} ${questionType} interview questions, each with a model answer.`,
      }],
    } as Anthropic.MessageCreateParamsNonStreaming)

    const text = message.content.find((b): b is Anthropic.TextBlock => b.type === 'text')?.text ?? ''
    const parsed = JSON.parse(text) as { questions: InterviewQuestion[] }
    const questions = (parsed.questions ?? []).filter(q => q?.q && q?.answer).slice(0, count)
    if (!questions.length) return fallback()
    return Response.json({ questions, source: 'ai' })
  } catch (err) {
    console.error('[SIFU] question generation fell back to bank:', err)
    return fallback()
  }
}
