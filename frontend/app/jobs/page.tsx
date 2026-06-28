'use client'
import { useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import { mockJobs, mockCompanies } from '@/lib/mockData'
import { Search, MapPin, Briefcase, SlidersHorizontal, Wifi, Bookmark, ExternalLink, BadgeCheck } from 'lucide-react'

const companyByName: Record<string, { id: string; verified: boolean }> =
  Object.fromEntries(mockCompanies.map(c => [c.name, { id: c.id, verified: c.verified }]))

export default function JobsPage() {
  const [query, setQuery] = useState('')
  const [filterExp, setFilterExp] = useState('All')
  const [filterGhost, setFilterGhost] = useState('All')
  const [saved, setSaved] = useState<string[]>([])

  const expOptions = ['All', 'Junior (0–2 yrs)', 'Mid (2–5 yrs)']
  const ghostOptions = ['All', 'Active', 'Passive', 'Risk']
  const ghostMap: Record<string, string> = { Active: 'green', Passive: 'yellow', Risk: 'red' }

  const filtered = mockJobs.filter(j => {
    const matchQ = !query || j.title.toLowerCase().includes(query.toLowerCase()) || j.company.toLowerCase().includes(query.toLowerCase()) || j.skills.some(s => s.toLowerCase().includes(query.toLowerCase()))
    const matchExp = filterExp === 'All' || j.experience === filterExp
    const matchGhost = filterGhost === 'All' || j.antiGhost === ghostMap[filterGhost]
    return matchQ && matchExp && matchGhost
  })

  function toggleSave(id: string) {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2d3436] mb-1">Job Search</h2>
          <p className="text-sm text-[#4a5568]">{filtered.length} positions matched · All with Anti-Ghost scores</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568]" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search jobs, companies, skills..."
              className="w-full h-12 pl-11 pr-4 rounded-xl text-sm font-mono text-[#2d3436] input-recessed" />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select value={filterExp} onChange={e => setFilterExp(e.target.value)}
                className="h-12 pl-4 pr-8 rounded-xl text-sm font-mono text-[#2d3436] input-recessed appearance-none cursor-pointer">
                {expOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a5568] pointer-events-none" />
            </div>
            <div className="relative">
              <select value={filterGhost} onChange={e => setFilterGhost(e.target.value)}
                className="h-12 pl-4 pr-8 rounded-xl text-sm font-mono text-[#2d3436] input-recessed appearance-none cursor-pointer">
                {ghostOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <Wifi className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a5568] pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff' }}>
          <span className="text-xs font-mono font-bold text-[#4a5568] uppercase tracking-widest">Anti-Ghost Score:</span>
          {[
            { color: '#00b894', label: '🟢 Active — responds within days' },
            { color: '#fdcb6e', label: '🟡 Passive — slow response' },
            { color: '#ff4757', label: '🔴 Risk — known ghoster' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs text-[#4a5568] font-mono">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }}></span>
              {l.label}
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#4a5568] font-mono">No jobs matched your filters.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(job => (
              <div key={job.id} className="card-hover rounded-2xl p-6 relative" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold font-mono text-sm flex-shrink-0" style={{ background: job.logoColor, boxShadow: '3px 3px 6px rgba(0,0,0,0.15)' }}>
                    {job.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#2d3436] truncate">{job.title}</h3>
                    {companyByName[job.company] ? (
                      <Link href={`/companies/${companyByName[job.company].id}`}
                        className="text-sm inline-flex items-center gap-1 hover:underline" style={{ color: '#4a5568' }}>
                        {job.company}
                        {companyByName[job.company].verified && <BadgeCheck className="w-3.5 h-3.5" style={{ color: '#8A6D1F' }} />}
                      </Link>
                    ) : (
                      <div className="text-sm text-[#4a5568]">{job.company}</div>
                    )}
                  </div>
                  <div className="px-3 py-1.5 rounded-xl text-sm font-mono font-bold flex-shrink-0" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757' }}>
                    {job.matchPercent}% Match
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-[#4a5568] font-mono">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.experience}</span>
                  <span className="font-semibold text-[#2d3436]">{job.salary}</span>
                  {job.remote && <span className="px-2 py-0.5 rounded-md font-bold" style={{ background: 'rgba(9,132,227,0.1)', color: '#0984e3' }}>Remote OK</span>}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-xs font-mono text-[#4a5568]" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>{s}</span>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{
                    background: job.antiGhost === 'green' ? '#00b894' : job.antiGhost === 'yellow' ? '#fdcb6e' : '#ff4757',
                    boxShadow: `0 0 6px ${job.antiGhost === 'green' ? 'rgba(0,184,148,0.6)' : job.antiGhost === 'yellow' ? 'rgba(253,203,110,0.6)' : 'rgba(255,71,87,0.6)'}`
                  }}></span>
                  <span className="text-xs font-mono text-[#4a5568]">{job.antiGhostLabel}</span>
                  <span className="ml-auto text-xs text-[#4a5568] font-mono">{job.posted}</span>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 bg-accent text-white text-sm font-bold rounded-xl btn-press uppercase tracking-wider flex items-center justify-center gap-2" style={{ boxShadow: '4px 4px 8px rgba(166,50,60,0.3)' }}>
                    <ExternalLink className="w-3.5 h-3.5" /> Apply Now
                  </button>
                  <button onClick={() => toggleSave(job.id)}
                    className={`w-11 h-11 rounded-xl btn-press flex items-center justify-center ${saved.includes(job.id) ? 'bg-accent text-white' : 'text-[#4a5568]'}`}
                    style={{ boxShadow: saved.includes(job.id) ? '4px 4px 8px rgba(166,50,60,0.3)' : '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                    <Bookmark className={`w-4 h-4 ${saved.includes(job.id) ? 'fill-white' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
