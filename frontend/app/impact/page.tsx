'use client'
import DashboardLayout from '@/components/DashboardLayout'
import { sdgGoals, mockImpactMetrics } from '@/lib/mockData'
import { Globe, GraduationCap, Building2, School, Landmark, ArrowRight, Heart } from 'lucide-react'

const featureLinks: Record<number, string[]> = {
  4: ['Graduate Tracer Study dashboards', 'YourAnimal career-fit guidance', 'Career Path Navigator'],
  8: ['Fair Pay Engine & salary benchmarks', 'Anti-Ghosting employer accountability', 'Cost-of-Living calculator'],
  17: ['Candidate · Employer · University · Ministry dashboards', 'Verified-employer directory', 'Shared outcome data'],
}

const stakeholders = [
  { icon: GraduationCap, label: 'Candidates', desc: 'Clarity, fair pay, and respect in the job hunt', color: '#ff4757' },
  { icon: Building2, label: 'Employers', desc: 'Accountable hiring and a stronger brand', color: '#00b894' },
  { icon: School, label: 'Universities', desc: 'Tracer data to close skill gaps', color: '#6c5ce7' },
  { icon: Landmark, label: 'Ministry', desc: 'National employability for policy', color: '#19486a' },
]

export default function ImpactPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Hero */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #e8f5f3 100%)', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: '1px solid #00b89433' }}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#00b894', boxShadow: '4px 4px 10px rgba(0,184,148,0.3)' }}>
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#2d3436' }}>Impact &amp; SDG Alignment</h2>
              <p className="text-sm mt-1 max-w-2xl" style={{ color: '#4a5568' }}>
                Career Arc is built around impact, not just features. It improves livelihoods across the whole career ecosystem and reports against the UN Sustainable Development Goals.
              </p>
            </div>
          </div>
        </div>

        {/* Impact metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {mockImpactMetrics.map(metric => (
            <div key={metric.label} className="card-screw card-hover rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="text-3xl font-black font-mono mb-1" style={{ color: '#00b894' }}>{metric.value}</div>
              <div className="text-sm font-bold" style={{ color: '#2d3436' }}>{metric.label}</div>
              <div className="text-xs mt-1" style={{ color: '#4a5568' }}>{metric.sub}</div>
            </div>
          ))}
        </div>

        {/* SDG goals */}
        <div>
          <h3 className="font-bold uppercase tracking-widest text-sm mb-4 px-1" style={{ color: '#2d3436' }}>The 3 SDGs We Move</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {sdgGoals.map(g => (
              <div key={g.number} className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', borderTop: `4px solid ${g.color}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black font-mono text-lg flex-shrink-0" style={{ background: g.color, boxShadow: `4px 4px 10px ${g.color}55` }}>{g.number}</div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest" style={{ color: '#4a5568' }}>SDG {g.number}</div>
                    <div className="text-sm font-black" style={{ color: '#2d3436' }}>{g.title}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#2d3436' }}>{g.contribution}</p>
                <div className="flex flex-col gap-1.5">
                  {featureLinks[g.number].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs" style={{ color: '#4a5568' }}>
                      <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: g.color }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ecosystem */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5" style={{ color: '#ff4757' }} />
            <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>One Platform, Four Stakeholders</h3>
          </div>
          <p className="text-sm mb-6" style={{ color: '#4a5568' }}>Every feature is designed to benefit the whole ecosystem — not just one side of the hiring table.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stakeholders.map(st => (
              <div key={st.label} className="rounded-2xl p-5 text-center" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: st.color, boxShadow: `4px 4px 10px ${st.color}55` }}>
                  <st.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-black text-sm mb-1" style={{ color: '#2d3436' }}>{st.label}</div>
                <div className="text-xs leading-snug" style={{ color: '#4a5568' }}>{st.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
