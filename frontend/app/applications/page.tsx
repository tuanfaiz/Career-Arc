'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import { mockJobs, mockApplications } from '@/lib/mockData'
import { readMyApplications } from '@/lib/applications'
import { Send, Check, Search, ArrowRight, Video } from 'lucide-react'

const STAGES = ['Applied', 'Under Review', 'Interview', 'Offer']

interface Row {
  id: string
  jobId?: string
  jobTitle: string
  company: string
  logo: string
  logoColor: string
  appliedDate: string
  stage: number          // 0..3 index into STAGES
  stalled: boolean
  statusLabel: string
  nextStep: string
  antiGhost: string
  antiGhostLabel: string
  withVideo?: boolean
}

// Map seeded mock statuses onto the 4-stage pipeline.
const seededStage: Record<string, { stage: number; stalled?: boolean }> = {
  'Interview Scheduled': { stage: 2 },
  'Under Review': { stage: 1 },
  'Assessment Sent': { stage: 1 },
  'No Response': { stage: 1, stalled: true },
  'Offer Received': { stage: 3 },
}

const logoByCompany: Record<string, { logo: string; logoColor: string }> =
  Object.fromEntries(mockJobs.map(j => [j.company, { logo: j.logo, logoColor: j.logoColor }]))

export default function ApplicationsPage() {
  const [mine, setMine] = useState<Row[]>([])

  useEffect(() => {
    const rows: Row[] = readMyApplications().flatMap(a => {
      const job = mockJobs.find(j => j.id === a.jobId)
      if (!job) return []
      return [{
        id: `mine-${a.jobId}`, jobId: a.jobId, jobTitle: job.title, company: job.company,
        logo: job.logo, logoColor: job.logoColor, appliedDate: a.appliedDate,
        stage: 0, stalled: false, statusLabel: 'Submitted',
        nextStep: 'Awaiting HR screening — most employers here respond within a week.',
        antiGhost: job.antiGhost, antiGhostLabel: job.antiGhostLabel,
        withVideo: a.withVideo,
      }]
    })
    setMine(rows.reverse()) // newest first
  }, [])

  const seeded: Row[] = mockApplications.map(a => {
    const s = seededStage[a.status] ?? { stage: 0 }
    const lg = logoByCompany[a.company] ?? { logo: a.company.slice(0, 2).toUpperCase(), logoColor: '#4a5568' }
    return {
      id: `seed-${a.id}`, jobTitle: a.jobTitle, company: a.company,
      logo: lg.logo, logoColor: lg.logoColor, appliedDate: a.appliedDate,
      stage: s.stage, stalled: !!s.stalled, statusLabel: a.status,
      nextStep: a.nextStep, antiGhost: a.antiGhost, antiGhostLabel: a.antiGhostLabel,
    }
  })

  const rows = [...mine, ...seeded]
  const ghostDot: Record<string, string> = { green: '#00b894', yellow: '#fdcb6e', red: '#ff4757' }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: '#2d3436' }}>My Applications</h2>
          <p className="text-sm" style={{ color: '#4a5568' }}>{rows.length} applications · track every stage from submission to offer</p>
        </div>

        {rows.length === 0 ? (
          <div className="card-screw rounded-2xl p-12 text-center" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <Send className="w-10 h-10 mx-auto mb-3" style={{ color: '#babecc' }} />
            <p className="font-bold mb-1" style={{ color: '#2d3436' }}>No applications yet</p>
            <p className="text-sm mb-5" style={{ color: '#4a5568' }}>Apply to a job and it will show up here with live status tracking.</p>
            <Link href="/jobs" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white btn-press" style={{ background: '#ff4757', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
              <Search className="w-4 h-4" /> Browse jobs
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {rows.map(r => {
              const activeColor = r.stalled ? '#f39c12' : r.stage === 3 ? '#6c5ce7' : '#00b894'
              return (
                <div key={r.id} className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
                  <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold font-mono text-sm flex-shrink-0" style={{ background: r.logoColor, boxShadow: '3px 3px 6px rgba(0,0,0,0.15)' }}>{r.logo}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold" style={{ color: '#2d3436' }}>{r.jobTitle}</h3>
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold" style={{ background: `${activeColor}18`, color: activeColor }}>{r.statusLabel}</span>
                        {r.withVideo && (
                          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold" style={{ background: '#ff475718', color: '#ff4757' }}>
                            <Video className="w-3 h-3" /> Story video
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs font-mono flex-wrap" style={{ color: '#4a5568' }}>
                        <span>{r.company}</span>
                        <span>Applied {r.appliedDate}</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: ghostDot[r.antiGhost] }} />{r.antiGhostLabel}</span>
                      </div>
                    </div>
                    {r.jobId && (
                      <Link href={`/jobs/${r.jobId}`} className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 flex-shrink-0" style={{ color: '#4a5568' }}>
                        View job <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>

                  {/* Status stepper */}
                  <div className="mt-5 flex items-center">
                    {STAGES.map((stage, i) => {
                      const reached = i <= r.stage
                      const isCurrent = i === r.stage
                      const color = reached ? activeColor : '#babecc'
                      return (
                        <div key={stage} className={`flex items-center ${i < STAGES.length - 1 ? 'flex-1' : ''}`}>
                          <div className="flex flex-col items-center">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                              style={{
                                background: reached ? color : '#e0e5ec',
                                boxShadow: reached ? `0 0 8px ${color}66` : 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff',
                              }}>
                              {reached ? <Check className="w-3.5 h-3.5 text-white" /> : <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#babecc' }} />}
                            </div>
                            <span className="text-xs mt-1.5 font-medium whitespace-nowrap" style={{ color: isCurrent ? color : '#4a5568', fontWeight: isCurrent ? 700 : 500 }}>{stage}</span>
                          </div>
                          {i < STAGES.length - 1 && (
                            <div className="flex-1 h-0.5 mx-2 mb-5 rounded-full" style={{ background: i < r.stage ? color : '#d1d9e6' }} />
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Next step */}
                  <div className="mt-4 px-4 py-3 rounded-xl text-xs" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff', color: '#4a5568' }}>
                    <strong style={{ color: '#2d3436' }}>Next step:</strong> {r.nextStep}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
