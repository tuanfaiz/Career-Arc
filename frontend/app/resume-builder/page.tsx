'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { FileText, Download, Plus, Trash2, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'

type Experience = { id: number; title: string; company: string; period: string; description: string }
type Education = { id: number; degree: string; institution: string; year: string }

const defaultExperiences: Experience[] = [
  { id: 1, title: 'Frontend Developer', company: 'Axiata Digital', period: 'Jan 2024 – Present', description: 'Built and maintained React web applications for 50,000+ daily active users. Led migration from class components to hooks, reducing bundle size by 30%.' },
  { id: 2, title: 'Software Engineer Intern', company: 'Grab Malaysia', period: 'Jun 2023 – Dec 2023', description: 'Developed internal dashboard features using Next.js and TypeScript. Automated data pipeline that saved 4 hours of manual work per week.' },
]

const defaultEducation: Education[] = [
  { id: 1, degree: 'B.Sc. Computer Science', institution: 'Universiti Putra Malaysia', year: '2024' },
]

const defaultSkills = ['React', 'TypeScript', 'Next.js', 'Node.js', 'SQL', 'Git', 'REST APIs', 'Tailwind CSS']

function calcATS(name: string, email: string, phone: string, summary: string, experiences: Experience[], skills: string[], education: Education[]) {
  let score = 0
  if (name.trim()) score += 5
  if (email.trim()) score += 5
  if (phone.trim()) score += 5
  if (summary.trim().length > 50) score += 20
  if (experiences.length >= 1) score += 15
  if (experiences.length >= 2) score += 10
  experiences.forEach(e => { if (e.description.trim().length > 30) score += 5 })
  if (skills.length >= 5) score += 15
  if (skills.length >= 8) score += 5
  if (education.length >= 1) score += 15
  return Math.min(score, 100)
}

export default function ResumeBuilderPage() {
  const [name, setName] = useState('Amirul Hakim')
  const [email, setEmail] = useState('amirul@email.com')
  const [phone, setPhone] = useState('+60 11-2345 6789')
  const [location, setLocation] = useState('Kuala Lumpur, Malaysia')
  const [linkedin, setLinkedin] = useState('linkedin.com/in/amirulhakim')
  const [summary, setSummary] = useState('Results-driven Computer Science graduate with hands-on experience building scalable web applications. Passionate about clean architecture, user-centric design, and delivering measurable impact. Seeking a mid-level frontend or full-stack role in a growth-oriented tech company.')
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences)
  const [education, setEducation] = useState<Education[]>(defaultEducation)
  const [skills, setSkills] = useState<string[]>(defaultSkills)
  const [newSkill, setNewSkill] = useState('')
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['contact', 'summary', 'experience']))
  const [downloaded, setDownloaded] = useState(false)

  const atsScore = calcATS(name, email, phone, summary, experiences, skills, education)

  function toggleSection(s: string) {
    setOpenSections(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n })
  }

  function addExperience() {
    setExperiences(prev => [...prev, { id: Date.now(), title: '', company: '', period: '', description: '' }])
  }

  function updateExp(id: number, field: keyof Experience, value: string) {
    setExperiences(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  function removeExp(id: number) { setExperiences(prev => prev.filter(e => e.id !== id)) }

  function addSkill() {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()])
      setNewSkill('')
    }
  }

  function removeSkill(s: string) { setSkills(prev => prev.filter(x => x !== s)) }

  function mockDownload() { setDownloaded(true); setTimeout(() => setDownloaded(false), 2500) }

  const atsColor = atsScore >= 80 ? '#00b894' : atsScore >= 60 ? '#fdcb6e' : '#ff4757'

  const sectionClass = 'rounded-2xl overflow-hidden mb-3'
  const headerClass = 'flex items-center justify-between px-5 py-4 cursor-pointer select-none'

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6 min-h-full">

        {/* Left: Form */}
        <div className="w-full lg:w-[420px] flex-shrink-0 space-y-0">
          {/* ATS Score + Download */}
          <div className="rounded-2xl p-4 mb-4 flex items-center gap-4" style={{ background: '#f0f2f5', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="relative w-14 h-14 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#d1d9e6" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3" strokeLinecap="round"
                  stroke={atsColor}
                  strokeDasharray={`${atsScore} ${100 - atsScore}`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black font-mono" style={{ color: atsColor }}>{atsScore}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold" style={{ color: '#2d3436' }}>ATS Score</div>
              <div className="text-xs" style={{ color: '#4a5568' }}>
                {atsScore >= 80 ? 'Excellent — most ATS systems will pass this' : atsScore >= 60 ? 'Good — fill more sections to improve' : 'Needs work — complete your resume below'}
              </div>
            </div>
            <button onClick={mockDownload}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-press flex-shrink-0"
              style={{ background: downloaded ? '#00b894' : '#ff4757', color: 'white', boxShadow: `4px 4px 8px ${downloaded ? 'rgba(0,184,148,0.3)' : 'rgba(255,71,87,0.3)'}` }}>
              {downloaded ? <><CheckCircle className="w-3.5 h-3.5" /> Saved!</> : <><Download className="w-3.5 h-3.5" /> Export</>}
            </button>
          </div>

          {/* Contact */}
          <div className={sectionClass} style={{ background: '#f0f2f5', boxShadow: '6px 6px 12px #babecc, -6px -6px 12px #ffffff' }}>
            <div className={headerClass} onClick={() => toggleSection('contact')} style={{ borderBottom: openSections.has('contact') ? '1px solid #d1d9e6' : 'none' }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2d3436' }}>Contact Information</span>
              {openSections.has('contact') ? <ChevronUp className="w-4 h-4" style={{ color: '#4a5568' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#4a5568' }} />}
            </div>
            {openSections.has('contact') && (
              <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Full Name', value: name, set: setName, span: true },
                  { label: 'Email', value: email, set: setEmail },
                  { label: 'Phone', value: phone, set: setPhone },
                  { label: 'Location', value: location, set: setLocation },
                  { label: 'LinkedIn', value: linkedin, set: setLinkedin },
                ].map(({ label, value, set, span }) => (
                  <div key={label} className={span ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-medium mb-1.5 uppercase tracking-widest" style={{ color: '#4a5568' }}>{label}</label>
                    <input value={value} onChange={e => set(e.target.value)}
                      className="input-recessed w-full px-3 py-2.5 rounded-xl text-sm" style={{ color: '#2d3436' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className={sectionClass} style={{ background: '#f0f2f5', boxShadow: '6px 6px 12px #babecc, -6px -6px 12px #ffffff' }}>
            <div className={headerClass} onClick={() => toggleSection('summary')} style={{ borderBottom: openSections.has('summary') ? '1px solid #d1d9e6' : 'none' }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2d3436' }}>Professional Summary</span>
              {openSections.has('summary') ? <ChevronUp className="w-4 h-4" style={{ color: '#4a5568' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#4a5568' }} />}
            </div>
            {openSections.has('summary') && (
              <div className="px-5 py-4">
                <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={4}
                  className="input-recessed w-full px-3 py-2.5 rounded-xl text-sm resize-none" style={{ color: '#2d3436' }} />
                <p className="text-xs mt-1.5" style={{ color: '#4a5568' }}>{summary.length} chars — aim for 200–400</p>
              </div>
            )}
          </div>

          {/* Experience */}
          <div className={sectionClass} style={{ background: '#f0f2f5', boxShadow: '6px 6px 12px #babecc, -6px -6px 12px #ffffff' }}>
            <div className={headerClass} onClick={() => toggleSection('experience')} style={{ borderBottom: openSections.has('experience') ? '1px solid #d1d9e6' : 'none' }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2d3436' }}>Work Experience</span>
              {openSections.has('experience') ? <ChevronUp className="w-4 h-4" style={{ color: '#4a5568' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#4a5568' }} />}
            </div>
            {openSections.has('experience') && (
              <div className="px-5 py-4 space-y-4">
                {experiences.map((exp, i) => (
                  <div key={exp.id} className="rounded-xl p-4" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold" style={{ color: '#4a5568' }}>Experience {i + 1}</span>
                      <button onClick={() => removeExp(exp.id)} className="p-1 rounded-lg" style={{ color: '#ff4757' }}><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: '#4a5568' }}>Job Title</label>
                        <input value={exp.title} onChange={e => updateExp(exp.id, 'title', e.target.value)}
                          className="input-recessed w-full px-3 py-2 rounded-lg text-xs" style={{ color: '#2d3436' }} placeholder="Frontend Developer" />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: '#4a5568' }}>Company</label>
                        <input value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)}
                          className="input-recessed w-full px-3 py-2 rounded-lg text-xs" style={{ color: '#2d3436' }} placeholder="TechCorp" />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label className="text-xs font-medium mb-1 block" style={{ color: '#4a5568' }}>Period</label>
                      <input value={exp.period} onChange={e => updateExp(exp.id, 'period', e.target.value)}
                        className="input-recessed w-full px-3 py-2 rounded-lg text-xs" style={{ color: '#2d3436' }} placeholder="Jan 2023 – Present" />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: '#4a5568' }}>Description</label>
                      <textarea value={exp.description} onChange={e => updateExp(exp.id, 'description', e.target.value)} rows={3}
                        className="input-recessed w-full px-3 py-2 rounded-lg text-xs resize-none" style={{ color: '#2d3436' }}
                        placeholder="Describe your key achievements with numbers where possible..." />
                    </div>
                  </div>
                ))}
                <button onClick={addExperience}
                  className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest btn-press flex items-center justify-center gap-2"
                  style={{ background: '#e0e5ec', color: '#4a5568', boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff', border: '1px dashed #babecc' }}>
                  <Plus className="w-3.5 h-3.5" /> Add Experience
                </button>
              </div>
            )}
          </div>

          {/* Education */}
          <div className={sectionClass} style={{ background: '#f0f2f5', boxShadow: '6px 6px 12px #babecc, -6px -6px 12px #ffffff' }}>
            <div className={headerClass} onClick={() => toggleSection('education')} style={{ borderBottom: openSections.has('education') ? '1px solid #d1d9e6' : 'none' }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2d3436' }}>Education</span>
              {openSections.has('education') ? <ChevronUp className="w-4 h-4" style={{ color: '#4a5568' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#4a5568' }} />}
            </div>
            {openSections.has('education') && (
              <div className="px-5 py-4 space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="rounded-xl p-4" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="col-span-2">
                        <label className="text-xs font-medium mb-1 block" style={{ color: '#4a5568' }}>Degree</label>
                        <input value={edu.degree}
                          onChange={e => setEducation(prev => prev.map(x => x.id === edu.id ? { ...x, degree: e.target.value } : x))}
                          className="input-recessed w-full px-3 py-2 rounded-lg text-xs" style={{ color: '#2d3436' }} placeholder="B.Sc. Computer Science" />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: '#4a5568' }}>Institution</label>
                        <input value={edu.institution}
                          onChange={e => setEducation(prev => prev.map(x => x.id === edu.id ? { ...x, institution: e.target.value } : x))}
                          className="input-recessed w-full px-3 py-2 rounded-lg text-xs" style={{ color: '#2d3436' }} placeholder="Universiti Malaya" />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: '#4a5568' }}>Year</label>
                        <input value={edu.year}
                          onChange={e => setEducation(prev => prev.map(x => x.id === edu.id ? { ...x, year: e.target.value } : x))}
                          className="input-recessed w-full px-3 py-2 rounded-lg text-xs" style={{ color: '#2d3436' }} placeholder="2024" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skills */}
          <div className={sectionClass} style={{ background: '#f0f2f5', boxShadow: '6px 6px 12px #babecc, -6px -6px 12px #ffffff' }}>
            <div className={headerClass} onClick={() => toggleSection('skills')} style={{ borderBottom: openSections.has('skills') ? '1px solid #d1d9e6' : 'none' }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2d3436' }}>Skills</span>
              {openSections.has('skills') ? <ChevronUp className="w-4 h-4" style={{ color: '#4a5568' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#4a5568' }} />}
            </div>
            {openSections.has('skills') && (
              <div className="px-5 py-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold" style={{ background: '#e0e5ec', color: '#2d3436', boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #ffffff' }}>
                      {s}
                      <button onClick={() => removeSkill(s)} style={{ color: '#ff4757' }}><Trash2 className="w-2.5 h-2.5" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={newSkill} onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSkill()}
                    placeholder="Add skill..." className="input-recessed flex-1 px-3 py-2 rounded-xl text-xs" style={{ color: '#2d3436' }} />
                  <button onClick={addSkill} className="px-3 py-2 rounded-xl btn-press" style={{ background: '#ff4757', color: 'white', boxShadow: '3px 3px 6px rgba(255,71,87,0.3)' }}>
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 min-w-0">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4a5568' }}>Live Preview</span>
              <span className="text-xs font-mono" style={{ color: '#4a5568' }}>ATS-optimised format</span>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '12px 12px 24px #babecc, -12px -12px 24px #ffffff' }}>
              {/* Paper */}
              <div className="bg-white p-8 sm:p-10 min-h-[600px]" style={{ fontFamily: 'Georgia, serif' }}>
                {/* Header */}
                <div className="border-b-2 pb-5 mb-5" style={{ borderColor: '#2d3436' }}>
                  <h1 className="text-2xl font-black tracking-wide mb-1" style={{ color: '#2d3436', fontFamily: 'inherit' }}>
                    {name || 'Your Name'}
                  </h1>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs" style={{ color: '#4a5568' }}>
                    {email && <span>{email}</span>}
                    {phone && <span>· {phone}</span>}
                    {location && <span>· {location}</span>}
                    {linkedin && <span>· {linkedin}</span>}
                  </div>
                </div>

                {/* Summary */}
                {summary && (
                  <div className="mb-5">
                    <h2 className="text-xs font-black uppercase tracking-widest mb-2 pb-0.5" style={{ color: '#2d3436', borderBottom: '1px solid #babecc' }}>Professional Summary</h2>
                    <p className="text-xs leading-relaxed" style={{ color: '#2d3436' }}>{summary}</p>
                  </div>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-xs font-black uppercase tracking-widest mb-2 pb-0.5" style={{ color: '#2d3436', borderBottom: '1px solid #babecc' }}>Work Experience</h2>
                    <div className="space-y-3">
                      {experiences.map(exp => (
                        <div key={exp.id}>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-bold" style={{ color: '#2d3436' }}>{exp.title || 'Job Title'}</div>
                              <div className="text-xs font-semibold" style={{ color: '#4a5568' }}>{exp.company || 'Company'}</div>
                            </div>
                            <div className="text-xs flex-shrink-0" style={{ color: '#4a5568' }}>{exp.period}</div>
                          </div>
                          {exp.description && (
                            <p className="text-xs mt-1 leading-relaxed" style={{ color: '#2d3436' }}>{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-xs font-black uppercase tracking-widest mb-2 pb-0.5" style={{ color: '#2d3436', borderBottom: '1px solid #babecc' }}>Education</h2>
                    {education.map(edu => (
                      <div key={edu.id} className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-bold" style={{ color: '#2d3436' }}>{edu.degree || 'Degree'}</div>
                          <div className="text-xs" style={{ color: '#4a5568' }}>{edu.institution}</div>
                        </div>
                        <div className="text-xs flex-shrink-0" style={{ color: '#4a5568' }}>{edu.year}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-widest mb-2 pb-0.5" style={{ color: '#2d3436', borderBottom: '1px solid #babecc' }}>Skills</h2>
                    <p className="text-xs leading-relaxed" style={{ color: '#2d3436' }}>{skills.join(' · ')}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" style={{ color: '#4a5568' }} />
                <span className="text-xs" style={{ color: '#4a5568' }}>ATS-safe plain format — no tables, no columns, no images</span>
              </div>
              <span className="text-xs font-mono font-bold" style={{ color: atsColor }}>Score: {atsScore}/100</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
