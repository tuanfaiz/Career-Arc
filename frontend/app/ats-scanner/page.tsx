'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Upload, ScanLine, CheckCircle, XCircle, AlertCircle, ChevronRight, FileText } from 'lucide-react'

const mockResult = {
  atsScore: 78,
  keywords: {
    matched: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'Git', 'SQL', 'MongoDB', 'Python'],
    missing: ['Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Redis', 'GraphQL'],
  },
  sections: [
    { name: 'Contact Information', status: 'pass', note: 'Email, phone, LinkedIn detected' },
    { name: 'Professional Summary', status: 'pass', note: 'Present and ATS-readable' },
    { name: 'Work Experience', status: 'pass', note: '2 entries with quantified achievements' },
    { name: 'Skills Section', status: 'warn', note: 'Missing in-demand cloud skills' },
    { name: 'Education', status: 'pass', note: 'Degree and institution clearly listed' },
    { name: 'Keywords Density', status: 'fail', note: 'Too low — 6 key terms missing' },
  ],
  fixes: [
    { id: 1, text: 'Add a "Cloud & DevOps" skills section with Docker, AWS, and CI/CD', priority: 'High' },
    { id: 2, text: 'Include quantified achievements in each experience entry (e.g., "reduced load time by 40%")', priority: 'High' },
    { id: 3, text: 'Move Skills section above Experience — ATS scanners read top-down', priority: 'Medium' },
    { id: 4, text: "Use standard section headers (not \"What I've Done\" — use \"Work Experience\")", priority: 'Medium' },
    { id: 5, text: 'Add a 2-line summary at the top matching the target job description language', priority: 'Low' },
  ],
}

export default function ATSScannerPage() {
  const [state, setState] = useState<'idle' | 'scanning' | 'done'>('idle')
  const [checkedFixes, setCheckedFixes] = useState<number[]>([])
  const [jobDesc, setJobDesc] = useState('')
  const [jobMatchScore, setJobMatchScore] = useState<number | null>(null)

  function startScan() { setState('scanning'); setTimeout(() => setState('done'), 2200) }
  function toggleFix(id: number) { setCheckedFixes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]) }
  function analyzeJobMatch() { if (jobDesc.length > 20) setJobMatchScore(Math.floor(Math.random() * 20) + 72) }

  const statusIcon = (s: string) => {
    if (s === 'pass') return <CheckCircle className="w-4 h-4 text-[#00b894]" />
    if (s === 'fail') return <XCircle className="w-4 h-4 text-[#ff4757]" />
    return <AlertCircle className="w-4 h-4 text-[#fdcb6e]" />
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2d3436] mb-1">ATS Resume Scanner</h2>
          <p className="text-sm text-[#4a5568]">See exactly how Applicant Tracking Systems read your resume before you apply</p>
        </div>

        {state === 'idle' && (
          <div className="rounded-2xl p-10 text-center border-2 border-dashed border-[#babecc] card-hover cursor-pointer"
            style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }} onClick={startScan}>
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: '#e0e5ec', boxShadow: '6px 6px 12px #babecc, -6px -6px 12px #ffffff' }}>
              <Upload className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-bold text-[#2d3436] text-lg mb-2">Upload Your Resume</h3>
            <p className="text-sm text-[#4a5568] mb-6">Drag & drop your PDF or DOCX, or click to scan the demo resume</p>
            <button onClick={startScan} className="px-6 py-3 bg-accent text-white font-bold rounded-xl btn-press uppercase tracking-wider text-sm flex items-center gap-2 mx-auto"
              style={{ boxShadow: '4px 4px 10px rgba(166,50,60,0.3)' }}>
              <ScanLine className="w-4 h-4" /> Scan Resume (Demo)
            </button>
            <p className="text-xs text-[#4a5568] mt-4 font-mono">Demo loads Amirul Hakim&apos;s resume · Supports PDF, DOCX</p>
          </div>
        )}

        {state === 'scanning' && (
          <div className="rounded-2xl p-10 text-center" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
            <div className="w-16 h-16 rounded-full mx-auto mb-6 border-4 border-[#babecc] border-t-accent animate-spin"></div>
            <h3 className="font-bold text-[#2d3436] text-lg mb-2">Scanning Resume...</h3>
            <div className="space-y-2 text-sm text-[#4a5568] font-mono">
              <p>✓ Parsing document structure</p>
              <p>✓ Extracting keywords and phrases</p>
              <p className="animate-pulse">⟳ Running ATS compatibility analysis...</p>
            </div>
          </div>
        )}

        {state === 'done' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center p-8 rounded-2xl" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
                <div className="text-xs font-mono font-bold text-[#4a5568] uppercase tracking-widest mb-4">ATS Score</div>
                <div className="relative w-32 h-32 mb-4">
                  <svg viewBox="0 0 36 36" className="w-32 h-32 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#d1d9e6" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ff4757" strokeWidth="3"
                      strokeDasharray={`${mockResult.atsScore} ${100 - mockResult.atsScore}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-mono font-bold text-[#2d3436]">{mockResult.atsScore}%</span>
                    <span className="text-xs font-mono text-[#4a5568]">Above Avg</span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-[#2d3436] mb-1">Good, but improvable</div>
                <div className="text-xs text-[#4a5568]">Fix checklist below to reach 92%+</div>
                <button onClick={() => setState('idle')} className="mt-4 px-4 py-2 text-sm font-semibold rounded-xl btn-press text-[#4a5568]" style={{ boxShadow: '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>Rescan</button>
              </div>

              <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
                <h3 className="font-bold text-[#2d3436] mb-4">Section Analysis</h3>
                <div className="space-y-3">
                  {mockResult.sections.map(s => (
                    <div key={s.name} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: '#e0e5ec', boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff' }}>
                      {statusIcon(s.status)}
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#2d3436]">{s.name}</div>
                        <div className="text-xs text-[#4a5568]">{s.note}</div>
                      </div>
                      <span className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded ${s.status === 'pass' ? 'text-[#00b894] bg-[#00b894]/10' : s.status === 'fail' ? 'text-[#ff4757] bg-[#ff4757]/10' : 'text-[#fdcb6e] bg-[#fdcb6e]/10'}`}>{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <h3 className="font-bold text-[#2d3436] mb-4">Keyword Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3"><CheckCircle className="w-4 h-4 text-[#00b894]" /><span className="text-sm font-semibold text-[#2d3436]">Matched ({mockResult.keywords.matched.length})</span></div>
                  <div className="flex flex-wrap gap-2">
                    {mockResult.keywords.matched.map(k => (
                      <span key={k} className="px-3 py-1 rounded-lg text-xs font-mono font-semibold text-[#00b894]" style={{ background: 'rgba(0,184,148,0.1)' }}>✓ {k}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3"><XCircle className="w-4 h-4 text-[#ff4757]" /><span className="text-sm font-semibold text-[#2d3436]">Missing ({mockResult.keywords.missing.length})</span></div>
                  <div className="flex flex-wrap gap-2">
                    {mockResult.keywords.missing.map(k => (
                      <span key={k} className="px-3 py-1 rounded-lg text-xs font-mono font-semibold text-[#ff4757]" style={{ background: 'rgba(255,71,87,0.1)' }}>✗ {k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <div className="flex items-center gap-2 mb-5">
                <FileText className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-[#2d3436]">Fix-it Checklist</h3>
                <span className="ml-auto text-xs font-mono text-[#4a5568]">{checkedFixes.length}/{mockResult.fixes.length} done</span>
              </div>
              <div className="space-y-3">
                {mockResult.fixes.map(fix => (
                  <div key={fix.id} onClick={() => toggleFix(fix.id)}
                    className="flex items-start gap-4 p-4 rounded-xl cursor-pointer"
                    style={{ background: '#e0e5ec', boxShadow: checkedFixes.includes(fix.id) ? 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff' : '4px 4px 8px #babecc, -4px -4px 8px #ffffff' }}>
                    <div className="w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center"
                      style={{ background: checkedFixes.includes(fix.id) ? '#ff4757' : 'transparent', boxShadow: checkedFixes.includes(fix.id) ? 'none' : 'inset 2px 2px 4px #babecc, inset -2px -2px 4px #ffffff', border: checkedFixes.includes(fix.id) ? 'none' : '1px solid #babecc' }}>
                      {checkedFixes.includes(fix.id) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm flex-1 ${checkedFixes.includes(fix.id) ? 'line-through text-[#4a5568]' : 'text-[#2d3436]'}`}>{fix.text}</span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded flex-shrink-0 ${fix.priority === 'High' ? 'text-[#ff4757] bg-[#ff4757]/10' : fix.priority === 'Medium' ? 'text-[#fdcb6e] bg-[#fdcb6e]/10' : 'text-[#4a5568] bg-[#babecc]/30'}`}>{fix.priority}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #babecc, -8px -8px 16px #ffffff' }}>
              <h3 className="font-bold text-[#2d3436] mb-3">Compare Against Job Description</h3>
              <p className="text-sm text-[#4a5568] mb-4">Paste a job posting to see how well your resume matches</p>
              <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)} placeholder="Paste job description here..." rows={4}
                className="w-full p-4 rounded-xl text-sm font-mono text-[#2d3436] input-recessed resize-none mb-4" />
              <div className="flex items-center gap-4">
                <button onClick={analyzeJobMatch} className="px-5 py-2.5 bg-accent text-white font-bold rounded-xl btn-press uppercase tracking-wider text-sm flex items-center gap-2" style={{ boxShadow: '4px 4px 8px rgba(166,50,60,0.3)' }}>
                  <ChevronRight className="w-4 h-4" /> Analyze Match
                </button>
                {jobMatchScore !== null && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-mono font-bold text-accent">{jobMatchScore}%</span>
                    <span className="text-sm text-[#4a5568]">match with this job</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
