# Budget Planner Integration Plan

**Date:** 2026-04-05
**Status:** Draft
**Owner:** Product Lead + Engineer

---

## 1. Codebase Analysis

### Main App (moneydo.vip / razbakov/moneydo-2)

**Stack:** Nuxt 2 (nuxt-edge 2.13), Vue 2 + @vue/composition-api, Firebase 7, Tailwind CSS 1.x
**Lines of code:** ~7,745 across Vue + JS files
**Firebase project:** `moneydoapp`

**User journey:**
1. Landing page (`pages/index.vue` + `pages/_slug.vue`) -- content-driven via `@nuxt/content`
2. Sign up (`pages/signup.vue`) -- Google sign-in or email magic link
3. Account confirmation (`pages/app/account.vue`) -- name entry
4. Dashboard (`pages/app/index.vue`) -- shows `BudgetTour` if no budget exists, else `BudgetView`
5. Budget creation (`pages/app/budgets/_id.vue`) -- month selector, income, savings slider (20% default), fixed expenses, envelope allocation (needs/wants/culture/extra)
6. Dashboard view (`components/Budget/View.vue`) -- envelope balances (today/left/planned modes), category list with totals, drag-to-move between envelopes
7. Expense tracking (`pages/app/_id.vue`) -- per-category expense list, add/edit with date picker
8. Budget list (`pages/app/budgets/index.vue`) -- switch between budgets

**Data model (Firestore collections):**
- `accounts` -- user account (keyed by uid): name, email, budgetId, marketing, daysUsed, tutorialFlags
- `profiles` -- user profile (keyed by uid): minimal, created on first login
- `budgets` -- budget documents: name, month, start, end, income, expenses, savings, planned {needs, wants, culture, extra}
- `categories` -- spending categories: label, envelope, icon (filtered by createdBy)
- `expenses` -- individual transactions: amount, description, date, category, budget (filtered by createdBy)

**Key composables:**
- `use/auth.js` -- authentication, account CRUD, marketing tracking
- `use/collection.js` -- real-time Firestore collection with user scoping (createdBy filter)
- `use/doc.js` -- single Firestore document CRUD
- `use/envelopes.js` -- static envelope definitions (needs, wants, culture, extra)

### Budget Planner (budget.moneydo.vip / razbakov/moneydo-budget)

**Stack:** Nuxt 2, Vue 2, Firebase 7 (analytics only), Tailwind CSS 1.x
**Lines of code:** ~921 across Vue + JS files
**Firebase project:** `moneydo-budget-planner` (separate project -- analytics only, no auth/firestore)

**UX flow (9-step wizard, all in one 812-line `pages/index.vue`):**
1. Welcome + Kakeibo/50-30-20 education (FAQ dropdowns)
2. Wizard opt-in (yes/no to questionnaire)
3. Motivation checklist (why do you need a finance strategy?)
4. Questionnaire -- situation, income sources, expense types (yes/no radios)
5. Income entry -- dynamic list with auto-add rows (salary, freelance, benefits, etc.)
6. Regular expense entry -- dynamic list with amounts
7. Needs classification -- checkbox each expense as "need" vs "want"
8. Savings target -- slider for percentage, goal tracking (3x salary)
9. Budget allocation -- needs/wants slider, daily needs, culture, unexpected, daily wants
10. Summary/Results -- savings step, envelope amounts with daily limits, "Save as PDF", CTA to moneydo.vip

**What it offers that the main app does not:**
- Educational onboarding (Kakeibo + 50/30/20 explanation)
- Motivation discovery (why do you want to budget?)
- Guided questionnaire about financial situation
- Itemized income entry (multiple sources with names)
- Itemized expense entry with needs/wants classification per line item
- Savings goal tracking (3x salary goal with months-to-reach)
- Visual 50/30/20 enforcement with warnings
- Daily spending limit calculation (amount / 30 per envelope)
- Print/PDF export of the plan
- Privacy-first: no login required, no data stored server-side

**Components:**
- `TTip.vue` -- contextual tips (colored alert boxes)
- `TTweet.vue` -- social sharing CTA
- `lib.js` -- PWA detection utility

**Shared dependency:** `vue-slider-component` (used for savings % slider in both apps)

---

## 2. Comparison Matrix

| Aspect | Main App | Budget Planner | Gap |
|--------|----------|---------------|-----|
| Auth | Google + email magic link | None (anonymous) | Planner is anonymous-first |
| Data storage | Firestore (user-scoped) | Local only (component state) | No persistence in planner |
| Budget creation | Simple form: income, savings, expenses (single numbers) | 9-step wizard with itemized entries | Planner is far richer |
| Education | None | Kakeibo + 50/30/20 FAQ | Main app has zero onboarding education |
| Motivation | None | Checkbox questionnaire | -- |
| Income detail | Single "income after tax" number | Multiple named income sources | Main app loses detail |
| Expense detail | Single "fixed expenses" number | Multiple named expenses, needs/wants per item | Main app loses detail |
| Savings | Slider (% of income) | Slider + goal tracking + warnings | Main app has no goal tracking |
| Envelope calc | Manual entry of 4 envelopes | Auto-calculated from 50/30/20 + slider | Main app requires manual math |
| Daily limits | Calculated in View (per-day = planned / totalDays) | Shown in summary (amount / 30) | Similar concept, different calc |
| Expense tracking | Full CRUD with categories | None | Planner has no tracking |
| PDF export | None | window.print() | -- |
| Analytics | Firebase Analytics | Firebase Analytics (separate project) | Different Firebase projects |
| i18n | 4 languages (en, de, ru, es) | English only | -- |
| PWA | Yes | Yes (minimal) | -- |
| Tutorials | vue-tour guided tours | Inline tips (TTip component) | Different approaches |

---

## 3. Integration Design

### Where in the user journey

The budget planner should replace the current budget creation flow. Currently:
- New user signs in -> sees `BudgetTour` ("Create Budget" button) -> goes to `pages/app/budgets/_id.vue` (simple form)

Proposed flow:
- New user signs in -> sees enhanced `BudgetTour` with educational intro -> enters **guided wizard** (adapted from budget planner) -> wizard outputs a budget document -> lands on dashboard

For returning users:
- "Add Budget" from budget list -> same wizard (with option to skip to quick form)
- Existing budget edit -> keep current simple form (or show wizard in "edit" mode with pre-filled values)

### What components to extract and move

From the budget planner's monolithic `pages/index.vue`, extract into:

| New Component | Source (planner steps) | Location in main app |
|--------------|----------------------|---------------------|
| `components/Budget/Wizard.vue` | Orchestrator (step state, navigation) | New file |
| `components/Budget/WizardIntro.vue` | Steps 1-2 (Kakeibo/50-30-20 education + wizard opt-in) | New file |
| `components/Budget/WizardMotivation.vue` | Step 3 (motivation checkboxes) | New file |
| `components/Budget/WizardQuestionnaire.vue` | Step 4 (situation/income/expense questions) | New file |
| `components/Budget/WizardIncome.vue` | Step 5 (itemized income entry) | New file |
| `components/Budget/WizardExpenses.vue` | Step 6-7 (itemized expenses + needs classification) | New file |
| `components/Budget/WizardSavings.vue` | Step 8 (savings target + goal tracking) | New file |
| `components/Budget/WizardBudget.vue` | Step 9 (envelope allocation with sliders) | New file |
| `components/Budget/WizardSummary.vue` | Step 10 (final summary + PDF export) | New file |
| `components/TTip.vue` | TTip component | New file (reusable) |

### Data model alignment

**Current budget document schema:**
```json
{
  "name": "January",
  "month": 1,
  "start": "2026-01-01",
  "end": "2026-01-31",
  "income": 3000,
  "expenses": 1500,
  "savings": 600,
  "planned": {
    "needs": 500,
    "wants": 320,
    "culture": 40,
    "extra": 40
  },
  "createdBy": "uid",
  "createdAt": 1234567890,
  "updatedAt": 1234567890,
  "updatedBy": "uid"
}
```

**Proposed extended schema (backward compatible):**
```json
{
  "name": "January",
  "month": 1,
  "start": "2026-01-01",
  "end": "2026-01-31",
  "income": 3000,
  "expenses": 1500,
  "savings": 600,
  "planned": {
    "needs": 500,
    "wants": 320,
    "culture": 40,
    "extra": 40
  },
  "incomeItems": [
    { "name": "Salary", "amount": 2500 },
    { "name": "Freelance", "amount": 500 }
  ],
  "expenseItems": [
    { "name": "Rent", "amount": 800, "needs": true },
    { "name": "Insurance", "amount": 200, "needs": true },
    { "name": "Gym", "amount": 50, "needs": false }
  ],
  "savingsGoal": {
    "type": "3x_salary",
    "target": 7500,
    "saved": 0
  },
  "motivation": ["Have savings", "Travel the world"],
  "createdBy": "uid",
  "createdAt": 1234567890,
  "updatedAt": 1234567890,
  "updatedBy": "uid"
}
```

The new fields (`incomeItems`, `expenseItems`, `savingsGoal`, `motivation`) are additive. Existing budgets with only `income`/`expenses`/`savings` as single numbers continue to work. The `BudgetView` dashboard only reads `planned`, so it is unaffected.

### Migration strategy: Merge as pages/components (recommended)

**Option A: Merge into main app (RECOMMENDED)**
- Extract the monolithic wizard into ~8 components
- Wire them into the existing Firestore data layer via `use/doc.js`
- Replace `BudgetTour` ("Create Budget" CTA) with the wizard entry point
- Keep existing `pages/app/budgets/_id.vue` as "Quick Edit" for returning users
- Adapt styling from budget planner's raw Tailwind to main app's component library (TButton, TField, TIcon, etc.)

**Option B: Iframe embed (NOT recommended)**
- Would keep separate codebases and separate Firebase projects
- Cross-origin auth issues (user would need to log in twice)
- No data sharing between budget planner and main app's Firestore
- Poor UX: visible frame boundaries, no theme consistency

**Option C: Rewrite both in Nuxt 3 (PREMATURE)**
- Both apps are small (<8,700 lines combined)
- The main app works; the value is in the wizard UX, not the framework
- Nuxt 3 rewrite should happen independently of this integration
- Risk of scope creep delaying the actual user-facing improvement

---

## 4. Phased Approach

### Phase 1: MVP Integration (1-2 sprints)

**Goal:** Replace the bare "Create Budget" button with a guided wizard that educates and helps the user create their first budget.

**Scope:**
1. Create `components/Budget/Wizard.vue` -- step orchestrator with back/next navigation
2. Create `components/Budget/WizardIntro.vue` -- Kakeibo education (from planner step 1)
3. Create `components/Budget/WizardIncome.vue` -- single income field (same as current) with optional itemized entry
4. Create `components/Budget/WizardExpenses.vue` -- single expenses field with optional itemized entry + needs/wants checkboxes
5. Create `components/Budget/WizardSavings.vue` -- savings slider with 20% recommendation (from planner step 8)
6. Create `components/Budget/WizardBudget.vue` -- auto-calculated envelope allocation with 50/30/20 sliders
7. Create `components/Budget/WizardSummary.vue` -- review + save
8. Wire wizard to `use/doc.js` to create a budget document on save
9. Update `BudgetTour.vue` to launch wizard instead of linking to `/app/budgets/-`
10. Port `TTip.vue` for contextual guidance

**What is NOT in MVP:**
- Motivation questionnaire (steps 2-4)
- Savings goal tracking
- PDF export
- i18n for new wizard text
- Extended schema fields (incomeItems, expenseItems -- just use single numbers like current)

**Deliverable:** New users go through a guided wizard that teaches Kakeibo basics and helps them set up their first budget with sensible 50/30/20 defaults.

### Phase 2: Full Wizard (1-2 sprints)

**Goal:** Port the complete budget planner experience.

**Scope:**
1. Add motivation and questionnaire steps (planner steps 2-4)
2. Implement itemized income entry with dynamic rows
3. Implement itemized expense entry with needs/wants classification
4. Add savings goal tracking (3x salary)
5. Extend Firestore schema with new fields
6. Add PDF/print export to summary
7. i18n: translate all new wizard strings to de, ru, es

### Phase 3: Enhanced Dashboard (1 sprint)

**Goal:** Surface wizard insights on the daily dashboard.

**Scope:**
1. Show daily spending limits per envelope on dashboard (amount / days)
2. Show savings goal progress bar
3. Show warnings when spending exceeds 50/30/20 thresholds
4. "Re-plan" button that opens wizard in edit mode with pre-filled values

### Phase 4: Sunset budget.moneydo.vip (post-integration)

**Goal:** Redirect the standalone budget planner to the main app.

**Scope:**
1. Set up 301 redirect from budget.moneydo.vip to moneydo.vip/app (or a dedicated landing page)
2. Update any external links (blog posts, social media)
3. Archive the moneydo-budget repository
4. Remove the separate Firebase project (moneydo-budget-planner)

---

## 5. Risks and Blockers

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Different Firebase projects** -- budget planner uses `moneydo-budget-planner`, main app uses `moneydoapp`. Analytics data will not merge. | Low | Budget planner only uses Firebase for analytics (no auth/data). Just switch to main app's Firebase config. No data migration needed. |
| **Monolithic component** -- budget planner is 812 lines in a single file with tightly coupled state | Medium | The extraction into ~8 components is the core work of Phase 1. State can be passed via props/emit or a shared reactive object. |
| **No tests** -- neither app has meaningful test coverage for the budget flows | Medium | Write BDD scenarios for the wizard flow before implementing. Use existing jest setup. |
| **vue-slider-component version** -- main app has 3.1.2, budget planner has 3.1.1 | Low | Already compatible. Use main app's version (3.1.2). |
| **date-fns vs date-and-time** -- main app uses `date-fns`, budget planner uses `date-and-time` | Low | Port budget planner's date logic to use `date-fns` (already in main app). The budget planner barely uses dates anyway. |
| **Analytics events** -- budget planner has detailed step-tracking analytics that would be lost | Low | Re-implement with main app's Firebase Analytics. Map planner events to new event names. |
| **Anonymous-first UX loss** -- budget planner works without login; main app requires auth | Medium | Consider allowing the wizard to run without auth (store in localStorage), then prompt sign-in to save. This preserves the try-before-you-buy experience. |
| **Nuxt 2 EOL** -- Nuxt 2 is end-of-life | High (long-term) | This integration should happen NOW on Nuxt 2 since both apps are already on it. A Nuxt 3 rewrite is a separate initiative. Doing both at once would double scope and delay value delivery. |
| **Scope creep** -- temptation to redesign the entire budgeting experience during integration | Medium | Stick to the phased plan. Phase 1 is a direct port with minimal changes. Design improvements come in later phases. |

---

## 6. Nuxt 2 vs Nuxt 3 Decision

**Recommendation: Integrate on Nuxt 2 now. Plan Nuxt 3 rewrite separately.**

Reasoning:
- Both apps are already Nuxt 2 + Vue 2 + same dependency versions
- The integration is primarily a UX improvement (wizard), not a framework migration
- Combined codebase is under 9,000 lines -- small enough that a future Nuxt 3 rewrite is low-risk
- Nuxt 3 rewrite would require: Vue 3 composition API changes, replacing @vue/composition-api with native, Firebase SDK upgrade (v7 -> v9+ modular), Tailwind CSS upgrade, nuxt-i18n migration, @nuxt/content v2 migration
- Doing both simultaneously would 3x the effort and block the user-facing improvement for months

The Nuxt 3 rewrite should be planned as a separate initiative after the integration is validated with users.

---

## 7. File Reference

### Main App (~/Projects/moneydo.vip)

| File | Role |
|------|------|
| `pages/app/index.vue` | Dashboard entry -- routes to Tour or View |
| `pages/app/budgets/_id.vue` | Budget creation/edit form (to be augmented) |
| `pages/app/budgets/index.vue` | Budget list/switcher |
| `pages/app/_id.vue` | Expense tracking per category |
| `pages/signup.vue` | Authentication |
| `pages/app/account.vue` | Account confirmation |
| `components/Budget/Tour.vue` | First-time CTA (to be replaced with wizard) |
| `components/Budget/View.vue` | Main dashboard with envelopes + categories |
| `use/auth.js` | Auth + account management |
| `use/collection.js` | Real-time Firestore collections |
| `use/doc.js` | Firestore document CRUD |
| `use/envelopes.js` | Envelope definitions (needs/wants/culture/extra) |

### Budget Planner (/tmp/moneydo-budget or razbakov/moneydo-budget)

| File | Role |
|------|------|
| `pages/index.vue` | Entire 9-step wizard (812 lines, monolithic) |
| `components/TTip.vue` | Contextual tip alerts |
| `components/TTweet.vue` | Social sharing CTA (not needed in integration) |
| `lib.js` | PWA detection (already handled by main app's platform-detect) |

---

## 8. Next Action

Create a GitHub issue for Phase 1 with acceptance criteria. Assign to Engineer agent. Product Lead to write BDD scenarios for the wizard flow before implementation begins.
