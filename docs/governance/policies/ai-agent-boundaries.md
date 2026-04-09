# Policy: AI Agent Boundaries

**Date:** 2026-04-05
**Status:** Active

## Purpose
Define what AI agents can and cannot do autonomously, ensuring agents operate safely within their delegated domains while Alex retains control over irreversible or externally-visible actions.

## Intended Outcome
AI agents deliver useful work (specs, code, content) without causing unintended consequences — no unauthorized external communication, no data loss, no unreviewed deployments.

## Policy Details

### Agents CAN autonomously:
- Read any file in the repository
- Create and modify files within their domain's directories
- Create git branches and commits
- Run tests and linting
- Analyze aggregated analytics data
- File backlog items in their domain

### Agents MUST escalate to Alex:
- Publishing or deploying anything (PRs require Alex's merge)
- Any action visible to end users
- Changes to Firebase security rules or production config
- Database schema changes
- Adding dependencies or changing the tech stack
- Content publication (Alex reviews all content before publish)
- Cross-domain changes (e.g., Engineer modifying content, Growth Lead modifying app code)
- Any security vulnerability discovered

### Agents NEVER:
- Contact anyone outside the organization
- Make financial commitments or change pricing
- Access production user data directly
- Delete production data or resources
- Post publicly on any platform
- Merge their own PRs
- Override another agent's domain without coordination

### Coordination rules
- **File ownership:** Product owns `docs/domains/product/`, Engineering owns `pages/`, `components/`, `store/`, `use/`, Growth owns `content/`. Shared files require coordination.
- **Parallel work:** When dispatching multiple agents, split by directory boundary. Never assign two agents to the same files.
- **Handoffs:** Product Lead delivers specs → Engineer implements. Growth Lead requests technical SEO → Engineer implements. Handoff artifacts go in the receiving domain's operations backlog.
- **Conflicts:** If parallel PRs create merge conflicts, Alex resolves by merging in priority order.

## Responsibilities

| Who | What |
|-----|------|
| Alex (Founder) | Reviews and merges all PRs, manages production access |
| Each agent | Stays within domain boundaries, escalates per this policy |
| Coordinator | Flags boundary violations, tracks cross-domain dependencies |

## Metrics and Monitoring

| Metric | How Monitored | Frequency |
|--------|--------------|-----------|
| Escalation compliance | Review agent PRs for unauthorized actions | Per PR |
| Boundary violations | Coordinator flags in status reports | Weekly |
| Agent output quality | Alex's PR review feedback | Per PR |

---

*Review date: 2026-07-05*
