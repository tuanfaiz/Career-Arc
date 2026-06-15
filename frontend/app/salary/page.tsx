'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { DollarSign, TrendingUp } from 'lucide-react'

const benchmarks = [
  { label: '25th Percentile', value: 4200, width: 44, color: '#babecc' },
  { label: 'Median', value: 6800, width: 71, color: '#6c5ce7' },
  { label: '75th Percentile', value: 9500, width: 100, color: '#ff4757' },
]

const skillBumps = [
  { skill: 'AWS Certification', bump: '+RM 2,500/month', color: '#ff4757' },
  { skill: 'System Design', bump: '+RM 3,000/month', color: '#6c5ce7' },
  { skill: 'Kubernetes', bump: '+RM 1,800/month', color: '#00b09b' },
  { skill: 'Tech Lead Skills', bump: '+RM 4,500/month', color: '#fdcb6e' },
  { skill: 'Machine Learning', bump: '+RM 2,800/month', color: '#e17055' },
]

export default function SalaryPage() {
  const [role, setRole] = useState('Frontend Engineer')
  const [experience, setExperience] = useState('Mid (3-5 years)')
  const [location, setLocation] = useState('Kuala Lumpur')
  const [currentSalary, setCurrentSalary] = useState('6000')
  const [showScript, setShowScript] = useState(false)

  const YOUR_SALARY = parseInt(currentSalary) || 6000
  const median = 6800
  const pctFromMedian = Math.round(((YOUR_SALARY - median) / median) * 100)
  const markerPos = Math.min(Math.max(((YOUR_SALARY - 3000) / (9500 - 3000)) * 100, 0), 100)

  const script = `Subject: Salary Discussion — ${role} Position

Dear [Hiring Manager],

Thank you for extending the offer for the ${role} position. I'm genuinely excited about the opportunity to join your team.

After researching the market for ${role} roles in ${location}, the median salary sits at RM ${median.toLocaleString()}/month, with top performers at RM 9,500/month.

Given my ${experience} of experience and track record of delivering [specific achievement], I'd like to respectfully request a base salary of RM ${(YOUR_SALARY * 1.15).toLocaleString()}/month.

I'm confident this reflects both market rates and the value I'll bring. I'm open to discussing the full compensation package.

Best regards,
Amirul Hakim`

  const ic = "input-recessed w-full px-4 py-3 rounded-xl text-sm"
  const is = { color: '#2d3436' }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="card-screw rounded-2xl p-8" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h2 className="text-2xl font-black mb-2" style={{ color: '#2d3436' }}>Are You Paid What You&apos;re Worth?</h2>
          <p className="text-sm" style={{ color: '#4a5568' }}>Malaysia-specific salary benchmarks for tech & professional roles. Know your worth before you negotiate.</p>
        </div>

        <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: '#2d3436' }}>Your Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Current Role</label>
              <input type="text" value={role} onChange={e => setRole(e.target.value)} className={ic} style={is} /></div>
            <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Experience Level</label>
              <select value={experience} onChange={e => setExperience(e.target.value)} className={ic} style={is}>
                <option>Junior (0-2 years)</option><option>Mid (3-5 years)</option><option>Senior (5+ years)</option>
              </select></div>
            <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} className={ic} style={is}>
                {['Kuala Lumpur', 'Cyberjaya', 'Petaling Jaya', 'Penang', 'Johor Bahru'].map(l => <option key={l}>{l}</option>)}
              </select></div>
            <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Current Salary (RM/month)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-sm" style={{ color: '#ff4757' }}>RM</span>
                <input type="number" value={currentSalary} onChange={e => setCurrentSalary(e.target.value)} className="input-recessed w-full pl-12 pr-4 py-3 rounded-xl text-sm font-mono" style={is} />
              </div></div>
          </div>
        </div>

        <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-2" style={{ color: '#2d3436' }}>Market Benchmark — {role} in {location}</h3>
          <p className="text-xs mb-6" style={{ color: '#4a5568' }}>Based on 1,243 salary reports from Malaysian professionals</p>
          <div className="flex flex-col gap-4 mb-6">
            {benchmarks.map(bar => (
              <div key={bar.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#4a5568' }}>{bar.label}</span>
                  <span className="text-sm font-bold font-mono" style={{ color: bar.color === '#babecc' ? '#4a5568' : bar.color }}>RM {bar.value.toLocaleString()}</span>
                </div>
                <div className="h-8 rounded-xl overflow-hidden" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                  <div className="h-full rounded-xl flex items-center px-4" style={{ width: `${bar.width}%`, background: bar.color === '#babecc' ? 'linear-gradient(90deg, #babecc, #c8ccd8)' : `linear-gradient(90deg, ${bar.color}88, ${bar.color})` }}>
                    <span className="text-xs font-mono font-bold" style={{ color: bar.color === '#babecc' ? '#4a5568' : 'white' }}>RM {bar.value.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="h-3 rounded-full mb-2" style={{ background: 'linear-gradient(90deg, #e0e5ec, #babecc, #6c5ce7, #ff4757)' }} />
            <div className="absolute top-0 h-3 w-1 rounded-full" style={{ left: `${markerPos}%`, background: '#2d3436', boxShadow: '0 0 6px rgba(45,52,54,0.5)' }} />
            <div className="flex justify-between mt-1">
              <span className="text-xs font-mono" style={{ color: '#4a5568' }}>RM 3,000</span>
              <span className="text-xs font-mono" style={{ color: '#4a5568' }}>RM 9,500+</span>
            </div>
          </div>
          <div className="mt-4 px-4 py-3 rounded-xl flex items-center gap-3" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
            <DollarSign size={14} style={{ color: '#ff4757' }} />
            <span className="text-sm" style={{ color: '#2d3436' }}>
              Your salary: <strong className="font-mono" style={{ color: '#ff4757' }}>RM {Number(currentSalary || 0).toLocaleString()}</strong>
              {' '}<span style={{ color: pctFromMedian >= 0 ? '#00b894' : '#ff4757' }}>({pctFromMedian >= 0 ? '+' : ''}{pctFromMedian}% vs median)</span>
            </span>
          </div>
        </div>

        <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: '#2d3436' }}>Negotiation Script Generator</h3>
          <button onClick={() => setShowScript(!showScript)}
            className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest btn-press mb-4"
            style={{ background: '#ff4757', color: 'white', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
            {showScript ? 'Hide Script' : 'Generate Negotiation Script'}
          </button>
          {showScript && (
            <div className="rounded-xl p-5 font-mono text-xs leading-relaxed whitespace-pre-wrap" style={{ background: '#2d3436', color: '#e0e5ec', boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.3)' }}>
              {script}
            </div>
          )}
        </div>

        <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: '#2d3436' }}>Skills That Pay More</h3>
          <div className="flex flex-col gap-3">
            {skillBumps.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-sm font-medium" style={{ color: '#2d3436' }}>{item.skill}</span>
                </div>
                <span className="text-sm font-bold font-mono" style={{ color: item.color }}>{item.bump}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
