'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { candidates, resumeFor, levelByKey } from '@/lib/careerData'
import { animals, type AnimalKey } from '@/lib/animalTest'
import { riskMeta, CRS_LABELS, type CrsBreakdown } from '@/lib/scoring'
import {
  ArrowLeft, Mail, GraduationCap, CheckSquare, CalendarClock, Download, Check,
} from 'lucide-react'

export default function ApplicantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const c = candidates.find(x => x.id === id)
  if (!c) notFound()

  const [action, setAction] = useState<string | null>(null)
  const [downloaded, setDownloaded] = useState(false)

  const rm = riskMeta[c.risk]
  const animal = animals[c.animal as AnimalKey]
  const resume = resumeFor(c)

  function mockDownload() { setDownloaded(true); setTimeout(() => setDownloaded(false), 2500) }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/employer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#4a5568' }}>
          <ArrowLeft className="w-4 h-4" /> All applicants
        </Link>

        {/* Header */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold font-mono text-lg flex-shrink-0" style={{ background: rm.color, boxShadow: '4px 4px 10px rgba(0,0,0,0.15)' }}>{c.initials}</div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-black" style={{ color: '#2d3436' }}>{c.name}</h2>
              <p className="text-sm mt-0.5" style={{ color: '#4a5568' }}>{c.programme} · {c.university}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: `${animal?.color ?? '#8A6D1F'}18`, color: animal?.color ?? '#8A6D1F', border: `1px solid ${animal?.color ?? '#8A6D1F'}33` }}>{c.animalEmoji} {c.animal}</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757' }}>{levelByKey[c.level].label}</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: rm.bg, color: rm.color }}>{rm.label}</span>
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="text-4xl font-black font-mono" style={{ color: rm.color }}>{c.crs}</div>
              <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: '#4a5568' }}>Readiness</div>
            </div>
          </div>
        </div>

        {/* A4-style resume */}
        <div className="rounded-2xl p-6 sm:p-10" style={{ background: '#ffffff', boxShadow: '8px 8px 24px #babecc, -4px -4px 12px #ffffff', border: '1px solid #e8ecf0' }}>
          {/* Resume header */}
          <div className="pb-5 mb-5" style={{ borderBottom: '2px solid #2d3436' }}>
            <h3 className="text-2xl font-black tracking-tight" style={{ color: '#1a1a1a' }}>{c.name}</h3>
            <div className="flex items-center gap-4 mt-1.5 text-xs flex-wrap" style={{ color: '#4a5568' }}>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{resume.email}</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" />{c.university}</span>
            </div>
          </div>

          {/* Summary */}
          <ResumeSection title="Summary">
            <p className="text-sm leading-relaxed" style={{ color: '#2d3436' }}>{resume.summary}</p>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection title="Experience">
            <div className="flex flex-col gap-4">
              {resume.experience.map((e, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <span className="text-sm font-bold" style={{ color: '#1a1a1a' }}>{e.title}</span>
                    <span className="text-xs font-mono" style={{ color: '#4a5568' }}>{e.period}</span>
                  </div>
                  <div className="text-xs font-medium mb-1" style={{ color: '#4a5568' }}>{e.org}</div>
                  <p className="text-sm leading-relaxed" style={{ color: '#2d3436' }}>{e.description}</p>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Education */}
          <ResumeSection title="Education">
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <span className="text-sm font-bold" style={{ color: '#1a1a1a' }}>{c.level === 'internship' ? `B.Sc. ${c.programme} (in progress)` : `B.Sc. ${c.programme}`}</span>
              <span className="text-xs font-mono" style={{ color: '#4a5568' }}>{c.level === 'internship' ? 'Expected 2026' : c.level === 'senior' ? '2018' : c.level === 'mid' ? '2021' : '2024'}</span>
            </div>
            <div className="text-xs font-medium" style={{ color: '#4a5568' }}>{c.university}</div>
          </ResumeSection>

          {/* Skills */}
          <ResumeSection title="Skills" last>
            <div className="flex flex-wrap gap-1.5">
              {c.skills.map(s => (
                <span key={s} className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: '#f0f2f5', color: '#2d3436', border: '1px solid #e0e5ec' }}>{s}</span>
              ))}
            </div>
          </ResumeSection>
        </div>

        {/* CRS breakdown */}
        <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: '#2d3436' }}>Career Readiness Breakdown</h3>
          <div className="space-y-2.5">
            {(Object.keys(c.breakdown) as (keyof CrsBreakdown)[]).map(k => (
              <div key={k}>
                <div className="flex justify-between text-xs mb-1" style={{ color: '#4a5568' }}><span>{CRS_LABELS[k]}</span><span className="font-mono font-bold">{c.breakdown[k]}</span></div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 1px 1px 2px #babecc, inset -1px -1px 2px #ffffff' }}>
                  <div className="h-full rounded-full" style={{ width: `${c.breakdown[k]}%`, background: rm.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => setAction('shortlisted')}
            className="flex-1 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2"
            style={{ background: action === 'shortlisted' ? '#00b894' : '#ff4757', boxShadow: '4px 4px 10px rgba(0,0,0,0.15)' }}>
            {action === 'shortlisted' ? <><Check className="w-4 h-4" /> Shortlisted</> : <><CheckSquare className="w-4 h-4" /> Shortlist</>}
          </button>
          <button onClick={() => setAction('interview')}
            className="flex-1 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest btn-press flex items-center justify-center gap-2"
            style={action === 'interview'
              ? { background: '#00b894', color: '#fff', boxShadow: '4px 4px 10px rgba(0,184,148,0.3)' }
              : { background: '#e0e5ec', color: '#2d3436', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
            {action === 'interview' ? <><Check className="w-4 h-4" /> Interview scheduled</> : <><CalendarClock className="w-4 h-4" /> Schedule interview</>}
          </button>
          <button onClick={mockDownload}
            className="flex-1 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest btn-press flex items-center justify-center gap-2"
            style={{ background: '#e0e5ec', color: downloaded ? '#00b894' : '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
            {downloaded ? <><Check className="w-4 h-4" /> Downloaded</> : <><Download className="w-4 h-4" /> Download PDF</>}
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

function ResumeSection({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? '' : 'mb-5 pb-5'} style={last ? undefined : { borderBottom: '1px solid #e8ecf0' }}>
      <h4 className="text-xs font-black uppercase tracking-widest mb-2.5" style={{ color: '#8A6D1F' }}>{title}</h4>
      {children}
    </div>
  )
}
