# MoneyDo

A Kakeibo-based personal budget planner and expense tracker. Radically simple — plan your budget, see your daily allowance, track what you spend, reflect on what brings value.

- **URL:** https://moneydo.netlify.app/
- **Stack:** Nuxt 2, Vue Composition API, Firebase, Tailwind CSS
- **Hosting:** Netlify
- **Subscription:** 3€/month, 30-day free trial

## Structure

- Logbook: `docs/governance/`
- Primary driver: `docs/governance/primary-driver.md`
- Organization canvas: `docs/governance/organization-canvas.md`
- Strategy: `docs/governance/strategy.md`
- Values: `docs/governance/values.md`
- Policies: `docs/governance/policies/`
- Requirements: `docs/governance/requirements/`
- Domain map: `docs/governance/structure/domain-map.md`
- Domains: `docs/domains/<domain-name>/`
- Domain description: `docs/domains/<domain-name>/description.md`
- Domain governance backlog: `docs/domains/<domain-name>/governance/backlog/`
- Domain operations backlog: `docs/domains/<domain-name>/operations/backlog/`
- Domain metrics: `docs/domains/<domain-name>/metrics/`
- Roles: `docs/roles/<role-name>/`
- Role description: `docs/roles/<role-name>/description.md`
- Role development plan: `docs/roles/<role-name>/development-plan.md`
- Coordination: `docs/coordination/`
- Agents: `.claude/agents/`

## Team

| Role | Keeper | Domain |
|------|--------|--------|
| Founder | Alex Razbakov | All (delegator) |
| Product Lead | AI Agent | Product |
| Engineer | AI Agent | Engineering |
| Growth Lead | AI Agent | Growth |
| Coordinator | AI Agent | Cross-domain |

## Agents

Dispatch agents using their slug:

- `product-lead` — feature specs, user stories, BDD scenarios, backlog prioritization
- `engineer` — code changes, bug fixes, testing, infrastructure
- `growth-lead` — content creation, SEO, landing pages, growth metrics
- `coordinator` — cross-domain status, blockers, priority recommendations

## File Ownership

| Agent | Owns |
|-------|------|
| Product Lead | `docs/domains/product/` |
| Engineer | `pages/`, `components/`, `store/`, `use/`, `utils.js`, `layouts/`, `middleware/`, `plugins/` |
| Growth Lead | `content/` |
| Shared | `docs/governance/` (read-only for agents, Alex modifies) |

## Development

```bash
yarn install
yarn dev        # serve at localhost:3000
yarn build      # generate static site
yarn lint       # eslint
yarn test       # jest
```
