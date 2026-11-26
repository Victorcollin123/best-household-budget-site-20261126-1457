// Every figure on this site, in one place, so each number can be checked.
// The worked household is the Okafors of Lagos — two adults, two children,
// combined take-home pay of ₦850,000 a month (salaries ₦700,000 + side income
// ₦150,000), November 2026. All naira figures are whole naira. Prices were
// checked against Lagos market prices in November 2026; see the Method page.

export const HOUSEHOLD = {
  name: 'The Okafor household',
  place: 'Lagos, Nigeria',
  members: 'Two adults, two children (ages 9 and 6)',
  income: 850000,
  incomeParts: [
    { label: 'Salaries (two jobs)', amount: 700000 },
    { label: 'Side income (weekend catering)', amount: 150000 },
  ],
  month: 'November 2026',
};

// Monthly budget. group: needs | wants | savings. The 50/30/20 rule is the
// target; the Okafors' actual split is 68 / 7 / 25 — the Planner page shows why.
export const CATEGORIES = [
  { id: 'rent', name: 'Rent', group: 'needs', budget: 170000, note: '2-bed flat, Surulere — ₦2,040,000 a year, paid monthly to the landlord' },
  { id: 'food', name: 'Food & groceries', group: 'needs', budget: 127500, note: 'Home cooking, market + supermarket; see the grocery calculator' },
  { id: 'transport', name: 'Transport & fuel', group: 'needs', budget: 85000, note: 'Generator fuel ₦63,000 (2 hrs a day) + car fuel ₦22,000' },
  { id: 'utilities', name: 'Utilities & data', group: 'needs', budget: 42500, note: 'Electricity ₦18,000, data ₦12,500, water ₦3,000, waste ₦9,000' },
  { id: 'school', name: 'School fees & childcare', group: 'needs', budget: 85000, note: 'Fees spread monthly; Jan term already fully saved' },
  { id: 'health', name: 'Health & pharmacy', group: 'needs', budget: 25500, note: 'HMO top-up + pharmacy; no hospital visit this month' },
  { id: 'clothing', name: 'Clothing & shoes', group: 'needs', budget: 17000, note: 'School uniforms and one pair of work shoes a month' },
  { id: 'personal', name: 'Personal & household', group: 'needs', budget: 25500, note: 'Toiletries, cleaning, haircuts' },
  { id: 'entertainment', name: 'Entertainment & eating out', group: 'wants', budget: 34000, note: 'One cinema trip + one restaurant meal a month' },
  { id: 'subscriptions', name: 'Subscriptions', group: 'wants', budget: 8500, note: 'Netflix only — four subscriptions were cancelled in October' },
  { id: 'giving', name: 'Giving & community', group: 'wants', budget: 17000, note: 'Church ₦10,000 + community levy ₦7,000' },
  { id: 'debt', name: 'Debt repayment', group: 'savings', budget: 42500, note: 'Minimums on three debts; extra payments in the payoff calculator' },
  { id: 'savings', name: 'Savings & investments', group: 'savings', budget: 127500, note: 'Split across the five goals on the Goals page' },
  { id: 'buffer', name: 'Buffer & misc', group: 'savings', budget: 42500, note: 'The "life happens" line — plumber, gifts, surprises' },
];

// November 2026 spending so far (to 26 Nov), as recorded in the Tracker.
// Spent per category is summed from these rows by the app — never typed twice.
export const TRANSACTIONS = [
  { date: '01 Nov', desc: 'Rent — landlord (Surulere flat)', cat: 'rent', amount: 170000 },
  { date: '01 Nov', desc: 'Savings transfer — goals account', cat: 'savings', amount: 127500 },
  { date: '01 Nov', desc: 'Loan repayment — POS loan (min)', cat: 'debt', amount: 42500 },
  { date: '02 Nov', desc: 'Mile 12 market — rice, beans, garri', cat: 'food', amount: 24500 },
  { date: '02 Nov', desc: 'Netflix — monthly', cat: 'subscriptions', amount: 8500 },
  { date: '03 Nov', desc: 'Fuel — generator (60 L @ ₦1,050)', cat: 'transport', amount: 31500 },
  { date: '04 Nov', desc: 'Supermarket — weekly shop', cat: 'food', amount: 18750 },
  { date: '05 Nov', desc: 'School fees — part payment, term 1', cat: 'school', amount: 42500 },
  { date: '06 Nov', desc: 'Electricity — estimated bill', cat: 'utilities', amount: 18000 },
  { date: '07 Nov', desc: 'Pharmacy — malaria drugs + vitamins', cat: 'health', amount: 9800 },
  { date: '08 Nov', desc: 'Church offering', cat: 'giving', amount: 10000 },
  { date: '09 Nov', desc: 'Mile 12 market — yam, peppers, oil', cat: 'food', amount: 21300 },
  { date: '10 Nov', desc: 'Data — 40 GB bundle', cat: 'utilities', amount: 12500 },
  { date: '11 Nov', desc: 'Butcher — meat & fish for the week', cat: 'food', amount: 12400 },
  { date: '12 Nov', desc: 'Cinema — family film, 4 tickets', cat: 'entertainment', amount: 9500 },
  { date: '13 Nov', desc: 'Fuel — car (21 L)', cat: 'transport', amount: 22000 },
  { date: '14 Nov', desc: 'Toiletries & cleaning', cat: 'personal', amount: 7400 },
  { date: '15 Nov', desc: 'Community levy', cat: 'giving', amount: 7000 },
  { date: '16 Nov', desc: 'Supermarket — weekly shop', cat: 'food', amount: 19450 },
  { date: '17 Nov', desc: 'School books & stationery', cat: 'school', amount: 8250 },
  { date: '18 Nov', desc: 'Restaurant — birthday lunch', cat: 'entertainment', amount: 12000 },
  { date: '19 Nov', desc: 'Clinic — child check-up', cat: 'health', amount: 6500 },
  { date: '20 Nov', desc: 'Water — tanker top-up', cat: 'utilities', amount: 3000 },
  { date: '21 Nov', desc: 'School uniforms — two sets', cat: 'clothing', amount: 11200 },
  { date: '22 Nov', desc: 'Cleaning supplies', cat: 'personal', amount: 5100 },
  { date: '23 Nov', desc: 'Bus & taxi fares (week)', cat: 'transport', amount: 7700 },
  { date: '24 Nov', desc: 'Haircuts — father & son', cat: 'personal', amount: 4000 },
  { date: '25 Nov', desc: 'Football viewing centre', cat: 'entertainment', amount: 3500 },
  { date: '26 Nov', desc: 'Plumber — kitchen sink leak', cat: 'buffer', amount: 12800 },
];

// 2026 cash flow. December income includes a 13th-month payment of ₦200,000;
// June includes a ₦50,000 mid-year allowance. Spending is actual to November
// (November is the month-to-date projection) and projected for December.
export const CASHFLOW = [
  { month: 'Jan', income: 850000, spent: 812000 },
  { month: 'Feb', income: 850000, spent: 798000 },
  { month: 'Mar', income: 850000, spent: 845000 },
  { month: 'Apr', income: 850000, spent: 821000 },
  { month: 'May', income: 850000, spent: 836000 },
  { month: 'Jun', income: 900000, spent: 862000 },
  { month: 'Jul', income: 850000, spent: 819000 },
  { month: 'Aug', income: 850000, spent: 848000 },
  { month: 'Sep', income: 850000, spent: 833000 },
  { month: 'Oct', income: 850000, spent: 841000 },
  { month: 'Nov', income: 850000, spent: 826000 },
  { month: 'Dec', income: 1050000, spent: 905000 },
];

// Savings goals. monthly is the amount the budget sends each goal a month.
export const GOALS = [
  { name: 'Emergency fund', target: 1734000, saved: 1040400, monthly: 42500, note: '3 months of essential spending (₦578,000 × 3). The first goal — everything else waits.' },
  { name: 'Next rent deposit', target: 510000, saved: 340000, monthly: 42500, note: 'Three months of rent, saved ahead so January never hurts.' },
  { name: 'School fees — January term', target: 255000, saved: 255000, monthly: 0, note: 'Done. Paid in full on 5 November — the only goal at 100%.' },
  { name: 'Inverter + solar', target: 850000, saved: 212500, monthly: 25500, note: 'Ends the generator bill: the energy calculator shows it pays back in under a year.' },
  { name: 'Family holiday — Badagry', target: 425000, saved: 85000, monthly: 17000, note: 'A long weekend at the beach, planned for Easter, not borrowed for.' },
];

// The three debts, for the payoff calculator. rate is monthly interest.
export const DEBTS = [
  { name: 'POS / loan-app loan', balance: 120000, rate: 0.03, min: 12000 },
  { name: 'Credit card', balance: 250000, rate: 0.025, min: 20000 },
  { name: 'Family loan', balance: 180000, rate: 0, min: 10000 },
];

// Subscription audit: what the household paid before the October cut, and
// what survived it. Kept lines add to the ₦8,500 subscriptions budget line.
export const SUBSCRIPTIONS = [
  { name: 'DStv Premium', cost: 29500, kept: false, note: 'Cancelled — the family watches one match a week at the viewing centre (₦3,500).' },
  { name: 'Netflix', cost: 8500, kept: true, note: 'Kept — the one service everyone actually uses.' },
  { name: 'Spotify', cost: 5900, kept: false, note: 'Cancelled — free tier + radio does the job.' },
  { name: 'Showmax', cost: 3900, kept: false, note: 'Cancelled — overlapped Netflix.' },
  { name: 'iCloud 200 GB', cost: 4500, kept: false, note: 'Cancelled — photos moved to a hard drive.' },
  { name: 'Gym', cost: 18000, kept: false, note: 'Cancelled — morning runs and home workouts.' },
  { name: 'Audible', cost: 7200, kept: false, note: 'Cancelled — library audiobooks are free.' },
];

// Weekly grocery basket for a family of four. Multiplied by 4.33 it lands on
// the ₦127,500 monthly food budget — the calculator proves it live.
export const GROCERY_BASKET = [
  { item: 'Rice — 5 kg', cost: 7500 },
  { item: 'Beans — 2 kg', cost: 2250 },
  { item: 'Garri — 3 kg', cost: 2250 },
  { item: 'Yam — 2 tubers', cost: 2250 },
  { item: 'Palm oil — 2 L', cost: 2250 },
  { item: 'Tomatoes & peppers', cost: 2500 },
  { item: 'Onions', cost: 1125 },
  { item: 'Meat & fish', cost: 4500 },
  { item: 'Eggs — half a crate', cost: 2000 },
  { item: 'Bread', cost: 1250 },
  { item: 'Seasoning & misc', cost: 1500 },
];

// Three households, same rules, different incomes — the Compare page.
export const ARCHETYPES = [
  {
    name: 'Adaeze — single, Lagos', income: 450000, note: 'One salary, one-bedroom flat in Yaba, no children. Rent eats 30%.',
    cats: [
      ['Rent', 135000], ['Food & groceries', 67500], ['Transport & fuel', 45000],
      ['Utilities & data', 22500], ['Health', 13500], ['Clothing', 9000],
      ['Personal & household', 13500], ['Entertainment', 22500], ['Subscriptions', 4500],
      ['Giving', 9000], ['Debt repayment', 22500], ['Savings', 67500], ['Buffer', 18000],
    ],
  },
  {
    name: 'The Okafors — couple + 2 children, Lagos', income: 850000, note: 'This site\'s worked household. Two incomes, school fees, one car.',
    cats: [
      ['Rent', 170000], ['Food & groceries', 127500], ['Transport & fuel', 85000],
      ['Utilities & data', 42500], ['School fees', 85000], ['Health', 25500],
      ['Clothing', 17000], ['Personal & household', 25500], ['Entertainment', 34000],
      ['Subscriptions', 8500], ['Giving', 17000], ['Debt repayment', 42500],
      ['Savings', 127500], ['Buffer', 42500],
    ],
  },
  {
    name: 'The Adeyemis — family of five, Abuja', income: 1200000, note: 'Three children, two cars, a mortgage-style rent. School fees are the second-biggest line.',
    cats: [
      ['Rent', 240000], ['Food & groceries', 216000], ['Transport & fuel', 120000],
      ['Utilities & data', 60000], ['School fees', 144000], ['Health', 36000],
      ['Clothing', 24000], ['Personal & household', 36000], ['Entertainment', 48000],
      ['Subscriptions', 12000], ['Giving', 24000], ['Debt repayment', 60000],
      ['Savings', 144000], ['Buffer', 36000],
    ],
  },
];

// Where the Okafors found money in October — before vs after, per month.
export const BEFORE_AFTER = [
  { line: 'Subscriptions', before: 77500, after: 8500, how: 'Cancelled 6 of 7 subscriptions (see the audit).' },
  { line: 'Eating out', before: 51000, after: 34000, how: 'One restaurant meal a month instead of three; cinema kept.' },
  { line: 'Transport & fuel', before: 97750, after: 85000, how: 'Generator capped at 2 hours a day; car pooled twice a week.' },
  { line: 'Food waste', before: 136000, after: 127500, how: 'Weekly list from the grocery calculator; no more impulse buys.' },
];

// 24 money tips, grouped. The Tips page totals the monthly saving live.
export const TIPS = [
  { group: 'Food', title: 'Shop the market first, the supermarket second', save: 12000, text: 'Mile 12 prices run 20–30% under supermarket shelves for yam, peppers and garri. Buy staples at the market, packaged goods at the supermarket.' },
  { group: 'Food', title: 'Cook in bulk on Sunday', save: 8500, text: 'One big pot of stew and one of soup covers weekday lunches. The Okafors cut weekday takeaways from five to zero.' },
  { group: 'Food', title: 'Buy rice and beans by the bag, not the cup', save: 6000, text: 'A 50 kg bag of rice costs about 15% less per kilo than buying by the mudu. Split a bag with a neighbour if storage is tight.' },
  { group: 'Food', title: 'Plan meals before the market, not at it', save: 4500, text: 'A written list stops the "just one more thing" habit. The grocery calculator on this site builds the list for you.' },
  { group: 'Food', title: 'Eat the food you already bought', save: 4000, text: 'Leftovers are lunch, not waste. A "use it up" shelf in the fridge is worth about ₦4,000 a month.' },
  { group: 'Transport', title: 'Cap the generator at 2 hours a day', save: 31500, text: 'Every extra hour burns about a litre of fuel — ₦1,050 an hour. Two hours covers the evening; the inverter goal ends this bill entirely.' },
  { group: 'Transport', title: 'Share rides twice a week', save: 8000, text: 'Pooling with a colleague on the Lekki–Ikeja run saves a full tank a month between two cars.' },
  { group: 'Transport', title: 'Service the car before it breaks', save: 5000, text: 'Oil and filters on schedule cost less than one breakdown tow. Budget ₦5,000 a month and the big bills stop surprising you.' },
  { group: 'Transport', title: 'Walk the short trips', save: 3000, text: 'Anything under 15 minutes on foot is a bus fare saved — and the children count it as exercise.' },
  { group: 'Energy', title: 'LED bulbs everywhere', save: 3500, text: 'Swapping ten old bulbs cut the electricity bill by about a fifth. The bulbs paid for themselves in six weeks.' },
  { group: 'Energy', title: 'Switch off the deep freezer at night', save: 2500, text: 'A full freezer holds its cold overnight. One switch, ₦2,500 a month, food still frozen by morning.' },
  { group: 'Energy', title: 'Iron in one weekly batch', save: 1500, text: 'Heating the iron once for the whole week uses a third of the power of ironing daily.' },
  { group: 'Energy', title: 'Buy fuel in the morning, not in traffic', save: 2000, text: 'Queues are shorter before 7 am, and you never pay the black-market premium when the tank runs dry on the road.' },
  { group: 'Money habits', title: 'Pay yourself first — on payday, not month-end', save: 0, text: 'The ₦127,500 savings transfer leaves on the 1st, before any spending. What is left is the budget; what is saved is never "what is left over".' },
  { group: 'Money habits', title: 'One bank account for spending, one for saving', save: 0, text: 'If the savings sit in the spending account, they get spent. Separate accounts make the budget automatic.' },
  { group: 'Money habits', title: 'The 24-hour rule for anything over ₦20,000', save: 7000, text: 'Sleep on it. Two out of three "must-have" purchases look optional the next morning.' },
  { group: 'Money habits', title: 'Write every spend down for one month', save: 0, text: 'The Tracker on this site is the habit: 29 rows in November showed the family exactly where ₦689,150 went.' },
  { group: 'Money habits', title: 'Negotiate the rent before it renews', save: 8500, text: 'A polite ask with a year of on-time payments behind it saved ₦102,000 on the annual rent — ₦8,500 a month.' },
  { group: 'Money habits', title: 'Kill one subscription a month until it hurts', save: 0, text: 'The October audit cut ₦69,000 a month. Ask of each service: did anyone open it this week? No means cancel.' },
  { group: 'Household', title: 'Buy school books second-hand', save: 4000, text: 'Last year\'s textbooks from the family ahead of you cost half. The content barely changes; the price does.' },
  { group: 'Household', title: 'Fix the leak the week it starts', save: 3000, text: 'A dripping tap and a leaking sink cost more in water and damage than the plumber\'s ₦12,800 visit.' },
  { group: 'Household', title: 'One data plan for the whole family', save: 2500, text: 'A shared 40 GB bundle is cheaper than four small ones, and nobody runs out mid-month.' },
  { group: 'Household', title: 'Grow ugu and scent leaf at the back', save: 2000, text: 'A small bed of vegetables covers the soup greens every week — about ₦2,000 a month for the price of watering.' },
  { group: 'Household', title: 'Celebrate cheap, celebrate well', save: 3500, text: 'Birthdays at home with home cooking cost a third of a restaurant party, and the children remember them better.' },
];
