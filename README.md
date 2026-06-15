# Career Arc

> Navigate your 40-year career journey — built for the Talentbank Career OS Hackathon

Career Arc is a career intelligence platform for Malaysian job seekers and employers. It gives candidates the tools to make smarter career decisions — from salary benchmarking and ATS scanning to interview practice and rejection analysis — and gives employers the accountability metrics to hire with integrity.

---

## Features

### Candidate

| Section | Module | Description |
|---|---|---|
| **Home** | Dashboard | Application tracker, ATS score, top job matches, career timeline |
| **My Profile** | My Profile | 5-tab profile builder: Personal Info, Experience, Education, Skills, Resume Upload |
| | Resume Builder | Live two-panel editor with real-time A4 preview and ATS score gauge |
| | Portfolio | Project timeline with AI Polish toggle to rewrite bullet points professionally |
| | Aptitude Test | 10-question personality test → one of 5 career archetypes with ideal role matches |
| **Find Jobs** | Job Search | Listings with match %, Anti-Ghost rating (🟢🟡🔴), keyword + experience filters |
| | ATS Scanner | Upload resume → score, section analysis, keyword gaps, prioritised fix-it checklist |
| **Career Tools** | Career Path | 40-year simulator with 3 branching trajectories (Technical / Management / Founder) |
| | Salary Insights | Malaysian salary benchmarks by role, city, seniority + negotiation script generator |
| | Cost Calculator | Real take-home comparison between two job offers after all living costs |
| **AI Coach** | AI Career Coach | Mock interview questions by role/type/difficulty with 2-min timer + model answers |
| | Rejection Decoder | Paste rejection email → HR phrase translation, lost-points analysis, action plan |

### Employer

| Module | Description |
|---|---|
| **Employer Dashboard** | Applicant pipeline, posted jobs, response time chart |
| **Anti-Ghost Score** | Response time rating (A+ → F) displayed on all job listings |
| **Candidate Matching** | Ranked applicants by match % with personality type badge (from Aptitude Test) |

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React
- **Design System**: Industrial Skeuomorphism (neumorphic shadows, chassis palette)
- **Data**: Mock data (Stage 1 prototype — no real API calls)
- **Auth**: `localStorage` role-based session (Candidate / Employer)
- **Deployment**: Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Run Locally

```bash
# Clone the repo
git clone link repo
cd career-arc/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Accounts

| Role | Email | Password | Redirects to |
|---|---|---|---|
| Candidate | `demo@careerarc.my` | `demo123` | `/dashboard` |
| Employer | `employer@careerarc.my` | `demo123` | `/employer` |

---

## Project Structure

```
career-arc/
├── frontend/                    # Next.js app (Stage 1)
│   ├── app/
│   │   ├── page.tsx             # Landing page
│   │   ├── login/               # Role-based login (Candidate / Employer)
│   │   ├── dashboard/           # Candidate dashboard
│   │   ├── profile/             # Profile builder (5 tabs)
│   │   ├── resume-builder/      # Live resume editor + ATS score
│   │   ├── portfolio/           # Living portfolio with AI Polish
│   │   ├── aptitude-test/       # Career personality test (5 archetypes)
│   │   ├── jobs/                # Job search + Anti-Ghost filter
│   │   ├── ats-scanner/         # Resume ATS analysis
│   │   ├── career-path/         # 40-year path simulator
│   │   ├── salary/              # Fair Pay Engine
│   │   ├── cost-calculator/     # Cost of living comparison
│   │   ├── career-coach/        # AI interview practice
│   │   ├── rejection-decoder/   # Rejection email analysis
│   │   └── employer/            # Employer dashboard
│   ├── components/
│   │   ├── DashboardLayout.tsx  # Responsive sidebar (grouped nav) + topbar
│   │   ├── Navbar.tsx           # Landing page navbar
│   │   └── StatCard.tsx         # Neumorphic stat card
│   ├── lib/
│   │   └── mockData.ts          # All mock data
│   └── ...config files
└── backend/                     # Stage 2 (coming soon)
```

---

## Deployment

Deployed on **Vercel**. When importing to Vercel:

1. Import `/career-arc` from GitHub
2. Set **Root Directory** to `frontend`
3. Framework: Next.js (auto-detected)
4. Deploy

---

## Design System

Career Arc uses **Industrial Skeuomorphism** — a tactile, device-like aesthetic inspired by precision instruments.

| Token | Value | Usage |
|---|---|---|
| `chassis` | `#e0e5ec` | Page background, sidebar |
| `surface` | `#f0f2f5` | Cards, panels |
| `accent` | `#ff4757` | CTA buttons, active nav, logo |
| `shadow` | `#babecc` | Shadow dark side |
| `white` | `#ffffff` | Shadow light side |

Cards: `box-shadow: 8px 8px 16px #babecc, -8px -8px 16px #ffffff`
Inputs: `box-shadow: inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff`
Active nav: inset shadow (pressed state)

---

## Hackathon

**Event**: Talentbank Career OS Hackathon
**Stage 1**: Prototype · June 2026
**Team**: Hani · Faiz
