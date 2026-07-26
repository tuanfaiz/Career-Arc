# CareerArc — Project Summary
### Talentbank Tech Hackathon 2026 · Team: Hani & Faiz
**Live prototype:** https://career-arc-phi.vercel.app

---

## One line

**CareerArc is Malaysia's Career Operating System** — one platform that helps Gen Z choose the right path, helps employers hire accountably, and helps universities intervene *before* students graduate unprepared.

---

## The problem

Malaysia's early-career market is competitive but **opaque**, and it fails three groups at once.

A graduate sends 80 applications and gets ghosted. They do not know what an ATS sees in their CV, whether RM 6,500 is fair for their role, or which employers go silent after a final round. Long before that, at seventeen, they chose a course with almost no information about where it actually leads.

An employer receives 63 applications for one Data Analyst role, cannot efficiently surface the strongest candidates, and unintentionally ghosts the rest — damaging their own brand.

A university discovers its graduates were unemployable **after** they graduated, when nothing can be done.

This is not primarily a skills crisis. It is an **information crisis** — and today's system measures the wrong thing. Everyone measures *how fast* a graduate gets hired. **Nobody measures whether they chose well, or whether they stayed.**

---

## The solution: one score, three lenses

CareerArc connects all three groups through a single source of truth — the **Career Readiness Score (CRS)** — built from five weighted signals:

```
CRS = Resume·25% + ATS·25% + Skill Match·25% + Portfolio·15% + Application Activity·10%
       0–49 High Risk   ·   50–69 Medium   ·   70–100 Low Risk
```

The same student's score is read three different ways:

| Who | What the score means to them |
|---|---|
| **Candidate** | *"How ready am I, and what do I fix next?"* |
| **Employer** | A hiring signal — readiness, then fit for the specific role |
| **University** | A risk flag that triggers help **while there is still time** |

**One number. Three points of view.** That is what makes CareerArc a connected operating system rather than a collection of separate tools.

---

## What we built

### For candidates — decide, prepare, apply

- **Course Advisor** — for 16–18 year olds who have not chosen yet. Three questions (interests, subjects, work style) return three matched courses with demand signals, an honest *"will this still matter in 10 years?"* note, and a **non-degree route** for each — because a large share of Gen Alpha do not intend to go to university.
- **Guided onboarding** — a level-tailored wizard (Internship / Fresh Grad / Mid / Senior) where the readiness score visibly climbs as the profile fills in.
- **Readiness dashboard** — the CRS with its five-part breakdown and an AI-written *next best action* targeting the weakest component.
- **Next 4 Years** — a concrete year-by-year plan of what to *do*, plus clearly-labelled 2030 and 2040 **scenarios** (not forecasts) and a future-proof check of durable vs automatable skills.
- **Job matching** — a **6-factor Match Score** (skills 35%, experience 25%, role similarity 15%, tools 10%, education 10%, industry 5%) that explains *why* a candidate fits, names the missing skills, and gives an apply/don't-apply verdict.
- **SIFU Interview Coach** — *Smart Interview Feedback & Upskilling.* **Powered by real AI**: it generates tailored interview questions and scores the answer you actually type, with STAR analysis and specific fixes.
- **My Story Video** — a guided 60-second video answering four prompts, so a candidate is more than a score.
- **Anti-Ghosting ratings** and **verified company profiles** so candidates can judge an employer before applying.

### For employers — hire with accountability

Applicants ranked by readiness and YourAnimal culture fit; a **"Match to this role"** breakdown ending in *gaps to probe in interview*; the candidate's Story Video and resume in one view; and the employer's own **Anti-Ghost score** — average response time and ghosting rate — framed as a recruiting advantage.

### For universities — intervene before graduation

A cohort employability dashboard, a **Student Intervention Queue** naming exactly who is at risk, why, and what help to give (resume clinic, portfolio workshop, skill bootcamp), each with a *"Why this recommendation?"* explanation — plus a **Faculty Skill-Gap dashboard** showing which skills to close and how many students each gap blocks.

### For the ministry — measure fit, not just speed

A national employability view whose centrepiece is **"Speed vs Stickiness"**: today MOHE tracks how long graduates take to land a first job, but not **how long they stay**. Our dashboard shows both, flagging fields that hire fast yet lose people — a fit problem hidden behind a good speed number.

> *"Time-to-hire measures speed. Retention measures fit. A graduate hired in 2 months who quits in 5 is counted as a success today."*

---

## Impact and sustainability

CareerArc is built around impact rather than feature count, and maps to three UN Sustainable Development Goals:

- **SDG 4 — Quality Education:** tracer-study and readiness data let universities close real skill gaps and align curricula with hiring demand.
- **SDG 8 — Decent Work:** fair-pay benchmarks and anti-ghosting accountability raise the transparency and dignity of early-career hiring.
- **SDG 17 — Partnerships:** one transparent platform connecting candidates, employers, universities and the ministry around shared outcomes.

The measurable thesis is **early intervention** — catching at-risk students before graduation instead of counting unemployment afterwards.

---

## Technical approach

Next.js 16 (App Router) with TypeScript and Tailwind CSS, deployed on Vercel as a public one-click prototype. All records are **simulated dummy data**, exactly as the brief requires — no real data, no PDPA exposure.

The scoring engines are **real working code**, not mock-ups: readiness, job match and course match are deterministic, explainable functions.

**One deliberate exception:** **SIFU calls the real Anthropic Claude API**, because the brief notes genuine AI integration is a bonus. It is the one module where a judge can type anything and receive a response that was not written in advance. The API key is server-side only and never reaches the browser; if the API is ever unavailable, SIFU falls back automatically and labels itself *"Simulated"* so the demo cannot break.

---

## Why CareerArc

Most job platforms help you **apply**. CareerArc helps you **choose** — and then proves whether the choice held.

It starts earlier than a job board (at course selection, age 16) and measures longer than a placement statistic (did they stay in the job?). It treats candidates as people who deserve real information, employers as accountable partners rather than customers buying a CV pile, and universities as institutions that should know their students are struggling **while they can still help**.

**The demo in one sentence:** follow a single student's readiness score as it travels from their own dashboard, to an employer's shortlist, to their university's intervention queue.

---

**Team:** Hani · Faiz
**Built for the Talentbank Tech Hackathon 2026**
