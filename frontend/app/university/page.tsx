'use client'
import DashboardLayout from '@/components/DashboardLayout'
import StatCard from '@/components/StatCard'
import { mockUniversityStats as s } from '@/lib/mockData'
import { Users, TrendingUp, Clock, DollarSign, GraduationCap, Building2, Target, BarChart3 } from 'lucide-react'

export default function UniversityPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #f3f0fb 100%)', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: '1px solid #6c5ce733' }}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#6c5ce7', boxShadow: '4px 4px 10px rgba(108,92,231,0.3)' }}>
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#2d3436' }}>{s.name}</h2>
              <p className="text-sm mt-1" style={{ color: '#4a5568' }}>Graduate Tracer Study · Career Services Dashboard · Class of 2024</p>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Graduates Tracked" value={s.graduatesTracked.toLocaleString()} icon={<Users size={18} />} />
          <StatCard label="Employment Rate" value={`${s.employmentRate}%`} icon={<TrendingUp size={18} />} accent />
          <StatCard label="Avg Time-to-Hire" value={`${s.avgTimeToHire}mo`} icon={<Clock size={18} />} subtitle="From graduation" />
          <StatCard label="Avg Starting Salary" value={`RM ${s.avgStartingSalary.toLocaleString()}`} icon={<DollarSign size={18} />} />
        </div>

        {/* Employability by program */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5" style={{ color: '#6c5ce7' }} />
            <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Employability by Programme</h3>
          </div>
          <div className="flex flex-col gap-4">
            {s.programs.map(p => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium" style={{ color: '#2d3436' }}>{p.name}</span>
                  <span className="text-xs font-mono" style={{ color: '#4a5568' }}>{p.grads} grads · <strong style={{ color: '#6c5ce7' }}>{p.employed}% employed</strong></span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.employed}%`, background: 'linear-gradient(90deg, #6c5ce7, #a29bfe)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Outcomes pipeline */}
          <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="flex items-center gap-2 mb-5">
              <Target className="w-5 h-5" style={{ color: '#6c5ce7' }} />
              <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Graduate Outcomes Pipeline</h3>
            </div>
            <div className="flex flex-col gap-3">
              {s.pipeline.map(step => (
                <div key={step.stage} className="flex items-center gap-3">
                  <span className="text-xs font-medium w-32 flex-shrink-0" style={{ color: '#4a5568' }}>{step.stage}</span>
                  <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                    <div className="h-full rounded-lg flex items-center justify-end px-2 transition-all duration-700" style={{ width: `${step.pct}%`, background: 'linear-gradient(90deg, #6c5ce7, #a29bfe)' }}>
                      <span className="text-xs font-mono font-bold text-white">{step.value.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top hiring partners */}
          <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="flex items-center gap-2 mb-5">
              <Building2 className="w-5 h-5" style={{ color: '#6c5ce7' }} />
              <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Top Hiring Partners</h3>
            </div>
            <div className="flex flex-col gap-3">
              {s.topPartners.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black font-mono flex-shrink-0" style={{ background: '#6c5ce722', color: '#6c5ce7' }}>{i + 1}</span>
                  <span className="flex-1 text-sm font-medium" style={{ color: '#2d3436' }}>{c.name}</span>
                  <span className="text-xs font-mono font-bold" style={{ color: '#6c5ce7' }}>{c.hires} hires</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* In-field note */}
        <div className="card-screw rounded-2xl p-6 flex items-center gap-4 flex-wrap" style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #e8f5f3 100%)', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: '1px solid #00b89433' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#00b894', boxShadow: '4px 4px 10px rgba(0,184,148,0.3)' }}>
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm" style={{ color: '#2d3436' }}><strong style={{ color: '#00b894' }}>{s.withinField}%</strong> of employed graduates are working <strong>within their field of study</strong> — feeding directly into curriculum reviews and SDG 4 reporting.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
