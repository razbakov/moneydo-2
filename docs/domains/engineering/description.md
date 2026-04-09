# Engineering — Domain Description (Delegation Canvas)

**Date/Version:** 2026-04-05
**Delegator:** Alex Razbakov (Founder)
**Review date:** 2026-07-05

## Purpose
**Primary Driver:** The MoneyDo codebase (Nuxt 2, Vue Composition API, Firebase, Tailwind) needs reliable implementation of product features, bug fixes, and infrastructure maintenance to deliver a stable daily-use tool.
**Main Requirement:** Implement features from the product backlog with high code quality, maintain the existing codebase, and ensure the app is fast, reliable, and secure.

## Key Responsibilities
- Implement user stories from the product backlog
- Fix bugs and address technical debt
- Maintain Firebase infrastructure (auth, Firestore, hosting)
- Ensure app performance (fast load, offline capability via PWA)
- Write and maintain tests
- Security and GDPR compliance in code

## Customers and Deliverables
| Customer | Deliverable |
|----------|-------------|
| End users | Working, fast, reliable app |
| Product domain | Feasibility assessments, technical constraints |
| Growth domain | Landing page implementations, SEO technical requirements |

## Dependencies
| Provider | What they deliver |
|----------|-------------------|
| Product domain | Prioritized stories with BDD scenarios |
| Alex (Founder) | Firebase project access, deployment approval |

## External Constraints
- Nuxt 2 + Vue Composition API stack (migration to Nuxt 3 is a separate strategic decision)
- Firebase as backend (Firestore, Auth, Hosting)
- No server-side code beyond Firebase Functions
- All user data encrypted at rest (Firebase default) and in transit

## Key Challenges
- Nuxt 2 is legacy — dependencies may become harder to maintain
- Solo AI agent doing all engineering — must keep PRs small and reviewable
- PWA reliability across devices

## Key Resources
- GitHub repo: razbakov/moneydo.vip (assumed)
- Firebase project
- Netlify for hosting (moneydo.netlify.app)
- CI/CD pipeline

## Delegator Responsibilities
- Review and merge PRs
- Manage Firebase project settings and billing
- Make technology migration decisions (e.g., Nuxt 2 → 3)

## Competencies, Qualities, and Skills
- Vue.js / Nuxt expertise
- Firebase (Firestore, Auth, Functions)
- Tailwind CSS
- PWA development
- Testing (Jest)
- Security awareness (GDPR, financial data)

## Key Metrics and Monitoring

| Metric | How Measured | Frequency | Measured By |
|--------|-------------|-----------|-------------|
| PR quality | Review pass rate (merged without major rework) | Per PR | Alex |
| Test coverage | Jest coverage report | Per PR | CI pipeline |
| App uptime | Netlify/Firebase status | Weekly | Automated |
| Bug resolution time | GitHub Issues (time to close) | Monthly | Engineer |

## Evaluation Schedule
Quarterly review by Alex. Assess: PR quality, bug count trend, test coverage, any security incidents.
