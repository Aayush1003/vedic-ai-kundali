# Development Setup Guide

## Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org)
- **PostgreSQL 14+** — [Download](https://www.postgresql.org/download) or use Docker
- **Redis 7+** — [Download](https://redis.io/download) or use Docker
- **Git** — [Download](https://git-scm.com)
- **npm** or **yarn** — Comes with Node.js

## Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vedic-ai-kundali.git
cd vedic-ai-kundali
```

### 2. Start Services with Docker

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Verify services are running
docker ps
```

**Endpoints:**
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- pgAdmin: `http://localhost:5050` (user: admin@vedic-ai.local, pass: admin)
- Redis Commander: `http://localhost:8081`

### 3. Setup Frontend

```bash
cd frontend

# Copy environment file
cp .env.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend:** http://localhost:3000

### 4. Setup Backend

```bash
cd ../backend

# Copy environment file
cp .env.example .env.local

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

**Backend API:** http://localhost:3001

---

## Detailed Setup Steps

### Frontend Setup

#### 1. Environment Configuration

```bash
cd frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

#### 2. Install Dependencies

```bash
npm install
```

**Key Dependencies:**
- `react` — UI library
- `next` — Full-stack framework
- `zustand` — State management
- `@tanstack/react-query` — Data fetching
- `tailwindcss` — Styling
- `recharts` — Chart visualization

#### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

#### 4. Run Tests

```bash
npm run test           # Run all tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

#### 5. Build for Production

```bash
npm run build
npm start
```

---

### Backend Setup

#### 1. Environment Configuration

```bash
cd backend
cp .env.example .env.local
```

Edit `backend/.env.local`:

```
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vedic_db

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRE=30d

# OpenAI
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-3.5-turbo

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_test_your_webhook_secret

# Server
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

#### 2. Install Dependencies

```bash
npm install
```

**Key Dependencies:**
- `express` — Web framework
- `@prisma/client` — Database ORM
- `jsonwebtoken` — JWT authentication
- `openai` — LLM API client
- `bull` — Job queue
- `redis` — Cache & job store
- `stripe` — Payment processing

#### 3. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Create initial migration
npx prisma migrate dev --name init

# (Optional) Seed database with test data
npx prisma db seed
```

**Database Verification:**

```bash
# Open Prisma Studio to view data
npx prisma studio
```

Visit http://localhost:5555

#### 4. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

**Test the API:**

```bash
curl http://localhost:3001/health
# Response: {"status":"ok","timestamp":"...","uptime":...}
```

#### 5. Run Tests

```bash
npm run test           # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

#### 6. Build for Production

```bash
npm run build
npm start
```

---

## Docker & Docker Compose

### Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart a specific service
docker-compose restart postgres
```

### Docker Commands Reference

```bash
# List running containers
docker ps

# View logs
docker logs <container-id>

# Access PostgreSQL CLI
docker exec -it vedic-ai-postgres psql -U postgres -d vedic_db

# Access Redis CLI
docker exec -it vedic-ai-redis redis-cli

# Clean up
docker-compose down -v  # Remove volumes too
```

---

## Database Management

### Migrations

```bash
# Create a new migration (after schema changes)
npx prisma migrate dev --name feature_name

# Review pending migrations
npx prisma migrate status

# Apply migrations to production
npx prisma migrate deploy

# Reset database (dev only!)
npx prisma migrate reset
```

### Seeding (Optional)

Create `backend/prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: 'hashed_password', // Use bcrypt in production
      name: 'Test User',
    },
  });
  
  console.log('✅ Seeded:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run seed:

```bash
npx prisma db seed
```

---

## Environment Variables Reference

### Frontend (`frontend/.env.local`)

```
# API
NEXT_PUBLIC_API_URL=http://localhost:3001

# Stripe (Payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App Config
NEXT_PUBLIC_APP_NAME=Vedic AI Kundali
NEXT_PUBLIC_APP_DESCRIPTION=AI-powered Vedic astrology

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_CHAT=true
```

### Backend (`backend/.env.local`)

```
# Server
NODE_ENV=development
PORT=3001
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vedic_db

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=dev-secret-key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=dev-refresh-secret
JWT_REFRESH_EXPIRE=30d

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=1000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Optional)
SENDGRID_API_KEY=SG...
EMAIL_FROM=noreply@vedic-ai.com

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001

# Feature Flags
ENABLE_PUJA_RECOMMENDATIONS=true
ENABLE_MUHURAT_FINDER=false
```

---

## Troubleshooting

### PostgreSQL Issues

**Error: Connection refused**
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Restart PostgreSQL
docker-compose restart postgres

# Check connection
psql -h localhost -U postgres -d vedic_db
```

### Redis Issues

**Error: Cannot connect to Redis**
```bash
# Check Redis status
redis-cli ping
# Expected: PONG

# Restart Redis
docker-compose restart redis
```

### Prisma Issues

**Error: database does not exist**
```bash
# Create database
createdb vedic_db

# Or reset everything
npx prisma migrate reset
```

**Error: Prisma client not found**
```bash
npx prisma generate
```

### Node/npm Issues

**Error: Cannot find module**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**Error: Port already in use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

---

## Code Quality

### ESLint

```bash
# Check for issues
npm run lint

# Fix issues automatically
npm run lint -- --fix
```

### Prettier (Code Formatting)

```bash
# Check formatting
npx prettier --check .

# Format all files
npx prettier --write .
```

### TypeScript Checking

```bash
# Frontend
cd frontend && npx tsc --noEmit

# Backend
cd backend && npx tsc --noEmit
```

---

## Git Workflow

### Creating a Feature Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git add .
git commit -m "feat: Add amazing feature"

# Push to GitHub
git push origin feature/amazing-feature

# Create Pull Request on GitHub
```

### Commit Convention

```
feat:     A new feature
fix:      A bug fix
docs:     Documentation only
test:     Adding tests
refactor: Code refactoring without feature changes
chore:    Build, dependencies, tooling
perf:     Performance improvement
```

Example:
```bash
git commit -m "feat(kundali): Add D9 chart calculation"
git commit -m "fix(chat): Fix message sorting bug"
git commit -m "docs: Update API endpoints"
```

---

## Performance Tips

### Frontend
- Use React DevTools to profile components
- Check bundle size: `npm run build && npm analyze`
- Use Lighthouse for audit
- Enable HTTP/2 and compression

### Backend
- Monitor database queries (use `prisma --log`)
- Cache expensive calculations in Redis
- Use Bull for async jobs
- Profile with Node.js profiler

```bash
# Node.js profiling
node --prof src/index.ts
node --prof-process isolate-*.log > profile.txt
```

---

## Next Steps

1. **Read** [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
2. **Review** [API.md](./API.md) for endpoint documentation
3. **Check** [PROJECT_PLAN.md](../PROJECT_PLAN.md) for implementation roadmap
4. **Start** developing features from Phase 1 MVP!

---

## Support

- 📧 Email: support@vedic-ai.com
- 🐛 GitHub Issues: Report bugs
- 💬 GitHub Discussions: Ask questions
- 📚 Documentation: See docs/ folder

Happy coding! 🚀
