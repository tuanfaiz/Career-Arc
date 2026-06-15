import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { User, ScanLine, Shield, TrendingUp, BookOpen, Calculator, Target, ArrowRight, ChevronRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div style={{ background: '#e0e5ec', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs uppercase tracking-widest font-medium"
            style={{ background: '#f0f2f5', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff', color: '#ff4757' }}>
            <Target size={12} />
            Talentbank Career OS Hackathon 2025
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6" style={{ color: '#2d3436' }}>
            Navigate Your<br />
            <span style={{ color: '#ff4757' }}>40-Year Career</span><br />
            Journey
          </h1>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: '#4a5568' }}>
            Malaysia&apos;s first AI-powered career platform. ATS scanning, anti-ghosting protection, and 40-year path simulation — built for Malaysian fresh graduates.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/login"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-white btn-press transition-all"
              style={{ background: '#ff4757', boxShadow: '6px 6px 12px rgba(255,71,87,0.35), -3px -3px 8px rgba(255,255,255,0.6)' }}>
              Get Started — Free <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest btn-press transition-all"
              style={{ color: '#2d3436', background: '#f0f2f5', boxShadow: '6px 6px 12px #babecc, -6px -6px 12px #ffffff' }}>
              View Demo <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['AH', 'SK', 'NR', 'FZ'].map((init, i) => (
                <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2"
                  style={{ background: ['#ff4757','#6c5ce7','#00b09b','#fdcb6e'][i], borderColor: '#e0e5ec' }}>
                  {init}
                </div>
              ))}
            </div>
            <span className="text-sm" style={{ color: '#4a5568' }}>
              Trusted by <strong style={{ color: '#2d3436' }}>12,847+</strong> Malaysian professionals
            </span>
          </div>
        </div>

        {/* Industrial device mockup */}
        <div className="hidden lg:block">
          <div className="relative rounded-3xl p-8"
            style={{ background: '#2d3436', boxShadow: '20px 20px 40px rgba(0,0,0,0.3), -8px -8px 20px rgba(255,255,255,0.05)', border: '2px solid #3d4446' }}>
            {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-4 h-4 rounded-full`}
                style={{ background: 'radial-gradient(circle at 35% 35%, #4a5568, #2d3436)', border: '1px solid #3d4446' }} />
            ))}
            <div className="text-center mb-4">
              <span className="text-xs uppercase tracking-widest font-mono" style={{ color: '#fdcb6e' }}>CAREER ARC — 40-YR SIMULATOR</span>
            </div>
            <div className="rounded-xl p-5" style={{ background: '#1a1e22', border: '1px solid #3d4446' }}>
              <div className="flex items-end gap-2 h-32 mb-3">
                {[
                  { year: 'Y0', h: 18, s: '3.5k', c: '#6c5ce7' },
                  { year: 'Y2', h: 30, s: '6k', c: '#6c5ce7' },
                  { year: 'Y5', h: 45, s: '10k', c: '#ff4757' },
                  { year: 'Y8', h: 60, s: '15k', c: '#ff4757' },
                  { year: 'Y12', h: 70, s: '20k', c: '#ff4757' },
                  { year: 'Y20', h: 85, s: '35k', c: '#00b09b' },
                  { year: 'Y25', h: 100, s: '50k', c: '#00b09b' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                    <span style={{ color: bar.c, fontSize: '9px' }} className="font-mono">{bar.s}</span>
                    <div className="w-full rounded-t-sm"
                      style={{ height: `${bar.h}%`, background: `linear-gradient(180deg, ${bar.c}aa, ${bar.c}44)`, border: `1px solid ${bar.c}66` }} />
                    <span style={{ color: '#4a5568', fontSize: '9px' }} className="font-mono">{bar.year}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-3" style={{ borderTop: '1px solid #2d3436' }}>
                {[{ c: '#ff4757', l: 'CTO Track' }, { c: '#6c5ce7', l: 'PM Pivot' }, { c: '#00b09b', l: 'Founder' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.c }} />
                    <span style={{ color: '#d1d9e6', fontSize: '10px' }} className="font-mono">{item.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              {[{ l: 'ATS Score', v: '78%', c: '#fdcb6e' }, { l: 'Match', v: '94%', c: '#00b09b' }, { l: 'Applied', v: '12', c: '#ff4757' }].map((s, i) => (
                <div key={i} className="flex-1 rounded-lg px-3 py-2 text-center"
                  style={{ background: '#2d3436', border: '1px solid #3d4446' }}>
                  <div className="text-xs font-mono font-bold" style={{ color: s.c }}>{s.v}</div>
                  <div style={{ color: '#4a5568', fontSize: '9px' }} className="uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ background: '#2d3436' }} className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-8">
          {[
            { value: '12,847', label: 'Active Jobs', sub: 'across Malaysia', c: '#ff4757' },
            { value: '94%', label: 'ATS Match Rate', sub: 'for our users', c: '#fdcb6e' },
            { value: 'RM 8,200', label: 'Avg Salary Uplift', sub: 'after 12 months', c: '#00b09b' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-black font-mono mb-1" style={{ color: stat.c }}>{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-widest" style={{ color: '#f0f2f5' }}>{stat.label}</div>
              <div className="text-xs mt-1" style={{ color: '#4a5568' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-4" style={{ color: '#2d3436' }}>
            Why Career <span style={{ color: '#ff4757' }}>Arc?</span>
          </h2>
          <p className="text-base" style={{ color: '#4a5568' }}>Every tool you need to navigate Malaysia&apos;s job market — in one platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <User size={24} />, title: 'Smart Profile Builder', desc: 'AI-powered profile that highlights what Malaysian employers actually want', color: '#6c5ce7' },
            { icon: <ScanLine size={24} />, title: 'ATS Resume Scanner', desc: 'Know your ATS score before you apply. Fix it before they ghost you.', color: '#ff4757' },
            { icon: <Shield size={24} />, title: 'Anti-Ghosting Tracker', desc: 'See employer response rates. Apply to companies that actually reply.', color: '#00b09b' },
            { icon: <TrendingUp size={24} />, title: 'Career Path Simulator', desc: 'Visualize 3 career paths for the next 40 years. Switch lanes confidently.', color: '#ff4757' },
            { icon: <BookOpen size={24} />, title: 'Living Portfolio', desc: 'Your work, professionally packaged. One link, infinite impressions.', color: '#6c5ce7' },
            { icon: <Calculator size={24} />, title: 'Cost of Living Calculator', desc: 'RM 8,500 in KLCC vs RM 7,000 in Cyberjaya — which job pays more REALLY?', color: '#00b09b' },
          ].map((feature, i) => (
            <div key={i} className="card-screw card-hover rounded-2xl p-8"
              style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white"
                style={{ background: feature.color, boxShadow: `4px 4px 12px ${feature.color}44` }}>
                {feature.icon}
              </div>
              <h3 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: '#2d3436' }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#2d3436' }} className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black uppercase tracking-widest mb-6" style={{ color: '#f0f2f5' }}>
            Ready to Arc Your <span style={{ color: '#ff4757' }}>Career?</span>
          </h2>
          <p className="text-base mb-10" style={{ color: '#4a5568' }}>
            Join thousands of Malaysian professionals who use Career Arc to navigate their career journey.
          </p>
          <Link href="/login"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-white btn-press transition-all"
            style={{ background: '#ff4757', boxShadow: '6px 6px 12px rgba(255,71,87,0.4)' }}>
            Get Started — It&apos;s Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1a1e22' }} className="py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#ff4757' }}>
              <Target size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: '#f0f2f5' }}>CAREER <span style={{ color: '#ff4757' }}>ARC</span></span>
            <span className="text-xs ml-4" style={{ color: '#4a5568' }}>© 2025 Career Arc. Talentbank Hackathon.</span>
          </div>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <Link key={link} href="#" className="text-xs uppercase tracking-widest" style={{ color: '#4a5568' }}>{link}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
