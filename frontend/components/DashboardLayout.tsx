'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard, Search, TrendingUp, BookOpen,
  ScanLine, DollarSign, Calculator, User, Bell, LogOut,
  Building2, ChevronRight, MessageSquare, MailOpen, Menu, X, Target, FileText, PawPrint,
  School, Landmark, Globe, ListChecks, BarChart3
} from 'lucide-react'

type NavItem = { href: string; icon: React.ElementType; label: string }
type NavGroup = { label: string; items: NavItem[] }

const candidateGroups: NavGroup[] = [
  {
    label: 'Home',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'My Profile',
    items: [
      { href: '/profile', icon: User, label: 'My Profile' },
      { href: '/resume-builder', icon: FileText, label: 'Resume Builder' },
      { href: '/portfolio', icon: BookOpen, label: 'Portfolio' },
      { href: '/aptitude-test', icon: PawPrint, label: 'YourAnimal Test' },
    ],
  },
  {
    label: 'Find Jobs',
    items: [
      { href: '/jobs', icon: Search, label: 'Job Search' },
      { href: '/companies', icon: Building2, label: 'Companies' },
      { href: '/ats-scanner', icon: ScanLine, label: 'ATS Scanner' },
    ],
  },
  {
    label: 'Career Tools',
    items: [
      { href: '/career-path', icon: TrendingUp, label: 'Career Path' },
      { href: '/salary', icon: DollarSign, label: 'Salary Insights' },
      { href: '/cost-calculator', icon: Calculator, label: 'Cost Calculator' },
    ],
  },
  {
    label: 'AI Coach',
    items: [
      { href: '/career-coach', icon: MessageSquare, label: 'AI Career Coach' },
      { href: '/rejection-decoder', icon: MailOpen, label: 'Rejection Decoder' },
    ],
  },
  {
    label: 'Ecosystem',
    items: [
      { href: '/impact', icon: Globe, label: 'Impact & SDG' },
    ],
  },
]

const employerGroups: NavGroup[] = [
  {
    label: 'Employer',
    items: [
      { href: '/employer', icon: Building2, label: 'Employer Dashboard' },
      { href: '/impact', icon: Globe, label: 'Impact & SDG' },
    ],
  },
]

const universityGroups: NavGroup[] = [
  {
    label: 'University',
    items: [
      { href: '/university', icon: School, label: 'Employability Dashboard' },
      { href: '/university/interventions', icon: ListChecks, label: 'Intervention Queue' },
      { href: '/university/skill-gaps', icon: BarChart3, label: 'Faculty Skill Gaps' },
      { href: '/impact', icon: Globe, label: 'Impact & SDG' },
    ],
  },
]

const ministryGroups: NavGroup[] = [
  {
    label: 'Ministry',
    items: [
      { href: '/ministry', icon: Landmark, label: 'Ministry Dashboard' },
      { href: '/impact', icon: Globe, label: 'Impact & SDG' },
    ],
  },
]

const groupsByRole: Record<string, NavGroup[]> = {
  candidate: candidateGroups,
  employer: employerGroups,
  university: universityGroups,
  ministry: ministryGroups,
}

const subtitleByRole: Record<string, string> = {
  candidate: 'Fresh Grad · CS',
  employer: 'Hiring Manager',
  university: 'Career Services',
  ministry: 'Policy & Planning',
}

const allItems: NavItem[] = [
  ...candidateGroups.flatMap(g => g.items),
  ...employerGroups.flatMap(g => g.items),
  ...universityGroups.flatMap(g => g.items),
  ...ministryGroups.flatMap(g => g.items),
]

export default function DashboardLayout({ children }: { children: React.ReactNode; activePage?: string; title?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userRole, setUserRole] = useState<string>('candidate')
  const [userName, setUserName] = useState('Amirul Hakim')
  const [userInitials, setUserInitials] = useState('AH')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        router.push('/login')
        return
      }
      const role = localStorage.getItem('userRole') ?? 'candidate'
      const name = localStorage.getItem('userName') ?? 'Amirul Hakim'
      setUserRole(role)
      setUserName(name)
      setUserInitials(name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase())
    }
  }, [router])

  useEffect(() => { setSidebarOpen(false) }, [pathname])

  function handleLogout() {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    router.push('/login')
  }

  const groups = groupsByRole[userRole] ?? candidateGroups
  const roleSubtitle = subtitleByRole[userRole] ?? 'Fresh Grad · CS'
  const pageTitle = allItems.find(n => n.href === pathname)?.label ?? 'Career Arc'

  return (
    <div className="min-h-screen flex" style={{ background: '#e0e5ec' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: 'rgba(45,52,54,0.25)', backdropFilter: 'blur(2px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-60 z-40 flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{ background: '#e0e5ec', boxShadow: '4px 0 24px #babecc' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 flex-shrink-0" style={{ borderBottom: '1px solid #d1d9e6' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#ff4757', boxShadow: '3px 3px 6px rgba(255,71,87,0.3)' }}>
            <Target className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black" style={{ color: '#2d3436' }}>Career<span style={{ color: '#ff4757' }}>Arc</span></span>
          <button className="ml-auto md:hidden p-1.5 rounded-lg" style={{ color: '#4a5568' }} onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 py-3 px-3 overflow-y-auto">
          {groups.map((group, gi) => (
            <div key={group.label} className={gi > 0 ? 'mt-1' : ''}>
              <div className="px-2 py-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: '#babecc' }}>
                  {group.label}
                </span>
              </div>
              <div className="space-y-1 mb-1">
                {group.items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                      style={{
                        color: active ? '#ff4757' : '#4a5568',
                        background: '#e0e5ec',
                        boxShadow: active
                          ? 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff'
                          : '4px 4px 8px #babecc, -4px -4px 8px #ffffff',
                      }}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? '#ff4757' : '#4a5568' }} />
                      <span className="truncate flex-1">{item.label}</span>
                      {active && <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: '#ff4757' }} />}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-3 flex-shrink-0" style={{ borderTop: '1px solid #d1d9e6' }}>
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#ff4757' }}>
              <span className="text-white text-xs font-bold font-mono">{userInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold truncate" style={{ color: '#2d3436' }}>{userName}</div>
              <div className="text-xs font-mono truncate" style={{ color: '#4a5568' }}>{roleSubtitle}</div>
            </div>
            <button onClick={handleLogout} className="p-1.5 rounded-lg flex-shrink-0" style={{ color: '#4a5568' }}>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-60">
        <header className="sticky top-0 z-30 h-16 flex items-center px-4 sm:px-6 gap-3" style={{ background: '#e0e5ec', boxShadow: '0 4px 16px #babecc' }}>
          <button
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center btn-press flex-shrink-0"
            style={{ background: '#e0e5ec', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff', color: '#2d3436' }}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold uppercase tracking-widest truncate" style={{ color: '#2d3436' }}>{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center btn-press relative" style={{ background: '#e0e5ec', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
              <Bell className="w-4 h-4" style={{ color: '#4a5568' }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#ff4757', boxShadow: '0 0 4px rgba(255,71,87,0.6)' }} />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl" style={{ boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#ff4757' }}>
                <span className="text-white text-xs font-bold font-mono">{userInitials}</span>
              </div>
              <span className="text-sm font-medium" style={{ color: '#2d3436' }}>{userName.split(' ')[0]}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
