# Contributing to Vedic AI Kundali

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- No harassment, discrimination, or offensive behavior
- Report violations to: support@vedic-ai.com

## Getting Started

1. Fork the repository
2. Follow [SETUP.md](./SETUP.md) to set up development environment
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make changes following our code standards
5. Submit a Pull Request

## Development Process

### 1. Before You Start

- Check [GitHub Issues](https://github.com/yourusername/vedic-ai-kundali/issues) for existing tasks
- Review [PROJECT_PLAN.md](../PROJECT_PLAN.md) for roadmap
- Discuss major changes in an issue first

### 2. Branching Strategy

```
main (production)
  ↑
develop (integration)
  ↑
feature/*, fix/*, docs/*, test/*, refactor/* (feature branches)
```

### 3. Commit Messages

Follow conventional commits:

```
feat(scope): Description
fix(scope): Description
docs: Description
test(scope): Description
refactor(scope): Description
chore: Description
perf(scope): Description
```

**Examples:**
```
feat(kundali): Add D9 chart visualization
fix(auth): Correct JWT refresh token logic
docs: Update API endpoints reference
test(guna): Add unit tests for guna calculator
refactor(chat): Extract prompt building to separate function
```

### 4. Code Quality Standards

#### TypeScript
- **Strict mode enabled:** `"strict": true`
- Use explicit types (avoid `any`)
- Document complex logic with comments

#### Frontend (React/Next.js)
- Functional components with hooks
- Meaningful component names (e.g., `KundaliForm`, not `Form`)
- Props interface: `interface ComponentProps { ... }`
- One component per file

#### Backend (Node.js/Express)
- Layered architecture (controllers → services → models)
- Error handling: Custom error classes
- Logging: Use Pino logger
- Input validation: Zod schemas

### 5. Testing Requirements

**Frontend:**
```bash
# Must pass
npm run test
npm run lint
npm run build
```

**Backend:**
```bash
# Must pass
npm run test
npm run lint
npm run build
```

**Test Coverage:**
- Services: 80%+ coverage
- Controllers: 60%+ coverage
- Overall: 70%+ coverage

### 6. Code Review Process

1. **Automated Checks:**
   - GitHub Actions tests must pass
   - ESLint & Prettier checks
   - TypeScript compilation

2. **Manual Review:**
   - At least 1 approval required
   - Code quality review
   - Architecture review for large changes

3. **Feedback:**
   - Be respectful and constructive
   - Explain reasoning for suggestions
   - Link to relevant documentation

## Project Structure

```
vedic-ai-kundali/
├── frontend/           # Next.js frontend
├── backend/            # Node.js backend
├── docs/               # Documentation
├── PROJECT_PLAN.md     # Implementation plan
└── README.md           # Project overview
```

## Key Areas to Contribute

### Frontend
- [ ] Auth pages (login, signup, password reset)
- [ ] Kundali form & visualization
- [ ] Milan matching interface
- [ ] AI chat UI
- [ ] User dashboard
- [ ] Responsive design
- [ ] Accessibility improvements

### Backend
- [ ] Authentication APIs
- [ ] Kundali calculation service
- [ ] Guna Milan calculator
- [ ] AI integration (OpenAI)
- [ ] Report generation
- [ ] Stripe integration
- [ ] Email notifications

### Documentation
- [ ] API reference
- [ ] Astrology logic explanation
- [ ] Deployment guides
- [ ] Troubleshooting docs
- [ ] Video tutorials

## Documentation Standards

### Code Comments
```typescript
// Good - Explains WHY, not WHAT
// Cache for 24 hours to avoid expensive recalculation
const cacheKey = `kundali:${userId}`;

// Avoid - Obvious from code
// Get user ID
const userId = req.user.id;
```

### JSDoc/TSDoc
```typescript
/**
 * Calculate Guna Milan score between two kundalis
 * @param person1 - First person's kundali
 * @param person2 - Second person's kundali
 * @returns Object containing 36-guna breakdown and total score
 * @throws {ValidationError} If kundalis are invalid
 */
function calculateGunaPoints(person1: Kundali, person2: Kundali): GunaResult { }
```

### File Headers
```typescript
/**
 * Authentication Service
 * Handles user login, signup, token generation, and JWT verification
 * 
 * @module services/authService
 */
```

## Testing Guidelines

### Frontend Tests
```typescript
import { render, screen } from '@testing-library/react';
import KundaliForm from '@/components/KundaliForm';

describe('KundaliForm', () => {
  it('should submit valid birth details', async () => {
    render(<KundaliForm />);
    // Test implementation
  });
});
```

### Backend Tests
```typescript
describe('Guna Calculator', () => {
  it('should calculate 36 guna score correctly', () => {
    const person1 = mockKundali1;
    const person2 = mockKundali2;
    const result = calculateGunaPoints(person1, person2);
    expect(result.totalScore).toBe(28);
  });
});
```

## Performance Considerations

### Frontend
- Lazy load components: `const Component = dynamic(() => import('...'))`
- Memoize expensive components: `React.memo(Component)`
- Use `useCallback` for event handlers
- Optimize images (Next.js Image component)

### Backend
- Cache database queries in Redis
- Use Bull for heavy operations
- Pagination for list endpoints
- Database indexes for frequently queried fields

## Security Guidelines

- **Never commit secrets:** Use `.env` files
- **Validate all inputs:** Use Zod schemas
- **Hash passwords:** Use bcrypt (salt rounds: 10)
- **Secure tokens:** Use HTTPS only, HttpOnly cookies
- **Rate limiting:** Implement for APIs
- **CORS:** Whitelist specific origins
- **SQL Injection:** Use Prisma ORM (parameterized queries)

## Release Process

1. **Version Bump:**
   - Follow Semantic Versioning (MAJOR.MINOR.PATCH)
   - Update `package.json` version

2. **Changelog:**
   - Document changes in `CHANGELOG.md`

3. **Tag:**
   - Create GitHub release: `v1.0.0`

4. **Deploy:**
   - Frontend: Vercel auto-deploy
   - Backend: Railway/Render manual trigger

## Common Tasks

### Adding a New API Endpoint

1. **Create controller** (`backend/src/controllers/newController.ts`)
2. **Create service** (`backend/src/services/newService.ts`)
3. **Create route** (`backend/src/routes/newRoute.ts`)
4. **Register in main app** (`backend/src/index.ts`)
5. **Add validation** (`Zod schema`)
6. **Write tests** (`backend/tests/integration/new.test.ts`)
7. **Document** (`docs/API.md`)

### Adding a New Frontend Page

1. **Create page component** (`frontend/app/feature/page.tsx`)
2. **Create child components** (`frontend/components/Feature*.tsx`)
3. **Add types** (`frontend/types/feature.ts`)
4. **Add state if needed** (`frontend/lib/zustand/featureStore.ts`)
5. **Write tests** (`frontend/components/__tests__/Feature.test.tsx`)
6. **Update navigation** if needed

### Adding a Database Migration

1. **Modify `prisma/schema.prisma`**
2. **Create migration:**
   ```bash
   npx prisma migrate dev --name feature_name
   ```
3. **Review generated SQL** in `prisma/migrations/`
4. **Test locally**
5. **Commit migration files** to Git

## FAQ

**Q: How long do PRs take to review?**
A: Usually 24-48 hours, depending on complexity.

**Q: Can I work on multiple features?**
A: Yes, but use separate branches for each.

**Q: What if my PR gets rejected?**
A: It's not personal! We provide constructive feedback to improve code quality.

**Q: How do I report a security issue?**
A: Please email security@vedic-ai.com instead of opening an issue.

**Q: Can I contribute to documentation?**
A: Absolutely! Documentation improvements are always welcome.

## Resources

- [SETUP.md](./SETUP.md) — Development environment setup
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System architecture
- [API.md](./API.md) — API documentation
- [PROJECT_PLAN.md](../PROJECT_PLAN.md) — Implementation roadmap

## Questions?

- 📧 Email: support@vedic-ai.com
- 💬 GitHub Discussions: Ask questions
- 🐛 GitHub Issues: Report bugs

---

**Thank you for contributing to Vedic AI Kundali!** 🙏
