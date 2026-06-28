'use client'
import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { mockCompanies, mockJobs } from '@/lib/mockData'
import {
  MapPin, Users, Star, BadgeCheck, Handshake, ShieldCheck, ArrowLeft,
  Briefcase, ExternalLink, Clock, Sparkles
} from 'lucide-react'

const ghost: Record<string, { dot: string; rating: string; label: string }> = {
  green: { dot: '#00b894', rating: 'A+', label: 'ACTIVE' },
  yellow: { dot: '#fdcb6e', rating: 'B', label: 'PASSIVE' },
  red: { dot: '#ff4757', rating: 'D', label: 'AT RISK' },
}

export default function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const company = mockCompanies.find(c => c.id === id)
  if (!company) notFound()

  const roles = mockJobs.filter(j => j.company === company.name)
  const g = ghost[company.antiGhost] ?? ghost.green

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/companies" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#4a5568' }}>
          <ArrowLeft className="w-4 h-4" /> All companies
        </Link>

        {/* Header */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold font-mono text-lg flex-shrink-0" style={{ background: company.logoColor, boxShadow: '4px 4px 10px rgba(0,0,0,0.15)' }}>
              {company.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-black" style={{ color: '#2d3436' }}>{company.name}</h2>
                {company.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: '#8A6D1F18', color: '#8A6D1F', border: '1px solid #8A6D1F33' }}>
                    <BadgeCheck className="w-3.5 h-3.5" /> Verified Employer
                  </span>
                )}
              </div>
              <p className="text-sm mt-1" style={{ color: '#4a5568' }}>{company.industry}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono" style={{ color: '#4a5568' }}>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{company.hq}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{company.employees}</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-current" style={{ color: '#f39c12' }} />{company.rating.toFixed(1)} · {company.reviews} reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Years partner */}
          <div className="rounded-2xl p-5 text-center" style={{ background: company.verified ? '#fffbf0' : '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: company.verified ? '1px solid #8A6D1F33' : '1px solid transparent' }}>
            <Handshake className="w-6 h-6 mx-auto mb-2" style={{ color: '#8A6D1F' }} />
            <div className="text-3xl font-black font-mono" style={{ color: '#8A6D1F' }}>{company.verified ? company.yearsPartner : '—'}</div>
            <div className="text-xs uppercase tracking-widest mt-1" style={{ color: '#4a5568' }}>{company.verified ? 'Years Talentbank Partner' : 'Not yet a partner'}</div>
          </div>
          {/* Anti-ghost */}
          <div className="rounded-2xl p-5 text-center" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: `1px solid ${g.dot}33` }}>
            <ShieldCheck className="w-6 h-6 mx-auto mb-2" style={{ color: g.dot }} />
            <div className="text-3xl font-black font-mono" style={{ color: g.dot }}>{g.rating}</div>
            <div className="text-xs uppercase tracking-widest mt-1" style={{ color: '#4a5568' }}>Anti-Ghost · {g.label}</div>
          </div>
          {/* Response time */}
          <div className="rounded-2xl p-5 text-center" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: '#4a5568' }} />
            <div className="text-3xl font-black font-mono" style={{ color: '#2d3436' }}>{company.avgResponse.split(' ')[0]}</div>
            <div className="text-xs uppercase tracking-widest mt-1" style={{ color: '#4a5568' }}>Avg days to respond</div>
          </div>
        </div>

        {/* About */}
        <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: '#2d3436' }}>About {company.name}</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#2d3436' }}>{company.about}</p>
          <div className="flex flex-wrap gap-2">
            {company.perks.map(p => (
              <span key={p} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                <Sparkles className="w-3 h-3" style={{ color: '#8A6D1F' }} /> {p}
              </span>
            ))}
          </div>
        </div>

        {/* Open roles */}
        <div className="card-screw rounded-2xl p-5 sm:p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: '#2d3436' }}>Open Roles ({roles.length})</h3>
          {roles.length === 0 ? (
            <p className="text-sm font-mono" style={{ color: '#4a5568' }}>No live roles right now — follow this company to be notified.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {roles.map(job => (
                <div key={job.id} className="flex items-center gap-4 px-4 py-4 rounded-xl flex-wrap sm:flex-nowrap" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#f0f2f5', boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #ffffff' }}>
                    <Briefcase className="w-4 h-4" style={{ color: '#8A6D1F' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm" style={{ color: '#2d3436' }}>{job.title}</p>
                    <p className="text-xs font-mono" style={{ color: '#4a5568' }}>{job.location} · {job.experience} · {job.salary}</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex-shrink-0" style={{ background: 'rgba(138,109,31,0.12)', color: '#8A6D1F' }}>
                    {job.matchPercent}% Match
                  </div>
                  <Link href="/jobs" className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white btn-press flex items-center gap-1.5 flex-shrink-0" style={{ background: '#8A6D1F', boxShadow: '4px 4px 8px rgba(138,109,31,0.3)' }}>
                    <ExternalLink className="w-3.5 h-3.5" /> Apply
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
