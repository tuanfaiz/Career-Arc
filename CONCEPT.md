# Career Arc — Concept Brief
### Talentbank Career OS Hackathon · Stage 1 Submission

---

## The Problem

Malaysian fresh graduates and mid-career professionals face a job market that is simultaneously competitive and opaque. A Computer Science graduate from UPM sends out 80 applications over three months. They get 12 interviews. They receive 11 rejections — most worded identically: *"We will keep your resume on file."* One offer lands below their rent.

This is not a skills crisis. It is an information crisis.

Candidates do not know what an ATS system sees when it reads their CV. They do not know whether RM 6,500 is above or below market for their role in Cyberjaya. They do not know if a job in KLCC with a RM 1,500 higher salary actually pays less after accounting for toll, parking, and an hour of commute each way. They do not know which companies are notorious for ghosting after a final-round interview. And crucially — most candidates do not know themselves well enough to know which type of role or environment they will actually thrive in.

On the employer side, Malaysian hiring managers deal with an equally broken system. They receive 63 applications for one Data Analyst role. They cannot efficiently surface the strongest candidates. Their response time slips. They ghost candidates unintentionally — and their employer brand takes the hit.

Career Arc was built to fix both sides of this equation.

---

## The Solution

**Career Arc** is a career intelligence platform that gives candidates the tools to navigate a 40-year career with clarity, and gives employers the accountability metrics to hire with integrity.

The guiding philosophy is simple: every decision in a career is a data problem. Where should I work? What should I earn? Is this job offer actually better than my current one? How do I perform under interview pressure? What kind of professional am I, really? Career Arc turns these guesses into answers.

The platform is built around two account types — Candidate and Employer — each with a dedicated dashboard and toolset.

---

## Feature Modules

### Module 01 — Career Path Navigator
A 40-year career simulation tool. Candidates see three branching trajectories from their current role: the technical track (Senior Engineer → CTO), the management track (Team Lead → Director), and the entrepreneurship track (Tech Lead → Founder). Each path shows projected salary milestones, required skill progression, and the specific gap between where they are now and where each path leads. This is not generic advice — it is a personalised arc.

### Module 02 — Living Portfolio
A portfolio builder that goes beyond a static PDF. Candidates log their projects, contributions, and achievements in a timeline view. An AI Polish toggle rewrites raw bullet points into polished professional descriptions — turning "built login page" into "Engineered secure authentication system with session management, reducing login-related support tickets by 40%." The portfolio is always live, always updatable, and always ready to share.

### Module 03 — ATS Resume Scanner
Before a human reads a resume, an Applicant Tracking System does. Most candidates do not know this. The ATS Scanner analyses resume structure, keyword density, and section formatting against what ATS systems look for. It returns a score, a section-by-section breakdown, a matched and missing keyword analysis, and a prioritised fix-it checklist. Candidates can also paste a specific job description to see their match percentage for that role.

### Module 04 — Fair Pay Engine
Malaysian salary data is fragmented and often outdated. The Fair Pay Engine surfaces benchmarks for specific roles, seniority levels, and cities — showing 25th percentile, median, and 75th percentile ranges. Candidates see exactly where their current salary sits on that spectrum. A built-in Negotiation Script Generator drafts a personalised email they can send to a hiring manager, grounded in real market data rather than guesswork.

### Module 05 — Cost of Living Calculator
A RM 8,500 job in KLCC versus a RM 7,000 job in Cyberjaya. Most candidates pick the higher number. Career Arc calculates the real take-home after rent, toll, petrol, food, and daily commute costs — and shows the annual difference. In many cases, the "lower salary" job puts significantly more money in your pocket. This module makes that comparison instant and visual.

### Wildcard — Anti-Ghosting Employer Tracker
Every job listing on Career Arc carries an Anti-Ghost rating: 🟢 Active (responds within 3 days), 🟡 Passive (responds but slowly), 🔴 Risk (known for going silent after interviews). The employer dashboard tracks average response time over the last six weeks and shows employers their Anti-Ghost score. An A+ rating attracts better candidates. The system creates accountability on both sides of the hiring process.

### Resume Builder
A live, two-panel resume editor purpose-built for ATS compatibility. Candidates fill in Contact, Summary, Experience, Education, and Skills sections on the left — and see a clean, ATS-safe A4 preview update in real time on the right. A live ATS Score gauge (0–100) rises as sections are completed, giving candidates a clear signal of readiness before they apply anywhere.

### Career Aptitude Test
A 10-question personality assessment that surfaces which of five career archetypes a candidate most resembles: the Architect (analytical, systems-focused), the Connector (people-first, collaborative), the Builder (execution-driven, high-output), the Visionary (creative, big-picture), or the Guardian (detail-oriented, process-driven). Each result includes a full work-style description and a list of roles the candidate is naturally suited for. The result is stored on the candidate's profile — and displayed as a personality badge on employer dashboards, giving hiring managers an instant signal of culture and team fit without reading between the lines of a CV.

### AI Career Coach
Mock interview practice, tailored by role, seniority, company type, and question category — Technical, Behavioural, or Situational. Each session generates five targeted questions with a two-minute practice timer and a model answer toggle. Candidates can mark questions as practised and generate new sets until they feel genuinely ready, not just familiar.

### Rejection Letter Decoder
Corporate HR language is designed to be legally safe, not honest. The Rejection Decoder translates rejection emails into actionable intelligence: what the company actually meant, which phrases are standard filler, where the candidate likely lost points, and a concrete plan for what to do next — including the earliest sensible date to reapply. The module closes with a coaching note, because job searching is mentally exhausting and candidates deserve honesty alongside strategy.

---

## Technical Architecture

Career Arc is structured as a monorepo with a deliberate separation between frontend and backend, ready for Stage 2 integration:

- **Frontend**: Next.js 14 (App Router) with TypeScript and Tailwind CSS
- **Design System**: Industrial Skeuomorphism — neumorphic cards, tactile button states, and a chassis-grey palette (`#e0e5ec`) with red accent (`#ff4757`). The UI is built to feel like a precision instrument, not a generic SaaS dashboard
- **Authentication**: Role-based login (Candidate / Employer) routing to separate dashboards with localStorage session management for the prototype stage
- **Navigation**: Grouped sidebar with five logical sections — Home, My Profile, Find Jobs, Career Tools, and AI Coach — with a mobile-responsive drawer
- **Data**: All features are powered by structured mock data for Stage 1. Stage 2 will introduce a real backend with AI inference endpoints, live salary data, and employer analytics
- **Deployment**: Vercel, with the Next.js app in the `/frontend` subdirectory

---

## Why Career Arc

Most job platforms help you apply. Career Arc helps you understand yourself, prepare for what is ahead, evaluate your options clearly, and recover when things do not go to plan.

It treats candidates as intelligent adults who deserve real information — not just a Submit Application button. It treats employers as accountable partners in the hiring process, not just customers buying access to a CV pile.

The 40-year framing is intentional. A career is not a series of job applications. It is the most consequential long-term project most people will ever manage. Career Arc is the platform that treats it that way.

---

## Team

**Hani** · **Faiz**

Built for the Talentbank Career OS Hackathon · June 2026
