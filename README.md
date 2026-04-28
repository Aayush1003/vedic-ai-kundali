# Vedic AI Kundali

🌙 **AI-powered Vedic Astrology Platform** — Generate birth charts, find compatibility matches, and get personalized astrological insights.

## Overview

Vedic AI Kundali is a modern astrology platform that combines:
- **Swiss Ephemeris** for accurate planetary calculations
- **OpenAI LLM** for AI-powered astrological interpretations
- **Vedic traditions** (36-guna Milan, dasha analysis, puja recommendations)

### Key Features

- ✨ **Kundali Generation** — D1 & D9 charts with planetary positions
- 💑 **Guna Milan** — Compatibility matching (36-guna system)
- 🤖 **AI Astrologer** — Personalized predictions via chatbot
- 📊 **Dasha Timeline** — Life periods and insights
- 🙏 **Puja Recommendations** — Remedies based on chart analysis
- 📅 **Muhurat Finder** — Auspicious timings for events

## Tech Stack

### Frontend
- **Next.js 14** — Full-stack React with SSR
- **TailwindCSS** — Utility-first styling
- **ShadCN/UI** — Pre-built components
- **Zustand** — State management
- **React Query** — Data fetching

### Backend
- **Node.js + Express** — RESTful API
- **TypeScript** — Type-safe code
- **Prisma ORM** — Database management
- **PostgreSQL** — Relational database
- **Redis** — Caching & job queue
- **OpenAI API** — LLM integration

### DevOps
- **Docker** — Containerization
- **GitHub Actions** — CI/CD pipelines
- **Vercel** — Frontend hosting
- **Railway/Render** — Backend hosting

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone & Setup

```bash
git clone https://github.com/yourusername/vedic-ai-kundali.git
cd vedic-ai-kundali

# Copy environment files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env.local
```

### 2. Start Services

```bash
# Start PostgreSQL & Redis
docker-compose up -d

# Install frontend dependencies
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000

# In another terminal, install backend dependencies
cd backend
npm install
npm run dev
# Backend runs on http://localhost:3001
```

### 3. Setup Database

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **pgAdmin** (Database UI): http://localhost:5050
- **Redis Commander**: http://localhost:8081

## Project Structure

```
vedic-ai-kundali/
├── frontend/                    # Next.js frontend
│   ├── app/                    # Routes & pages
│   ├── components/             # React components
│   ├── lib/                    # Utilities & state
│   ├── types/                  # TypeScript types
│   └── styles/                 # TailwindCSS
├── backend/                    # Node.js API
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── services/           # Business logic (astrology, AI, etc.)
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Auth, validation, error handling
│   │   ├── jobs/               # Background jobs (Bull queue)
│   │   ├── config/             # Configuration
│   │   ├── types/              # TypeScript types
│   │   └── constants/          # Constants & data
│   ├── prisma/                 # Database schema & migrations
│   └── tests/                  # Unit & integration tests
├── docs/                       # Documentation
├── .github/workflows/          # CI/CD pipelines
├── docker-compose.yml          # Local dev environment
├── PROJECT_PLAN.md             # Detailed implementation plan
└── README.md                   # This file
```

## Development Workflow

### Frontend Development

```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Lint code
```

### Backend Development

```bash
cd backend
npm run dev          # Start dev server with hot reload
npm run build        # Build TypeScript
npm run test         # Run tests
npm run lint         # Lint code
npx prisma studio   # Open database UI
```

### Database Migrations

```bash
cd backend

# Create a new migration
npx prisma migrate dev --name feature_name

# Apply migrations
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset
```

## API Documentation

The backend exposes RESTful endpoints for:

- **Authentication** (`/api/auth`)
  - `POST /signup` — Create account
  - `POST /login` — Login
  - `POST /refresh-token` — Refresh JWT
  
- **Kundali** (`/api/kundali`)
  - `GET /` — List user's kundalis
  - `POST /` — Create new kundali
  - `GET /:id` — Get kundali details
  - `PUT /:id` — Update kundali
  
- **Milan** (`/api/milan`)
  - `POST /` — Calculate compatibility
  - `GET /history` — Get past milan results
  
- **Chat** (`/api/chat`)
  - `POST /sessions` — Create chat session
  - `POST /sessions/:id/messages` — Send message
  - `GET /sessions/:id/messages` — Get chat history
  
- **Subscriptions** (`/api/subscription`)
  - `GET /plan` — Get current plan
  - `POST /upgrade` — Upgrade subscription
  - `POST /cancel` — Cancel subscription

See [docs/API.md](docs/API.md) for complete API reference.

## Configuration

### Environment Variables

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Backend** (`.env.local`):
```
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_...
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
```

See `.env.example` files for all available options.

## Testing

### Frontend Tests

```bash
cd frontend
npm run test           # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Backend Tests

```bash
cd backend
npm run test           # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend (Railway/Render)

```bash
# Railway
railway link
railway up

# OR Render
# Connect GitHub repo directly in Render dashboard
```

### Database (Neon)

1. Create PostgreSQL database on [Neon](https://neon.tech)
2. Set `DATABASE_URL` in environment variables
3. Run migrations: `prisma migrate deploy`

## Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Development Roadmap

### Phase 1: MVP (Weeks 1-6) ✅
- [x] Project scaffolding
- [ ] Authentication system
- [ ] Kundali generation (D1)
- [ ] AI chat (basic)
- [ ] User dashboard

### Phase 2: Milan & Reports (Weeks 7-10)
- [ ] Guna Milan matching
- [ ] PDF report generation
- [ ] D9 chart (Navamsa)
- [ ] Dasha timeline

### Phase 3: Monetization (Weeks 11-16)
- [ ] Stripe subscription
- [ ] Puja recommendations
- [ ] Muhurat finder
- [ ] Email notifications

### Phase 4: Advanced Features (Months 4-6)
- [ ] Synastry charts
- [ ] Transit forecasts
- [ ] Mobile app
- [ ] Multi-language support

See [PROJECT_PLAN.md](PROJECT_PLAN.md) for comprehensive plan.

## Cost Analysis

**Monthly Infrastructure Cost (Approx.)**
- Vercel (frontend): Free - $20
- Railway/Render (backend): Free - $5
- PostgreSQL (Neon): Free - $10
- Redis (Upstash): Free - $5
- OpenAI API: $5 - $30 (usage-based)
- **Total: ~$10-70/month** (scales with usage)

## Troubleshooting

### PostgreSQL Connection Error
```bash
# Check if Docker container is running
docker ps

# Restart services
docker-compose restart postgres
```

### Redis Connection Error
```bash
# Check Redis status
redis-cli ping

# Restart Redis
docker-compose restart redis
```

### Prisma Migration Issues
```bash
# Reset database (dev only!)
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

## Support & Feedback

- 📧 Email: support@vedic-ai.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/vedic-ai-kundali/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/vedic-ai-kundali/discussions)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Swiss Ephemeris** — For accurate astronomical calculations
- **OpenAI** — For LLM capabilities
- **Vedic Astrology Tradition** — For astrological wisdom

---

**Built with ❤️ for the global astrology community**
