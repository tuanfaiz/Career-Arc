'use client'
import DashboardLayout from '@/components/DashboardLayout'
import StatCard from '@/components/StatCard'
import { mockMinistryStats as m, sdgGoals } from '@/lib/mockData'
import { Users, TrendingUp, Clock, School, Landmark, BarChart3, PieChart, Globe } from 'lucide-react'

export default function MinistryPage() {
  const maxRate = Math.max(...m.trend.map(t => t.rate))
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #eef3f8 100%)', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: '1px solid #19486a33' }}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#19486a', boxShadow: '4px 4px 10px rgba(25,72,106,0.3)' }}>
              <Landmark className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#2d3436' }}>{m.body}</h2>
              <p className="text-sm mt-1" style={{ color: '#4a5568' }}>National Graduate Employability · Policy &amp; Planning Dashboard</p>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Graduates (National)" value={`${(m.graduatesNational / 1000).toFixed(0)}K`} icon={<Users size={18} />} />
          <StatCard label="National Employment" value={`${m.employmentRate}%`} icon={<TrendingUp size={18} />} accent />
          <StatCard label="Avg Time-to-Hire" value={`${m.avgTimeToHire}mo`} icon={<Clock size={18} />} subtitle="Across all fields" />
          <StatCard label="Universities Tracked" value={`${m.universitiesTracked}`} icon={<School size={18} />} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Employability by field */}
          <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5" style={{ color: '#19486a' }} />
              <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Employability by Field</h3>
            </div>
            <div className="flex flex-col gap-4">
              {m.byField.map(f => (
                <div key={f.field}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium" style={{ color: '#2d3436' }}>{f.field}</span>
                    <span className="text-xs font-mono font-bold" style={{ color: '#19486a' }}>{f.employed}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${f.employed}%`, background: 'linear-gradient(90deg, #19486a, #4a90c2)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employment trend */}
          <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5" style={{ color: '#19486a' }} />
              <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>National Employment Trend</h3>
            </div>
            <div className="flex items-end gap-4" style={{ height: '180px' }}>
              {m.trend.map(t => (
                <div key={t.year} className="flex-1 flex flex-col items-center" style={{ height: '100%', justifyContent: 'flex-end', gap: '6px' }}>
                  <div className="text-xs font-mono font-bold" style={{ color: '#19486a' }}>{t.rate}%</div>
                  <div className="w-full rounded-t-xl transition-all duration-700" style={{ height: `${(t.rate / maxRate) * 100}%`, background: 'linear-gradient(180deg, #19486a, #4a90c244)', boxShadow: '0 -4px 12px rgba(25,72,106,0.25)', minHeight: '8px' }} />
                  <div className="text-xs font-mono" style={{ color: '#4a5568' }}>{t.year}</div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4 px-4 py-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff', color: '#4a5568' }}>
              Graduate employability rose <strong style={{ color: '#19486a' }}>9 points</strong> over 3 years as tracer-study data closed skill gaps.
            </p>
          </div>
        </div>

        {/* Top sectors */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5" style={{ color: '#19486a' }} />
            <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Where Graduates Are Hired</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {m.topSectors.map(sec => (
              <div key={sec.sector} className="rounded-xl p-4 text-center" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                <div className="text-2xl font-black font-mono" style={{ color: '#19486a' }}>{sec.share}%</div>
                <div className="text-xs mt-1" style={{ color: '#4a5568' }}>{sec.sector}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SDG alignment */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5" style={{ color: '#00b894' }} />
            <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>UN SDG Alignment</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sdgGoals.map(g => (
              <div key={g.number} className="rounded-2xl p-5" style={{ background: '#e0e5ec', boxShadow: '6px 6px 12px #babecc, -6px -6px 12px #ffffff', borderTop: `3px solid ${g.color}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black font-mono text-sm flex-shrink-0" style={{ background: g.color }}>{g.number}</div>
                  <span className="text-sm font-black" style={{ color: '#2d3436' }}>{g.title}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{g.contribution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
