'use client'
import { useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import { mockCompanies } from '@/lib/mockData'
import { Search, MapPin, Users, Star, BadgeCheck, ShieldCheck, ChevronRight, Handshake } from 'lucide-react'

const ghostDot: Record<string, string> = { green: '#00b894', yellow: '#fdcb6e', red: '#ff4757' }

export default function CompaniesPage() {
  const [query, setQuery] = useState('')
  const [onlyVerified, setOnlyVerified] = useState(false)

  const filtered = mockCompanies.filter(c => {
    const matchQ = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.industry.toLowerCase().includes(query.toLowerCase())
    const matchV = !onlyVerified || c.verified
    return matchQ && matchV
  })

  const verifiedCount = mockCompanies.filter(c => c.verified).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2d3436] mb-1">Company Directory</h2>
          <p className="text-sm text-[#4a5568]">{filtered.length} companies · {verifiedCount} verified Talentbank partners · every profile carries an Anti-Ghost score</p>
        </div>

        {/* Trust legend */}
        <div className="flex flex-wrap items-center gap-5 p-4 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff' }}>
          <span className="flex items-center gap-1.5 text-xs text-[#4a5568] font-mono">
            <BadgeCheck className="w-4 h-4" style={{ color: '#8A6D1F' }} /> Verified employer
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#4a5568] font-mono">
            <Handshake className="w-4 h-4" style={{ color: '#8A6D1F' }} /> Years as Talentbank partner
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#4a5568] font-mono">
            <ShieldCheck className="w-4 h-4" style={{ color: '#00b894' }} /> Anti-Ghost response rating
          </span>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568]" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search companies or industries..."
              className="w-full h-12 pl-11 pr-4 rounded-xl text-sm font-mono text-[#2d3436] input-recessed" />
          </div>
          <button onClick={() => setOnlyVerified(v => !v)}
            className="h-12 px-5 rounded-xl text-xs font-bold uppercase tracking-widest btn-press flex items-center justify-center gap-2 flex-shrink-0"
            style={onlyVerified
              ? { background: '#8A6D1F', color: 'white', boxShadow: '4px 4px 8px rgba(138,109,31,0.3)' }
              : { background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
            <BadgeCheck className="w-4 h-4" /> Verified only
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#4a5568] font-mono">No companies matched your search.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(c => (
              <Link key={c.id} href={`/companies/${c.id}`}
                className="card-hover rounded-2xl p-6 block" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold font-mono text-sm flex-shrink-0" style={{ background: c.logoColor, boxShadow: '3px 3px 6px rgba(0,0,0,0.15)' }}>
                    {c.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-[#2d3436] truncate">{c.name}</h3>
                      {c.verified && <BadgeCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#8A6D1F' }} />}
                    </div>
                    <div className="text-sm text-[#4a5568]">{c.industry}</div>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg flex-shrink-0" style={{ background: '#f0f2f5', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                    <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#f39c12' }} />
                    <span className="text-xs font-mono font-bold text-[#2d3436]">{c.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-[#4a5568] font-mono">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.hq}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.employees}</span>
                  {c.verified && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md font-bold" style={{ background: '#8A6D1F18', color: '#8A6D1F' }}>
                      <Handshake className="w-3 h-3" />{c.yearsPartner} yrs partner
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ghostDot[c.antiGhost], boxShadow: `0 0 6px ${ghostDot[c.antiGhost]}99` }} />
                  <span className="text-xs font-mono text-[#4a5568]">{c.antiGhostLabel}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold" style={{ color: '#8A6D1F' }}>{c.openRoles} open role{c.openRoles === 1 ? '' : 's'}</span>
                  <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider" style={{ color: '#4a5568' }}>
                    View profile <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
