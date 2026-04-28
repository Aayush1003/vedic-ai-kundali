# Vedic AI Kundali - Comprehensive Project Plan

## Executive Summary

**Project:** AI-powered Vedic Astrology platform with Kundali generation, compatibility matching (Guna Milan), AI astrologer chat, and puja recommendations.

**Vision:** Build a modular, cost-efficient B2C platform starting with an MVP (Kundali + Milan + basic AI chat) deployable within 6 weeks, then phase in advanced features (Dasha, Muhurat, Puja booking).

**Tech Stack:** Next.js (frontend) + Node.js (backend) + PostgreSQL (DB) + Swiss Ephemeris (astrology) + OpenAI (LLM)

**Business Model:** Freemium (free tier with limits, premium at $4.99/mo)

**Cost:** ~$10-70/month to run (serverless + open-source tools)

---

## 1. System Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js)                        │
│  - Kundali Generator UI                                     │
│  - Milan (Compatibility) Dashboard                          │
│  - AI Astrologer Chat Interface                             │
│  - User Dashboard (saved charts, predictions)               │
└──────────────────┬──────────────────────────────────────────┘
                   │ (REST + WebSocket)
┌──────────────────▼──────────────────────────────────────────┐
│              BACKEND API (Node.js/Express)                  │
│  - Auth & User Management                                   │
│  - Kundali Calculation Service                              │
│  - Milan Matching Service                                   │
│  - AI Integration Layer (LLM orchestration)                 │
│  - Puja Recommendation Engine                               │
│  - Muhurat Finder (Phase 2)                                 │
│  - Payment Processing                                       │
└──────────┬──────────────────┬──────────────────┬────────────┘
           │                  │                  │
    ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐
    │ PostgreSQL   │    │ Swiss        │    │ OpenAI API  │
    │ Database     │    │ Ephemeris    │    │ (LLM Chat)  │
    │             │    │ Library      │    │             │
    └─────────────┘    └─────────────┘    └─────────────┘
```

### Core Components

**Frontend:**
- Kundali Generator (date/time/place input → zodiac wheel visualization)
- Milan Matcher (upload 2 kundalis → compatibility score + breakdown)
- AI Chat (ask astrology questions → get personalized responses)
- User Dashboard (manage saved charts, view history)
- Authentication (sign up, login, password reset)

**Backend:**
- RESTful API (auth, kundali CRUD, milan calculation, chat, payments)
- Astrology Engine (calculate planetary positions, dasha, etc.)
- AI Orchestration (ground LLM responses in astrology data)
- Job Queue (async report generation, puja recommendations)
- Payment Processing (Stripe integration)

**Database:**
- Users, Kundali charts, Planetary positions
- Milan results, AI chat history, Reports
- Subscription/Payment info, Puja recommendations

---

## 2. Recommended Tech Stack

### Frontend
- **Next.js 14+** — Full-stack capabilities, SSR for SEO, App Router
- **React** — Component-based UI, hooks
- **TailwindCSS** — Utility-first styling, rapid development
- **ShadCN/UI** — Pre-built accessible components
- **Zustand** — Lightweight state management
- **React Query (TanStack Query)** — API data fetching and caching
- **Chart.js / Recharts** — Visualize birth charts, planetary positions
- **Next-i18n-router** — Multi-language support (Hindi, English)

### Backend
- **Node.js + Express** — Fast, lightweight, easy deployment
- **TypeScript** — Type safety, better DX
- **Prisma ORM** — Type-safe DB queries, auto migrations
- **PostgreSQL** — Reliable, open-source, scales well
- **Redis** — Caching (sessions, ephemeris data, LLM responses)
- **Bull** — Job queue (async report generation, puja recommendations)
- **Jest + Supertest** — Unit & integration testing
- **Zod** — Request validation

### Astrology Engine
- **Swiss Ephemeris (libswe)** — Open-source, accurate planetary calculations
- **node-swe** — Node.js wrapper for Swiss Ephemeris
- **Custom service layer** — Guna Milan, Dasha, Muhurat calculations

### AI/LLM
- **OpenAI API (gpt-4-turbo / gpt-3.5-turbo)** — AI astrologer chat
- **LangChain** — LLM orchestration, prompt management
- **Prompt Engineering + RAG** — Ground responses in astrology knowledge base

### Deployment & DevOps
- **Vercel** — Next.js frontend (free tier + pay-as-you-go)
- **Railway / Render** — Node.js backend (free tier available)
- **Neon** — Serverless PostgreSQL (free tier)
- **Upstash** — Serverless Redis (free tier)
- **Docker** — Containerization for local dev
- **GitHub Actions** — CI/CD pipelines

### Cost Breakdown (Monthly, Small Scale)

| Service | Cost | Notes |
|---------|------|-------|
| Vercel (Next.js) | Free-$20 | Free tier for hobby projects |
| Backend (Railway/Render) | Free-$5 | Free tier available |
| PostgreSQL (Neon) | Free-$10 | Free tier with limits |
| OpenAI API (GPT) | $5-30 | Pay-per-token (optimize with caching) |
| Redis (Upstash) | Free-$5 | Free tier available |
| **Total** | **~$10-70/mo** | Scale as revenue grows |

---

## 3. Database Design

### Core Tables

#### Users
```sql
- id (UUID, PK)
- email (unique, indexed)
- password (hashed with bcrypt)
- name
- phone (optional)
- gender (enum: M/F/Other)
- created_at, updated_at
- subscription_tier (enum: free, premium)
- subscription_expires_at (nullable)
- is_email_verified (boolean)
- last_login (timestamp)
```

#### Kundali (Birth Charts)
```sql
- id (UUID, PK)
- user_id (FK, indexed)
- name (e.g., "My Birth Chart")
- birth_date (date)
- birth_time (time)
- birth_place (string)
- latitude (decimal)
- longitude (decimal)
- timezone_offset (float)
- kundali_d1 (JSON: planet positions, houses, aspects)
- kundali_d9 (JSON: navamsa chart)
- calculated_at (timestamp)
- is_saved (boolean)
- is_public (boolean)
- created_at, updated_at
```

#### Planetary Positions
```sql
- id (UUID, PK)
- kundali_id (FK)
- planet_id (enum: sun, moon, mars, mercury, jupiter, venus, saturn, rahu, ketu)
- sign (rashi: Aries-Pisces)
- degree (decimal: 0-30)
- house (1-12)
- retrograde (boolean)
- nakshatra (constellation)
- nakshatra_pada (1-4)
- aspects (JSON: list of planetary aspects)
```

#### Milan (Compatibility)
```sql
- id (UUID, PK)
- user1_id, user2_id (FK)
- user1_kundali_id, user2_kundali_id (FK)
- guna_milan_score (0-36)
- compatibility_breakdown (JSON: varna, vasya, tara, yoni, graha_maitri, bhakut, nadi)
- mangal_dosha_analysis (JSON: present, severity, remedy)
- strength_areas (text[]: compatible placements)
- caution_areas (text[]: challenging placements)
- overall_rating (1-5 stars)
- created_at, updated_at
```

#### AI Chat Sessions
```sql
- id (UUID, PK)
- user_id (FK, indexed)
- kundali_id (FK, nullable: can chat without chart)
- title (string)
- messages (JSON array: [ { role, content, timestamp } ])
- total_tokens_used (integer, for cost tracking)
- created_at, updated_at
- is_pinned (boolean)
```

#### Reports
```sql
- id (UUID, PK)
- user_id, kundali_id (FK)
- report_type (enum: basic_kundali, detailed_analysis, puja_recommendation, dasha_timeline)
- content (JSON or file URL)
- tier (enum: free, premium)
- generated_at (timestamp)
- expires_at (nullable)
- download_count (integer)
```

#### Puja Recommendations
```sql
- id (UUID, PK)
- kundali_id (FK)
- puja_name (string)
- reason (text: why recommended)
- timing (string: auspicious timing)
- description (text)
- estimated_cost (decimal)
- provider_id (FK, nullable, for Phase 2)
- created_at
```

#### Subscriptions
```sql
- id (UUID, PK)
- user_id (FK, unique)
- plan_type (enum: free, premium_monthly, premium_yearly)
- status (enum: active, cancelled, expired)
- stripe_subscription_id (string, external)
- stripe_customer_id (string, external)
- current_period_start, current_period_end (date)
- created_at, updated_at
- is_trial (boolean)
- trial_ends_at (nullable)
```

---

## 4. Astrology Calculation Engine Integration

### Approach
Use **Swiss Ephemeris** (open-source, accurate) via Node.js wrapper (`node-swe`) for calculating planetary positions.

### Implementation

**Step 1: Install & Setup**
```bash
npm install swe-js  # Or node-swe depending on package
```

**Step 2: Create Astrology Service Module** (`backend/src/services/astrologyEngine.ts`)

Core functions needed:
- `calculateD1Chart()` — D1 natal chart with planet positions, houses, aspects
- `calculateNavamsa()` — D9 chart from D1 positions
- `calculateGunaPoints()` — 36-guna Milan breakdown
- `detectMangalDosha()` — Mars affliction analysis
- `calculateDasha()` — Life periods and predictions
- `findMuhurat()` — Auspicious dates/times

**Step 3: Caching Layer**
- Cache planetary positions in Redis (24-hour TTL)
- Cache calculated charts (30-day TTL)
- Cache Guna Milan results (90-day TTL)

**Step 4: Background Jobs**
- Use Bull job queue for async puja recommendations
- Triggered when kundali is saved
- Analyzes chart weaknesses

---

## 5. AI/LLM Integration Strategy

### Approach
Use **OpenAI GPT-4-turbo (or GPT-3.5)** with **RAG (Retrieval-Augmented Generation)** to ground responses in astrology data.

### Implementation

**Step 1: Create Knowledge Base**
- Structured astrology interpretations stored in PostgreSQL
- Planet meanings by sign, house, conjunction
- Guna associations for puja recommendations
- Remedy database (gemstones, mantras, lifestyle)

**Step 2: LLM Orchestration**
1. User sends query (e.g., "When will I marry?")
2. Extract kundali context if available
3. Retrieve relevant astrology data
4. Build RAG prompt with user's chart data
5. Call OpenAI API
6. Enhance response with remedies, puja links
7. Store conversation in database

**Step 3: Prompt Engineering**
- System prompt: "You are a Vedic astrologer with traditional Jyotish knowledge..."
- Include user's chart, current dasha, transits
- Constrain to avoid medical/legal liability
- Suggest remedies (monetization tie-in)

**Step 4: Cost Optimization**
- Cache common answers (7-day TTL)
- Use GPT-3.5-turbo for free tier
- GPT-4 for premium tier
- Rate limits: 20 chats/month free, unlimited premium

---

## 6. Feature-Wise Development Roadmap

### **Phase 1: MVP (Weeks 1-6)** ← LAUNCH FIRST

**Features:**
1. User Authentication (signup, login, password reset, email verification)
2. Kundali Generator (D1 only, Swiss Ephemeris integration)
3. Basic AI Astrologer Chat (5 messages/week free, 50/month premium)
4. User Dashboard (saved kundalis, chat history, profile)
5. Subscription Management (Stripe integration)

**Deliverables:**
- Frontend: Auth → Kundali form → Chart visualization → Chat UI
- Backend: Auth API → Kundali service → Chat service → Subscription API
- Database: Users, Kundali, Chat sessions, Subscriptions
- Deployment: Live on Vercel + Railway + Neon

**Success Metrics:** 100+ signups, 50+ kundalis, 80%+ uptime, <2s load time

---

### **Phase 2: Milan & Enhanced Charts (Weeks 7-10)**

**Features:**
1. Guna Milan (36-guna matching, mangal dosha analysis)
2. Enhanced Kundali (D9, aspects, dasha overlay)
3. Dasha Timeline (10-year forecast view)
4. Report Generation (PDF export, detailed analysis)
5. Email Report Delivery (async processing)

---

### **Phase 3: Puja Recommendations & Muhurat (Weeks 11-16)**

**Features:**
1. Automated Puja Recommendations (based on chart weaknesses)
2. Muhurat Finder (auspicious dates/times search)
3. Personalized Remedy Engine (gemstones, mantras, lifestyle)
4. Puja Booking Integration (partner with providers)

---

### **Phase 4: Advanced Features (Months 4-6)**

**Features:**
- Synastry charts (detailed relationship analysis)
- 6-12 month transit forecasts
- Social sharing & comparison
- Mobile app (React Native)
- Multi-language support
- Developer API (B2B)

---

## 7. UI/UX Flows

### User Flow 1: Generate Kundali

```
Home → Sign Up/Login → Dashboard
        ↓
        "Generate New Kundali" Button
        ↓
Enter Birth Details Form (Date, Time, Place)
        ↓
Calculate (show loading spinner)
        ↓
Display Kundali (Zodiac wheel + Planet table)
        ↓
Options: Save Chart | Share | Ask AI | Upgrade Premium
```

### User Flow 2: Guna Milan

```
Dashboard → Select Your Kundali → "Start Milan"
        ↓
Input Partner Details
        ↓
Calculate Milan → Show Results
        ↓
Display: 36-guna score, breakdown table, compatibility radar
        ↓
Options: Save | Print | Generate Report | View Pujas
```

### User Flow 3: AI Astrologer Chat

```
Dashboard → "Ask Astrologer" Chat
        ↓
User sends message → AI generates response (with chart context)
        ↓
Display response + remedies → Ask follow-up question
        ↓
Chat saved to history → Upgrade prompt if limit hit
```

---

## 8. Deployment Strategy

### Local Development
```bash
docker-compose up  # PostgreSQL, Redis
npm run dev  # Frontend on 3000, backend on 3001
```

### Staging
- Push to develop branch → GitHub Actions tests → Vercel preview

### Production
- Merge to main → Tests pass → Auto-deploy Vercel + Railway

### Performance Targets
- Page load: < 2s
- API response: < 200ms
- Kundali calculation: < 3s
- Chat response: < 5s

---

## 9. Monetization Ideas

### Core Model: Freemium

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | 1 kundali/month, 5 AI chats/month, basic PDF report |
| **Premium** | $4.99/mo | Unlimited kundalis, 50 chats/month, D9, Milan, detailed reports |
| **Annual** | $49/yr | Premium benefits + 2 months free |

### Additional Revenue
- Detailed Reports ($5-15 each)
- Puja Booking Commissions (10-20%)
- Affiliate Marketing (gemstones, courses)
- API for Developers ($100-500/mo)

### Year 1 Revenue Projection: ~$7.5K (covers ops + growth)

---

## 10. GitHub Repo Structure & Best Practices

```
vedic-ai-kundali/
│
├── .github/
│   ├── workflows/          # CI/CD pipelines
│   └── PULL_REQUEST_TEMPLATE.md
│
├── frontend/               # Next.js
│   ├── app/               # Routes (auth, dashboard, kundali, milan, chat)
│   ├── components/        # UI components, charts, forms
│   ├── lib/              # API client, state (Zustand)
│   ├── types/            # TypeScript types
│   └── styles/           # TailwindCSS
│
├── backend/              # Node.js + Express
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── services/     # Astrology, AI, reports, subscriptions
│   │   ├── routes/       # Express routes
│   │   ├── middleware/   # Auth, error handling, rate limiting
│   │   ├── jobs/         # Bull queue (async)
│   │   ├── config/       # DB, Redis, OpenAI setup
│   │   ├── utils/        # Validators, JWT, crypto
│   │   ├── types/        # TypeScript types
│   │   └── index.ts      # Express app setup
│   ├── prisma/           # DB schema + migrations
│   └── tests/            # Unit + integration tests
│
├── docs/                 # Architecture, API, setup guides
├── docker-compose.yml    # Local dev environment
└── PROJECT_PLAN.md       # This plan
```

**Best Practices:**
- TypeScript strict mode, ESLint+Prettier, pre-commit hooks
- 80%+ test coverage for critical paths
- Swagger API docs, conventional commits
- Environment variables in .env files (never commit)

---

## 11. Summary & Next Steps

This plan provides a **6-week MVP → phased feature expansion roadmap** for a production-ready Vedic astrology platform.

**Key Success Factors:**
- Launch MVP quickly to validate market fit
- Use open-source & free-tier services to control costs
- Build modular architecture for scaling
- Focus on beautiful UX and SEO
- Implement freemium model for growth

**Next: Begin scaffolding (Week 1 tasks below)**
