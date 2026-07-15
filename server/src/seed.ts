import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from './config/database.js';
import { Project } from './models/Project.js';

const projects = [
  {
    title: 'SafeGuard – Women Safety Application',
    description:
      'A fully responsive web app for women safety with real-time emergency alerts, live location tracking, and incident reporting.',
    tech: ['Next.js', 'React', 'Vercel'],
    features: [
      'Real-time emergency alerts',
      'Live location tracking',
      'Incident reporting',
      'Fully responsive web app',
    ],
    githubUrl: '#',
    demoUrl: '#',
    sortOrder: 1,
  },
  {
    title: 'CrimeTrace AI – Cybercrime Prediction System',
    description:
      'Cybercrime hotspot prediction system achieving 90%+ accuracy with a Flask REST API and Flutter mobile integration. Smart India Hackathon project.',
    tech: ['Python', 'Random Forest', 'Flask', 'Flutter'],
    features: [
      'Cybercrime hotspot prediction',
      '90%+ accuracy',
      'Flask REST API',
      'Flutter mobile integration',
      'Smart India Hackathon Project',
    ],
    githubUrl: '#',
    demoUrl: '#',
    sortOrder: 2,
  },
  {
    title: 'Clario – AI Communication Assessment Platform',
    description:
      'AI-powered communication assessment platform with voice recording upload, grammar/fluency/confidence/pace analysis, and a live AI mock interview module.',
    tech: ['React', 'FastAPI', 'MongoDB', 'Gemini AI'],
    features: [
      'Voice recording upload',
      'AI communication analysis',
      'Grammar evaluation',
      'Fluency assessment',
      'Confidence scoring',
      'Pace analysis',
      'Personalized AI feedback',
      'Communication dashboard',
      'Live AI Mock Interview Module',
      'Performance analytics',
    ],
    githubUrl: '#',
    demoUrl: '#',
    sortOrder: 3,
  },
  {
    title: 'Smart Memory Aid Watch for Memory Loss Patients',
    description:
      "Research-based healthcare IoT project for Alzheimer's and dementia patient monitoring with GPS live tracking, emergency SOS, and a caregiver dashboard.",
    tech: ['ESP32', 'IoT', 'GPS', 'Embedded C', 'Cloud'],
    features: [
      "Alzheimer's patient monitoring",
      'Dementia care',
      'GPS live tracking',
      'Emergency SOS',
      'Caregiver dashboard',
      'Cloud monitoring',
      'Research-based healthcare IoT project',
    ],
    githubUrl: '#',
    demoUrl: '#',
    sortOrder: 4,
  },
  {
    title: 'Aura AI Poem Generator',
    description:
      'AI poem generation app with multiple themes, prompt customization, and a beautiful UI.',
    tech: ['React', 'JavaScript', 'Generative AI'],
    features: ['AI poem generation', 'Multiple themes', 'Prompt customization', 'Beautiful UI'],
    githubUrl: '#',
    demoUrl: '#',
    sortOrder: 5,
  },
  {
    title: 'Python Snake Game',
    description: 'Interactive snake game with score tracking and keyboard controls.',
    tech: ['Python', 'PyGame'],
    features: ['Interactive gameplay', 'Score tracking', 'Keyboard controls'],
    githubUrl: '#',
    demoUrl: '#',
    sortOrder: 6,
  },
  {
    title: 'Snake & Ladders Web Game',
    description:
      'Multiplayer snake and ladders web game with dice animation and responsive design.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    features: ['Multiplayer', 'Dice animation', 'Responsive design'],
    githubUrl: '#',
    demoUrl: '#',
    sortOrder: 7,
  },
  {
    title: '8x8x8 LED Cube',
    description: '512-LED cube with multiplexing and embedded programming animations.',
    tech: ['Embedded C', 'Arduino'],
    features: ['512 LED animations', 'Multiplexing', 'Embedded programming'],
    githubUrl: '#',
    demoUrl: '#',
    sortOrder: 8,
  },
];

async function seed() {
  console.log('Connecting to MongoDB Atlas...');
  await connectDB();

  console.log('Clearing existing projects...');
  await Project.deleteMany({});

  console.log('Inserting projects...');
  await Project.insertMany(projects);

  const count = await Project.countDocuments();
  console.log(`\n✓ Seeded ${count} projects successfully`);

  await disconnectDB();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
