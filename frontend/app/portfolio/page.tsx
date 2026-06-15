'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { mockPortfolioEntries } from '@/lib/mockData'
import { Wand2, ExternalLink, Plus, Award, X } from 'lucide-react'

const entryColors = ['#ff4757', '#6c5ce7', '#00b894', '#0984e3']

export default function PortfolioPage() {
  const [items, setItems] = useState(mockPortfolioEntries.map((item, i) => ({
    ...item,
    color: entryColors[i % entryColors.length],
    link: item.github,
    professionalDesc: item.descriptionPolished,
    showingProfessional: false,
    polishing: false,
  })))
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({ year: '', title: '', type: '', description: '', tags: '' })

  const handlePolish = async (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, polishing: true } : item))
    await new Promise(r => setTimeout(r, 1800))
    setItems(prev => prev.map(item => item.id === id ? { ...item, polishing: false, showingProfessional: true } : item))
  }

  const ic = "input-recessed w-full px-4 py-3 rounded-xl text-sm"
  const is = { color: '#2d3436' }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#2d3436] mb-1">Living Portfolio</h2>
            <p className="text-sm text-[#4a5568]">Your work, professionally packaged. AI polishes rough descriptions into recruiter-ready copy.</p>
          </div>
          <button onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest btn-press transition-all"
            style={{ background: '#ff4757', color: 'white', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
            <Plus size={14} /> Add Entry
          </button>
        </div>

        {showAddForm && (
          <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>New Portfolio Entry</h3>
              <button onClick={() => setShowAddForm(false)}><X size={16} style={{ color: '#4a5568' }} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Year</label>
                <input type="text" value={newItem.year} onChange={e => setNewItem({ ...newItem, year: e.target.value })} placeholder="2025" className={ic} style={is} /></div>
              <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Title</label>
                <input type="text" value={newItem.title} onChange={e => setNewItem({ ...newItem, title: e.target.value })} placeholder="Project name" className={ic} style={is} /></div>
              <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Type</label>
                <input type="text" value={newItem.type} onChange={e => setNewItem({ ...newItem, type: e.target.value })} placeholder="Hackathon / Freelance / Work" className={ic} style={is} /></div>
              <div><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Tags (comma separated)</label>
                <input type="text" value={newItem.tags} onChange={e => setNewItem({ ...newItem, tags: e.target.value })} placeholder="React, TypeScript, Next.js" className={ic} style={is} /></div>
            </div>
            <div className="mb-4"><label className="block text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#4a5568' }}>Description</label>
              <textarea value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} rows={3} placeholder="Describe what you built..." className="input-recessed w-full px-4 py-3 rounded-xl text-sm resize-none" style={is} /></div>
            <div className="flex gap-3">
              <button onClick={() => {
                if (newItem.title && newItem.year) {
                  const colors = ['#ff4757', '#6c5ce7', '#00b09b', '#fdcb6e']
                  setItems(prev => [...prev, {
                    id: String(Date.now()), year: newItem.year, title: newItem.title,
                    type: newItem.type || 'Project', description: newItem.description,
                    descriptionPolished: newItem.description, professionalDesc: newItem.description,
                    tags: newItem.tags.split(',').map(t => t.trim()).filter(Boolean),
                    link: null, github: null, color: colors[Math.floor(Math.random() * colors.length)],
                    showingProfessional: false, polishing: false, teamSize: 1,
                  }])
                  setNewItem({ year: '', title: '', type: '', description: '', tags: '' })
                  setShowAddForm(false)
                }
              }} className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest btn-press" style={{ background: '#ff4757', color: 'white', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
                Add Entry
              </button>
              <button onClick={() => setShowAddForm(false)} className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest btn-press" style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="relative ml-4">
          <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg, #ff4757, #6c5ce7, #00b894, #0984e3)' }} />
          <div className="flex flex-col gap-8">
            {items.map((item, idx) => (
              <div key={item.id} className="relative pl-8">
                <div className="absolute left-0 top-6 w-4 h-4 rounded-full -translate-x-1.5 border-2 border-white" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}66` }} />
                <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold" style={{ background: item.color, color: 'white', boxShadow: `3px 3px 6px ${item.color}44` }}>
                        {item.year}
                      </div>
                      <div>
                        <h3 className="font-bold text-base" style={{ color: '#2d3436' }}>{item.title}</h3>
                        <p className="text-xs font-medium mt-0.5" style={{ color: item.color, background: `${item.color}22`, border: `1px solid ${item.color}44`, display: 'inline-block', padding: '1px 8px', borderRadius: '6px' }}>{item.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {'award' in item && item.award && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs" style={{ background: '#fdcb6e22', color: '#fdcb6e', border: '1px solid #fdcb6e44' }}>
                          <Award size={10} /> {item.award}
                        </div>
                      )}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium btn-press"
                          style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #ffffff' }}>
                          <ExternalLink size={11} /> GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-lg" style={{ background: '#e0e5ec', color: '#2d3436', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>{tag}</span>
                    ))}
                  </div>

                  <div className="rounded-xl p-4 mb-4" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                      {item.showingProfessional ? item.professionalDesc : item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.showingProfessional ? (
                      <button onClick={() => setItems(prev => prev.map(i => i.id === item.id ? { ...i, showingProfessional: false } : i))}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium btn-press"
                        style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #ffffff' }}>
                        Show Original
                      </button>
                    ) : (
                      <button onClick={() => handlePolish(item.id)} disabled={item.polishing}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest btn-press transition-all"
                        style={{ background: '#6c5ce7', color: 'white', boxShadow: '3px 3px 8px rgba(108,92,231,0.3)', opacity: item.polishing ? 0.7 : 1 }}>
                        <Wand2 size={12} /> {item.polishing ? 'AI Polishing...' : 'AI Polish'}
                      </button>
                    )}
                    <span className="text-xs font-mono" style={{ color: '#4a5568' }}>Team: {item.teamSize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
