// YourWork Animal assessment (v3.0 logic — yourworkanimal.com)
// Shared by the full test page (/aptitude-test) and the onboarding wizard.

export type AnimalKey = 'Lion' | 'Owl' | 'Dolphin' | 'Fox' | 'Wolf'

export const animals: Record<AnimalKey, {
  emoji: string; title: string; tagline: string
  traits: string[]; workStyle: string; trajectory: string
  idealRoles: string[]; color: string; bg: string
}> = {
  Lion: {
    emoji: '🦁', title: 'The Lion', tagline: 'You lead from the front and ship when others hesitate',
    traits: ['Decisive', 'High-output', 'Ownership-driven', 'Bold'],
    workStyle: 'You have a low tolerance for analysis paralysis. You would rather ship a working v1 and lead the team through iteration than perfect something that never launches. Ownership, momentum, and clear deliverables are your fuel. Given a vague goal and a deadline, you are the one who takes charge and gets the room moving.',
    trajectory: 'Your arc bends toward leadership and ownership — team lead, founder, or head of department within 8–12 years.',
    idealRoles: ['Engineering Team Lead', 'Startup Founder', 'Operations Manager', 'Project Lead', 'Head of Product'],
    color: '#e17055', bg: '#fff5f3',
  },
  Owl: {
    emoji: '🦉', title: 'The Owl', tagline: 'You see the structure others cannot see yet',
    traits: ['Analytical', 'Systematic', 'Precision-focused', 'Deep thinker'],
    workStyle: 'You think in frameworks and first principles. Given a vague problem, you map it into a structured system before writing a single line of code or word. You work best with clear specs, quiet focus time, and genuinely hard problems. You find energy in complexity that makes others freeze.',
    trajectory: 'Your arc bends toward deep specialism and architecture — principal engineer, data scientist, or domain expert by year 8.',
    idealRoles: ['Software Engineer', 'Data Scientist', 'Systems Architect', 'Security Engineer', 'Quantitative Analyst'],
    color: '#6c5ce7', bg: '#f5f3ff',
  },
  Dolphin: {
    emoji: '🐬', title: 'The Dolphin', tagline: 'You make teams greater than the sum of their parts',
    traits: ['Empathetic', 'Collaborative', 'Communicative', 'People-first'],
    workStyle: 'You read rooms, build trust quickly, and turn potential conflict into alignment. You are often the invisible reason a cross-functional project actually works. You need human connection and genuine collaboration to do your best work — a purely solo role drains you fast.',
    trajectory: 'Your arc bends toward people and product leadership — product manager, HR partner, or customer-facing lead by year 6–10.',
    idealRoles: ['Product Manager', 'HR Business Partner', 'Account Manager', 'UX Researcher', 'Customer Success Lead'],
    color: '#00b894', bg: '#f0faf8',
  },
  Fox: {
    emoji: '🦊', title: 'The Fox', tagline: 'You see the future before it arrives',
    traits: ['Creative', 'Big-picture', 'Innovative', 'Adaptable'],
    workStyle: 'You get bored with the status quo and energised by unexplored territory. You ask "why not?" before "how?". You spot angles and opportunities others miss, and you need creative latitude and a team willing to take big swings — and to see your ideas influence real direction, not just get noted and forgotten.',
    trajectory: 'Your arc bends toward innovation and creation — designer, growth strategist, or founder building something that did not exist before.',
    idealRoles: ['Product Designer', 'Growth Strategist', 'Startup Founder', 'R&D Engineer', 'Innovation Lead'],
    color: '#f39c12', bg: '#fffcf0',
  },
  Wolf: {
    emoji: '🐺', title: 'The Wolf', tagline: 'You are the reason nothing falls through the cracks',
    traits: ['Detail-oriented', 'Loyal', 'Process-driven', 'Dependable'],
    workStyle: 'You catch what others miss and take quiet pride in flawless delivery for the whole pack. You think in checklists, documentation, and edge cases, and you protect the team from risk before it bites. You need clear ownership boundaries and teammates who respect process — nothing frustrates you more than corners being cut.',
    trajectory: 'Your arc bends toward quality, reliability and trust — QA lead, business analyst, or the operational backbone a team cannot run without.',
    idealRoles: ['QA Engineer', 'Compliance Officer', 'Business Analyst', 'Technical Writer', 'Finance Manager'],
    color: '#0984e3', bg: '#f0f7ff',
  },
}

export type Option = { text: string; type: AnimalKey }
export type Question = { q: string; options: Option[] }

// Helper to build a question with the five animal options in a given order.
function q(prompt: string, owl: string, dolphin: string, lion: string, fox: string, wolf: string): Question {
  return {
    q: prompt,
    options: [
      { text: lion, type: 'Lion' },
      { text: owl, type: 'Owl' },
      { text: dolphin, type: 'Dolphin' },
      { text: fox, type: 'Fox' },
      { text: wolf, type: 'Wolf' },
    ],
  }
}

export const questions: Question[] = [
  q('When starting a new project, you typically…',
    'Map out the entire system before writing a single line', 'Talk to every stakeholder to understand their needs first', 'Start building immediately and lead the team forward', 'Explore unconventional angles before committing', 'Draft the plan, timeline, and risk register first'),
  q('A teammate proposes a flawed solution. You…',
    'Point out the logical gaps with evidence', 'Ask questions to understand their thinking first', 'Suggest a faster alternative and push to decide now', 'Reframe the whole problem from a new angle', 'Send it through a proper structured review'),
  q('Your ideal work environment is…',
    'Quiet and independent, with hard problems to solve', 'Open and social, with constant collaboration', 'Fast-paced and high-ownership', 'Creative and experimental, with few constraints', 'Structured and predictable, with clear processes'),
  q('What stresses you most at work?',
    'Vague requirements and unclear specs', 'Team tension and poor communication', 'Slow decisions and no visible progress', 'Repetitive work with no room to innovate', 'Being rushed past proper process or review'),
  q('In a group project, you naturally become…',
    'The one who designs how the pieces connect', 'The one who keeps morale and communication flowing', 'The one who drives the team to ship on time', 'The one who challenges assumptions with bold ideas', 'The one who tracks progress so nothing is missed'),
  q('You feel most accomplished when you…',
    'Crack a hard problem that stumped everyone', 'Help a teammate grow or overcome a challenge', 'Ship something significant, ahead of schedule', 'Launch something that did not exist before', 'Deliver work that is completely flawless'),
  q('When learning something new, you prefer to…',
    'Read the full documentation and understand it deeply', 'Learn alongside others, asking lots of questions', 'Build with it immediately and learn by doing', 'Explore adjacent ideas and the bigger picture', 'Follow a structured course with clear milestones'),
  q('How do you prefer to receive feedback?',
    'Specific and data-backed', 'As a two-way conversation', 'Short and direct — tell me what to fix', 'High-level and conceptual', 'Written and detailed with examples'),
  q('When making a hard decision, you rely most on…',
    'Data analysis and first-principles reasoning', 'Team input and stakeholder alignment', 'Experience and decisive gut instinct', 'Intuition about emerging trends', 'Established rules, precedents and risk frameworks'),
  q('Your relationship with rules and process is…',
    'I follow them if they make logical sense, else redesign them', 'I adapt them to what works for the people involved', 'I move fast and clear blockers when they appear', 'Rules are starting points — I look beyond them', 'Good processes exist for a reason — I uphold them'),
  q('A project is falling behind schedule. You…',
    'Re-architect the approach to remove the bottleneck', 'Rally the team and rebuild momentum together', 'Take charge, cut scope, and drive to the finish', 'Find a creative shortcut nobody considered', 'Audit the plan to find exactly where it slipped'),
  q('At a team brainstorm, you are usually…',
    'Quietly synthesising ideas into a coherent model', 'Drawing everyone in and making space to contribute', 'Pushing the group toward a concrete decision', 'Throwing out the wildest, most original ideas', 'Noting risks and what could go wrong'),
  q('Your desk / workspace tends to be…',
    'Organised around the problem you are solving', 'Full of things that connect you to people', 'Minimal — you are too busy executing to fuss', 'Cluttered with sketches, notes and inspiration', 'Meticulously ordered and labelled'),
  q('You admire colleagues who are…',
    'Brilliant problem-solvers', 'Warm and genuinely supportive', 'Decisive and action-oriented', 'Visionary and original', 'Reliable and thorough'),
  q('Given a brand-new tool with no manual, you…',
    'Reverse-engineer how it works under the hood', 'Ask someone who has used it before', 'Dive in and figure it out by using it', 'Imagine new ways to use it nobody intended', 'Wait for proper documentation before relying on it'),
  q('When a plan changes last-minute, you…',
    'Re-model the new constraints logically', 'Check how it affects everyone involved', 'Adapt fast and keep things moving', 'Get excited about the new possibilities', 'Worry about what the change might break'),
  q('Your biggest professional pet peeve is…',
    'Sloppy, illogical thinking', 'People being treated unfairly', 'Endless talk with no action', 'Being boxed in by "how it has always been done"', 'Cut corners and missing details'),
  q('In a crisis, the team looks to you to…',
    'Diagnose the root cause', 'Keep everyone calm and aligned', 'Make the call and lead the response', 'Improvise a way out', 'Make sure nothing else slips while firefighting'),
  q('You would rather be known as…',
    'The smartest person in the room', 'The most trusted person in the room', 'The one who gets things done', 'The most original person in the room', 'The most dependable person in the room'),
  q('A new technology emerges in your field. You…',
    'Study how it actually works in depth', 'Discuss what it means with your network', 'Adopt it fast to gain an edge', 'Dream up products it could enable', 'Wait to see if it is proven and stable'),
  q('Your approach to deadlines is…',
    'Plan backward from the logical critical path', 'Coordinate so the whole team hits them together', 'Set an aggressive target and sprint', 'Treat them flexibly if the idea needs more room', 'Build in buffers and track every milestone'),
  q('When you join a new team, you first…',
    'Map how the system and codebase fit together', 'Get to know everyone personally', 'Look for where you can make impact fast', 'Spot what could be reinvented', 'Learn the existing processes and standards'),
  q('Your ideal manager…',
    'Gives you hard problems and gets out of the way', 'Checks in and genuinely cares about you', 'Trusts you with ownership and autonomy', 'Lets you experiment and pitch big ideas', 'Sets clear expectations and structure'),
  q('You measure a good day at work by…',
    'A tricky problem elegantly solved', 'A meaningful connection or a teammate helped', 'A lot shipped and momentum gained', 'A spark of a genuinely new idea', 'Everything done correctly, nothing missed'),
  q('Faced with ambiguity, your instinct is to…',
    'Build a framework to make sense of it', 'Talk it through with others', 'Act and adjust as you learn', 'See it as creative freedom', 'Reduce it with rules and structure'),
  q('In meetings you tend to…',
    'Speak once, with a precise point', 'Make sure quieter voices are heard', 'Drive toward decisions and next steps', 'Introduce a left-field perspective', 'Track action items and follow-ups'),
  q('Your favourite kind of problem is…',
    'Complex and technical', 'Human and interpersonal', 'Big, urgent and high-stakes', 'Open-ended and creative', 'Detailed and requiring rigour'),
  q('When you disagree with a decision, you…',
    'Lay out the logical counter-argument', 'Raise it sensitively, mindful of the people', 'State your view directly and move on', 'Propose a bolder alternative entirely', 'Flag the risks and process concerns'),
  q('You recharge after a hard week by…',
    'Going deep on a personal technical project', 'Spending time with people you care about', 'Tackling a new challenge or goal', 'Exploring something completely different', 'Tidying, organising and resetting'),
  q('Your career ambition leans toward…',
    'Mastery of a deep, hard discipline', 'Leading and developing people', 'Building or running your own thing', 'Creating something genuinely new', 'Being the trusted expert others rely on'),
  q('When mentoring a junior, you focus on…',
    'Teaching them to reason from fundamentals', 'Supporting their confidence and growth', 'Giving them real ownership quickly', 'Encouraging them to think differently', 'Instilling good habits and discipline'),
  q('You judge an idea mainly by…',
    'Whether it is logically sound', 'Whether people will embrace it', 'Whether it can be executed now', 'Whether it is original and bold', 'Whether it is safe and well-tested'),
  q('A perfect project team would have you as the…',
    'Architect', 'Glue that holds it together', 'Driver and decision-maker', 'Idea engine', 'Quality and process guardian'),
  q('Your communication style is…',
    'Precise and logical', 'Warm and relational', 'Direct and concise', 'Visual and imaginative', 'Thorough and documented'),
  q('You are happiest when your work is…',
    'Intellectually challenging', 'Connected to people', 'Fast-moving and impactful', 'Creative and original', 'Orderly and well-run'),
  q('A risky but exciting opportunity appears. You…',
    'Analyse the odds carefully first', 'Ask trusted people for their read', 'Seize it and figure it out', 'Jump in for the adventure', 'Assess the downside before anything else'),
  q('Others most often describe you as…',
    'Clever', 'Caring', 'Driven', 'Imaginative', 'Reliable'),
  q('When a process is slowing the team, you…',
    'Redesign it to be logically efficient', 'Check how the team feels about changing it', 'Bypass it to keep moving', 'Reinvent it from scratch', 'Improve it carefully without breaking compliance'),
  q('Your proudest work outcome would be…',
    'An elegant solution to a hard problem', 'A team that thrived because of you', 'A product shipped and adopted at scale', 'An innovation that changed the game', 'A flawless track record of delivery'),
  q('At the start of your career, you most want to…',
    'Build deep technical mastery', 'Find a team and mentors you connect with', 'Take on responsibility and prove yourself fast', 'Explore widely before specialising', 'Learn the craft properly, step by step'),
]

export function calcResult(answers: (AnimalKey | null)[]): AnimalKey {
  const count: Record<AnimalKey, number> = { Lion: 0, Owl: 0, Dolphin: 0, Fox: 0, Wolf: 0 }
  answers.forEach(a => { if (a) count[a]++ })
  return (Object.entries(count).sort((a, b) => b[1] - a[1])[0][0]) as AnimalKey
}

export const ANIMAL_STORAGE_KEY = 'careerWorkAnimalResult'
