# MoneyDo — Domain Map

## Organizational Structure

```
                    Alex Razbakov (Founder)
                    ┌──────┼──────────┐
                    │      │          │
              ┌─────┴──┐ ┌┴────────┐ ┌┴───────┐
              │Product  │ │Engineer-│ │Growth  │
              │         │ │ing     │ │        │
              └────┬────┘ └───┬────┘ └───┬────┘
                   │          │          │
              Product    Engineer    Growth
              Lead (AI)  (AI)       Lead (AI)
                   │          │          │
                   └────┬─────┘          │
                        │                │
                   Coordinator (AI) ─────┘
```

## Domains

| Domain | Purpose | Team/Roles |
|--------|---------|------------|
| Product | Define what gets built, maintain backlog, ensure Kakeibo alignment | Product Lead (AI) |
| Engineering | Implement features, maintain codebase, ensure reliability and security | Engineer (AI) |
| Growth | Attract users through content and SEO, drive organic discovery | Growth Lead (AI) |

## Roles

| Role | Keeper | Domain(s) |
|------|--------|-----------|
| Founder | Alex Razbakov | All (delegator) |
| Product Lead | AI Agent | Product |
| Engineer | AI Agent | Engineering |
| Growth Lead | AI Agent | Growth |
| Coordinator | AI Agent | Cross-domain |

## Dependencies

| From | To | What |
|------|----|------|
| Product | Engineering | User stories with BDD scenarios |
| Growth | Engineering | Technical SEO requirements |
| Product | Growth | Product positioning for content |
| Growth | Product | Search intent data, user feedback |
| Engineering | Product | Feasibility assessments |

## Coordination Mechanism

| Mechanism | Participants | Frequency |
|-----------|-------------|-----------|
| Coordinator status report | All agents (via Coordinator) | Weekly |
| Alex PR review | Alex + submitting agent | Per PR |
| Quarterly governance review | Alex + all agents | Quarterly |

---

*Review date: 2026-07-05*
