# CareerArc — Supporting Materials
### Talentbank Tech Hackathon 2026 · Team: Hani & Faiz

**Live prototype:** https://career-arc-phi.vercel.app

---

# PART 1 — JUDGE QUICK-START

## Getting in (no password needed)

Open the live URL, click **Get Started**, then click any of the **four role tiles**. There is no login form — one click puts you straight inside that view.

| Tile | What you see |
|---|---|
| **Candidate** | Job seeker view — starts at onboarding |
| **Employer** | Hiring manager view |
| **University** | Career services view |
| **Ministry** | National policy view |

## The 4-minute golden path

Follow this order — it tells the whole story:

1. **Candidate** → **Onboarding**: pick *Fresh Graduate*, click through the steps. Watch the **Career Readiness Score climb live** on the right.
2. **Dashboard**: the score with its 5-part breakdown, plus an AI-written *"suggested next action"*.
3. **Find Jobs → any job → View & Compare**: a **6-factor Match Score** explaining *why* the candidate fits — then **Apply**.
4. **SIFU Interview Coach** ⭐ **← this is the live AI.** Click *Generate 5 Interview Questions* (badge reads **"✨ AI-generated"**), type any answer, click *Ask SIFU to evaluate* (badge reads **"✨ Live AI"**). The feedback is genuinely generated — try a deliberately weak answer and it will say so.
5. Switch to **Employer** → click an applicant: **the same readiness score**, now as a hiring signal, plus their Match to that specific role and their Story Video.
6. Switch to **University**: the same scores again, now as **risk flags** — with an intervention queue naming who needs help and what help to give.
7. Switch to **Ministry** → **Speed vs Stickiness**: the metric nobody tracks today.

## What is real vs simulated

We are explicit about this because the brief asked for dummy data and no API keys.

| | |
|---|---|
| **Real** | **SIFU Interview Coach** — genuinely calls the Claude API (Haiku 4.5) to generate questions and evaluate the answer you type. Nothing is pre-written. |
| **Simulated** | Everything else — all data is dummy data as the brief requires. Scoring logic (readiness, job match, course match) is **real working code**, just running on simulated records. |

If SIFU's API is ever unavailable, it falls back automatically to a sample set and labels itself **"Simulated"** — so the demo can never break in front of you.

---

# PART 2 — MODULE REFERENCE

## The core idea: one score, three lenses

Everything hangs off a single number — the **Career Readiness Score (CRS)**.

```
CRS = Resume·25% + ATS·25% + Skill Match·25% + Portfolio·15% + Application Activity·10%

Risk bands:  0–49 = High Risk   ·   50–69 = Medium   ·   70–100 = Low Risk
```

The same student's CRS is read three different ways:

- **Candidate** sees it as *"how ready am I, and what do I fix next?"*
- **Employer** sees it as a *hiring signal*
- **University** sees it as a *risk flag* to trigger early help

Implemented once in `lib/scoring.ts` (`computeCrs()`, `riskOf()`) and consumed by every view. This is what makes CareerArc one connected platform rather than separate tools.

---

## How to read this section

Each module below lists a **Data source** and an **API**. To avoid any confusion:

- **File paths such as `lib/courseAdvisor.ts` are files inside our own codebase** — they are *not* external websites, third-party services or purchased datasets. Think of them as spreadsheets we wrote ourselves and shipped inside the app.
- **"API: None"** means that module makes **no internet call at all**. Everything it needs is already bundled in the application.
- **Exactly one module calls an external API** — SIFU (module 12), which calls the Anthropic Claude API. Every other module is fully self-contained, exactly as the brief requires: *"use dummy / simulated data… no API keys."*

---

## CANDIDATE MODULES

### 1. One-Click Login · `/login`
- **Purpose:** Remove all friction for judges and demo users.
- **How:** Four role tiles; clicking one writes the role to `localStorage` and routes to that dashboard. No password, no form.
- **Data:** Role definitions held in the page component.
- **API:** None.

### 2. Onboarding · `/onboarding`
- **Purpose:** Turn a blank profile into a readiness diagnosis in about 60 seconds — the emotional hook of the demo.
- **How:** A gated wizard whose steps are configured by the candidate's chosen level (Internship / Fresh Grad / Mid / Senior). Each completed step recalculates the CRS, which animates live in the side gauge. One config object drives four different journeys.
- **Data:** `levels` + `levelByKey` in `lib/careerData.ts`. Result saved to `localStorage` as `careerProfile`.
- **API:** None.

### 3. Dashboard — the CRS hub · `/dashboard`
- **Purpose:** Answer *"how ready am I, and what is the single best thing to do next?"*
- **How:** Reads the saved profile, computes CRS, renders the 5-component breakdown, ranks all jobs by real skill compatibility, and surfaces an AI-style *next action* targeting the candidate's **weakest** component.
- **Data:** `careerProfile` (localStorage) + `mockJobs` (`lib/mockData.ts`).
- **API:** None — the next-action text is generated by `nextActionText()` in `lib/careerData.ts`, chosen from the score data.

### 4. Course Advisor · `/course-advisor`
- **Purpose:** For 16–18 year olds who have not chosen a course yet — *"what should I study?"* — answered **before** they commit four years, and for most a PTPTN loan they will still be repaying years later.
- **How:** Three quick steps (interests → school subjects → work animal) feed `matchCourses()`, which scores ten courses on a weighted model (interests 55%, subjects 30%, work animal 15%) and returns the top three with reasons. Every course card also shows a **non-degree route**, because a large share of Gen Alpha say they do not intend to go to university.
- **Data:** `lib/courseAdvisor.ts` — courses, demand signals, salary ranges, 10-year durability notes, skills routes.
- **API:** None.

### 5. Career Path · `/career-path`
- **Purpose:** A plan a person can actually act on. Deliberately **not** a 40-year fantasy.
- **How:** Three tracks (Tech Lead→CTO / PM pivot / Founder). Each shows a concrete **4-year plan** with what to *do* each year, then clearly-labelled **2030 and 2040 scenarios** ("scenarios to think with, not forecasts"), then a **Future-Proof Check** of durable vs automatable skills.
- **Data:** `careerPathData` and `futureProof` in `lib/mockData.ts`.
- **API:** None.

### 6. Job Search · `/jobs`
- **Purpose:** Make browsing decision-focused rather than a list to scroll.
- **How:** Every card computes a live Match Score against the candidate's real profile, sorts by it, and shows missing skills in red. Cards also carry the Anti-Ghost rating.
- **Data:** `mockJobs` (`lib/mockData.ts`) + `jobDetails` (`lib/careerData.ts`).
- **API:** None.

### 7. Job Detail — 6-Factor Match Score · `/jobs/[id]`
- **Purpose:** Answer *"do I fit **this** role, and why?"* — not just a skills tick-list.
- **How:** `matchScore()` in `lib/scoring.ts` scores six weighted dimensions and returns a reason for each:

  | Factor | Weight |
  |---|---|
  | Required skills | 35% |
  | Relevant experience | 25% |
  | Role similarity | 15% |
  | Tools & technologies | 10% |
  | Education & certifications | 10% |
  | Industry knowledge | 5% |

  Followed by matched/missing skills and an AI-style verdict (*Strong apply* / *Apply — close 1 gap* / *Stretch role*).
- **Data:** `mockJobs` + `jobDetails` + the candidate's `careerProfile`.
- **API:** None — deterministic scoring, so it is explainable and repeatable.

### 8. My Applications · `/applications`
- **Purpose:** Close the loop after applying — no more black hole.
- **How:** Applications persist to `localStorage`; each row shows a 4-stage pipeline (Applied → Under Review → Interview → Offer), the employer's Anti-Ghost rating, and a next step. Stalled applications are flagged amber.
- **Data:** `myApplications` (localStorage) merged with `mockApplications` for varied demo stages.
- **API:** None.

### 9. Company Directory · `/companies` and `/companies/[id]`
- **Purpose:** Let candidates judge an employer *before* applying.
- **How:** Verified-employer badges, years as a Talentbank partner, ratings, Anti-Ghost response scores, culture signals, simulated candidate reviews, and open roles. Links out to Glassdoor for real-world reviews.
- **Data:** `mockCompanies` (`lib/mockData.ts`), reviews from `getCompanyReviews()`.
- **API:** None (Glassdoor is an outbound search link, not an integration).

### 10. YourAnimal Test · `/aptitude-test`
- **Purpose:** Talentbank's mandatory personality assessment, used as a career-fit and culture signal.
- **How:** The full **40-question** assessment mapping to five work animals — Lion, Owl, Dolphin, Fox, Wolf — each with a work style, predicted career trajectory, and best-fit roles. The result is saved to the profile and shown to employers as a culture-fit badge.
- **Data:** `lib/animalTest.ts` (questions, animals, scoring). Attribution to yourworkanimal.com.
- **API:** None.

### 11. My Story Video · `/story-video`
- **Purpose:** The one place a candidate stops being a score and becomes a person.
- **How:** A guided 60-second video with four on-screen prompts that advance automatically as a teleprompter. Uses the browser's real camera (`getUserMedia` + `MediaRecorder`); if the camera is denied or missing it silently runs a simulated recording so the demo never breaks. Privacy toggles control who can view it; employers see it on the applicant profile.
- **Data:** Prompts and metadata in `lib/storyVideo.ts`; recording held in browser memory only — nothing is uploaded.
- **API:** None.

### 12. SIFU Interview Coach ⭐ · `/interview-coach` — **REAL AI**
- **Purpose:** *Smart Interview Feedback & Upskilling.* Practice interviews and get honest, specific coaching. ("Sifu" = master/mentor.)
- **How:** Two real Claude API calls behind Next.js server routes:
  - `POST /api/interview-questions` → generates 5 questions **plus model answers**, tailored to the chosen role, company type, seniority and question type.
  - `POST /api/interview-feedback` → evaluates the answer the user types: a 0–100 score, verdict, **STAR coverage** (Situation / Task / Action / Result), specific strengths, and concrete improvements.
- **Data:** Generated live by the model. A static question bank in `lib/sifu.ts` serves only as fallback.
- **API:** ✅ **Anthropic Claude API — model `claude-haiku-4-5`.** Uses structured outputs so the response is always valid JSON. The API key is read **server-side only** (`ANTHROPIC_API_KEY`) and is never exposed to the browser. Any failure — missing key, rate limit, network — falls back to a deterministic local evaluation labelled *"Simulated"*.

### 13. Supporting candidate tools
| Module | Purpose | Data / API |
|---|---|---|
| **Resume Builder** · `/resume-builder` | Live two-panel ATS-safe resume editor with a live ATS score | Local component state · No API |
| **Portfolio** · `/portfolio` | Timeline of projects with an "AI Polish" rewrite toggle | `mockPortfolioEntries` · No API |
| **ATS Scanner** · `/ats-scanner` | Shows what an ATS sees before a human does | Simulated analysis · No API |
| **Salary Insights** · `/salary` | Malaysian salary percentiles and skill premiums | `mockSalaryData` · No API |
| **My Profile** · `/profile` | Profile completion, skills, experience, resume upload | localStorage · No API |

---

## EMPLOYER MODULES

### 14. Employer Dashboard · `/employer`
- **Purpose:** Make hiring accountable, not just efficient.
- **How:** Shows the employer's own **Anti-Ghost score** (average response time, ghosting rate, 6-week trend) alongside applicants ranked by **CRS** and tagged with their YourAnimal culture fit. An A+ rating is framed as a recruiting advantage.
- **Data:** `mockEmployerStats` + the **shared candidate pool** in `lib/careerData.ts` — the same people the university sees.
- **API:** None.

### 15. Applicant Detail · `/employer/applicants/[id]`
- **Purpose:** Everything a hiring manager needs on one screen.
- **How:** Readiness score and risk band, a **"Match to this role"** card scoring the candidate against the job they actually applied for (framed as *"Readiness says they're prepared. This says they fit."*) ending with **gaps to probe in interview**, their Story Video with chapter markers, and a clean A4-style resume.
- **Data:** Shared `candidates` array + `applicantRoles` mapping (`lib/careerData.ts`).
- **API:** None.

---

## UNIVERSITY MODULES

### 16. Employability Dashboard · `/university`
- **Purpose:** Answer *"which of our students are career-ready, and which are at risk?"* — **while there is still time to help.**
- **How:** Aggregates the same candidate pool into cohort readiness, at-risk counts, average ATS, portfolio completion, and 12-month job retention, plus an AI-style insight naming the programme that needs the most support.
- **Data:** Derived live from `candidates` (`lib/careerData.ts`) + `mockUniversityStats`.
- **API:** None.

### 17. Student Intervention Queue · `/university/interventions`
- **Purpose:** Turn analysis into action — the university's to-do list.
- **How:** Every student sorted lowest-readiness first, each row showing programme, CRS, risk level, the **detected issue** (low ATS, no portfolio, few applications) and a **recommended intervention** (resume clinic, portfolio workshop, skill bootcamp, career counselling). A **"Why this recommendation?"** panel shows the score breakdown and the rule that fired.
- **Data:** Same shared candidate pool; issue and action derived from each student's weakest CRS component.
- **API:** None.

### 18. Faculty Skill-Gap Dashboard · `/university/skill-gaps`
- **Purpose:** Show curriculum leaders which skills to close, at scale.
- **How:** Each gap lists the target roles it blocks, the number of students affected, a recommended intervention (SQL clinic, cloud bootcamp, Power BI + employer case study) and the estimated readiness uplift.
- **Data:** `skillGaps` + `programmesSummary` (`lib/careerData.ts`).
- **API:** None.

---

## MINISTRY MODULE

### 19. Ministry Dashboard · `/ministry`
- **Purpose:** National graduate employability for policy and planning (MOHE).
- **How:** National KPIs, employability by field, a 3-year trend, hiring sectors — and the differentiator, **"Speed vs Stickiness."** Today the system measures *how fast* graduates are hired; nobody measures whether they **stayed**. This view shows both side by side and flags fields that hire fast but lose people — a fit problem hidden by a good speed number.
  > *"Time-to-hire measures speed. Retention measures fit. A graduate hired in 2 months who quits in 5 is counted as a success today."*
- **Data:** `mockMinistryStats` including `speedVsFit` (`lib/mockData.ts`).
- **API:** None.

---

## SHARED MODULE

### 20. Impact & SDG · `/impact`
- **Purpose:** Show impact, not just features — the judging criterion that matters most.
- **How:** Headline impact metrics plus the three UN Sustainable Development Goals CareerArc moves, each mapped to the specific features that deliver them:
  - **SDG 4 — Quality Education:** tracer-study data helps universities close real skill gaps
  - **SDG 8 — Decent Work:** fair-pay benchmarks and anti-ghosting accountability
  - **SDG 17 — Partnerships:** candidates, employers, universities and the ministry on one platform
- **Data:** `sdgGoals` + `mockImpactMetrics` (`lib/mockData.ts`).
- **API:** None.

---

# PART 3 — TECHNICAL SUMMARY

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Pages and server API routes in one deployable unit |
| Language | **TypeScript** | Type-safe scoring logic across every view |
| Styling | **Tailwind CSS** + custom neumorphic design system | Tactile, instrument-like UI rather than generic SaaS |
| AI | **Anthropic Claude API** (`claude-haiku-4-5`) | Real interview coaching; low cost per call |
| Hosting | **Vercel** | One-click public URL; API routes deploy with the app |
| State | **Browser localStorage** | No backend required for the prototype stage |

## Where the data comes from

Per the hackathon brief — *"use dummy / simulated data… no real data, no PDPA concerns, no API keys"* — all records are simulated:

| Source file | Contains |
|---|---|
| `lib/mockData.ts` | Jobs, companies, applications, salary data, career paths, university and ministry statistics, SDG data |
| `lib/careerData.ts` | The shared candidate pool, level configuration, job detail enrichment, skill gaps, AI-style text helpers |
| `lib/courseAdvisor.ts` | Courses, demand signals, non-degree skills routes |
| `lib/animalTest.ts` | The 40-question YourAnimal assessment |
| `lib/scoring.ts` | **CRS and Match Score formulas** — the logic spine |
| `localStorage` | The live user's own profile, applications, video metadata |

**One deliberate exception:** SIFU calls the real Claude API, because the brief notes that genuine AI integration is a bonus. It is the single module where a judge can type anything and receive a response that was not written in advance.

## Security note

The Anthropic API key lives only in a Vercel environment variable and is read server-side inside the API route. It is never sent to the browser, never committed to the repository, and is not present in the client bundle.

---

# PART 4 — REAL IMPLEMENTATION BLUEPRINT

## Why this section exists

The prototype runs on simulated data because the brief requires it. **This section sets out what would power each module in production**, so the concept can be judged as *buildable* rather than hypothetical.

Nothing below is speculative technology. Every source named already exists in Malaysia today — the work is integration and partnership, not invention.

## Production architecture

| Layer | Production choice | Note |
|---|---|---|
| **Frontend** | Next.js (unchanged) | The prototype UI is already production-grade |
| **Backend / API** | Next.js server routes → Node.js services | Already proven: our SIFU routes work this way |
| **Database** | PostgreSQL (Supabase / AWS RDS) | Replaces `localStorage`; stores profiles, applications, scores |
| **Authentication** | Auth0 / Clerk / Supabase Auth | Email + institutional SSO for university accounts |
| **File & video storage** | AWS S3 + Mux or Cloudflare Stream | Resume PDFs and Story Videos |
| **AI layer** | Anthropic Claude API | **Already live for SIFU** — extend to resume parsing and coaching |
| **Analytics** | Scheduled jobs writing to a data warehouse | Powers the university and ministry dashboards |

## Where the real data would come from

### A. Talentbank's own assets — *available on day one*

The strongest data advantage is Talentbank's, not a third party's:

- **10,000+ employer network** → live job listings and verified employer profiles
- **50 university partners** → cohort data for the university dashboards
- **~50 career fairs a year** → employer engagement and placement outcomes
- **YourWork Animal (yourworkanimal.com)** → the personality assessment is already Talentbank IP; we integrate rather than rebuild

### B. Malaysian national and government sources

| Source | What it powers |
|---|---|
| **MOHE Graduate Tracer Study** (*Kajian Pengesanan Graduan*) | University and ministry employability dashboards — the national survey already run annually |
| **MQA — Malaysian Qualifications Register** | Course Advisor: every accredited programme in Malaysia |
| **TalentCorp — Critical Occupations List / MyNext** | Which skills and roles are genuinely in demand |
| **DOSM — Salaries & Wages Survey** | Fair-pay benchmarks by role, sector and state |
| **MyFutureJobs (PERKESO)** | National vacancy data |
| **SSM e-Info** (Companies Commission) | Verifying employers are real registered businesses |
| **EPF (KWSP) / SOCSO contribution continuity** | **Retention** — see below |

> **How we would actually measure "Speed vs Stickiness."** Retention is the metric nobody tracks today, and it is measurable: if a graduate's EPF or SOCSO contributions from one employer stop after five months, they left that job. Combined with 6- and 12-month follow-up surveys through the existing tracer-study channel, this produces a real national retention figure. This requires a government data-sharing agreement — which is precisely why it belongs to a Talentbank-scale platform rather than a startup.

### C. Commercial APIs

| Service | What it powers |
|---|---|
| **Textkernel / Sovren, Affinda or RChilli** | Real ATS resume parsing and scoring |
| **JobStreet (SEEK) partner feed** | Supplementary job listings beyond Talentbank's own network |
| **Anthropic Claude API** | SIFU coaching (**already live**), resume feedback, insight generation |
| **Mux / Cloudflare Stream** | Story Video hosting and playback |

### D. Platform-native data — *we generate it ourselves*

Some of the most valuable data has no external source, because **nobody collects it today**. This is proprietary from day one:

- **Anti-Ghost scores** — computed from real employer response timestamps inside the platform
- **Career Readiness Scores** — the same formula, run on real resumes, real applications and verified portfolios
- **Match Score outcomes** — which predicted matches actually converted to hires, used to tune the weightings

## Module-by-module: prototype → production

| Module | Today (prototype) | In production |
|---|---|---|
| **Job Search & Match** | `mockJobs` | Talentbank employer network + JobStreet partner feed + MyFutureJobs |
| **Career Readiness Score** | Computed from seeded profiles | Same formula — real parsed resumes, real application activity |
| **ATS Scanner** | Simulated score | Textkernel / Affinda parsing + Claude analysis |
| **Course Advisor** | `lib/courseAdvisor.ts` | MQA Qualifications Register + MOHE tracer outcomes + TalentCorp demand data |
| **Career Path** | `careerPathData` | Real career transitions aggregated from platform placements |
| **Salary Insights** | `mockSalaryData` | DOSM Salaries & Wages Survey + platform placement salaries |
| **YourAnimal Test** | `lib/animalTest.ts` | Integrate Talentbank's existing yourworkanimal.com system |
| **Company profiles** | `mockCompanies` | SSM e-Info verification + Talentbank verified partner network |
| **Company reviews** | Simulated | Reviews from candidates actually placed through the platform |
| **Anti-Ghost score** | Seeded values | Platform-native — real employer response timestamps |
| **SIFU Interview Coach** | ✅ **Already real** (Claude API) | Same, plus voice input and richer feedback |
| **Story Video** | In-browser only | Mux / Cloudflare Stream upload and hosting |
| **University dashboards** | Derived from seeded cohort | University SIS integration + MOHE Graduate Tracer Study |
| **Ministry dashboard** | `mockMinistryStats` | MOHE / MyMOHES national statistics |
| **Retention (Speed vs Stickiness)** | Seeded values | EPF / SOCSO contribution continuity + tracer follow-up surveys |

## Realistic sequencing

We are deliberately honest about what is easy and what needs partnership:

| Tier | What | What it needs |
|---|---|---|
| **1 — Buildable immediately** | Database, auth, resume parsing, video hosting, expanded AI, platform-native scoring | Commercial contracts only. Weeks, not months. |
| **2 — Needs Talentbank** | Live employer listings, verified companies, university cohort data, YourAnimal integration | Talentbank's existing network and university MOUs — assets they already hold |
| **3 — Needs government partnership** | MOHE tracer study integration, national ministry reporting, EPF/SOCSO retention measurement | Data-sharing agreements with MOHE and PERKESO. Highest impact, longest timeline. |

**The honest summary:** everything a candidate touches is Tier 1 or Tier 2 and could ship within months. The ministry-scale retention measurement is Tier 3 — the most valuable and the slowest, which is exactly why it belongs to an organisation with existing government relationships rather than to a startup building alone.
