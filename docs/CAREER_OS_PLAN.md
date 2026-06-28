# CareerArc — Career OS Improvement Plan
### Talentbank Tech Hackathon 2026 · 2-member team · 28-day clickable prototype

> **The spine of the whole product is one number: the Career Readiness Score (CRS).**
> The *same* student's CRS appears three ways — the candidate sees "how ready am I," the
> employer sees a hiring signal, the university sees a risk flag. One score, three lenses.
> That is what makes CareerArc feel like one Career OS instead of separate tools.

---

## 1. Product positioning
**CareerArc — Malaysia's Career Operating System.** One platform, three connected lenses on a
single source of truth (the candidate's readiness data):
- **Candidates** grow from "lost graduate" to "career-ready" with guided steps + honest feedback.
- **Employers** hire with accountability (anti-ghosting) and richer signal (CRS + YourAnimal fit).
- **Universities** spot at-risk students *early* and intervene before graduation, not after.

Guardrails: lead with impact + workflow (not feature count); every screen answers "what do I do
next?"; Ministry view is a *bonus* pitch prop, not a Week-1 priority. Three hero users:
Candidate / Employer / University.

## 2. Information architecture
```
CANDIDATE  → Onboarding (gated) → Dashboard (CRS hub) → Profile/Resume/Portfolio/YourAnimal/Skills
            → Find Jobs → Job Detail (compatibility) · Companies → Company Detail · Career Tools · AI Coach
EMPLOYER   → Dashboard (Anti-Ghost + pipeline) → Applicants (CRS + animal) → Candidate Detail
UNIVERSITY → Employability Dashboard → Intervention Queue → Faculty Skill-Gap Dashboard
SHARED     → Impact & SDG · (bonus) Ministry
```
Mental model: three concentric circles — individual → organisation hiring them → institution
responsible for them — all reading the same CRS.

## 3. User journeys
- **Internship student** — light onboarding (profile, skills, 1 portfolio item, YourAnimal) → CRS ~45 (High) → "add a project (+12)" nudge → internship-tagged jobs.
- **Fresh graduate (hero)** — full onboarding → CRS ~68 (Medium), ATS 78, missing "Cloud" → ranked jobs → 94% job → compatibility + AI verdict "apply, close 1 gap" → apply.
- **Mid-level** — onboarding emphasises experience + salary + career path → dashboard leads with Salary + Career Path + offer comparison.
- **Senior** — shortest onboarding → dashboard leads with Career Path (leadership) + negotiation.
- **Employer** — dashboard (Anti-Ghost A+) → applicants sorted by CRS + animal → candidate detail → shortlist.
- **University career centre** — employability dashboard → AI insight → intervention queue (sorted by risk, issue + action) → "Why this?" → skill-gap dashboard.

## 4. Add / keep / improve / remove
- **ADD:** Candidate Onboarding wizard; Job Detail `/jobs/[id]`; University Intervention Queue + Skill-Gap Dashboard; Employer Candidate Detail.
- **KEEP:** YourAnimal, Resume Builder, Portfolio, Salary, Cost Calculator, Rejection Decoder, Impact/SDG, Companies directory.
- **IMPROVE:** Dashboard → CRS hub; Company Detail → rich sections; Job Search → decision cards; University Dashboard → CRS + AI insight; Login → one-click bypass.
- **REMOVE/DEMOTE:** nothing deleted; demote Ministry to "bonus"; optionally fold ATS Scanner into the resume/onboarding flow.

## 5. Next.js routes
```
app/onboarding/page.tsx              NEW gated wizard
app/dashboard/page.tsx               improve: CRS hub
app/jobs/page.tsx + [id]/page.tsx    improve cards + NEW detail
app/companies/[id]/page.tsx          improve: rich sections
app/employer/applicants/[id]/page.tsx NEW candidate detail
app/university/page.tsx              improve
app/university/interventions/page.tsx NEW
app/university/skill-gaps/page.tsx   NEW
lib/scoring.ts                       NEW CRS helper (single source of truth)
```

## 6. University module layouts
- **Employability Dashboard:** KPI row (cohort CRS, at-risk, avg ATS, portfolio %, activity) → skill gaps + top hiring matches → programmes needing support → AI insight + recommended action.
- **Intervention Queue:** list sorted High→Low risk: student · programme · CRS · risk · issue · suggested action · "Why this?" side panel (CRS breakdown + rule).
- **Skill-Gap Dashboard:** cards per gap (skill, target roles, # affected, recommended intervention, potential CRS uplift).

## 7. Onboarding flow
Gated wizard `/onboarding`, top stepper, live CRS gauge on the right. Step 1 = level select,
which configures the rest. Differentiate only by *which steps show* + *which dashboard widget
leads* — one config object keyed by level, not four flows.

| Step | Intern | Fresh | Mid | Senior |
|---|---|---|---|---|
| Profile | ✓ | ✓ | ✓ | ✓ |
| Resume | optional | ✓ | ✓ | ✓ |
| Skills | ✓ | ✓ | ✓ | ✓ |
| Portfolio | 1 item | full | optional | optional |
| YourAnimal | ✓ | ✓ | ✓ | ✓ |
| Preference | internships | entry | + salary | + leadership |
| Interview | basic | ✓ | ✓ | light |
| Dashboard leads with | portfolio nudges | ATS + jobs | Salary + Path | Path + negotiation |

On finish → `/dashboard` outcome panel: CRS (+breakdown), ATS, Resume Strength, Skill Match,
Recommended Jobs, Suggested Next Action.

## 8. Company page layout `/companies/[id]`
Header (verified, rating, years-partner) → trust strip (Anti-Ghost · response · turnover) →
overview + work mode → best-fit experience level → salary by level → career growth → culture
signals (+ staff animal mix) → candidate reviews → open roles. 2-col with sticky apply rail.

## 9. Job search + compatibility
- **Card:** title · verified company · work-mode chip · salary · big compatibility ring · skills with **missing in red** · Anti-Ghost dot · "View & Compare".
- **Detail `/jobs/[id]`:** (1) job info (scope, responsibilities, skills, level, arrangement, company snippet); (2) compatibility — ring + You-vs-Job table + missing skills (+CRS); (3) AI verdict card ("Strong apply" / "Apply, close 1 gap" / "Stretch").
- Compute compatibility client-side: candidate.skills ∩ job.requiredSkills.

## 10. Dummy data
`CRS = resume*0.25 + ats*0.25 + skillMatch*0.25 + portfolio*0.15 + activity*0.10`
Risk: 0–49 High · 50–69 Medium · 70–100 Low. ~30 mock candidates shared by employer applicants
AND university queue (the "one OS" proof). Types: Candidate, Company, Job, University (see lib/).

## 11. AI-style sample text (simulate, no API)
Pick strings from data; add a ✨ label + ~600ms fake "thinking". Verdicts by match band; dashboard
next-action by weakest CRS component; university insight by cohort drop; "Why this?" by lowest
breakdown component. (See `lib/careerData.ts` for the actual strings.)

## 12. Week 1 priorities (2 devs)
- **Dev A (candidate spine):** one-click login → onboarding wizard → CRS dashboard → job detail + compatibility → AI verdicts.
- **Dev B (data + stakeholders):** TS interfaces + CRS helper → ~30 candidates → university dashboard + intervention queue → skill-gap dashboard → employer candidate detail.
- Day 7 = clickable golden path for all three roles. Weeks 2–4 = polish, gold theme, copy, responsive, rehearse.

## 13. Do NOT build
Real auth/DB/API; real AI calls; real ATS parsing; persistent employer job forms; deep Ministry
features; chart libraries (CSS bars are enough); pixel-perfect mobile on every screen (candidate
flow only); more than 4 levels / 3 SDGs / ~8 companies. Breadth ≠ score.

## 14. Frontend steps
1. Centralise data + CRS in `lib/scoring.ts` + `lib/careerData.ts`. 2. One-click login. 3.
Onboarding gating via localStorage `onboardingComplete`. 4. `levelConfig` drives wizard +
dashboard order. 5. Dynamic routes with `use(params)`. 6. Compatibility = pure function. 7.
Reuse `DashboardLayout` + `StatCard`. 8. `<AiBlock>` spinner→reveal. 9. Theme via one CSS var.
10. `next build` after each route.

## 15. Judge demo (≈4 min)
Landing → Candidate one-click → Onboarding (watch CRS climb to 68) → Dashboard (next action) →
Job detail (compatibility + AI verdict) → Company page → switch Employer (same score, hiring
lens) → switch University (insight → intervention queue → "Why this?" → skill gaps) → close on
Impact & SDG. **Punchline: one student's readiness number, followed across three users.**
