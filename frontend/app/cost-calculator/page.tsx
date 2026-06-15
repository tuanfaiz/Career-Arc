'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { mockCostCalculator } from '@/lib/mockData'
import { Car, Home, Fuel, UtensilsCrossed, Calculator, TrendingDown, TrendingUp } from 'lucide-react'

type Job = typeof mockCostCalculator.jobA

function calcNet(job: Job) { return job.salary - (job.rent + job.toll + job.petrol + job.food + job.misc) }

export default function CostCalculatorPage() {
  const [jobA, setJobA] = useState(mockCostCalculator.jobA)
  const [jobB, setJobB] = useState(mockCostCalculator.jobB)

  const netA = calcNet(jobA), netB = calcNet(jobB)
  const diff = netB - netA
  const winner = netA >= netB ? 'A' : 'B'

  function updateJob(which: 'A' | 'B', field: keyof Job, value: string) {
    const setter = which === 'A' ? setJobA : setJobB
    setter(prev => ({ ...prev, [field]: typeof prev[field] === 'number' ? Number(value) : value }))
  }

  const fields: { key: keyof Job; label: string; icon: React.ElementType; color: string }[] = [
    { key: 'salary', label: 'Monthly Salary', icon: Calculator, color: '#00b894' },
    { key: 'rent', label: 'Rent / Mortgage', icon: Home, color: '#0984e3' },
    { key: 'toll', label: 'Toll (monthly)', icon: Car, color: '#fdcb6e' },
    { key: 'petrol', label: 'Petrol', icon: Fuel, color: '#e17055' },
    { key: 'food', label: 'Food & Dining', icon: UtensilsCrossed, color: '#6c5ce7' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2d3436] mb-1">Cost of Living Calculator</h2>
          <p className="text-sm text-[#4a5568]">Gaji besar tapi habis kat tol dan sewa? See your <strong>real</strong> take-home — Malaysia Edition</p>
        </div>

        <div className="p-5 rounded-2xl" style={{ background: winner === 'A' ? 'rgba(0,184,148,0.06)' : 'rgba(9,132,227,0.06)', border: `1px solid ${winner === 'A' ? 'rgba(0,184,148,0.2)' : 'rgba(9,132,227,0.2)'}`, boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: winner === 'A' ? '#00b894' : '#0984e3' }}>
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-[#2d3436] text-lg">{winner === 'A' ? jobA.label : jobB.label} wins!</div>
              <div className="text-sm text-[#4a5568]">After all living costs, nets <strong className="text-accent">RM {Math.abs(diff).toLocaleString()} more</strong> per month</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-xs font-mono text-[#4a5568] uppercase tracking-wider">Annual difference</div>
              <div className="text-2xl font-mono font-bold text-accent">RM {(Math.abs(diff) * 12).toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {(['A', 'B'] as const).map(which => {
            const job = which === 'A' ? jobA : jobB
            const net = which === 'A' ? netA : netB
            const totalCosts = job.rent + job.toll + job.petrol + job.food + job.misc
            const isWinner = winner === which

            return (
              <div key={which} className="rounded-2xl overflow-hidden" style={{ background: '#e0e5ec', boxShadow: isWinner ? `0 0 0 2px ${which === 'A' ? '#00b894' : '#0984e3'}, 8px 8px 16px #babecc, -8px -8px 16px #ffffff` : '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
                <div className="px-6 py-4 border-b border-[#babecc]/30 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#2d3436]">{job.label}</div>
                    {isWinner && <span className="text-xs font-mono font-bold text-[#00b894] uppercase tracking-wider">✓ Better Deal</span>}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-[#4a5568] uppercase tracking-wider">Gross</div>
                    <div className="text-lg font-mono font-bold text-[#2d3436]">RM {job.salary.toLocaleString()}</div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {fields.map(f => (
                    <div key={String(f.key)}>
                      <label className="flex items-center gap-2 text-xs font-mono font-bold text-[#4a5568] uppercase tracking-widest mb-2">
                        <f.icon className="w-3.5 h-3.5" style={{ color: f.color }} />{f.label}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono text-[#4a5568]">RM</span>
                        <input type="number" value={job[f.key] as number} onChange={e => updateJob(which, f.key, e.target.value)}
                          className="w-full h-11 pl-12 pr-4 rounded-xl text-sm font-mono text-[#2d3436] input-recessed" />
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-[#babecc]/50 space-y-2">
                    <div className="flex justify-between text-sm text-[#4a5568]">
                      <span>Total Living Costs</span>
                      <span className="font-mono font-semibold text-[#ff4757]">- RM {totalCosts.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                      <span className="font-bold text-[#2d3436]">Real Take-Home</span>
                      <div className="flex items-center gap-2">
                        {net >= 0 ? <TrendingUp className="w-4 h-4 text-[#00b894]" /> : <TrendingDown className="w-4 h-4 text-[#ff4757]" />}
                        <span className={`text-xl font-mono font-bold ${net >= 0 ? 'text-[#00b894]' : 'text-[#ff4757]'}`}>RM {net.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-[#4a5568] text-center">{((net / job.salary) * 100).toFixed(1)}% of gross salary remains</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-2xl p-6" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold text-[#2d3436] mb-3">Malaysia Commute Reality Check</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { stat: 'RM 400–800/mo', label: 'Average KL commute cost', icon: Car },
              { stat: '2–3 hours', label: 'Daily commute time lost (KL peak)', icon: TrendingDown },
              { stat: 'RM 52,000', label: 'Avg lifetime commute cost (10 yrs)', icon: Calculator },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                <item.icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono font-bold text-[#2d3436] mb-0.5">{item.stat}</div>
                  <div className="text-xs text-[#4a5568]">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
