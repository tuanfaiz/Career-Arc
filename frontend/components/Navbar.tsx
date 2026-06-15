'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Target, LogOut } from 'lucide-react'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-floating' : 'shadow-card'}`}
      style={{ background: '#f0f2f5' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-card" style={{ background: '#ff4757' }}>
            <Target size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: '#2d3436' }}>
            CAREER <span style={{ color: '#ff4757' }}>ARC</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['/#features', '/jobs', '/employer'].map((href, i) => (
            <Link key={href} href={href} className="text-xs uppercase tracking-widest font-medium transition-colors"
              style={{ color: '#4a5568' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#ff4757'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#4a5568'}>
              {['Features', 'Jobs', 'For Employers'][i]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold font-mono"
                  style={{ background: '#ff4757' }}>AH</div>
                <span className="hidden md:block text-sm font-medium" style={{ color: '#2d3436' }}>Amirul Hakim</span>
              </Link>
              <button onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs uppercase tracking-widest font-medium btn-press transition-all"
                style={{ color: '#4a5568', background: '#f0f2f5', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                <LogOut size={14} />
              </button>
            </>
          ) : (
            <>
              <Link href="/login"
                className="px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-medium btn-press transition-all"
                style={{ color: '#2d3436', background: '#f0f2f5', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                Login
              </Link>
              <Link href="/login"
                className="px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-bold text-white btn-press transition-all"
                style={{ background: '#ff4757', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
