# System Architecture

## Overview

Vedic AI Kundali follows a modern three-tier architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                        │
│                     (Next.js Frontend)                      │
│  - React Components (UI/UX)                                 │
│  - State Management (Zustand)                               │
│  - API Client (Axios)                                       │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTPS/REST + WebSocket
┌──────────────────▼──────────────────────────────────────────┐
│                   APPLICATION LAYER                         │
│                  (Node.js/Express Backend)                  │
│  - Authentication & Authorization                           │
│  - Business Logic (Astrology, AI, Payments)                 │
│  - Data Validation & Processing                             │
│  - Job Queue & Background Tasks                             │
└──────────┬──────────────────┬──────────────────┬────────────┘
           │                  │                  │
    ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐
    │ Data Layer   │    │ Cache Layer  │    │ External   │
    │(PostgreSQL)  │    │  (Redis)     │    │  Services  │
    │             │    │             │    │             │
    │ - Users     │    │ - Sessions  │    │ - OpenAI   │
    │ - Kundalis  │    │ - Charts    │    │ - Stripe   │
    │ - Reports   │    │ - Responses │    │ - Maps API │
    │ - Chat      │    │             │    │             │
    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## Component Breakdown

### Frontend (Next.js)

**Purpose:** Deliver user interface and handle client-side logic

**Key Modules:**
- **App Router** — Page-based routing (`/dashboard`, `/kundali`, `/milan`, `/chat`)
- **Components** — Reusable UI components (forms, charts, modals)
- **State Management** — Zustand stores (auth, kundali, UI)
- **API Client** — Axios wrapper for backend communication
- **Hooks** — Custom React hooks (useAuth, useFetch, etc.)

**Technologies:**
- React 18
- Next.js 14 (App Router)
- TailwindCSS + ShadCN/UI
- Zustand + React Query
- Axios

---

### Backend (Node.js/Express)

**Purpose:** Provide REST API, handle business logic, manage data

**Architecture Pattern:** Layered Architecture

#### Controllers
- **Purpose:** Handle HTTP requests/responses
- **Files:**
  - `authController.ts` — Login, signup, token refresh
  - `kundaliController.ts` — Create, read, update kundalis
  - `milanController.ts` — Calculate compatibility
  - `chatController.ts` — Handle chat messages
  - `subscriptionController.ts` — Manage subscriptions

#### Services
- **Purpose:** Core business logic
- **Files:**
  - `astrologyEngine.ts` — Swiss Ephemeris calculations
  - `aiAstrologer.ts` — OpenAI integration + RAG
  - `gunaCalculator.ts` — 36-guna Milan scoring
  - `reportGenerator.ts` — PDF/JSON report creation
  - `subscriptionService.ts` — Stripe integration
  - `authService.ts` — Password hashing, JWT

#### Middleware
- **Purpose:** Request preprocessing
- **Files:**
  - `auth.ts` — JWT verification, role-based access
  - `errorHandler.ts` — Global error handling
  - `rateLimit.ts` — API rate limiting
  - `requestValidation.ts` — Zod schema validation

#### Jobs (Bull Queue)
- **Purpose:** Asynchronous, non-blocking tasks
- **Files:**
  - `reportGeneration.ts` — Generate PDF reports in background
  - `pujaRecommendation.ts` — Analyze charts, recommend pujas
  - `emailNotification.ts` — Send emails asynchronously

#### Config
- **Purpose:** Application setup & configuration
- **Files:**
  - `database.ts` — Prisma client initialization
  - `redis.ts` — Redis client setup
  - `openai.ts` — OpenAI API configuration
  - `stripe.ts` — Stripe API setup
  - `env.ts` — Environment variable validation

#### Utilities
- **Purpose:** Helper functions
- **Files:**
  - `jwt.ts` — Token creation/verification
  - `crypto.ts` — Password hashing (bcrypt)
  - `validators.ts` — Zod schemas
  - `logger.ts` — Logging utility

---

### Database (PostgreSQL + Prisma ORM)

**Purpose:** Store user data, kundalis, reports, chat history

**Key Tables:**
- `users` — User accounts and subscriptions
- `kundali` — Birth charts with D1/D9
- `planetary_positions` — Individual planet data
- `chat_sessions` — Conversation history
- `milan` — Compatibility results
- `reports` — Generated astrological reports
- `puja_recommendations` — Recommended pujas
- `subscriptions` — Active subscriptions
- `payments` — Payment records

**ORM:** Prisma
- Type-safe database access
- Auto migrations
- Query optimization

---

### Cache Layer (Redis)

**Purpose:** Improve performance and reduce API calls

**Cached Data:**
- User sessions (JWT tokens)
- Ephemeris data (planetary positions for specific dates)
- Calculated kundalis (24-hour TTL)
- Guna Milan results (90-day TTL)
- Common LLM responses (7-day TTL)

**Tools:**
- Redis for caching
- Bull for job queue management

---

### External Integrations

#### Swiss Ephemeris (Astrology)
- **Library:** `swe-js` (Node.js binding)
- **Purpose:** Calculate planetary positions, dasha, muhurat
- **Integration:** `astrologyEngine.ts`

#### OpenAI API (LLM)
- **Service:** gpt-4-turbo / gpt-3.5-turbo
- **Purpose:** Generate astrological interpretations
- **Integration:** `aiAstrologer.ts` with RAG pattern

#### Stripe (Payments)
- **Service:** Stripe Payment Processing
- **Purpose:** Handle subscriptions and payments
- **Integration:** `subscriptionService.ts`

#### SendGrid (Email)
- **Service:** Email delivery
- **Purpose:** Send notifications, reports via email
- **Integration:** Background jobs

---

## Data Flow Examples

### User Flow 1: Generate Kundali

```
1. Frontend: User enters birth details (date, time, place)
   ↓
2. Frontend: Submit form → POST /api/kundali
   ↓
3. Backend Controller: Validate input (Zod)
   ↓
4. Backend Service: Call astrologyEngine.calculateD1Chart()
   ↓
5. Swiss Ephemeris: Calculate planetary positions
   ↓
6. Backend Service: Extract data → store in PostgreSQL
   ↓
7. Backend Service: Cache in Redis
   ↓
8. Frontend: Display zodiac wheel + planet table
```

### User Flow 2: AI Chat Message

```
1. Frontend: User types question
   ↓
2. Frontend: POST /api/chat/messages with sessionId & content
   ↓
3. Backend Controller: Extract user's kundali from session
   ↓
4. Backend Service (AI Astrologer):
   - Retrieve user's chart data
   - Build RAG prompt with chart context
   - Call OpenAI API
   - Enhance response with remedies
   ↓
5. Backend: Store message in ChatSession (PostgreSQL)
   ↓
6. Frontend: Display response + suggested follow-ups
```

### User Flow 3: Guna Milan Calculation

```
1. Frontend: Upload 2 kundalis or select saved ones
   ↓
2. Frontend: POST /api/milan with kundali IDs
   ↓
3. Backend Controller: Validate IDs
   ↓
4. Backend Service (Guna Calculator):
   - Retrieve both kundalis from cache/DB
   - Calculate 8 Koots score
   - Detect Mangal Dosha
   - Generate interpretation
   ↓
5. Backend Service: Store results in Milan table
   ↓
6. Frontend: Display 36-guna score + breakdown
```

---

## Security Architecture

### Authentication & Authorization
```
┌──────────────────┐
│ User Login       │
└────────┬─────────┘
         ↓
┌──────────────────────────────────────┐
│ Backend:                             │
│ 1. Hash password (bcrypt)            │
│ 2. Verify against stored hash        │
│ 3. Generate JWT (exp: 7d)            │
│ 4. Generate refresh token (exp: 30d) │
└────────┬─────────────────────────────┘
         ↓
┌──────────────────┐
│ Frontend:        │
│ Store JWT in     │
│ memory + HTTP    │
│ only cookie      │
└────────┬─────────┘
         ↓
┌──────────────────────────────────┐
│ Each API request:                │
│ Header: Authorization: Bearer JWT │
│ Backend verifies JWT signature    │
└──────────────────────────────────┘
```

### Data Protection
- **Passwords:** Bcrypt hashing (salt rounds: 10)
- **API Keys:** Environment variables (never in code)
- **Database:** Role-based row-level security (future)
- **HTTPS:** Enforced in production
- **CORS:** Whitelist allowed origins

### Rate Limiting
- **Per IP:** 100 requests/15 min
- **Per User:** 50 API calls/min
- **AI Chat:** 20 messages/month (free), unlimited (premium)

---

## Scalability Strategy

### Current (MVP)
```
┌─────────────────┐
│ Single Instance │
│ - Express API   │
│ - PostgreSQL    │
│ - Redis         │
└─────────────────┘
Handles: 1K users, low concurrency
```

### Phase 2 (1K-10K users)
```
┌──────────────┐
│ Load Balancer│
└──────┬───────┘
       ├──────────────────┬──────────────────┐
       ↓                  ↓                  ↓
  ┌────────┐         ┌────────┐        ┌────────┐
  │ API #1 │         │ API #2 │        │ API #3 │
  └────────┘         └────────┘        └────────┘
       ├──────────────────┬──────────────────┤
       └─────────┬────────┘                  │
                 ↓                           │
          ┌──────────────┐                   │
          │ PostgreSQL   │◄──────────────────┤
          │ w/ read      │                   │
          │ replicas     │                   │
          └──────────────┘                   │
                                             │
                 ┌─────────────────────────────┘
                 ↓
          ┌──────────────┐
          │ Redis Cluster│
          └──────────────┘
```

### Phase 3 (10K+ users)
```
Microservices Architecture:
- API Gateway (load balancing)
- Auth Service (separate)
- Astrology Service (CPU-intensive, scalable)
- AI Service (LLM calls, queued)
- Report Service (background workers)
- Database sharding by user_id
- Kubernetes for orchestration
```

---

## Technology Decisions & Trade-offs

| Decision | Why | Trade-offs |
|----------|-----|-----------|
| **Next.js** | SSR, SEO, full-stack | Learning curve for new developers |
| **PostgreSQL** | Relational data, reliable | Need to manage migrations |
| **Redis** | Fast caching, job queue | Another service to maintain |
| **Swiss Ephemeris** | Accurate, open-source | Older library, less community support |
| **OpenAI API** | Powerful, production-ready | Vendor lock-in, API costs |
| **Prisma ORM** | Type safety, migrations | Slower queries than raw SQL |
| **Vercel** | Serverless, easy deployment | Vendor lock-in, cold starts |

---

## Monitoring & Observability

**Logging:**
- Pino logger (structured logging)
- Log levels: debug, info, warn, error

**Metrics:**
- Response time (p50, p95, p99)
- Error rate
- Database query time
- API token usage

**Alerting:**
- Uptime monitoring
- Error spike alerts
- Rate limit violations

**Future:**
- Sentry for error tracking
- DataDog for full observability
- Custom dashboards

---

## Future Enhancements

- [ ] WebSocket for real-time chat
- [ ] GraphQL layer (alternative to REST)
- [ ] Service mesh (Istio) for inter-service communication
- [ ] Event-driven architecture (Kafka/RabbitMQ)
- [ ] Machine learning for prediction improvement
- [ ] Multi-region deployment
- [ ] CDN for static assets
- [ ] Database sharding for horizontal scaling
