---
features:
  - title: Simple plan
    image: /screens/budget.gif
  - title: Adjust anytime
    image: /screens/adjust.gif
  - title: Daily budget
    image: /screens/daily.png
  - title: Track expenses
    image: /screens/expense.gif
benefits:
  - title: Short-term
    description: Can I accept invitation of friends to join restaurant? How much can I spend today? Daily decisions made simple.
  - title: Mid-term
    description: Monthly goals like buying new pair of shoes, gadget, etc. followed up with course of action.
  - title: Long-term
    description: Set up a strategy for paying off a dept, achieve saving goals, plan expensive purchases and vacations with assistance.
---

<w-hero
  class="p-4 mx-auto max-w-2xl"
  title="Your budget in a mindful and simple way"
  subtitle="Plan personal budget and track daily expenses with kakeibo"
  button="Try for free"
  to="/signup"></w-hero>

<w-slides :slides="features" class="p-4 mx-auto max-w-2xl"></w-slides>

<div class="mt-16 text-center px-4 mx-auto max-w-2xl typo">

## Achieve more with a good strategy

<w-list :items="benefits" cols="3"></w-list>

</div>

<w-hero
  class="p-4 mx-auto max-w-2xl"
  title="Ready to start?"
  button="Try for free"
  to="/signup"></w-hero>
