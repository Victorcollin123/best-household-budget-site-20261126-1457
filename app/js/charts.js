// Hand-rolled canvas charts — no library, no network. Every chart draws from
// the numbers in data.js, so a wrong figure shows up on screen, not in a table.

function setup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = height;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

export function fmt(n) {
  return '₦' + Math.round(n).toLocaleString('en-NG');
}

export function fmtShort(n) {
  if (Math.abs(n) >= 1000000) return '₦' + (n / 1000000).toFixed(2) + 'm';
  if (Math.abs(n) >= 1000) return '₦' + Math.round(n / 1000) + 'k';
  return '₦' + Math.round(n);
}

// Grouped vertical bars: income vs spending by month, savings as the gap.
export function cashflowChart(canvas, rows) {
  const { ctx, w, h } = setup(canvas, 260);
  const pad = { l: 64, r: 12, t: 14, b: 26 };
  const max = Math.max(...rows.flatMap((r) => [r.income, r.spent])) * 1.08;
  const iw = (w - pad.l - pad.r) / rows.length;
  const bw = Math.min(22, (iw - 14) / 2);
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = '#5b6470';
  for (let g = 0; g <= 4; g++) {
    const v = (max / 1.08 / 4) * g;
    const y = pad.t + (h - pad.t - pad.b) * (1 - v / max);
    ctx.strokeStyle = '#e6e2d8';
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
    ctx.fillText(fmtShort(v), 4, y + 4);
  }
  rows.forEach((r, i) => {
    const x = pad.l + i * iw + (iw - bw * 2 - 4) / 2;
    const yI = pad.t + (h - pad.t - pad.b) * (1 - r.income / max);
    const yS = pad.t + (h - pad.t - pad.b) * (1 - r.spent / max);
    ctx.fillStyle = '#1f7a4d';
    ctx.fillRect(x, yI, bw, pad.t + h - pad.t - pad.b - yI + 0);
    ctx.fillStyle = '#c25e3a';
    ctx.fillRect(x + bw + 4, yS, bw, pad.t + h - pad.t - pad.b - yS + 0);
    ctx.fillStyle = '#33302a';
    ctx.fillText(r.month, x - 2, h - 8);
    if (r.month === 'Dec') {
      ctx.fillStyle = '#1f7a4d';
      ctx.fillText('+' + fmtShort(r.income - r.spent), x - 6, yI - 6);
    }
  });
  ctx.fillStyle = '#1f7a4d'; ctx.fillRect(pad.l, 2, 10, 10);
  ctx.fillStyle = '#33302a'; ctx.fillText('Income', pad.l + 14, 11);
  ctx.fillStyle = '#c25e3a'; ctx.fillRect(pad.l + 70, 2, 10, 10);
  ctx.fillStyle = '#33302a'; ctx.fillText('Spending', pad.l + 84, 11);
}

// Horizontal bars: one per budget category, budget vs spent.
export function categoryBars(canvas, cats, spentByCat) {
  const rowH = 30;
  const { ctx, w, h } = setup(canvas, cats.length * rowH + 8);
  const max = Math.max(...cats.map((c) => c.budget));
  ctx.font = '12px system-ui, sans-serif';
  cats.forEach((c, i) => {
    const y = 8 + i * rowH;
    const spent = spentByCat[c.id] || 0;
    const bw = (w - 250) * (c.budget / max);
    const sw = (w - 250) * (spent / max);
    ctx.fillStyle = '#33302a';
    ctx.fillText(c.name, 0, y + 13);
    ctx.fillStyle = '#e6e2d8';
    ctx.fillRect(180, y, w - 250, 16);
    ctx.fillStyle = spent > c.budget ? '#b3382e' : '#1f7a4d';
    ctx.fillRect(180, y, Math.max(2, sw), 16);
    ctx.fillStyle = '#5b6470';
    ctx.fillText(fmt(spent) + ' of ' + fmt(c.budget), 180 + bw + 8 > w - 70 ? w - 120 : 180 + bw + 8, y + 13);
    if (spent > c.budget) {
      ctx.fillStyle = '#b3382e';
      ctx.fillText('OVER', w - 44, y + 13);
    }
  });
}

// Donut: needs / wants / savings split.
export function splitDonut(canvas, parts) {
  const { ctx, w, h } = setup(canvas, 210);
  const cx = 105, cy = 105, r = 82, inner = 52;
  const total = parts.reduce((a, p) => a + p.value, 0);
  let a0 = -Math.PI / 2;
  parts.forEach((p) => {
    const a1 = a0 + (p.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a0, a1);
    ctx.closePath();
    ctx.fillStyle = p.color;
    ctx.fill();
    a0 = a1;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = '#fffdf8';
  ctx.fill();
  ctx.fillStyle = '#33302a';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(Math.round((parts[2].value / total) * 100) + '%', cx, cy - 2);
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = '#5b6470';
  ctx.fillText('saved', cx, cy + 14);
  ctx.textAlign = 'left';
  parts.forEach((p, i) => {
    const y = 30 + i * 52;
    ctx.fillStyle = p.color;
    ctx.fillRect(210, y, 12, 12);
    ctx.fillStyle = '#33302a';
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText(p.label, 230, y + 11);
    ctx.fillStyle = '#5b6470';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(fmt(p.value) + ' · ' + Math.round((p.value / total) * 100) + '%', 230, y + 28);
  });
}

// Simple line chart for a goal's road to its target.
export function goalLine(canvas, saved, target, monthly) {
  const { ctx, w, h } = setup(canvas, 120);
  const months = Math.max(1, Math.ceil((target - saved) / Math.max(1, monthly)));
  const points = Math.min(months, 24);
  const pad = { l: 8, r: 8, t: 10, b: 18 };
  const step = (w - pad.l - pad.r) / points;
  ctx.strokeStyle = '#e6e2d8';
  ctx.beginPath(); ctx.moveTo(pad.l, pad.t + 40); ctx.lineTo(w - pad.r, pad.t + 40); ctx.stroke();
  ctx.strokeStyle = '#1f7a4d';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const v = Math.min(target, saved + monthly * i);
    const x = pad.l + i * step;
    const y = pad.t + (h - pad.t - pad.b) * (1 - v / target);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#5b6470';
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillText('now ' + fmt(saved), pad.l, h - 4);
  ctx.fillText('target ' + fmt(target) + ' in ~' + months + ' mo', w - 170, h - 4);
}
