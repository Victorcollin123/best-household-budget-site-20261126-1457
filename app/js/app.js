// The Household Ledger — routing, rendering and every calculator.
// All figures come from data.js; the calculators recompute live from the
// inputs, so changing a number changes the answer on screen.

import { HOUSEHOLD, CATEGORIES, TRANSACTIONS, CASHFLOW, GOALS, DEBTS, SUBSCRIPTIONS, GROCERY_BASKET, ARCHETYPES, BEFORE_AFTER, TIPS } from './data.js';
import { fmt, fmtShort, cashflowChart, categoryBars, splitDonut, goalLine } from './charts.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const naira = (v) => '₦' + Math.round(v).toLocaleString('en-NG');
const num = (el) => Math.max(0, Number(String(el.value).replace(/[^0-9.]/g, '')) || 0);

const GROUP_COLOR = { needs: '#1f7a4d', wants: '#c98a1b', savings: '#2f5d8a' };
const GROUP_LABEL = { needs: 'Needs', wants: 'Wants', savings: 'Savings & debt' };

// Extra transactions the reader adds are kept in the browser only.
const extraTx = JSON.parse(localStorage.getItem('ledger-extra-tx') || '[]');
const allTx = () => TRANSACTIONS.concat(extraTx);

function spentByCat() {
  const out = {};
  for (const t of allTx()) out[t.cat] = (out[t.cat] || 0) + t.amount;
  return out;
}
function groupTotals() {
  const out = { needs: 0, wants: 0, savings: 0 };
  for (const c of CATEGORIES) out[c.group] += c.budget;
  return out;
}

// ---------- shared bits ----------
function kpiCards() {
  const spent = allTx().reduce((a, t) => a + t.amount, 0);
  const saved = GOALS.reduce((a, g) => a + g.saved, 0);
  const debtLeft = DEBTS.reduce((a, d) => a + d.balance, 0);
  const goalsDone = GOALS.filter((g) => g.saved >= g.target).length;
  const cards = [
    ['Monthly income', naira(HOUSEHOLD.income), 'Salaries ₦700,000 + side income ₦150,000'],
    ['Spent so far in November', naira(spent), '29 recorded rows — see the Tracker'],
    ['Left to spend', naira(HOUSEHOLD.income - spent), 'On plan: ' + Math.round(((HOUSEHOLD.income - spent) / HOUSEHOLD.income) * 100) + '% of the month still unspent'],
    ['Savings rate', Math.round((groupTotals().savings / HOUSEHOLD.income) * 100) + '%', '₦212,500 of every ₦850,000 — target 20%'],
    ['Emergency fund', Math.round((GOALS[0].saved / GOALS[0].target) * 100) + '%', naira(GOALS[0].saved) + ' of ' + naira(GOALS[0].target)],
    ['Total debt left', naira(debtLeft), 'Three debts — the payoff calculator clears them'],
    ['Goals on track', goalsDone + ' of ' + GOALS.length + ' done', 'School fees paid in full'],
    ['Money found in October', naira(BEFORE_AFTER.reduce((a, r) => a + (r.before - r.after), 0)) + ' / mo', 'Subscriptions, eating out, fuel, food waste'],
  ];
  return '<div class="kpis">' + cards.map(([k, v, s]) =>
    `<div class="kpi"><div class="kpi-k">${k}</div><div class="kpi-v">${v}</div><div class="kpi-s">${s}</div></div>`).join('') + '</div>';
}

function findings() {
  const spent = spentByCat();
  const rows = [
    ['Rent is the biggest line', '₦170,000 a month — 20% of income. Negotiating it down saved ₦8,500 a month (see Tips).'],
    ['Food runs 25% under budget so far', '₦96,400 spent of ₦127,500. The weekly list from the grocery calculator is doing the work.'],
    ['The generator is the hidden bill', '₦63,000 of the ₦85,000 transport & fuel line is generator fuel. The inverter goal ends it.'],
    ['Subscriptions were the leak', '₦77,500 a month in October, ₦8,500 now — ₦69,000 a month found by cancelling six services.'],
    ['Savings beat the 50/30/20 target', '25% saved against a 20% target — but needs run at 68% against a 50% target, so wants are squeezed to 7%.'],
  ];
  return '<ol class="findings">' + rows.map(([t, d]) => `<li><b>${t}.</b> ${d}</li>`).join('') + '</ol>';
}

// ---------- pages ----------
function renderOverview() {
  const spent = spentByCat();
  const g = groupTotals();
  $('#overview-kpis').innerHTML = kpiCards();
  $('#overview-findings').innerHTML = findings();
  cashflowChart($('#cashflow'), CASHFLOW);
  splitDonut($('#split'), [
    { label: 'Needs', value: g.needs, color: GROUP_COLOR.needs },
    { label: 'Wants', value: g.wants, color: GROUP_COLOR.wants },
    { label: 'Savings & debt', value: g.savings, color: GROUP_COLOR.savings },
  ]);
  const rows = CATEGORIES.map((c) => {
    const s = spent[c.id] || 0;
    const left = c.budget - s;
    return `<tr><td>${c.name}</td><td>${GROUP_LABEL[c.group]}</td><td class="r">${naira(c.budget)}</td><td class="r">${naira(s)}</td><td class="r ${left < 0 ? 'over' : ''}">${naira(left)}</td></tr>`;
  }).join('');
  $('#overview-table tbody').innerHTML = rows;
}

function renderPlanner() {
  const g = groupTotals();
  const inc = HOUSEHOLD.income;
  const pct = (v) => Math.round((v / inc) * 100);
  $('#planner-split').innerHTML = ['needs', 'wants', 'savings'].map((k) => {
    const target = { needs: 50, wants: 30, savings: 20 }[k];
    const actual = pct(g[k]);
    const diff = actual - target;
    return `<div class="split-row"><div class="split-name"><span class="dot" style="background:${GROUP_COLOR[k]}"></span>${GROUP_LABEL[k]}</div>
      <div class="split-bar"><div style="width:${actual}%;background:${GROUP_COLOR[k]}"></div></div>
      <div class="split-nums"><b>${actual}%</b> · ${naira(g[k])} &nbsp;—&nbsp; target ${target}% (${naira(inc * target / 100)}) · ${diff > 0 ? '+' : ''}${diff} pts ${diff > 0 ? 'over' : 'under'}</div></div>`;
  }).join('');
  $('#planner-table tbody').innerHTML = CATEGORIES.map((c) =>
    `<tr><td>${c.name}</td><td>${GROUP_LABEL[c.group]}</td><td class="r">${naira(c.budget)}</td><td class="r">${pct(c.budget)}%</td><td>${c.note}</td></tr>`).join('');
  const calc = $('#split-calc');
  const run = () => {
    const income = num($('#sc-income'));
    const needs = Math.round(income * 0.5), wants = Math.round(income * 0.3), save = Math.round(income * 0.2);
    $('#sc-out').innerHTML = `<p>On <b>${naira(income)}</b> a month, 50/30/20 gives:</p>
      <p><b>Needs ${naira(needs)}</b> — rent, food, transport, school, health. <b>Wants ${naira(wants)}</b> — eating out, fun, giving. <b>Savings ${naira(save)}</b> — goals, debt, buffer.</p>
      <p>The Okafors earn ${naira(HOUSEHOLD.income)} and spend ${naira(groupTotals().needs)} on needs (${pct(groupTotals().needs)}%) — ${naira(groupTotals().needs - Math.round(HOUSEHOLD.income * 0.5))} over the 50% line, because Lagos rent and school fees are fixed. Their answer is not to starve the needs; it is to hold wants to 7% and still save 25%.</p>`;
  };
  $('#sc-income').value = HOUSEHOLD.income;
  $('#sc-income').addEventListener('input', run);
  run();
}

function renderTracker() {
  const spent = spentByCat();
  const draw = (filter) => {
    const rows = allTx().filter((t) => !filter || t.cat === filter);
    $('#tracker-rows').innerHTML = rows.map((t) =>
      `<tr><td>${t.date}</td><td>${t.desc}</td><td>${CATEGORIES.find((c) => c.id === t.cat)?.name || t.cat}</td><td class="r">${naira(t.amount)}</td></tr>`).join('');
    $('#tracker-count').textContent = rows.length + ' rows · ' + naira(rows.reduce((a, t) => a + t.amount, 0));
  };
  const sel = $('#tracker-filter');
  sel.innerHTML = '<option value="">All categories</option>' + CATEGORIES.map((c) => `<option value="${c.id}">${c.name}</option>`).join('');
  sel.addEventListener('change', () => draw(sel.value));
  draw('');
  categoryBars($('#catbars'), CATEGORIES, spent);
  $('#add-tx').addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = $('#tx-desc').value.trim();
    const amount = num($('#tx-amount'));
    const cat = $('#tx-cat').value;
    if (!desc || !amount) { $('#tx-msg').textContent = 'Give the spend a description and an amount.'; return; }
    extraTx.push({ date: '26 Nov', desc, cat, amount });
    localStorage.setItem('ledger-extra-tx', JSON.stringify(extraTx));
    $('#tx-msg').textContent = 'Added — ' + desc + ' (' + naira(amount) + '). Saved in this browser.';
    e.target.reset();
    draw(sel.value);
    categoryBars($('#catbars'), CATEGORIES, spentByCat());
  });
  $('#tx-cat').innerHTML = CATEGORIES.map((c) => `<option value="${c.id}">${c.name}</option>`).join('');
}

function renderGoals() {
  $('#goals-list').innerHTML = GOALS.map((g, i) => {
    const pc = Math.round((g.saved / g.target) * 100);
    const left = Math.max(0, g.target - g.saved);
    const months = g.monthly > 0 ? Math.ceil(left / g.monthly) : 0;
    return `<article class="goal"><h3>${g.name}</h3>
      <p>${g.note}</p>
      <div class="goal-bar"><div style="width:${Math.min(100, pc)}%"></div></div>
      <p><b>${naira(g.saved)}</b> of ${naira(g.target)} — <b>${pc}%</b>${g.saved >= g.target ? ' · DONE' : ` · ${naira(left)} left · about ${months} month${months === 1 ? '' : 's'} at ${naira(g.monthly)}/mo`}</p>
      <canvas id="goal-line-${i}" width="600" height="120"></canvas></article>`;
  }).join('');
  GOALS.forEach((g, i) => goalLine($('#goal-line-' + i), g.saved, g.target, g.monthly || 1));
  const total = GOALS.reduce((a, g) => a + g.target, 0);
  const saved = GOALS.reduce((a, g) => a + g.saved, 0);
  $('#goals-total').textContent = `All five goals: ${naira(saved)} saved of ${naira(total)} (${Math.round((saved / total) * 100)}%) — ${naira(GOALS.reduce((a, g) => a + g.monthly, 0))} a month goes to them from the budget.`;
}

function payoff(debts, extra, order) {
  const ds = debts.map((d) => ({ ...d })).sort((a, b) => order === 'snowball' ? a.balance - b.balance : b.rate - a.rate);
  const principal = ds.reduce((a, d) => a + d.balance, 0);
  let months = 0, paid = 0;
  while (ds.some((d) => d.balance > 0.005) && months < 600) {
    months++;
    for (const d of ds) if (d.balance > 0) d.balance += d.balance * d.rate;
    for (const d of ds) {
      if (d.balance <= 0) continue;
      const pay = Math.min(d.balance, d.min);
      d.balance -= pay; paid += pay;
    }
    let pool = extra;
    for (const d of ds) {
      if (pool <= 0 || d.balance <= 0) continue;
      const pay = Math.min(d.balance, pool);
      d.balance -= pay; paid += pay; pool -= pay;
    }
  }
  return { months, interest: Math.max(0, Math.round(paid - principal)) };
}

function renderCalculators() {
  // Emergency fund
  const ef = () => {
    const essentials = num($('#ef-essentials'));
    const months = num($('#ef-months'));
    const saved = num($('#ef-saved'));
    const contrib = num($('#ef-contrib'));
    const target = essentials * months;
    const gap = Math.max(0, target - saved);
    const mo = contrib > 0 ? Math.ceil(gap / contrib) : Infinity;
    $('#ef-out').innerHTML = `<p>Target: <b>${naira(target)}</b> (${naira(essentials)} × ${months} months). You have ${naira(saved)} — gap <b>${naira(gap)}</b>. At ${naira(contrib)} a month you get there in <b>${mo === Infinity ? '— (set a monthly amount)' : mo + ' months'}</b>.</p>
      <p>The Okafors' essentials are ${naira(578000)} a month, so 3 months is ${naira(1734000)}. They are 60% there.</p>`;
  };
  $('#ef-essentials').value = 578000; $('#ef-months').value = 3; $('#ef-saved').value = 1040400; $('#ef-contrib').value = 42500;
  ['#ef-essentials', '#ef-months', '#ef-saved', '#ef-contrib'].forEach((s) => $(s).addEventListener('input', ef));
  ef();

  // Debt payoff
  const dp = () => {
    const extra = num($('#dp-extra'));
    const snow = payoff(DEBTS, extra, 'snowball');
    const aval = payoff(DEBTS, extra, 'avalanche');
    const mins = DEBTS.reduce((a, d) => a + d.min, 0);
    const total = DEBTS.reduce((a, d) => a + d.balance, 0);
    $('#dp-out').innerHTML = `<p>Three debts, ${naira(total)} in all, minimums ${naira(mins)} a month. With an extra ${naira(extra)} a month on top:</p>
      <p><b>Snowball</b> (smallest first: POS loan → family loan → credit card): debt-free in <b>${snow.months} months</b>, interest ${naira(snow.interest)}.</p>
      <p><b>Avalanche</b> (highest rate first: POS loan → credit card → family loan): debt-free in <b>${aval.months} months</b>, interest ${naira(aval.interest)}.</p>
      <p>The orders split after the POS loan clears: snowball attacks the family loan next — a quick win, but it earns no interest saving — while avalanche attacks the card at 2.5% a month. Avalanche saves ${naira(snow.interest - aval.interest)} here, so take avalanche unless you need the quick win to stay going. With no extra at all, minimums alone take ${payoff(DEBTS, 0, 'snowball').months} months and cost ${naira(payoff(DEBTS, 0, 'snowball').interest)} in interest.</p>`;
  };
  $('#dp-extra').value = 25000;
  $('#dp-extra').addEventListener('input', dp);
  dp();

  // Grocery
  const groc = () => {
    const people = num($('#gr-people'));
    const perWeek = GROCERY_BASKET.reduce((a, b) => a + b.cost, 0);
    const weekly = Math.round((perWeek / 4) * people);
    const monthly = Math.round(weekly * 4.33);
    $('#gr-out').innerHTML = `<p>One person eats about ${naira(perWeek / 4)} a week from this basket. For <b>${people} people</b>: <b>${naira(weekly)} a week</b>, about <b>${naira(monthly)} a month</b>.</p>
      <p>The Okafors are four people: ${naira(Math.round((perWeek / 4) * 4 * 4.33))} a month — right on their ${naira(127500)} food budget. Change the household size and the basket scales with it.</p>`;
    $('#gr-basket tbody').innerHTML = GROCERY_BASKET.map((b) => `<tr><td>${b.item}</td><td class="r">${naira(b.cost)}</td></tr>`).join('') +
      `<tr class="total"><td>Weekly basket (family of 4)</td><td class="r">${naira(perWeek)}</td></tr>`;
  };
  $('#gr-people').value = 4;
  $('#gr-people').addEventListener('input', groc);
  groc();

  // Energy: generator vs inverter
  const en = () => {
    const hours = num($('#en-hours'));
    const price = num($('#en-price'));
    const genMonth = Math.round(hours * 1.0 * 30 * price) + 10000;
    const invMonth = Math.round(850000 / 60) + 2000;
    $('#en-out').innerHTML = `<p>Generator at ${hours} hours a day: ${Math.round(hours * 30)} litres a month × ${naira(price)} + ₦10,000 servicing = <b>${naira(genMonth)} a month</b>.</p>
      <p>Inverter + solar (₦850,000 spread over 5 years + ₦2,000 upkeep): <b>${naira(invMonth)} a month</b>. Saving: <b>${naira(genMonth - invMonth)} a month</b> — the system pays for itself in about ${Math.max(1, Math.ceil(850000 / Math.max(1, genMonth - invMonth)))} months, then the power is nearly free.</p>
      <p>The Okafors run 2 hours a day today (${naira(2 * 30 * 1050 + 10000)} a month) and save ₦25,500 a month toward the inverter.</p>`;
  };
  $('#en-hours').value = 2; $('#en-price').value = 1050;
  ['#en-hours', '#en-price'].forEach((s) => $(s).addEventListener('input', en));
  en();

  // Subscription audit
  const audit = () => {
    const rows = SUBSCRIPTIONS.map((s, i) => {
      const on = $('#sub-' + i).checked;
      return `<tr><td>${s.name}</td><td class="r">${naira(s.cost)}</td><td>${on ? 'Kept' : 'Cancelled'}</td><td>${s.note}</td></tr>`;
    }).join('');
    const kept = SUBSCRIPTIONS.filter((s, i) => $('#sub-' + i).checked).reduce((a, s) => a + s.cost, 0);
    const total = SUBSCRIPTIONS.reduce((a, s) => a + s.cost, 0);
    $('#sub-list tbody').innerHTML = rows;
    $('#sub-out').innerHTML = `<p>Before the cut: <b>${naira(total)} a month</b>. Your selection keeps <b>${naira(kept)}</b> and saves <b>${naira(total - kept)} a month — ${naira((total - kept) * 12)} a year</b>.</p>
      <p>The Okafors kept Netflix only: ${naira(8500)} a month, saving ${naira(69000)} a month — the single biggest find in their October budget review.</p>`;
  };
  $('#sub-toggles').innerHTML = SUBSCRIPTIONS.map((s, i) =>
    `<label class="toggle"><input type="checkbox" id="sub-${i}" ${s.kept ? 'checked' : ''}> ${s.name} — ${naira(s.cost)}/mo</label>`).join('');
  SUBSCRIPTIONS.forEach((s, i) => $('#sub-' + i).addEventListener('change', audit));
  audit();
}

function renderCompare() {
  const rows = ARCHETYPES.map((a) => {
    const save = a.cats.filter(([n]) => n === 'Savings' || n === 'Buffer').reduce((x, [, v]) => x + v, 0);
    const rent = a.cats.find(([n]) => n === 'Rent')[1];
    const food = a.cats.find(([n]) => n === 'Food & groceries')[1];
    return `<tr><td>${a.name}</td><td class="r">${naira(a.income)}</td><td class="r">${naira(rent)} (${Math.round((rent / a.income) * 100)}%)</td><td class="r">${naira(food)} (${Math.round((food / a.income) * 100)}%)</td><td class="r"><b>${Math.round((save / a.income) * 100)}%</b></td></tr>`;
  }).join('');
  $('#compare-table tbody').innerHTML = rows;
  $('#compare-cards').innerHTML = ARCHETYPES.map((a) => {
    const save = a.cats.filter(([n]) => n === 'Savings' || n === 'Buffer').reduce((x, [, v]) => x + v, 0);
    return `<article class="arch"><h3>${a.name}</h3><p>${a.note}</p>
      <p>Income <b>${naira(a.income)}</b> · saves <b>${Math.round((save / a.income) * 100)}%</b> (${naira(save)}/mo)</p>
      <table><tbody>${a.cats.map(([n, v]) => `<tr><td>${n}</td><td class="r">${naira(v)}</td><td class="r">${Math.round((v / a.income) * 100)}%</td></tr>`).join('')}</tbody></table></article>`;
  }).join('');
  $('#before-after tbody').innerHTML = BEFORE_AFTER.map((r) =>
    `<tr><td>${r.line}</td><td class="r">${naira(r.before)}</td><td class="r">${naira(r.after)}</td><td class="r"><b>${naira(r.before - r.after)}</b></td><td>${r.how}</td></tr>`).join('');
  const found = BEFORE_AFTER.reduce((a, r) => a + (r.before - r.after), 0);
  const beforeRate = ((groupTotals().savings - found) / HOUSEHOLD.income) * 100;
  const afterRate = (groupTotals().savings / HOUSEHOLD.income) * 100;
  $('#before-total').textContent = `Found in one October review: ${naira(found)} a month — ${naira(found * 12)} a year. Savings rate before ${beforeRate.toFixed(1)}% → after ${afterRate.toFixed(1)}%.`;
}

function renderTips() {
  const total = TIPS.reduce((a, t) => a + t.save, 0);
  $('#tips-total').textContent = `24 tips. The ones with a figure add up to ${naira(total)} a month if you took them all — in practice, take five and keep them.`;
  const groups = [...new Set(TIPS.map((t) => t.group))];
  $('#tips-list').innerHTML = groups.map((g) => {
    const items = TIPS.filter((t) => t.group === g);
    const gsum = items.reduce((a, t) => a + t.save, 0);
    return `<section class="tip-group"><h3>${g} — ${items.length} tips${gsum ? ` · up to ${naira(gsum)}/mo` : ''}</h3>
      ${items.map((t) => `<article class="tip"><h4>${t.title}</h4><p>${t.text}</p>${t.save ? `<p class="save">Saves about <b>${naira(t.save)} a month</b></p>` : '<p class="save">A habit, not a figure — it protects the budget.</p>'}</article>`).join('')}</section>`;
  }).join('');
}

// ---------- routing ----------
const ROUTES = {
  overview: renderOverview,
  planner: renderPlanner,
  tracker: renderTracker,
  goals: renderGoals,
  calculators: renderCalculators,
  compare: renderCompare,
  tips: renderTips,
  method: () => {},
};

function route() {
  const name = (location.hash || '#/overview').replace('#/', '') || 'overview';
  $$('.page').forEach((p) => p.classList.toggle('active', p.id === 'page-' + name));
  $$('nav a').forEach((a) => a.classList.toggle('active', a.dataset.route === name));
  (ROUTES[name] || renderOverview)();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();
