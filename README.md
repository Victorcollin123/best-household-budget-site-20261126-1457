# The Household Ledger — budget planner, spending tracker, savings goals, debt, grocery & energy calculators, household comparisons & money tips

[![make.fun · best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/Victorcollin123/best-household-budget-site-20261126-1457/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/Victorcollin123/best-household-budget-site-20261126-1457/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

The Household Ledger is an original household budget site built around one real worked household — the Okafors of Lagos (two adults, two children, ₦850,000 a month) — with every figure carried consistently through planner, tracker, goals, calculators, comparisons and tips. It runs offline in a desktop browser and on a phone from static files — no network request, no build step, no tracker.

## What is inside

- **Overview** — eight KPI cards (income, spending, money left, savings rate, emergency fund, debt, goals, money found), a 12-month income-vs-spending chart, a needs/wants/savings donut, five findings, and the full budget-vs-spent table.
- **Planner** — the 14-line monthly budget against the 50/30/20 rule (actual 68/7/25, with the gap explained), a try-it-with-your-income calculator, and the reason for every line.
- **Tracker** — 29 November transactions (₦689,150), a spending-vs-budget chart per category, filter by category, and an add-a-spend form saved in the browser.
- **Goals** — five savings goals (emergency fund, rent deposit, school fees, inverter + solar, family holiday) with progress bars and a month-by-month road to each target.
- **Calculators** — five working tools: emergency fund, debt payoff (snowball vs avalanche, month-by-month simulation), grocery basket, generator vs inverter energy cost, and a subscription audit with toggles.
- **Compare** — three households at ₦450,000, ₦850,000 and ₦1,200,000 on the same 14 lines, plus the Okafors' before/after October review (₦107,250 a month found).
- **Tips** — 24 money tips in five groups, with a monthly saving on each one that carries a figure (up to ₦122,500 a month across all of them).
- **Method** — where every figure comes from, the assumptions, and what the site does not do.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in desktop Chrome (or on a phone). Click any section in the nav; change the income in the Planner; add a spend in the Tracker; move the sliders in the Calculators.

## Figures

One consistent set of books for November 2026, Lagos, in naira: the Tracker rows add up to the Overview totals, the grocery basket multiplies out to the food budget, and the subscription audit adds up to the subscriptions line. Prices are Lagos market prices, November 2026 (petrol ₦1,050/litre). See the Method page in the site for definitions and caveats.

## Files

- `app/` — the site as static files (`index.html`, `css/main.css`, `js/app.js`, `js/charts.js`, `js/data.js`).
- `app/js/data.js` — every figure, with its source, so each number can be checked.
- `app/js/charts.js` — hand-rolled canvas charts; no library.
- `screenshots/` — overview, planner and calculators at desktop size, and the overview on a phone.
- `main.ts` — the entrypoint: copies `app/` and `screenshots/` to the output directory and writes `dossier.json`.
