'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Target, Zap, GraduationCap, Building2, School, Landmark, ArrowRight } from 'lucide-react'

type Role = 'candidate' | 'employer' | 'university' | 'ministry'

const roles: { r: Role; icon: React.ElementType; label: string; sub: string; name: string; route: string }[] = [
  { r: 'candidate', icon: GraduationCap, label: 'Candidate', sub: 'Job seeker', name: 'Amirul Hakim', route: '/dashboard' },
  { r: 'employer', icon: Building2, label: 'Employer', sub: 'Hiring manager', name: 'Syarikat TechCorp', route: '/employer' },
  { r: 'university', icon: School, label: 'University', sub: 'Career services', name: 'UPM Career Services', route: '/university' },
  { r: 'ministry', icon: Landmark, label: 'Ministry', sub: 'Policy & planning', name: 'MOHE Planning Unit', route: '/ministry' },
]

export default function LoginPage() {
  const router = useRouter()

  function enter(role: typeof roles[number]) {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userRole', role.r)
    localStorage.setItem('userName', role.name)
    if (role.r === 'candidate') {
      // Candidates start at onboarding so the readiness score builds live.
      localStorage.removeItem('onboardingComplete')
      localStorage.removeItem('careerProfile')
      router.push('/onboarding')
    } else {
      router.push(role.route)
    }
  }

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
            <p className="text-sm mt-1" style={{ color: '#4a5568' }}>Career clarity for Gen Z Malaysia</p>
          </div>

          {/* One-click entry — the only way in */}
          <p className="text-xs font-mono font-bold uppercase tracking-widest mb-4 text-center flex items-center justify-center gap-1.5" style={{ color: '#ff4757' }}>
            <Zap size={12} /> Choose a view to enter
          </p>

          <div className="grid grid-cols-2 gap-3">
            {roles.map(role => (
              <button key={role.r} onClick={() => enter(role)}
                className="group flex flex-col items-center gap-1.5 py-5 px-3 rounded-2xl btn-press transition-all"
                style={{ background: '#ff4757', color: '#ffffff', boxShadow: '6px 6px 14px rgba(255,71,87,0.3)' }}>
                <role.icon className="w-6 h-6" />
                <span className="text-sm font-bold">{role.label}</span>
                <span className="text-xs opacity-80">{role.sub}</span>
              </button>
            ))}
          </div>

          <p className="text-xs text-center mt-4 flex items-center justify-center gap-1" style={{ color: '#4a5568' }}>
            No password needed <ArrowRight size={11} /> you land straight in
          </p>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs uppercase tracking-widest" style={{ color: '#4a5568' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
