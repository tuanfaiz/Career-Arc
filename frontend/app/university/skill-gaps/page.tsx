'use client'
import DashboardLayout from '@/components/DashboardLayout'
import { skillGaps, programmesSummary } from '@/lib/careerData'
import { BarChart3, Target, Users, TrendingUp, GraduationCap } from 'lucide-react'

export default function SkillGapsPage() {
  const maxAffected = Math.max(...skillGaps.map(g => g.affected))

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#6c5ce7', boxShadow: '4px 4px 10px rgba(108,92,231,0.3)' }}>
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#2d3436' }}>Faculty Skill-Gap Dashboard</h2>
            <p className="text-sm" style={{ color: '#4a5568' }}>The skills your students are missing for in-demand roles — and the interventions that close them.</p>
          </div>
        </div>

        {/* Skill gap cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {skillGaps.map(g => (
            <div key={g.skill} className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-black text-lg" style={{ color: '#2d3436' }}>{g.skill}</h3>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1" style={{ background: '#00b89418', color: '#00b894' }}>
                  <TrendingUp className="w-3 h-3" />+{g.uplift} CRS
                </span>
              </div>

              <div className="flex items-center gap-1.5 mb-2 text-xs" style={{ color: '#4a5568' }}>
                <Target className="w-3.5 h-3.5" style={{ color: '#6c5ce7' }} />
                <span>Target roles: {g.targetRoles.join(', ')}</span>
              </div>

              <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: '#4a5568' }}>
                <Users className="w-3.5 h-3.5" style={{ color: '#6c5ce7' }} />
                <span><strong style={{ color: '#2d3436' }}>{g.affected}</strong> students affected</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden mb-4" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                <div className="h-full rounded-full" style={{ width: `${(g.affected / maxAffected) * 100}%`, background: 'linear-gradient(90deg, #6c5ce7, #a29bfe)' }} />
              </div>

              <div className="rounded-xl px-4 py-3" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#6c5ce7' }}>Recommended intervention</div>
                <div className="text-sm font-medium" style={{ color: '#2d3436' }}>{g.intervention}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Gaps by programme */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5" style={{ color: '#6c5ce7' }} />
            <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Readiness by Programme</h3>
          </div>
          <div className="flex flex-col gap-4">
            {programmesSummary.map(p => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium" style={{ color: '#2d3436' }}>{p.name}</span>
                  <span className="text-xs font-mono" style={{ color: '#4a5568' }}>{p.students} students · {p.riskCount} high-risk · <strong style={{ color: p.avgCrs < 50 ? '#ff4757' : p.avgCrs < 70 ? '#f39c12' : '#00b894' }}>avg {p.avgCrs}</strong></span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.avgCrs}%`, background: p.avgCrs < 50 ? '#ff4757' : p.avgCrs < 70 ? '#f39c12' : '#00b894' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
