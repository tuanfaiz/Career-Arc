'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { careerPathData, futureProof } from '@/lib/mockData'
import { TrendingUp, ArrowRight, CheckCircle, Sparkles, Telescope, ShieldCheck, AlertTriangle, Calendar } from 'lucide-react'

type PathKey = 'A' | 'B' | 'C'

const pathInsights: Record<PathKey, { headline: string; sub: string; cta: string }> = {
  A: {
    headline: 'Add System Design + AWS → +40% salary potential by Year 8',
    sub: 'Tech-track promotions in Malaysia hinge on architecture ownership. Based on 847 similar profiles, engineers who close these two gaps reach Tech Lead 2.3 years faster.',
    cta: 'View Learning Path',
  },
  B: {
    headline: 'Add Product Thinking + Data Analytics → −18% dip now, +32% above tech track by Year 12',
    sub: 'PM pivots take a short-term salary cut at Associate PM, then out-earn the pure tech track long-term. Based on 412 engineer-to-PM pivots, stakeholder management is the #1 differentiator.',
    cta: 'View PM Transition Plan',
  },
  C: {
    headline: 'Build Client Management + Personal Branding first — survive the founder dip 3× more often',
    sub: 'Founders who start with 2+ freelance retainer clients keep income above RM 8K during the startup dip. Based on 156 founder paths, financial runway — not the idea — is the top failure cause.',
    cta: 'View Founder Roadmap',
  },
}

const currentSkills = ['React', 'Node.js', 'Python', 'SQL', 'TypeScript', 'Git']
const skillsNeeded: Record<PathKey, Array<{ name: string; current: number; needed: number }>> = {
  A: [
    { name: 'System Design', current: 30, needed: 90 },
    { name: 'Team Leadership', current: 20, needed: 85 },
    { name: 'AWS / Cloud', current: 40, needed: 80 },
    { name: 'TypeScript Advanced', current: 60, needed: 90 },
    { name: 'Architecture Patterns', current: 25, needed: 85 },
  ],
  B: [
    { name: 'Product Thinking', current: 35, needed: 90 },
    { name: 'User Research', current: 20, needed: 85 },
    { name: 'Data Analytics', current: 45, needed: 80 },
    { name: 'Roadmapping (Jira)', current: 30, needed: 75 },
    { name: 'Stakeholder Mgmt', current: 15, needed: 80 },
  ],
  C: [
    { name: 'Business Development', current: 20, needed: 85 },
    { name: 'Freelance Platforms', current: 40, needed: 70 },
    { name: 'Client Management', current: 25, needed: 80 },
    { name: 'Financial Management', current: 15, needed: 75 },
    { name: 'Personal Branding', current: 30, needed: 85 },
  ],
}

export default function CareerPathPage() {
  const [selectedPath, setSelectedPath] = useState<PathKey>('A')
  const path = careerPathData.paths[selectedPath]
  const fmt = (n: number) => `RM ${n.toLocaleString()}`

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="card-screw rounded-2xl p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#ff4757', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
              <TrendingUp size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black" style={{ color: '#2d3436' }}>Your Next 4 Years</h2>
              <p className="text-sm mt-1" style={{ color: '#4a5568' }}>{careerPathData.name} · {careerPathData.degree}</p>
              <p className="text-sm mt-2" style={{ color: '#4a5568' }}>
                A plan you can actually act on — not a 40-year fantasy. What comes after 4 years is shown separately, as <strong>scenarios</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Path Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(careerPathData.paths) as PathKey[]).map(key => {
            const p = careerPathData.paths[key]
            const isActive = selectedPath === key
            return (
              <button key={key} onClick={() => setSelectedPath(key)}
                className="rounded-2xl p-6 text-left transition-all btn-press card-hover"
                style={isActive ? { background: p.color, boxShadow: `8px 8px 16px ${p.color}44` }
                  : { background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
                <div className="text-xs font-bold font-mono mb-2" style={{ color: isActive ? 'rgba(255,255,255,0.7)' : '#4a5568' }}>PATH {key}</div>
                <div className="text-sm font-bold mb-3" style={{ color: isActive ? 'white' : '#2d3436' }}>{p.label}</div>
                <div className="text-xs font-mono font-bold" style={{ color: isActive ? 'rgba(255,255,255,0.9)' : p.color }}>
                  Up to {fmt(p.nodes[p.nodes.length - 1].salary)}/mo
                </div>
              </button>
            )
          })}
        </div>

        {/* The 4-year plan — concrete and actionable */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5" style={{ color: path.color }} />
            <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Your 4-Year Plan — {path.label}</h3>
          </div>
          <p className="text-sm mb-6" style={{ color: '#4a5568' }}>Year by year, what to actually <strong>do</strong> — not just what to become.</p>
          <div className="flex flex-col gap-3">
            {careerPathData.fourYear[selectedPath].map(y => (
              <div key={y.year} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                <div className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: path.color, boxShadow: `3px 3px 8px ${path.color}55` }}>
                  <span className="text-xs font-black text-white leading-none">YR</span>
                  <span className="text-sm font-black text-white font-mono leading-none mt-0.5">{y.year}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-bold" style={{ color: '#2d3436' }}>{y.role}</span>
                    <span className="text-xs font-mono font-bold" style={{ color: path.color }}>{fmt(y.salary)}/mo</span>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: '#4a5568' }}>{y.doThis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beyond 4 years — scenarios, not predictions */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center gap-2 mb-1">
            <Telescope className="w-5 h-5" style={{ color: '#4a5568' }} />
            <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Beyond 4 Years — Scenarios, Not Predictions</h3>
          </div>
          <p className="text-sm mb-5" style={{ color: '#4a5568' }}>
            The world changes too fast to promise you a 40-year path. These are scenarios to <em>think with</em> — not forecasts.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {(['2030', '2040'] as const).map(yr => (
              <div key={yr} className="rounded-xl p-5" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                <div className="text-2xl font-black font-mono mb-2" style={{ color: '#4a5568' }}>{yr}</div>
                <p className="text-sm leading-relaxed" style={{ color: '#2d3436' }}>{careerPathData.scenarios[selectedPath][yr]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future-proof check */}
        <div className="card-screw rounded-2xl p-6 sm:p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5" style={{ color: '#00b894' }} />
            <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Future-Proof Check</h3>
          </div>
          <p className="text-sm mb-5" style={{ color: '#4a5568' }}>
            Nobody wants to be the 40-year-old whose skills stopped mattering. Here is what actually lasts.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl p-5" style={{ background: '#f0faf8', border: '1px solid #00b89433' }}>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#00b894' }}>
                <ShieldCheck className="w-3.5 h-3.5" /> Durable — invest here
              </div>
              <div className="flex flex-col gap-2.5">
                {futureProof.durable.map(d => (
                  <div key={d.skill}>
                    <div className="text-sm font-bold" style={{ color: '#2d3436' }}>{d.skill}</div>
                    <div className="text-xs" style={{ color: '#4a5568' }}>{d.why}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-5" style={{ background: '#fffaf0', border: '1px solid #f39c1233' }}>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#f39c12' }}>
                <AlertTriangle className="w-3.5 h-3.5" /> At risk — don&apos;t build a career on these
              </div>
              <div className="flex flex-col gap-2.5">
                {futureProof.atRisk.map(d => (
                  <div key={d.skill}>
                    <div className="text-sm font-bold" style={{ color: '#2d3436' }}>{d.skill}</div>
                    <div className="text-xs" style={{ color: '#4a5568' }}>{d.why}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: '#2d3436' }}>✓ Current Skills</h3>
            <div className="flex flex-wrap gap-2">
              {currentSkills.map(skill => (
                <div key={skill} className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ background: '#00b89422', border: '1px solid #00b89444' }}>
                  <CheckCircle size={12} style={{ color: '#00b894' }} />
                  <span className="text-sm font-medium" style={{ color: '#00b894' }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: '#2d3436' }}>Skills Gap — Path {selectedPath}</h3>
            <div className="flex flex-col gap-4">
              {skillsNeeded[selectedPath].map(skill => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm" style={{ color: '#2d3436' }}>{skill.name}</span>
                    <span className="text-xs font-mono" style={{ color: '#4a5568' }}>{skill.current}% → {skill.needed}%</span>
                  </div>
                  <div className="relative h-2 rounded-full overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc' }}>
                    <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${skill.needed}%`, background: path.color, opacity: 0.25 }} />
                    <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${skill.current}%`, background: '#00b894' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300"
          style={{ background: path.color, boxShadow: `8px 8px 16px ${path.color}44` }}>
          <div>
            <p className="text-sm font-bold text-white opacity-80 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Insight · Path {selectedPath}
            </p>
            <p className="text-lg font-bold text-white">{pathInsights[selectedPath].headline}</p>
            <p className="text-sm text-white opacity-70 mt-1">{pathInsights[selectedPath].sub}</p>
          </div>
          <button className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest btn-press flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
            {pathInsights[selectedPath].cta}
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
