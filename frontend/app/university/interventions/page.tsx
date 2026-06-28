'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { candidates, whyRecommendation, type ScoredCandidate } from '@/lib/careerData'
import { riskMeta, CRS_LABELS, type CrsBreakdown, type Risk } from '@/lib/scoring'
import { ListChecks, X, Sparkles, Stethoscope, ChevronRight } from 'lucide-react'

const riskFilters: (Risk | 'all')[] = ['all', 'high', 'medium', 'low']
const ActionIcon = Stethoscope

export default function InterventionsPage() {
  const [risk, setRisk] = useState<Risk | 'all'>('all')
  const [programme, setProgramme] = useState('All')
  const [selected, setSelected] = useState<ScoredCandidate | null>(null)

  const programmes = ['All', ...Array.from(new Set(candidates.map(c => c.programme)))]
  const list = candidates
    .filter(c => (risk === 'all' || c.risk === risk) && (programme === 'All' || c.programme === programme))
    .sort((a, b) => a.crs - b.crs)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#6c5ce7', boxShadow: '4px 4px 10px rgba(108,92,231,0.3)' }}>
            <ListChecks className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#2d3436' }}>Student Intervention Queue</h2>
            <p className="text-sm" style={{ color: '#4a5568' }}>{list.length} students · sorted by readiness, lowest first — act on the red rows first.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {riskFilters.map(r => (
            <button key={r} onClick={() => setRisk(r)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-press"
              style={risk === r
                ? { background: r === 'all' ? '#6c5ce7' : riskMeta[r as Risk].color, color: '#fff', boxShadow: '3px 3px 8px rgba(0,0,0,0.15)' }
                : { background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
              {r === 'all' ? 'All risk' : riskMeta[r as Risk].label}
            </button>
          ))}
          <div className="ml-auto">
            <select value={programme} onChange={e => setProgramme(e.target.value)}
              className="h-9 pl-3 pr-8 rounded-xl text-xs font-mono input-recessed appearance-none cursor-pointer" style={{ color: '#2d3436' }}>
              {programmes.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Queue */}
        <div className="card-screw rounded-2xl overflow-hidden" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr style={{ borderBottom: '1px solid #d1d9e6' }}>
                  {['Student', 'Programme', 'CRS', 'Risk', 'Issue detected', 'Suggested action', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-widest font-medium" style={{ color: '#4a5568' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map((c, i) => {
                  const rm = riskMeta[c.risk]
                  return (
                    <tr key={c.id} style={{ borderBottom: i < list.length - 1 ? '1px solid #e8ecf0' : 'none' }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-mono flex-shrink-0" style={{ background: rm.color }}>{c.initials}</div>
                          <span className="text-sm font-medium" style={{ color: '#2d3436' }}>{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span className="text-xs" style={{ color: '#4a5568' }}>{c.programme}</span></td>
                      <td className="px-4 py-3"><span className="text-sm font-mono font-bold" style={{ color: rm.color }}>{c.crs}</span></td>
                      <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: rm.bg, color: rm.color }}>{rm.label}</span></td>
                      <td className="px-4 py-3"><span className="text-xs" style={{ color: '#4a5568' }}>{c.issue}</span></td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: '#6c5ce718', color: '#6c5ce7' }}>
                          <ActionIcon className="w-3 h-3" />{c.action}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelected(c)} className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 btn-press" style={{ color: '#6c5ce7' }}>
                          Why? <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Why panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(45,52,54,0.3)', backdropFilter: 'blur(2px)' }} onClick={() => setSelected(null)}>
          <div className="w-full max-w-md h-full overflow-y-auto p-6" style={{ background: '#f0f2f5', boxShadow: '-8px 0 24px #babecc' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Why this recommendation?</h3>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg flex items-center justify-center btn-press" style={{ background: '#e0e5ec', boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #ffffff', color: '#4a5568' }}><X className="w-4 h-4" /></button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold font-mono" style={{ background: riskMeta[selected.risk].color }}>{selected.initials}</div>
              <div>
                <div className="font-bold" style={{ color: '#2d3436' }}>{selected.name}</div>
                <div className="text-xs" style={{ color: '#4a5568' }}>{selected.programme} · {selected.animalEmoji} {selected.animal}</div>
              </div>
              <div className="ml-auto text-right">
                <div className="text-2xl font-black font-mono" style={{ color: riskMeta[selected.risk].color }}>{selected.crs}</div>
                <div className="text-xs" style={{ color: '#4a5568' }}>readiness</div>
              </div>
            </div>

            {/* breakdown */}
            <div className="space-y-2.5 mb-5">
              {(Object.keys(selected.breakdown) as (keyof CrsBreakdown)[]).map(k => (
                <div key={k}>
                  <div className="flex justify-between text-xs mb-1" style={{ color: '#4a5568' }}><span>{CRS_LABELS[k]}</span><span className="font-mono font-bold">{selected.breakdown[k]}</span></div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 1px 1px 2px #babecc, inset -1px -1px 2px #ffffff' }}>
                    <div className="h-full rounded-full" style={{ width: `${selected.breakdown[k]}%`, background: riskMeta[selected.risk].color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 mb-5" style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #f3f0fb 100%)', border: '1px solid #6c5ce733' }}>
              <div className="flex items-center gap-1.5 mb-1.5"><Sparkles className="w-3.5 h-3.5" style={{ color: '#6c5ce7' }} /><span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6c5ce7' }}>AI reasoning</span></div>
              <p className="text-sm" style={{ color: '#2d3436' }}>{whyRecommendation(selected)}</p>
            </div>

            <button className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest text-white btn-press flex items-center justify-center gap-2" style={{ background: '#6c5ce7', boxShadow: '4px 4px 10px rgba(108,92,231,0.3)' }}>
              <ActionIcon className="w-4 h-4" /> Assign: {selected.action}
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
