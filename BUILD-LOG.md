# Build log — The Household Ledger (best-household-budget-site-20261126-1457)

## What it is

An original household budget site for the make.fun bounty "Make the best household budget site" ($50, closes 2026-11-29 15:57 WAT). "The Household Ledger" — 8 pages (Overview, Planner, Tracker, Goals, Calculators, Compare, Tips, Method) built around one consistent worked household, the Okafors of Lagos (two adults, two children, ₦850,000 a month), with every figure carried through every page: the Tracker rows add up to the Overview totals, the grocery basket multiplies out to the food budget, and the subscription audit adds up to the subscriptions line. Hand-rolled canvas charts, no libraries, no network requests at runtime. Static files served from app/.

## Verification (build session 81438c2d, 26 Nov ~16:06–16:20 WAT)

- CDP drive-by test (Node + headless Chromium over CDP, `../best-household-budget-site-20261126-1457-submit/cdp-drive.mjs`): **36/36 checks passed** — 8 KPI cards, 5 findings, 14 budget rows, income ₦850,000, spent ₦689,150; planner 3 split rows + 14 table rows + 50/30/20 calc recomputes live; tracker 29 rows → food filter 5 rows (₦96,400) → add-a-spend → 30 rows; goals 5 cards, ₦1,932,900 saved; calculators — emergency target ₦1,734,000, debt payoff months + interest, grocery monthly ₦127,194, basket 11 rows + total, energy saving, subscription audit ₦77,500 before the cut, toggle recomputes; compare 3 archetypes + 4 before/after rows + ₦107,250 found; tips 24 across 5 groups, ₦122,500 total; method 4 cards. **Zero console errors / exceptions. Zero external network requests.**
- Screenshots viewed and fixed: (1) the grocery basket added to ₦35,375 a week, not ₦29,375 — re-priced seven lines so it multiplies out to the ₦127,500 food budget (₦127,194); (2) the November spend total was ₦689,150, not ₦689,650 — corrected in the Tracker text, a tip and the README; (3) the debt-payoff text had the snowball order wrong (it attacks the family loan second, not the card) and hid that avalanche saves ₦10,820 — rewritten with the true orders and the saving; (4) the first screenshot run caught the test transaction (₦2,500) leaking into the shots — the driver now reloads from a clean browser state before shooting; (5) the planner split numbers wrapped — widened the numbers column.
- Screenshots (all under 256 KiB, long side ≤1280, short side ≥480): 1-overview.jpg 1280×1000, 2-planner.jpg 1280×1000, 3-calculators.jpg 1280×1000, 4-phone.jpg 480×900.
- Dossier: `MAKEFUN_OUTPUT_DIR=out node main.ts` run twice, byte-identical (dossier.json 854,019 bytes, schema makefun/dossier/v1, text 62,714 chars). No external references in app/.

## Entry

- Repo: https://github.com/Victorcollin123/best-household-budget-site-20261126-1457
- Kit: the flight kit CLI on disk (newest on disk) for bundle/submit; the trophy-guide site kit is the site-shape proxy for the local kit check (no budget kit exists on disk and the task forbade re-downloading one; the server re-checks against the real competition at submit time).
- Build session 81438c2d-e83d-485a-8819-1c3304703703 (started after the 15:57 WAT opening), parent session 827ba2e2-5bfd-4240-90f3-a52f9f18c142 (trimmed to the post-opening thread). Prompt: "Make the best household budget site" (exactly one line, prompt.txt).
- `makefun record` was not used: this bounty takes transcripts as a bundle, not recordings (record refused HTTP 400, same as the statistics entry). Anchor line quoted before any file write: "makefun record: the recording did not start (HTTP 400): best-household-budget-site-20261126-1457 does not take recorded transcripts: its entries upload their transcripts (a bundle or loose files) as the requirements say".
- A v2 polish-and-resubmit run is separately scheduled a few hours before the deadline (the platform counts the LAST submission).
