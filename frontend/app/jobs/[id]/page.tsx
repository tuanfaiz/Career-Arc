'use client'
import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { mockJobs, mockCompanies } from '@/lib/mockData'
import { jobDetails, defaultProfile, levelByKey, jobVerdictText, type JobDetail } from '@/lib/careerData'
import {
  compatibility, verdictOf, verdictMeta, type Level,
} from '@/lib/scoring'
import {
  ArrowLeft, MapPin, Briefcase, Sparkles, Check, X, ExternalLink, BadgeCheck,
  TrendingUp, Wifi, DollarSign,
} from 'lucide-react'

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const job = mockJobs.find(j => j.id === id)
  if (!job) notFound()
  const detail: JobDetail | undefined = jobDetails[id]
  const company = mockCompanies.find(c => c.name === job.company)

  const [skills, setSkills] = useState<string[]>(defaultProfile.skills)
  const [level, setLevel] = useState<Level>(defaultProfile.level)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem('careerProfile')
      if (raw) { const p = JSON.parse(raw); if (p.skills) setSkills(p.skills); if (p.level) setLevel(p.level) }
    } catch { /* keep defaults */ }
  }, [])

  const allSkills = [...job.skills, ...(detail?.niceToHave ?? [])]
  const comp = compatibility(skills, allSkills)
  const verdict = verdictOf(comp.score)
  const vm = verdictMeta[verdict]
  const jobLevel = detail?.level ?? 'fresh'
  const levelMatch = jobLevel === level

  const ghostColor = job.antiGhost === 'green' ? '#00b894' : job.antiGhost === 'yellow' ? '#fdcb6e' : '#ff4757'

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#4a5568' }}>
          <ArrowLeft className="w-4 h-4" /> All jobs
        </Link>

        {/* Header */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold font-mono flex-shrink-0" style={{ background: job.logoColor, boxShadow: '4px 4px 10px rgba(0,0,0,0.15)' }}>{job.logo}</div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-black" style={{ color: '#2d3436' }}>{job.title}</h2>
              {company ? (
                <Link href={`/companies/${company.id}`} className="inline-flex items-center gap-1 text-sm hover:underline" style={{ color: '#4a5568' }}>
                  {job.company} {company.verified && <BadgeCheck className="w-3.5 h-3.5" style={{ color: '#8A6D1F' }} />}
                </Link>
              ) : <span className="text-sm" style={{ color: '#4a5568' }}>{job.company}</span>}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-mono" style={{ color: '#4a5568' }}>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.experience}</span>
                <span className="flex items-center gap-1"><Wifi className="w-3.5 h-3.5" />{detail?.workArrangement ?? (job.remote ? 'Remote' : 'On-site')}</span>
                <span className="flex items-center gap-1 font-semibold" style={{ color: '#2d3436' }}><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility analysis */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold uppercase tracking-widest text-sm mb-6" style={{ color: '#2d3436' }}>Your compatibility</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <Ring value={comp.score} color={vm.color} />
            <div className="flex-1 w-full">
              {/* You vs job */}
              <div className="space-y-2.5">
                <CompareRow label="Skills matched" ok={`${comp.have.length}/${allSkills.length}`} good={comp.have.length >= allSkills.length * 0.7} />
                <CompareRow label="Experience level" ok={levelMatch ? 'Match' : `${levelByKey[level].label} vs ${levelByKey[jobLevel].label}`} good={levelMatch} />
                <CompareRow label="Salary vs your range" ok={job.salary} good={true} />
              </div>
            </div>
          </div>

          {/* Skills breakdown */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#00b894' }}>You have</div>
              <div className="flex flex-wrap gap-1.5">
                {comp.have.length ? comp.have.map(s => (
                  <span key={s} className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium" style={{ background: '#00b89418', color: '#00b894' }}><Check className="w-3 h-3" />{s}</span>
                )) : <span className="text-xs" style={{ color: '#4a5568' }}>—</span>}
              </div>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#ff4757' }}>Missing — close these</div>
              <div className="flex flex-wrap gap-1.5">
                {comp.missing.length ? comp.missing.map(s => (
                  <span key={s} className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium" style={{ background: '#ff475718', color: '#ff4757' }}><X className="w-3 h-3" />{s} <span className="opacity-70">+ readiness</span></span>
                )) : <span className="text-xs" style={{ color: '#00b894' }}>You meet every requirement 🎉</span>}
              </div>
            </div>
          </div>
        </div>

        {/* AI verdict */}
        <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: vm.bg, boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: `1px solid ${vm.color}33` }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: vm.color, boxShadow: `4px 4px 8px ${vm.color}55` }}>
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" style={{ color: vm.color }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: vm.color }}>AI verdict · {vm.label}</span>
            </div>
            <p className="text-sm" style={{ color: '#2d3436' }}>{jobVerdictText(verdict, comp.missing)}</p>
          </div>
        </div>

        {/* Job info */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold uppercase tracking-widest text-sm mb-3" style={{ color: '#2d3436' }}>The role</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#2d3436' }}>{detail?.scope ?? job.description}</p>
          {detail && (
            <>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a5568' }}>What you&apos;ll do</div>
              <ul className="space-y-2 mb-5">
                {detail.responsibilities.map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm" style={{ color: '#2d3436' }}>
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#00b894' }} />{r}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a5568' }}>Required skills</div>
          <div className="flex flex-wrap gap-1.5">
            {job.skills.map(s => (
              <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono" style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Company snippet */}
        {company && (
          <Link href={`/companies/${company.id}`} className="card-hover rounded-2xl p-5 flex items-center gap-4 block" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold font-mono flex-shrink-0" style={{ background: company.logoColor }}>{company.logo}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5"><span className="font-bold text-sm" style={{ color: '#2d3436' }}>{company.name}</span>{company.verified && <BadgeCheck className="w-4 h-4" style={{ color: '#8A6D1F' }} />}</div>
              <div className="flex items-center gap-2 text-xs font-mono mt-0.5" style={{ color: '#4a5568' }}>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: ghostColor }} />{job.antiGhostLabel}</span>
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: '#4a5568' }}>View profile <ExternalLink className="w-3.5 h-3.5" /></span>
          </Link>
        )}

        {/* Apply */}
        <button className="w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2" style={{ background: '#ff4757', boxShadow: '6px 6px 14px rgba(255,71,87,0.35)' }}>
          <ExternalLink className="w-4 h-4" /> Apply now
        </button>
      </div>
    </DashboardLayout>
  )
}

function CompareRow({ label, ok, good }: { label: string; ok: string; good: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
      <span className="text-sm" style={{ color: '#4a5568' }}>{label}</span>
      <span className="flex items-center gap-1.5 text-sm font-bold" style={{ color: good ? '#00b894' : '#f39c12' }}>
        {good ? <Check className="w-4 h-4" /> : <span className="w-4 h-4 inline-flex items-center justify-center">~</span>}{ok}
      </span>
    </div>
  )
}

function Ring({ value, color }: { value: number; color: string }) {
  const r = 46, c = 2 * Math.PI * r, off = c - (value / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center flex-shrink-0">
      <svg width="120" height="120" className="-rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#d1d9e6" strokeWidth="11" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-black font-mono" style={{ color }}>{value}%</span>
        <span className="text-xs" style={{ color: '#4a5568' }}>match</span>
      </div>
    </div>
  )
}
