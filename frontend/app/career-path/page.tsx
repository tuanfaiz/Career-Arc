'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { careerPathData } from '@/lib/mockData'
import { TrendingUp, ArrowRight, CheckCircle } from 'lucide-react'

type PathKey = 'A' | 'B' | 'C'

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
              <h2 className="text-2xl font-black" style={{ color: '#2d3436' }}>Your 40-Year Career Arc</h2>
              <p className="text-sm mt-1" style={{ color: '#4a5568' }}>{careerPathData.name} · {careerPathData.degree}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="card-screw rounded-2xl p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-6" style={{ color: '#2d3436' }}>Career Timeline</h3>
          <div className="overflow-x-auto pb-4">
            <div className="flex items-stretch gap-0" style={{ minWidth: '900px' }}>
              {careerPathData.nodes.map((node, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="text-xs font-mono font-bold mb-3" style={{ color: '#4a5568' }}>{node.year === 0 ? 'NOW' : `Year ${node.year}`}</div>
                    <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-center"
                      style={node.current ? { background: '#ff4757', boxShadow: '6px 6px 12px rgba(255,71,87,0.4)' }
                        : node.fork ? { background: '#2d3436', boxShadow: '6px 6px 12px rgba(45,52,54,0.3)' }
                        : { background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                      <span className="text-xs font-bold leading-tight" style={{ color: node.current || node.fork ? 'white' : '#2d3436' }}>
                        {node.role.split(' ').map((w, wi) => <span key={wi}>{w}<br /></span>)}
                      </span>
                    </div>
                    <div className="text-xs font-mono font-bold mt-3" style={{ color: node.current ? '#ff4757' : '#4a5568' }}>{fmt(node.salary)}</div>
                  </div>
                  {i < careerPathData.nodes.length - 1 && (
                    <div className="flex items-center mx-3 mt-1">
                      <div className="h-0.5 w-12" style={{ background: 'linear-gradient(90deg, #babecc, #ff4757)' }} />
                      <ArrowRight size={14} style={{ color: '#ff4757' }} />
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center mx-4">
                <div className="h-0.5 w-8" style={{ background: '#ff4757' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff4757', boxShadow: '0 0 8px rgba(255,71,87,0.6)' }} />
              </div>
              <div className="flex items-center">
                {path.nodes.slice(1).map((node, i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="text-xs font-mono font-bold mb-3" style={{ color: '#4a5568' }}>Year {node.year}</div>
                      <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-center"
                        style={{ background: path.color, boxShadow: `6px 6px 12px ${path.color}44`, opacity: 0.85 + i * 0.05 }}>
                        <span className="text-xs font-bold text-white leading-tight">
                          {node.role.split(' ').map((w, wi) => <span key={wi}>{w}<br /></span>)}
                        </span>
                      </div>
                      <div className="text-xs font-mono font-bold mt-3" style={{ color: path.color }}>{fmt(node.salary)}</div>
                    </div>
                    {i < path.nodes.slice(1).length - 1 && (
                      <div className="flex items-center mx-3 mt-1">
                        <div className="h-0.5 w-10" style={{ background: path.color + '66' }} />
                        <ArrowRight size={14} style={{ color: path.color }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
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

        <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ background: '#ff4757', boxShadow: '8px 8px 16px rgba(255,71,87,0.3)' }}>
          <div>
            <p className="text-sm font-bold text-white opacity-80 uppercase tracking-widest mb-1">AI Insight</p>
            <p className="text-lg font-bold text-white">Add Next.js Advanced + AWS → <span className="font-mono">+40%</span> salary potential</p>
            <p className="text-sm text-white opacity-70 mt-1">Based on 847 similar profiles in Malaysia</p>
          </div>
          <button className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest btn-press flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
            View Learning Path
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
