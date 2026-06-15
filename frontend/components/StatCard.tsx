import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string
  icon: ReactNode
  accent?: boolean
  subtitle?: string
}

export default function StatCard({ label, value, icon, accent, subtitle }: StatCardProps) {
  return (
    <div className="card-screw card-hover rounded-2xl p-6 flex flex-col gap-3"
      style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#4a5568' }}>{label}</span>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={accent ? { background: '#ff4757', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }
            : { background: '#e0e5ec', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
          <span style={{ color: accent ? 'white' : '#4a5568' }}>{icon}</span>
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold font-mono" style={{ color: accent ? '#ff4757' : '#2d3436' }}>{value}</div>
        {subtitle && <div className="text-xs mt-1" style={{ color: '#4a5568' }}>{subtitle}</div>}
      </div>
    </div>
  )
}
