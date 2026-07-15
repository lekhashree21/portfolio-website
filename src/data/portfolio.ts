export type SkillCategory = {
  name: string;
  icon: string;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming',
    icon: 'Code2',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 80 },
    ],
  },
  {
    name: 'Frontend',
    icon: 'Layout',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'React.js', level: 85 },
      { name: 'Next.js', level: 80 },
    ],
  },
  {
    name: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 82 },
      { name: 'Express.js', level: 80 },
      { name: 'Flask', level: 85 },
      { name: 'FastAPI', level: 82 },
    ],
  },
  {
    name: 'Database',
    icon: 'Database',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'MySQL', level: 80 },
    ],
  },
  {
    name: 'AI & ML',
    icon: 'BrainCircuit',
    skills: [
      { name: 'Machine Learning', level: 85 },
      { name: 'Deep Learning', level: 80 },
      { name: 'Generative AI', level: 88 },
      { name: 'Prompt Engineering', level: 90 },
      { name: 'Random Forest', level: 82 },
    ],
  },
  {
    name: 'Cloud & Tools',
    icon: 'Cloud',
    skills: [
      { name: 'AWS', level: 75 },
      { name: 'Git', level: 88 },
      { name: 'GitHub', level: 88 },
      { name: 'Vercel', level: 85 },
    ],
  },
  {
    name: 'Core Concepts',
    icon: 'Cpu',
    skills: [
      { name: 'IoT', level: 85 },
      { name: 'Embedded Systems', level: 82 },
      { name: 'Problem Solving', level: 90 },
    ],
  },
];

export const certifications = [
  { name: 'Google AI Essentials', issuer: 'Google', icon: 'Award' },
  { name: 'Salesforce Agentforce Champion', issuer: 'Salesforce', icon: 'Trophy' },
  { name: 'Infosys AI Primer', issuer: 'Infosys', icon: 'Award' },
  { name: 'Infosys Generative AI', issuer: 'Infosys', icon: 'Sparkles' },
  { name: 'Crash Course on Python', issuer: 'Google', icon: 'Code2' },
  { name: 'Cisco Cybersecurity', issuer: 'Cisco', icon: 'ShieldCheck' },
  { name: 'Cisco Networking', issuer: 'Cisco', icon: 'Network' },
  { name: 'Cisco IoT', issuer: 'Cisco', icon: 'Cpu' },
];

export const achievements = [
  { label: 'LeetCode Problems Solved', value: 360, suffix: '+', icon: 'Code2' },
  { label: 'HackerRank Gold Badge', value: 1, suffix: '', icon: 'Trophy' },
  { label: 'Smart India Hackathon Participant', value: 2, suffix: 'x', icon: 'Medal' },
  { label: 'Department Certificate of Appreciation', value: 1, suffix: '', icon: 'Award' },
];

export const education = [
  {
    degree: 'Bachelor of Engineering',
    field: 'Electronics and Communication Engineering',
    institution: 'VSB Engineering College',
    location: 'Tamil Nadu',
    period: 'Expected Graduation: 2027',
    icon: 'GraduationCap',
  },
];

export const internships = [
  {
    role: 'Industrial Intern',
    company: 'Tamil Nadu Newsprint and Papers Limited (TNPL)',
    points: [
      'Industrial automation',
      'Process control',
      'Manufacturing systems',
    ],
    icon: 'Factory',
  },
  {
    role: 'Internship Trainee',
    company: 'Electric Loco Shed',
    points: [
      'Railway traction',
      'Electrical systems',
      'Motor drives',
      'Braking systems',
    ],
    icon: 'Train',
  },
];

export const leadership = [
  'Electronics Club Member',
  'Student Coordinator',
  'Organized Technical Symposium',
  'Infosys Pragati Cohort Participant',
];

export const publications = [
  {
    title: 'Smart Memory Aid Watch for Memory Loss Patients',
    venue:
      'International Conference on Global Challenges and Solutions for Sustainable Development',
    type: 'Research Paper',
  },
];

export const profile = {
  name: 'Lekhashree B',
  roles: ['Full Stack Developer', 'AI/ML Enthusiast', 'Software Engineer'],
  summary:
    "I am a final-year Electronics and Communication Engineering student passionate about Full Stack Development, Artificial Intelligence, Machine Learning, Cloud Computing, and IoT. I enjoy building impactful software solutions that solve real-world problems and continuously improve my technical skills. I am seeking Software Development or AI Engineering opportunities.",
  contact: {
    phone: '+91 9025645658',
    email: 'lekhashree9385@gmail.com',
    linkedin: 'https://www.linkedin.com/in/lekhashree-b-913169327/',
    github: 'https://github.com/lekhashree21',
    leetcode: 'https://leetcode.com/u/lekha2005/',
    resume: '#',
  },
};
