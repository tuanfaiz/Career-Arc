'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import { mockJobs } from '@/lib/mockData'
import { defaultProfile, levelByKey, nextActionText } from '@/lib/careerData'
import {
  computeCrs, riskOf, riskMeta, compatibility, CRS_LABELS, type CrsBreakdown, type Level,
} from '@/lib/scoring'
import { ArrowRight, Sparkles, FileText, Target, TrendingUp, DollarSign, Lightbulb } from 'lucide-react'

interface Profile {
  name: string; level: Level; programme: string; university: string
  skills: string[]; animal?: string | null; breakdown: CrsBreakdown
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem('isLoggedIn') !== 'true') { router.push('/login'); return }
    if (localStorage.getItem('onboardingComplete') !== 'true') { router.push('/onboarding'); return }
    const raw = localStorage.getItem('careerProfile')
    try { setProfile(raw ? JSON.parse(raw) : (defaultProfile as Profile)) }
    catch { setProfile(defaultProfile as Profile) }
  }, [router])

  if (!profile) {
    return <DashboardLayout><div className="py-20 text-center font-mono" style={{ color: '#4a5568' }}>Loading your readiness…</div></DashboardLayout>
  }

  const b = profile.breakdown
  const crs = computeCrs(b)
  const risk = riskOf(crs)
  const rm = riskMeta[risk]
  const lead = levelByKey[profile.level]?.dashboardLead ?? 'jobs'

  const ranked = mockJobs
    .map(j => ({ job: j, comp: compatibility(profile.skills, j.skills) }))
    .sort((a, b2) => b2.comp.score - a.comp.score)
  const topJobs = ranked.slice(0, 3)

  const outcomeStats = [
    { label: 'ATS Score', value: `${b.ats}`, icon: Target, color: '#ff4757' },
    { label: 'Resume Strength', value: `${b.resume}`, icon: FileText, color: '#0984e3' },
    { label: 'Skill Match', value: `${b.skillMatch}`, icon: Sparkles, color: '#6c5ce7' },
    { label: 'Top Job Match', value: `${ranked[0]?.comp.score ?? 0}%`, icon: TrendingUp, color: '#00b894' },
  ]

  const leadCard = {
    jobs: { href: '/jobs', label: 'Browse recommended jobs', icon: TrendingUp },
    salary: { href: '/salary', label: 'Check your market salary', icon: DollarSign },
    path: { href: '/career-path', label: 'Plan your next move', icon: ArrowRight },
  }[lead]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Hero: CRS */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Ring value={crs} color={rm.color} />
            <div className="flex-1 min-w-0 text-center md:text-left">
              <h2 className="text-2xl font-black" style={{ color: '#2d3436' }}>Hi {profile.name.split(' ')[0]} 👋 You&apos;re {crs}% career-ready</h2>
              <div className="flex items-center gap-2 justify-center md:justify-start mt-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: rm.bg, color: rm.color }}>{rm.label}</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757' }}>{levelByKey[profile.level]?.label}</span>
                {profile.animal && <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: '#8A6D1F18', color: '#8A6D1F' }}>🐾 {profile.animal}</span>}
                <span className="text-sm" style={{ color: '#4a5568' }}>{profile.programme}</span>
              </div>
              {/* breakdown bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-5">
                {(Object.keys(b) as (keyof CrsBreakdown)[]).map(k => (
                  <div key={k}>
                    <div className="flex justify-between text-xs mb-1" style={{ color: '#4a5568' }}><span>{CRS_LABELS[k]}</span><span className="font-mono font-bold">{b[k]}</span></div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 1px 1px 2px #babecc, inset -1px -1px 2px #ffffff' }}>
                      <div className="h-full rounded-full" style={{ width: `${b[k]}%`, background: rm.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Suggested next action (AI) */}
        <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #fff8ec 100%)', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: '1px solid #f39c1233' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#f39c12', boxShadow: '4px 4px 8px rgba(243,156,18,0.3)' }}>
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" style={{ color: '#f39c12' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f39c12' }}>AI · Suggested next action</span>
            </div>
            <p className="text-sm" style={{ color: '#2d3436' }}>{nextActionText(b)}</p>
            <Link href={leadCard.href} className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-white btn-press" style={{ background: '#f39c12', boxShadow: '4px 4px 8px rgba(243,156,18,0.3)' }}>
              <leadCard.icon className="w-3.5 h-3.5" /> {leadCard.label}
            </Link>
          </div>
        </div>

        {/* Outcome stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {outcomeStats.map(s => (
            <div key={s.label} className="card-hover rounded-2xl p-5" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#e0e5ec', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-mono font-bold mb-0.5" style={{ color: '#2d3436' }}>{s.value}</div>
              <div className="text-xs font-medium" style={{ color: '#4a5568' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recommended jobs (ranked by compatibility) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold" style={{ color: '#2d3436' }}>Recommended for you <span className="text-xs font-mono font-normal" style={{ color: '#4a5568' }}>· ranked by your skills</span></h3>
            <Link href="/jobs" className="text-xs font-semibold flex items-center gap-1" style={{ color: '#ff4757' }}>See all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {topJobs.map(({ job, comp }) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="card-hover rounded-2xl p-5 block" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold font-mono flex-shrink-0" style={{ background: job.logoColor }}>{job.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate" style={{ color: '#2d3436' }}>{job.title}</div>
                    <div className="text-xs truncate" style={{ color: '#4a5568' }}>{job.company}</div>
                  </div>
                  <div className="px-2 py-1 rounded-lg text-xs font-mono font-bold flex-shrink-0" style={{ background: comp.score >= 85 ? '#00b89422' : comp.score >= 60 ? '#fdcb6e33' : '#ff475722', color: comp.score >= 85 ? '#00b894' : comp.score >= 60 ? '#b9831f' : '#ff4757' }}>{comp.score}%</div>
                </div>
                <div className="text-xs font-mono mb-3" style={{ color: '#4a5568' }}>{job.salary} · {job.location}</div>
                {comp.missing.length > 0 && (
                  <div className="text-xs mb-3" style={{ color: '#4a5568' }}>Missing: {comp.missing.slice(0, 2).map(m => <span key={m} className="font-medium" style={{ color: '#ff4757' }}>{m} </span>)}</div>
                )}
                <span className="flex items-center justify-center gap-1 w-full py-2.5 text-sm font-semibold rounded-xl" style={{ color: '#2d3436', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                  View &amp; compare <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function Ring({ value, color }: { value: number; color: string }) {
  const r = 50, c = 2 * Math.PI * r, off = c - (value / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center flex-shrink-0">
      <svg width="132" height="132" className="-rotate-90">
        <circle cx="66" cy="66" r={r} fill="none" stroke="#d1d9e6" strokeWidth="12" />
        <circle cx="66" cy="66" r={r} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black font-mono" style={{ color }}>{value}</span>
        <span className="text-xs" style={{ color: '#4a5568' }}>readiness</span>
      </div>
    </div>
  )
}
