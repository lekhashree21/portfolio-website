# Lekhashree B — Portfolio

A premium, production-ready personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion. Features a glassmorphism UI, animated coding particles, dark/light mode, scroll progress bar, and a contact form that persists messages to a database.

The frontend supports **two interchangeable backends**:

1. **Supabase** (PostgreSQL) — default, zero-config, already provisioned
2. **Express.js + MongoDB Atlas** — full REST API in `server/`, deployable to Render

Switch between them by setting (or omitting) `VITE_API_BASE_URL` in the frontend `.env`.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript |
| Styling | Tailwind CSS, custom design system |
| Animation | Framer Motion |
| Icons | Lucide React |
| Backend A (default) | Supabase (PostgreSQL + REST API + RLS) |
| Backend B (optional) | Express.js, MongoDB Atlas, Mongoose |
| Deployment | Vercel (frontend), Render (backend) |

## Features

- **Glassmorphism UI** with blue, white & dark-gray theme
- **Dark / Light mode** with system preference detection
- **Animated coding particles** in hero (canvas-based)
- **Typing animation** for role titles
- **Scroll progress bar** + scroll-to-top button
- **Loading screen** on initial load
- **Project search & filter** by technology
- **Animated skill cards** with progress indicators
- **Timeline** for education & internships
- **Certificates carousel** (auto-scrolling)
- **Animated counters** for achievements
- **Contact form** with database persistence
- **404 page**
- **Fully responsive** — mobile to desktop
- **SEO optimized** with Open Graph & Twitter meta tags

## Project Structure

```
├── src/                        # Frontend (React + Vite)
│   ├── components/             # Reusable UI components
│   ├── sections/               # Page sections
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # API layer (Supabase + Express)
│   ├── data/                   # Static portfolio data
│   ├── App.tsx
│   └── index.css
├── server/                     # Backend (Express + MongoDB Atlas)
│   ├── src/
│   │   ├── config/             # Database connection
│   │   ├── models/             # Mongoose models (Project, ContactMessage)
│   │   ├── routes/             # REST API routes
│   │   ├── middleware/         # Auth (JWT-ready), rate limiting
│   │   ├── index.ts            # Express app entry point
│   │   └── seed.ts             # Database seed script
│   ├── package.json
│   └── tsconfig.json
├── render.yaml                 # Render deployment config for backend
└── package.json                # Frontend dependencies
```

## Backend: Express + MongoDB Atlas

### Architecture

The `server/` directory contains a complete Express REST API with MongoDB Atlas via Mongoose.

**Mongoose Models:**
- `Project` — title, description, tech[], features[], imageUrl, githubUrl, demoUrl, sortOrder, timestamps
- `ContactMessage` — name, email, message, timestamps

**REST API Endpoints:**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:id` | Get a single project |
| POST | `/api/projects` | Create a project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |
| POST | `/api/contact` | Submit a contact message (rate-limited) |
| GET | `/api/contact` | List all messages |
| DELETE | `/api/contact/:id` | Delete a message |
| GET | `/health` | Health check |

**Middleware:**
- `helmet` — security headers
- `cors` — cross-origin requests (configurable via `CLIENT_URL`)
- `morgan` — request logging
- `express-rate-limit` — rate limiting on API and contact submissions
- `authMiddleware` — JWT-based auth, ready for future admin dashboard

### Running the Backend Locally

```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string
npm install
npm run dev
```

The API will start on `http://localhost:5000`.

### Seeding the Database

```bash
cd server
npm run seed
```

This inserts all 8 portfolio projects into MongoDB Atlas.

### Connecting MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user
3. Whitelist your IP (or `0.0.0.0/0` for development)
4. Copy the connection string into `server/.env` as `MONGODB_URI`

## Frontend API Layer

The `src/lib/api.ts` module auto-detects which backend to use:

- **No `VITE_API_BASE_URL`** → uses Supabase (default)
- **`VITE_API_BASE_URL=http://localhost:5000`** → uses Express/MongoDB

All CRUD functions (`fetchProjects`, `createProject`, `updateProject`, `deleteProject`, `submitContactMessage`) work identically with either backend — the switching is fully transparent to the UI.

## Getting Started (Frontend)

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Customization

All personal data (name, roles, summary, skills, certifications, achievements, education, internships, publications, leadership, contact links) is centralized in `src/data/portfolio.ts`. Update the placeholder links (`#`) for GitHub, LinkedIn, Email, Phone, Resume, and Live Demo there.

## Deployment

### Frontend (Vercel)

1. Push this repo to GitHub
2. Import into Vercel
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_BASE_URL` (only if using the Express backend)
4. Deploy

### Backend (Render)

1. Push this repo to GitHub
2. Create a new Web Service on Render, pointing to this repo
3. Render will auto-detect `render.yaml`:
   - Build: `cd server && npm install && npm run build`
   - Start: `cd server && npm start`
4. Set environment variables in Render dashboard:
   - `MONGODB_URI` — your Atlas connection string
   - `CLIENT_URL` — your Vercel frontend URL
   - `JWT_SECRET` — random string for future auth
5. Deploy

The `render.yaml` at the repo root pre-configures the service. The health check endpoint is `/health`.

## License

MIT
