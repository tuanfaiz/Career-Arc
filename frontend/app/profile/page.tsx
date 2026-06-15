'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { mockUser } from '@/lib/mockData'
import { Wand2, Plus, X, Upload, GraduationCap, Briefcase } from 'lucide-react'

const TABS = ['Personal Info', 'Experience', 'Education', 'Skills', 'Resume Upload']

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Personal Info')
  const [autoFilling, setAutoFilling] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState([...mockUser.skills])
  const [newSkill, setNewSkill] = useState('')
  const [showExpForm, setShowExpForm] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleAutoFill = async () => {
    setAutoFilling(true)
    await new Promise(r => setTimeout(r, 2000))
    setName(mockUser.name); setEmail(mockUser.email); setPhone('+60 12-345 6789')
    setLinkedin('linkedin.com/in/amirulhakim'); setGithub('github.com/amirulhakim')
    setBio('Computer Science graduate from UPM with a passion for building scalable web applications and solving real-world problems with technology.')
    setAutoFilling(false)
  }

  const ic = "input-recessed w-full px-4 py-3 rounded-xl text-sm"
  const is = { color: '#2d3436' }
  const lc = "block text-xs uppercase tracking-widest font-medium mb-2"
  const ls = { color: '#4a5568' }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="card-screw rounded-2xl p-6" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#2d3436' }}>Profile Completion</span>
            <span className="font-mono font-bold text-lg" style={{ color: '#ff4757' }}>72%</span>
          </div>
          <div className="progress-bar h-3"><div className="progress-fill" style={{ width: '72%' }} /></div>
          <p className="text-xs mt-2" style={{ color: '#4a5568' }}>Add portfolio items and work experience to reach 100%</p>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
          <div className="flex overflow-x-auto" style={{ borderBottom: '1px solid #d1d9e6' }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-6 py-4 text-xs uppercase tracking-widest font-medium whitespace-nowrap transition-all btn-press"
                style={activeTab === tab ? { color: '#ff4757', borderBottom: '2px solid #ff4757', background: '#e8eaf0' }
                  : { color: '#4a5568', borderBottom: '2px solid transparent' }}>
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'Personal Info' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Personal Information</h3>
                  <button onClick={handleAutoFill} disabled={autoFilling}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest btn-press transition-all"
                    style={{ background: '#6c5ce7', color: 'white', boxShadow: '4px 4px 8px rgba(108,92,231,0.3)', opacity: autoFilling ? 0.7 : 1 }}>
                    <Wand2 size={14} /> {autoFilling ? 'AI Filling...' : 'AI Auto-Fill'}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><label className={lc} style={ls}>Full Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Amirul Hakim" className={ic} style={is} /></div>
                  <div><label className={lc} style={ls}>Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="amirul@careerarc.my" className={ic} style={is} /></div>
                  <div><label className={lc} style={ls}>Phone Number</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+60 12-345 6789" className={ic} style={is} /></div>
                  <div><label className={lc} style={ls}>LinkedIn</label><input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="linkedin.com/in/yourname" className={ic} style={is} /></div>
                  <div><label className={lc} style={ls}>GitHub</label><input type="text" value={github} onChange={e => setGithub(e.target.value)} placeholder="github.com/yourname" className={ic} style={is} /></div>
                </div>
                <div>
                  <label className={lc} style={ls}>Professional Bio</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Write a short professional summary..." rows={4}
                    className="input-recessed w-full px-4 py-3 rounded-xl text-sm resize-none" style={is} />
                </div>
              </div>
            )}

            {activeTab === 'Experience' && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Work Experience</h3>
                  <button onClick={() => setShowExpForm(!showExpForm)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest btn-press transition-all"
                    style={{ background: '#ff4757', color: 'white', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
                    <Plus size={14} /> Add Experience
                  </button>
                </div>
                <div className="rounded-xl p-5" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#00b09b', boxShadow: '3px 3px 6px rgba(0,176,155,0.3)' }}>
                      <Briefcase size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm" style={{ color: '#2d3436' }}>Software Engineer Intern</h4>
                      <p className="text-sm font-medium mt-0.5" style={{ color: '#4a5568' }}>TechCorp Malaysia</p>
                      <p className="text-xs mt-1 font-mono" style={{ color: '#4a5568' }}>Jan 2024 – Jun 2024 · 6 months</p>
                      <p className="text-sm mt-3 leading-relaxed" style={{ color: '#4a5568' }}>Worked on internal HR management dashboard. Led workforce analytics module, reducing reporting time by 65%.</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {['React', 'Node.js', 'MySQL', 'Agile'].map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-lg" style={{ background: '#f0f2f5', color: '#2d3436', boxShadow: '2px 2px 4px #babecc, -2px -2px 4px #ffffff' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {showExpForm && (
                  <div className="rounded-xl p-6" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: '#2d3436' }}>New Experience</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={lc} style={ls}>Job Title</label><input type="text" placeholder="e.g. Junior Developer" className={ic} style={is} /></div>
                      <div><label className={lc} style={ls}>Company</label><input type="text" placeholder="Company name" className={ic} style={is} /></div>
                      <div><label className={lc} style={ls}>Start Date</label><input type="month" className={ic} style={is} /></div>
                      <div><label className={lc} style={ls}>End Date</label><input type="month" className={ic} style={is} /></div>
                    </div>
                    <div className="mt-4"><label className={lc} style={ls}>Description</label>
                      <textarea rows={3} placeholder="Describe your responsibilities..." className="input-recessed w-full px-4 py-3 rounded-xl text-sm resize-none" style={is} /></div>
                    <div className="flex gap-3 mt-4">
                      <button className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest btn-press" style={{ background: '#ff4757', color: 'white', boxShadow: '3px 3px 6px rgba(255,71,87,0.3)' }}>Save</button>
                      <button onClick={() => setShowExpForm(false)} className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest btn-press" style={{ background: '#f0f2f5', color: '#4a5568', boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #ffffff' }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Education' && (
              <div className="flex flex-col gap-5">
                <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Education</h3>
                <div className="rounded-xl p-5" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#6c5ce7', boxShadow: '3px 3px 6px rgba(108,92,231,0.3)' }}>
                      <GraduationCap size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm" style={{ color: '#2d3436' }}>B.Sc. Computer Science (Hons)</h4>
                      <p className="text-sm font-medium mt-0.5" style={{ color: '#4a5568' }}>Universiti Putra Malaysia (UPM)</p>
                      <p className="text-xs mt-1 font-mono" style={{ color: '#4a5568' }}>2019 – 2023 · CGPA: 3.72</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {["Dean's List", 'HackUPM Winner', 'CS Society VP'].map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-lg" style={{ background: '#f0f2f5', color: '#6c5ce7', boxShadow: '2px 2px 4px #babecc, -2px -2px 4px #ffffff' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Skills' && (
              <div className="flex flex-col gap-5">
                <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff' }}>
                      <span className="text-sm font-medium" style={{ color: '#2d3436' }}>{skill}</span>
                      <button onClick={() => setSkills(skills.filter(s => s !== skill))} style={{ color: '#4a5568' }}><X size={12} /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <input type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && newSkill.trim() && !skills.includes(newSkill.trim())) { setSkills([...skills, newSkill.trim()]); setNewSkill('') } }}
                    placeholder="Add a skill (press Enter)" className="input-recessed flex-1 px-4 py-3 rounded-xl text-sm" style={is} />
                  <button onClick={() => { if (newSkill.trim() && !skills.includes(newSkill.trim())) { setSkills([...skills, newSkill.trim()]); setNewSkill('') } }}
                    className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest btn-press" style={{ background: '#ff4757', color: 'white', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'Resume Upload' && (
              <div className="flex flex-col gap-5">
                <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: '#2d3436' }}>Resume Upload</h3>
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) setUploadedFile(f.name) }}
                  className="rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all"
                  style={{ background: '#e0e5ec', boxShadow: dragOver ? 'inset 6px 6px 12px #babecc, inset -6px -6px 12px #ffffff, 0 0 0 2px #ff4757' : 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff', border: `2px dashed ${dragOver ? '#ff4757' : '#babecc'}`, minHeight: '240px' }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: '#f0f2f5', boxShadow: '6px 6px 12px #babecc, -6px -6px 12px #ffffff' }}>
                    <Upload size={28} style={{ color: uploadedFile ? '#00b894' : '#4a5568' }} />
                  </div>
                  {uploadedFile ? (
                    <>
                      <p className="font-bold text-base mb-2" style={{ color: '#00b894' }}>✓ {uploadedFile}</p>
                      <p className="text-sm mb-4" style={{ color: '#4a5568' }}>Resume uploaded successfully</p>
                      <button onClick={() => setUploadedFile(null)} className="px-4 py-2 rounded-lg text-xs font-medium btn-press" style={{ color: '#ff4757' }}>Remove & re-upload</button>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-base mb-2" style={{ color: '#2d3436' }}>Drag & drop your PDF resume here</p>
                      <p className="text-sm mb-5" style={{ color: '#4a5568' }}>or click to browse</p>
                      <label className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest btn-press cursor-pointer" style={{ background: '#ff4757', color: 'white', boxShadow: '4px 4px 8px rgba(255,71,87,0.3)' }}>
                        Browse File
                        <input type="file" accept=".pdf" className="hidden" onChange={e => { if (e.target.files?.[0]) setUploadedFile(e.target.files[0].name) }} />
                      </label>
                      <p className="text-xs mt-4" style={{ color: '#4a5568' }}>PDF only · Max 5MB</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-white btn-press transition-all"
          style={{ background: '#ff4757', boxShadow: '6px 6px 12px rgba(255,71,87,0.3)' }}>
          Save Profile
        </button>
      </div>
    </DashboardLayout>
  )
}
