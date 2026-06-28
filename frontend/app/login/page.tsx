'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Target, Eye, EyeOff, AlertCircle, Zap, GraduationCap, Building2, School, Landmark } from 'lucide-react'

type Role = 'candidate' | 'employer' | 'university' | 'ministry'

const demoAccounts: Record<Role, { email: string; password: string; name: string; route: string; label: string }> = {
  candidate: { email: 'demo@careerarc.my', password: 'demo123', name: 'Amirul Hakim', route: '/dashboard', label: 'Candidate' },
  employer: { email: 'employer@careerarc.my', password: 'demo123', name: 'Syarikat TechCorp', route: '/employer', label: 'Employer' },
  university: { email: 'university@careerarc.my', password: 'demo123', name: 'UPM Career Services', route: '/university', label: 'University' },
  ministry: { email: 'ministry@careerarc.my', password: 'demo123', name: 'MOHE Planning Unit', route: '/ministry', label: 'Ministry' },
}

export default function LoginPage() {
  const [role, setRole] = useState<Role>('candidate')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function fillDemo() {
    const acc = demoAccounts[role]
    setEmail(acc.email)
    setPassword(acc.password)
    setError('')
  }

  function selectRole(r: Role) {
    setRole(r)
    setEmail('')
    setPassword('')
    setError('')
  }

  function quickLogin(r: Role) {
    const acc = demoAccounts[r]
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userRole', r)
    localStorage.setItem('userName', acc.name)
    if (r === 'candidate') {
      localStorage.removeItem('onboardingComplete')
      localStorage.removeItem('careerProfile')
      router.push('/onboarding')
    } else {
      router.push(acc.route)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))

    const acc = demoAccounts[role]
    if (email === acc.email && password === acc.password) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userRole', role)
      localStorage.setItem('userName', acc.name)
      router.push(acc.route)
    } else {
      setError(`Invalid credentials. Try: ${acc.email} / demo123`)
      setLoading(false)
    }
  }

  const roleLabel = demoAccounts[role].label

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ background: '#e0e5ec' }}>
      <div className="w-full max-w-md">
        <div className="card-screw rounded-3xl p-8 sm:p-10" style={{ background: '#f0f2f5', boxShadow: '16px 16px 32px #babecc, -16px -16px 32px #ffffff' }}>

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#ff4757', boxShadow: '6px 6px 14px rgba(255,71,87,0.3)' }}>
              <Target size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-widest" style={{ color: '#2d3436' }}>
              CAREER <span style={{ color: '#ff4757' }}>ARC</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: '#4a5568' }}>Navigate your 40-year career journey</p>
          </div>

          {/* One-click demo access (for judges) */}
          <div className="mb-6">
            <p className="text-xs font-mono font-bold uppercase tracking-widest mb-3 text-center flex items-center justify-center gap-1.5" style={{ color: '#ff4757' }}>
              <Zap size={12} /> One-click demo access
            </p>
            <div className="grid grid-cols-2 gap-3">
              {([
                { r: 'candidate' as Role, icon: GraduationCap, label: 'Candidate' },
                { r: 'employer' as Role, icon: Building2, label: 'Employer' },
                { r: 'university' as Role, icon: School, label: 'University' },
                { r: 'ministry' as Role, icon: Landmark, label: 'Ministry' },
              ]).map(({ r, icon: Icon, label }) => (
                <button key={r} onClick={() => quickLogin(r)}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-bold btn-press transition-all"
                  style={{ background: '#ff4757', color: '#ffffff', boxShadow: '4px 4px 10px rgba(255,71,87,0.3)' }}>
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-center mt-2" style={{ color: '#4a5568' }}>Enter instantly — no password needed.</p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: '#d1d9e6' }} />
            <span className="text-xs uppercase tracking-widest" style={{ color: '#4a5568' }}>or sign in manually</span>
            <div className="flex-1 h-px" style={{ background: '#d1d9e6' }} />
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-xs font-mono font-bold uppercase tracking-widest mb-3 text-center" style={{ color: '#4a5568' }}>I am a...</p>
            <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl" style={{ background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff' }}>
              {([
                { r: 'candidate' as Role, icon: GraduationCap, label: 'Candidate', sub: 'Job seeker' },
                { r: 'employer' as Role, icon: Building2, label: 'Employer', sub: 'Hiring manager' },
                { r: 'university' as Role, icon: School, label: 'University', sub: 'Career services' },
                { r: 'ministry' as Role, icon: Landmark, label: 'Ministry', sub: 'Policy & planning' },
              ]).map(({ r, icon: Icon, label, sub }) => (
                <button
                  key={r}
                  onClick={() => selectRole(r)}
                  className="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl transition-all duration-200 btn-press"
                  style={{
                    background: role === r ? '#ff4757' : '#e0e5ec',
                    boxShadow: role === r
                      ? '4px 4px 10px rgba(255,71,87,0.35), -2px -2px 6px rgba(255,255,255,0.5)'
                      : '4px 4px 8px #babecc, -4px -4px 8px #ffffff',
                    color: role === r ? '#ffffff' : '#4a5568',
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-bold">{label}</span>
                  <span className="text-xs opacity-80">{sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Demo button */}
          <button onClick={fillDemo}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl mb-5 text-xs uppercase tracking-widest font-bold btn-press transition-all"
            style={{ background: '#e0e5ec', color: '#ff4757', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff', border: '1px solid #d1d9e6' }}>
            <Zap size={14} />
            Use Demo {roleLabel} Account
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: '#d1d9e6' }} />
            <span className="text-xs uppercase tracking-widest" style={{ color: '#4a5568' }}>or sign in</span>
            <div className="flex-1 h-px" style={{ background: '#d1d9e6' }} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Email Address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={demoAccounts[role].email}
                className="input-recessed w-full px-4 py-3 rounded-xl text-sm font-mono"
                style={{ color: '#2d3436' }} required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="demo123"
                  className="input-recessed w-full px-4 py-3 rounded-xl text-sm font-mono pr-12"
                  style={{ color: '#2d3436' }} required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#4a5568' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#fff0f1', border: '1px solid #ff4757' }}>
                <AlertCircle size={16} style={{ color: '#ff4757', flexShrink: 0 }} />
                <span className="text-xs" style={{ color: '#ff4757' }}>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-white btn-press transition-all mt-1"
              style={{ background: '#ff4757', boxShadow: '6px 6px 12px rgba(255,71,87,0.3)', opacity: loading ? 0.8 : 1 }}>
              {loading ? 'Signing in...' : `Login as ${roleLabel}`}
            </button>
          </form>

          <div className="mt-5 p-4 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
            <p className="text-xs text-center font-mono" style={{ color: '#4a5568' }}>
              Demo: <span style={{ color: '#ff4757' }}>{demoAccounts[role].email}</span> / <span style={{ color: '#2d3436' }}>demo123</span>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs uppercase tracking-widest" style={{ color: '#4a5568' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
