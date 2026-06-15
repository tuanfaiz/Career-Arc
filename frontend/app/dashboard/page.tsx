'use client'
import DashboardLayout from '@/components/DashboardLayout'
import Link from 'next/link'
import { mockApplications, mockJobs, mockUser } from '@/lib/mockData'
import { ArrowRight, TrendingUp, Eye, FileText, Target, Send } from 'lucide-react'

const statusColors: Record<string, string> = {
  green: 'bg-[#00b894] text-white',
  blue: 'bg-[#0984e3] text-white',
  yellow: 'bg-[#fdcb6e] text-[#2d3436]',
  red: 'bg-[#ff4757] text-white',
  purple: 'bg-[#6c5ce7] text-white',
}

export default function DashboardPage() {
  const topJobs = mockJobs.filter(j => j.matchPercent >= 87).slice(0, 3)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="card-screw rounded-2xl p-6" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#2d3436] mb-1">Good morning, {mockUser.name}! 👋</h2>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757' }}>{mockUser.role}</span>
                <span className="text-[#4a5568] text-sm">·</span>
                <span className="text-sm text-[#4a5568]">{mockUser.field} · {mockUser.university}</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00b894', boxShadow: '0 0 6px rgba(0,184,148,0.6)' }}></span>
              <span className="text-xs font-mono text-[#4a5568] uppercase tracking-wider">Profile 78% Complete</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Send, label: 'Applications Sent', value: String(mockUser.applicationsSent), sub: '+3 this week', color: '#0984e3' },
            { icon: Eye, label: 'Profile Views', value: String(mockUser.profileViews), sub: '+18 today', color: '#6c5ce7' },
            { icon: Target, label: 'ATS Score', value: `${mockUser.atsScore}%`, sub: 'Above average', color: '#ff4757' },
            { icon: TrendingUp, label: 'Top Job Match', value: '96%', sub: 'AirAsia Digital', color: '#00b894' },
          ].map(s => (
            <div key={s.label} className="card-hover rounded-2xl p-5" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#e0e5ec', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-mono font-bold text-[#2d3436] mb-0.5">{s.value}</div>
              <div className="text-xs text-[#4a5568] font-medium">{s.label}</div>
              <div className="text-xs font-mono mt-1" style={{ color: s.color }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Applications */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#babecc]/50">
              <h3 className="font-bold text-[#2d3436]">Recent Applications</h3>
              <Link href="/jobs" className="text-xs text-accent font-semibold flex items-center gap-1">
                Find More Jobs <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-[#babecc]/30">
              {mockApplications.map(app => (
                <div key={app.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#2d3436] truncate">{app.jobTitle}</div>
                    <div className="text-xs text-[#4a5568]">{app.company}</div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#4a5568]">
                    <span className="w-2 h-2 rounded-full" style={{ background: app.antiGhost === 'green' ? '#00b894' : app.antiGhost === 'yellow' ? '#fdcb6e' : '#ff4757' }}></span>
                    <span className="hidden md:inline truncate max-w-[120px]">{app.antiGhostLabel}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap ${statusColors[app.statusColor]}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Arc Preview */}
          <div className="rounded-2xl p-6" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <h3 className="font-bold text-[#2d3436] mb-4">Your Career Arc</h3>
            <div className="space-y-3 mb-6">
              {[
                { year: '2023', role: 'Junior Developer', salary: 'RM 3.5K', active: true },
                { year: '2025', role: 'Mid-Level Dev', salary: 'RM 6K', active: false },
                { year: '2028', role: 'Senior Developer', salary: 'RM 10K', active: false },
                { year: '2031+', role: 'Tech Lead / PM / Founder', salary: 'RM 15K+', active: false },
              ].map((node, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full mt-0.5" style={node.active ? { background: '#ff4757', boxShadow: '0 0 8px rgba(255,71,87,0.5)' } : { background: '#babecc' }}></div>
                    {i < 3 && <div className="w-px h-6 bg-[#babecc]"></div>}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="text-xs font-mono text-[#4a5568] mb-0.5">{node.year}</div>
                    <div className={`text-sm font-semibold ${node.active ? 'text-accent' : 'text-[#2d3436]'}`}>{node.role}</div>
                    <div className="text-xs font-mono text-[#4a5568]">{node.salary}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/career-path" className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white text-sm font-bold rounded-xl btn-press uppercase tracking-wider" style={{ boxShadow: '4px 4px 8px rgba(166,50,60,0.3)' }}>
              View Full Simulator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#2d3436]">Recommended for You</h3>
            <Link href="/jobs" className="text-xs text-accent font-semibold flex items-center gap-1">See all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {topJobs.map(job => (
              <div key={job.id} className="card-hover rounded-2xl p-5" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold font-mono flex-shrink-0" style={{ background: job.logoColor }}>
                    {job.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[#2d3436] truncate">{job.title}</div>
                    <div className="text-xs text-[#4a5568] truncate">{job.company}</div>
                  </div>
                  <div className="px-2 py-1 rounded-lg text-xs font-mono font-bold flex-shrink-0" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757' }}>
                    {job.matchPercent}%
                  </div>
                </div>
                <div className="text-xs font-mono text-[#4a5568] mb-3">{job.salary} · {job.location}</div>
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: job.antiGhost === 'green' ? '#00b894' : '#fdcb6e' }}></span>
                  <span className="text-xs text-[#4a5568] truncate">{job.antiGhostLabel}</span>
                </div>
                <Link href="/jobs" className="flex items-center justify-center gap-1 w-full py-2.5 text-sm font-semibold rounded-xl btn-press text-[#2d3436]" style={{ boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                  View Job <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
