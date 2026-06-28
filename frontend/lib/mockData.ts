export const mockUser = {
  id: '1',
  name: 'Amirul Hakim',
  email: 'demo@careerarc.my',
  role: 'Fresh Graduate',
  field: 'Computer Science',
  university: 'Universiti Putra Malaysia (UPM)',
  graduationYear: 2023,
  location: 'Bangi, Selangor',
  currentSalary: 3500,
  avatar: 'AH',
  skills: ['React', 'Node.js', 'Python', 'SQL', 'TypeScript', 'Git', 'REST APIs', 'MongoDB'],
  bio: 'CS graduate passionate about building impactful products. Looking for a software engineering role in KL/Cyberjaya.',
  applicationsSent: 12,
  profileViews: 234,
  atsScore: 78,
  careerMatch: 89,
}

export const mockJobs = [
  {
    id: '1', title: 'Junior Software Engineer', company: 'Petronas Digital',
    location: 'Kuala Lumpur', salary: 'RM 4,500 – RM 6,000', salaryMin: 4500, salaryMax: 6000,
    industry: 'Oil & Gas Tech', experience: 'Junior (0–2 yrs)',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    matchPercent: 94, antiGhost: 'green', antiGhostLabel: 'Active – Responds in 2 days',
    posted: '2 days ago', description: "Join our digital transformation team to build enterprise-grade applications for Malaysia's largest energy company.",
    logo: 'PD', logoColor: '#0066cc', remote: false,
  },
  {
    id: '2', title: 'Full Stack Developer', company: 'Grab Malaysia',
    location: 'Petaling Jaya', salary: 'RM 5,500 – RM 8,000', salaryMin: 5500, salaryMax: 8000,
    industry: 'Tech / Ride-Hailing', experience: 'Junior (0–2 yrs)',
    skills: ['React', 'Go', 'PostgreSQL', 'Kubernetes'],
    matchPercent: 87, antiGhost: 'green', antiGhostLabel: 'Active – Responds in 1 day',
    posted: '1 day ago', description: "Build the future of Southeast Asia's super app. Work on systems serving millions of users daily.",
    logo: 'GR', logoColor: '#00b14f', remote: true,
  },
  {
    id: '3', title: 'Associate Software Engineer', company: 'CIMB Bank',
    location: 'Kuala Lumpur', salary: 'RM 4,000 – RM 5,500', salaryMin: 4000, salaryMax: 5500,
    industry: 'Banking & Finance', experience: 'Junior (0–2 yrs)',
    skills: ['Java', 'Spring Boot', 'SQL', 'Oracle'],
    matchPercent: 72, antiGhost: 'yellow', antiGhostLabel: 'Passive – Last seen 3 weeks ago',
    posted: '1 week ago', description: "Join CIMB's technology division to modernize our core banking systems and digital channels.",
    logo: 'CB', logoColor: '#cc0000', remote: false,
  },
  {
    id: '4', title: 'Frontend Developer', company: 'AirAsia Digital',
    location: 'Cyberjaya', salary: 'RM 5,000 – RM 7,500', salaryMin: 5000, salaryMax: 7500,
    industry: 'Aviation Tech', experience: 'Junior (0–2 yrs)',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    matchPercent: 96, antiGhost: 'green', antiGhostLabel: 'Active – Responds in 3 days',
    posted: '3 days ago', description: "Build beautiful, performant user interfaces for Southeast Asia's largest low-cost carrier's digital products.",
    logo: 'AA', logoColor: '#d90429', remote: true,
  },
  {
    id: '5', title: 'Data Analyst', company: 'GoGet Malaysia',
    location: 'Bangsar South, KL', salary: 'RM 3,800 – RM 5,200', salaryMin: 3800, salaryMax: 5200,
    industry: 'Gig Economy', experience: 'Junior (0–2 yrs)',
    skills: ['Python', 'SQL', 'Tableau', 'Excel'],
    matchPercent: 81, antiGhost: 'green', antiGhostLabel: 'Active – Responds in 2 days',
    posted: '4 days ago', description: "Analyse data from our gig platform to help grow Malaysia's largest on-demand workforce.",
    logo: 'GG', logoColor: '#7c3aed', remote: false,
  },
  {
    id: '6', title: 'Backend Engineer', company: "Touch 'n Go Digital",
    location: 'Menara Prudential, KL', salary: 'RM 6,000 – RM 9,000', salaryMin: 6000, salaryMax: 9000,
    industry: 'Fintech', experience: 'Mid (2–5 yrs)',
    skills: ['Go', 'Microservices', 'Kafka', 'Redis'],
    matchPercent: 65, antiGhost: 'red', antiGhostLabel: 'Ghosting Risk – No response in 6 weeks',
    posted: '2 weeks ago', description: 'Engineer the payment infrastructure powering millions of Malaysian transactions daily.',
    logo: 'TG', logoColor: '#0099e6', remote: false,
  },
  {
    id: '7', title: 'Product Manager (Tech)', company: 'Axiata Digital',
    location: 'KL Sentral', salary: 'RM 7,000 – RM 11,000', salaryMin: 7000, salaryMax: 11000,
    industry: 'Telecommunications', experience: 'Mid (2–5 yrs)',
    skills: ['Product Strategy', 'Agile', 'SQL', 'Figma'],
    matchPercent: 58, antiGhost: 'yellow', antiGhostLabel: 'Passive – Last seen 2 weeks ago',
    posted: '5 days ago', description: "Lead product development for Axiata's digital services across Southeast Asia.",
    logo: 'AX', logoColor: '#e85d04', remote: false,
  },
  {
    id: '8', title: 'DevOps Engineer', company: 'Maxis Berhad',
    location: 'Menara Maxis, KL', salary: 'RM 6,500 – RM 9,500', salaryMin: 6500, salaryMax: 9500,
    industry: 'Telecommunications', experience: 'Mid (2–5 yrs)',
    skills: ['AWS', 'Terraform', 'Docker', 'CI/CD'],
    matchPercent: 60, antiGhost: 'green', antiGhostLabel: 'Active – Responds in 4 days',
    posted: '1 day ago', description: "Build and maintain the infrastructure powering Maxis's network and digital services.",
    logo: 'MX', logoColor: '#0066ff', remote: true,
  },
  {
    id: '9', title: 'UI/UX Designer', company: 'Shopee Malaysia',
    location: 'Petaling Jaya', salary: 'RM 4,500 – RM 6,500', salaryMin: 4500, salaryMax: 6500,
    industry: 'E-Commerce', experience: 'Junior (0–2 yrs)',
    skills: ['Figma', 'User Research', 'Prototyping', 'Adobe XD'],
    matchPercent: 45, antiGhost: 'green', antiGhostLabel: 'Active – Responds in 1 day',
    posted: '6 hours ago', description: "Design intuitive experiences for one of Southeast Asia's largest e-commerce platforms.",
    logo: 'SP', logoColor: '#ee4d2d', remote: false,
  },
  {
    id: '10', title: 'Machine Learning Engineer', company: 'Fusionex International',
    location: 'Kuala Lumpur', salary: 'RM 7,000 – RM 12,000', salaryMin: 7000, salaryMax: 12000,
    industry: 'AI & Big Data', experience: 'Mid (2–5 yrs)',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
    matchPercent: 78, antiGhost: 'yellow', antiGhostLabel: 'Passive – Last seen 1 week ago',
    posted: '3 days ago', description: 'Build ML models and pipelines for enterprise clients across ASEAN markets.',
    logo: 'FX', logoColor: '#6d28d9', remote: true,
  },
]

export const mockCompanies = [
  {
    id: 'petronas-digital', name: 'Petronas Digital', logo: 'PD', logoColor: '#0066cc',
    industry: 'Oil & Gas Tech', verified: true, yearsPartner: 9, rating: 4.6, reviews: 312,
    antiGhost: 'green', antiGhostLabel: 'Active – Responds in 2 days', avgResponse: '2.0 days',
    employees: '5,000+', hq: 'Kuala Lumpur', openRoles: 1,
    about: "Petronas Digital is the technology arm of Malaysia's national energy company, building enterprise-grade platforms that power the country's energy transition.",
    perks: ['Hybrid work', 'Annual bonus', 'Medical for family', 'Learning budget'],
  },
  {
    id: 'grab-malaysia', name: 'Grab Malaysia', logo: 'GR', logoColor: '#00b14f',
    industry: 'Tech / Ride-Hailing', verified: true, yearsPartner: 7, rating: 4.4, reviews: 528,
    antiGhost: 'green', antiGhostLabel: 'Active – Responds in 1 day', avgResponse: '1.2 days',
    employees: '8,000+', hq: 'Petaling Jaya', openRoles: 1,
    about: "Grab is Southeast Asia's leading super app, serving millions daily across deliveries, mobility, and financial services from its Malaysian engineering hubs.",
    perks: ['Remote-friendly', 'Stock options', 'Wellness allowance', 'Flexible hours'],
  },
  {
    id: 'cimb-bank', name: 'CIMB Bank', logo: 'CB', logoColor: '#cc0000',
    industry: 'Banking & Finance', verified: true, yearsPartner: 12, rating: 4.1,
    antiGhost: 'yellow', antiGhostLabel: 'Passive – Last seen 3 weeks ago', avgResponse: '11 days',
    employees: '13,000+', hq: 'Kuala Lumpur', openRoles: 1, reviews: 389,
    about: "CIMB is one of ASEAN's largest banking groups, modernising core banking and digital channels across the region.",
    perks: ['Staff loan rates', 'Structured grad scheme', 'Medical', 'Gym subsidy'],
  },
  {
    id: 'airasia-digital', name: 'AirAsia Digital', logo: 'AA', logoColor: '#d90429',
    industry: 'Aviation Tech', verified: true, yearsPartner: 6, rating: 4.3, reviews: 274,
    antiGhost: 'green', antiGhostLabel: 'Active – Responds in 3 days', avgResponse: '2.8 days',
    employees: '3,000+', hq: 'Sepang', openRoles: 1,
    about: "AirAsia Digital builds the travel and lifestyle super app behind Southeast Asia's largest low-cost carrier.",
    perks: ['Free flights', 'Remote-friendly', 'Startup culture', 'Stock options'],
  },
  {
    id: 'goget', name: 'GoGet Malaysia', logo: 'GG', logoColor: '#7c3aed',
    industry: 'Gig Economy', verified: false, yearsPartner: 2, rating: 4.0, reviews: 86,
    antiGhost: 'green', antiGhostLabel: 'Active – Responds in 2 days', avgResponse: '2.3 days',
    employees: '200+', hq: 'Bangsar South, KL', openRoles: 1,
    about: "GoGet runs Malaysia's largest on-demand workforce platform, connecting businesses with verified part-time workers.",
    perks: ['Flat hierarchy', 'Equity', 'Flexible hours', 'Pet-friendly office'],
  },
  {
    id: 'touch-n-go', name: "Touch 'n Go Digital", logo: 'TG', logoColor: '#0099e6',
    industry: 'Fintech', verified: true, yearsPartner: 5, rating: 3.8, reviews: 197,
    antiGhost: 'red', antiGhostLabel: 'Ghosting Risk – No response in 6 weeks', avgResponse: '42 days',
    employees: '1,500+', hq: 'Kuala Lumpur', openRoles: 1,
    about: "Touch 'n Go Digital operates Malaysia's most-used e-wallet, powering millions of daily transactions.",
    perks: ['Hybrid work', 'Performance bonus', 'Medical', 'Phone allowance'],
  },
  {
    id: 'shopee-malaysia', name: 'Shopee Malaysia', logo: 'SP', logoColor: '#ee4d2d',
    industry: 'E-Commerce', verified: true, yearsPartner: 6, rating: 4.0, reviews: 441,
    antiGhost: 'green', antiGhostLabel: 'Active – Responds in 1 day', avgResponse: '1.5 days',
    employees: '4,000+', hq: 'Petaling Jaya', openRoles: 1,
    about: "Shopee is the leading e-commerce platform in Southeast Asia, with a fast-paced engineering and design culture in Malaysia.",
    perks: ['Stock options', 'Shopping vouchers', 'Free shuttle', 'Career mobility'],
  },
  {
    id: 'fusionex', name: 'Fusionex International', logo: 'FX', logoColor: '#6d28d9',
    industry: 'AI & Big Data', verified: false, yearsPartner: 3, rating: 3.9, reviews: 64,
    antiGhost: 'yellow', antiGhostLabel: 'Passive – Last seen 1 week ago', avgResponse: '6 days',
    employees: '800+', hq: 'Kuala Lumpur', openRoles: 1,
    about: 'Fusionex builds AI, analytics, and big-data platforms for enterprise clients across ASEAN markets.',
    perks: ['Training certs', 'Project bonuses', 'Medical', 'Flexible hours'],
  },
]

export const mockApplications = [
  { id: '1', jobTitle: 'Junior Software Engineer', company: 'Petronas Digital', appliedDate: '20 May 2024', status: 'Interview Scheduled', statusColor: 'green', antiGhost: 'green', antiGhostLabel: 'Active – Responds in 2 days', nextStep: 'Technical Interview on 28 May' },
  { id: '2', jobTitle: 'Frontend Developer', company: 'AirAsia Digital', appliedDate: '18 May 2024', status: 'Under Review', statusColor: 'blue', antiGhost: 'green', antiGhostLabel: 'Active – Responds in 3 days', nextStep: 'Awaiting HR screening' },
  { id: '3', jobTitle: 'Full Stack Developer', company: 'Grab Malaysia', appliedDate: '15 May 2024', status: 'Assessment Sent', statusColor: 'yellow', antiGhost: 'green', antiGhostLabel: 'Active – Responds in 1 day', nextStep: 'Complete coding challenge by 30 May' },
  { id: '4', jobTitle: 'Associate Software Engineer', company: 'CIMB Bank', appliedDate: '10 May 2024', status: 'No Response', statusColor: 'red', antiGhost: 'yellow', antiGhostLabel: 'Passive – Last seen 3 weeks ago', nextStep: 'Consider following up' },
  { id: '5', jobTitle: 'Data Analyst', company: 'GoGet Malaysia', appliedDate: '8 May 2024', status: 'Offer Received', statusColor: 'purple', antiGhost: 'green', antiGhostLabel: 'Active – Responds in 2 days', nextStep: 'Review and negotiate offer' },
]

export const mockPortfolioEntries = [
  {
    id: '1', year: '2022', title: 'Lokal-Map App', type: 'Hackathon Project',
    description: 'Built a community-driven local map app during HACK@UPM 2022. Users can pin hidden gem restaurants and experiences around their neighbourhood.',
    descriptionPolished: 'Architected and delivered a geolocation-enabled community platform at HACK@UPM 2022, achieving Top 3 recognition among 47 competing teams. The solution leveraged real-time collaborative data input to surface hyperlocal points of interest, serving 200+ beta users during the demo phase.',
    tags: ['React Native', 'Firebase', 'Google Maps API', 'Hackathon'],
    github: 'https://github.com/amirulhakim/lokal-map',
    award: '3rd Place — HACK@UPM 2022', teamSize: 3,
  },
  {
    id: '2', year: '2023', title: 'SurveyLuhh Platform', type: 'Freelance Project',
    description: 'Made a survey platform for a client that needed to gather customer feedback for their F&B chain. Had a dashboard and export to Excel.',
    descriptionPolished: 'Delivered an end-to-end survey management platform for an F&B chain with 12 outlets, enabling real-time NPS tracking and automated reporting. The system processed 3,000+ monthly responses and reduced manual data compilation time by 85% through Excel/CSV automation.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Freelance'],
    github: 'https://github.com/amirulhakim/surveyluhh',
    client: 'Confidential (F&B Industry)', teamSize: 1,
  },
  {
    id: '3', year: '2024', title: 'Internship @ TechCorp Malaysia', type: 'Professional Experience',
    description: 'Did my internship at TechCorp. Worked on their internal dashboard and fixed some bugs. Also helped with the mobile app.',
    descriptionPolished: 'Completed a 6-month software engineering internship at TechCorp Malaysia, contributing to a flagship internal analytics dashboard used by 500+ employees. Independently resolved 23 production bugs, reducing error rates by 34%, and collaborated with the mobile team to implement 4 new features in their React Native application.',
    tags: ['React', 'TypeScript', 'React Native', 'PostgreSQL', 'Agile'],
    github: null as null,
    company: 'TechCorp Malaysia Sdn Bhd', teamSize: 8,
  },
  {
    id: '4', year: '2025', title: 'Career Arc', type: 'Hackathon Project',
    description: 'Built Career Arc for a hackathon — an AI-powered career platform for Malaysian job seekers with ATS scanner, career path simulator, and anti-ghosting tracker.',
    descriptionPolished: 'Co-founded and engineered Career Arc, a full-stack AI-powered career intelligence platform targeting 300,000 annual Malaysian graduates. The platform integrates ATS resume analysis, a 40-year career simulation engine, anti-ghosting employer accountability scores, and a regional cost-of-living calculator, built and shipped within a 48-hour hackathon sprint.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AI Integration', 'Hackathon'],
    github: 'https://github.com/amirulhakim/career-arc',
    award: 'Hackathon Entry 2025', teamSize: 3,
  },
]

export const mockSalaryData = {
  role: 'Software Engineer', experience: '0–2 years', location: 'Kuala Lumpur',
  percentiles: { p10: 3000, p25: 4200, p50: 6800, p75: 9500, p90: 13000 },
  yourSalary: 3500,
  skillPremiums: [
    { skill: 'Next.js / React', bump: '+RM 1,200/mo', percent: '+18%' },
    { skill: 'Python / ML', bump: '+RM 1,800/mo', percent: '+26%' },
    { skill: 'Cloud (AWS/GCP)', bump: '+RM 2,000/mo', percent: '+29%' },
    { skill: 'System Design', bump: '+RM 2,500/mo', percent: '+37%' },
    { skill: 'Go / Rust', bump: '+RM 1,500/mo', percent: '+22%' },
  ],
}

export const mockCostCalculator = {
  jobA: { label: 'Job A — Cyberjaya', salary: 7000, rent: 900, toll: 80, petrol: 150, food: 400, misc: 200 },
  jobB: { label: 'Job B — KLCC', salary: 8500, rent: 1800, toll: 220, petrol: 280, food: 600, misc: 300 },
}

export const mockEmployerStats = {
  jobsPosted: 8, totalApplicants: 156, shortlisted: 23,
  avgResponseTime: '2.1 days', antiGhostScore: 'green', antiGhostLabel: 'ACTIVE',
}

export const mockUniversityStats = {
  name: 'Universiti Putra Malaysia (UPM)',
  graduatesTracked: 4820,
  employmentRate: 87,
  avgTimeToHire: 3.2,
  avgStartingSalary: 3400,
  withinField: 74,
  programs: [
    { name: 'Computer Science', employed: 92, grads: 540 },
    { name: 'Engineering', employed: 88, grads: 880 },
    { name: 'Business & Accounting', employed: 83, grads: 760 },
    { name: 'Design & Media', employed: 79, grads: 320 },
    { name: 'Life Sciences', employed: 71, grads: 610 },
  ],
  pipeline: [
    { stage: 'Graduated', value: 4820, pct: 100 },
    { stage: 'Actively applying', value: 3950, pct: 82 },
    { stage: 'Interviewing', value: 2480, pct: 51 },
    { stage: 'Offer received', value: 1760, pct: 37 },
    { stage: 'Employed', value: 4190, pct: 87 },
  ],
  topPartners: [
    { name: 'Petronas Digital', hires: 84 },
    { name: 'Grab Malaysia', hires: 67 },
    { name: 'CIMB Bank', hires: 59 },
    { name: 'AirAsia Digital', hires: 41 },
    { name: 'Shopee Malaysia', hires: 38 },
  ],
}

export const mockMinistryStats = {
  body: 'Ministry of Higher Education (MOHE)',
  graduatesNational: 312000,
  employmentRate: 84,
  avgTimeToHire: 3.8,
  universitiesTracked: 50,
  byField: [
    { field: 'ICT & Computing', employed: 89 },
    { field: 'Health Sciences', employed: 88 },
    { field: 'Engineering', employed: 85 },
    { field: 'Business & Finance', employed: 82 },
    { field: 'Education', employed: 80 },
    { field: 'Arts & Humanities', employed: 73 },
  ],
  trend: [
    { year: '2021', rate: 75 },
    { year: '2022', rate: 78 },
    { year: '2023', rate: 81 },
    { year: '2024', rate: 84 },
  ],
  topSectors: [
    { sector: 'Technology', share: 28 },
    { sector: 'Financial Services', share: 19 },
    { sector: 'Manufacturing', share: 16 },
    { sector: 'Healthcare', share: 12 },
    { sector: 'Public Sector', share: 11 },
  ],
}

// UN Sustainable Development Goals the product is aligned to (impact framing)
export const sdgGoals = [
  {
    number: 4, title: 'Quality Education', color: '#c5192d',
    contribution: 'Tracer-study and employability data helps universities close skill gaps and align curricula with real hiring demand.',
  },
  {
    number: 8, title: 'Decent Work & Economic Growth', color: '#a21942',
    contribution: 'Fair-pay benchmarks and anti-ghosting accountability raise the quality, transparency and dignity of early-career employment.',
  },
  {
    number: 17, title: 'Partnerships for the Goals', color: '#19486a',
    contribution: 'One transparent platform connecting candidates, employers, universities and the ministry around shared outcomes.',
  },
]

export const mockImpactMetrics = [
  { label: 'Graduates supported', value: '312K', sub: 'across 50 Malaysian universities' },
  { label: 'Employability uplift', value: '+9pts', sub: 'from 75% to 84% over 3 years' },
  { label: 'Faster time-to-hire', value: '−28%', sub: 'avg 5.3 → 3.8 months' },
  { label: 'Ghosting reduced', value: '−61%', sub: 'on Anti-Ghost verified employers' },
]

export const mockCandidates = [
  { id: '1', name: 'Amirul Hakim', role: 'Fresh Graduate · CS', atsScore: 94, experience: '0 yrs', status: 'Shortlisted', university: 'UPM' },
  { id: '2', name: 'Nurul Aina', role: 'Junior Dev', atsScore: 88, experience: '1 yr', status: 'Interview', university: 'UTM' },
  { id: '3', name: 'Fariz Azman', role: 'Mid-Level Engineer', atsScore: 91, experience: '3 yrs', status: 'Offer Extended', university: 'UM' },
  { id: '4', name: 'Sarah Tan', role: 'Frontend Specialist', atsScore: 85, experience: '2 yrs', status: 'Under Review', university: 'MMU' },
  { id: '5', name: 'Haziq Ibrahim', role: 'Fresh Graduate · IT', atsScore: 72, experience: '0 yrs', status: 'Applied', university: 'UiTM' },
]

export const careerPathData = {
  name: 'Amirul Hakim', degree: 'B.Sc. Computer Science · UPM 2023',
  nodes: [
    { year: 0, role: 'Junior Developer', salary: 3500, current: true, fork: false },
    { year: 2, role: 'Mid-Level Developer', salary: 6000, current: false, fork: false },
    { year: 5, role: 'Senior Developer', salary: 10000, current: false, fork: true },
  ],
  paths: {
    A: {
      label: 'Tech Lead → CTO', color: '#ff4757',
      nodes: [
        { year: 5, role: 'Senior Developer', salary: 10000 },
        { year: 8, role: 'Tech Lead', salary: 15000 },
        { year: 12, role: 'Eng Manager', salary: 20000 },
        { year: 20, role: 'CTO', salary: 35000 },
      ],
    },
    B: {
      label: 'Product Manager Pivot', color: '#0984e3',
      nodes: [
        { year: 5, role: 'Senior Developer', salary: 10000 },
        { year: 6, role: 'Associate PM', salary: 8000 },
        { year: 10, role: 'Senior PM', salary: 13000 },
        { year: 18, role: 'VP of Product', salary: 28000 },
      ],
    },
    C: {
      label: 'Freelance / Startup Founder', color: '#00b894',
      nodes: [
        { year: 5, role: 'Senior Freelancer', salary: 12000 },
        { year: 8, role: 'Startup Founder', salary: 5000 },
        { year: 15, role: 'Founder / Exit', salary: 50000 },
      ],
    },
  },
}
