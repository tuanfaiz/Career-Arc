'use client'
import DashboardLayout from '@/components/DashboardLayout'
import StatCard from '@/components/StatCard'
import { Briefcase, Users, CheckSquare, Clock, Plus, Shield, TrendingUp } from 'lucide-react'

const postedJobs = [
  { title: 'Senior Frontend Engineer', applicants: 47, status: 'Active', posted: '2 Jun 2025', ghost: 'green' },
  { title: 'Data Analyst', applicants: 63, status: 'Active', posted: '28 May 2025', ghost: 'green' },
  { title: 'Product Manager', applicants: 29, status: 'Active', posted: '20 May 2025', ghost: 'green' },
  { title: 'Backend Engineer', applicants: 17, status: 'Closed', posted: '5 Apr 2025', ghost: 'gray' },
]

const recentApplicants = [
  { name: 'Amirul Hakim', role: 'Senior Frontend Engineer', match: 94, status: 'Shortlisted', color: '#00b894', personality: { label: 'Builder', emoji: '🔨', color: '#e17055' } },
  { name: 'Nur Syahirah', role: 'Senior Frontend Engineer', match: 88, status: 'Reviewed', color: '#6c5ce7', personality: { label: 'Architect', emoji: '🏗️', color: '#6c5ce7' } },
  { name: 'Fadzil Azman', role: 'Data Analyst', match: 82, status: 'Pending', color: '#fdcb6e', personality: { label: 'Guardian', emoji: '🛡️', color: '#0984e3' } },
  { name: 'Kavitha Raj', role: 'Data Analyst', match: 79, status: 'Pending', color: '#fdcb6e', personality: { label: 'Visionary', emoji: '💡', color: '#f39c12' } },
  { name: 'Lee Wei Jian', role: 'Product Manager', match: 91, status: 'Interview', color: '#ff4757', personality: { label: 'Connector', emoji: '🤝', color: '#00b894' } },
]

const responseData = [
  { week: 'W1', height: 45 }, { week: 'W2', height: 70 }, { week: 'W3', height: 35 },
  { week: 'W4', height: 80 }, { week: 'W5', height: 55 }, { week: 'W6', height: 90 },
]

export default function EmployerPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Jobs Posted" value="8" icon={<Briefcase size={18} />} />
          <StatCard label="Total Applicants" value="156" icon={<Users size={18} />} />
          <StatCard label="Shortlisted" value="23" icon={<CheckSquare size={18} />} accent />
          <StatCard label="Avg Response Time" value="2.1d" icon={<Clock size={18} />} subtitle="Top 15% of employers" />
        </div>

        {/* Anti-Ghost Score */}
        <div className="card-screw rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #e8f5f3 100%)', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff', border: '1px solid #00b89433' }}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#00b894', boxShadow: '6px 6px 12px rgba(0,184,148,0.3)' }}>
              <Shield size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-black" style={{ color: '#2d3436' }}>Your Anti-Ghost Score</h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: '#00b89422', color: '#00b894', border: '1px solid #00b89444', boxShadow: '0 0 12px rgba(0,184,148,0.2)' }}>
                  🟢 ACTIVE
                </span>
              </div>
              <p className="text-sm mb-1" style={{ color: '#4a5568' }}>
                Your avg response time: <strong className="font-mono" style={{ color: '#00b894' }}>2.1 days</strong> — Top 15% of Malaysian employers
              </p>
              <p className="text-xs" style={{ color: '#4a5568' }}>Candidates are 3x more likely to apply to companies with an Active anti-ghost rating.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black font-mono" style={{ color: '#00b894' }}>A+</div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: '#4a5568' }}>Rating</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[{ label: 'Avg Response', value: '2.1 days' }, { label: 'Ghosting Rate', value: '0%' }, { label: 'Offer Rate', value: '18%' }].map((stat, i) => (
              <div key={i} className="px-4 py-3 rounded-xl text-center" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                <div className="text-lg font-bold font-mono" style={{ color: '#00b894' }}>{stat.value}</div>
                <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: '#4a5568' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Posted Jobs */}
        <div className="card-screw rounded-2xl overflow-hidden" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid #d1d9e6' }}>
            <h3 className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2d3436' }}>Posted Jobs</h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest btn-press" style={{ background: '#ff4757', color: 'white', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
              <Plus size={14} /> Post New Job
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #d1d9e6' }}>
                  {['Job Title', 'Applicants', 'Status', 'Posted', 'Anti-Ghost'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs uppercase tracking-widest font-medium" style={{ color: '#4a5568' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {postedJobs.map((job, i) => (
                  <tr key={i} style={{ borderBottom: i < postedJobs.length - 1 ? '1px solid #e8ecf0' : 'none' }}>
                    <td className="px-6 py-4"><span className="font-medium text-sm" style={{ color: '#2d3436' }}>{job.title}</span></td>
                    <td className="px-6 py-4"><span className="font-mono font-bold text-sm" style={{ color: '#ff4757' }}>{job.applicants}</span></td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: job.status === 'Active' ? '#00b89422' : '#4a556822', color: job.status === 'Active' ? '#00b894' : '#4a5568', border: `1px solid ${job.status === 'Active' ? '#00b89444' : '#4a556844'}` }}>{job.status}</span>
                    </td>
                    <td className="px-6 py-4"><span className="text-xs font-mono" style={{ color: '#4a5568' }}>{job.posted}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: job.ghost === 'green' ? '#00b894' : '#babecc' }} />
                        <span className="text-xs" style={{ color: '#4a5568' }}>{job.ghost === 'green' ? 'Compliant' : 'Archived'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold uppercase tracking-widest text-sm mb-5" style={{ color: '#2d3436' }}>Recent Applicants</h3>
          <div className="flex flex-col gap-3">
            {recentApplicants.map((applicant, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl flex-wrap sm:flex-nowrap" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold font-mono flex-shrink-0" style={{ background: applicant.color }}>
                  {applicant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm" style={{ color: '#2d3436' }}>{applicant.name}</p>
                  <p className="text-xs" style={{ color: '#4a5568' }}>{applicant.role}</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 flex-shrink-0"
                  style={{ background: `${applicant.personality.color}18`, color: applicant.personality.color, border: `1px solid ${applicant.personality.color}33` }}>
                  {applicant.personality.emoji} {applicant.personality.label}
                </span>
                <div className="text-xs font-mono font-bold px-2 py-1 rounded-lg flex-shrink-0" style={{ background: `${applicant.color}22`, color: applicant.color, border: `1px solid ${applicant.color}44` }}>{applicant.match}%</div>
                <span className="px-3 py-1 rounded-full text-xs font-bold flex-shrink-0" style={{ background: `${applicant.color}22`, color: applicant.color, border: `1px solid ${applicant.color}44` }}>{applicant.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Response Chart */}
        <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <h3 className="font-bold uppercase tracking-widest text-sm mb-6" style={{ color: '#2d3436' }}>Response Time Tracker — Last 6 Weeks</h3>
          <div className="flex items-end gap-4" style={{ height: '160px' }}>
            {responseData.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center" style={{ height: '100%', justifyContent: 'flex-end', gap: '6px' }}>
                <div className="text-xs font-mono" style={{ color: '#00b894' }}>{Math.round((100 - bar.height) / 20 + 0.5)}d</div>
                <div className="w-full rounded-t-xl" style={{ height: `${bar.height}%`, background: 'linear-gradient(180deg, #00b894, #00b09b44)', boxShadow: '0 -4px 12px rgba(0,184,148,0.3)', minHeight: '8px' }} />
                <div className="text-xs font-mono" style={{ color: '#4a5568' }}>{bar.week}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 px-4 py-3 rounded-xl flex items-center gap-2" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
            <TrendingUp size={14} style={{ color: '#00b894' }} />
            <span className="text-xs" style={{ color: '#4a5568' }}>Your response time improved by <strong style={{ color: '#00b894' }}>40%</strong> over the last 6 weeks. Keep it up!</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
