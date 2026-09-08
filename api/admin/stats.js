// GET /api/admin/stats?key=... — full raw stats for admin dashboard
const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const ADMIN_KEY   = process.env.ADMIN_KEY || 'hamatzpen-admin-2026';

async function redisPipeline(commands) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  if (req.query.key !== ADMIN_KEY) return res.status(403).json({ error: 'forbidden' });

  res.setHeader('Cache-Control', 'no-store');

  const results = await redisPipeline([
    ['GET',    'hz:total'],
    ['HGETALL','hz:top'],
    ['HGETALL','hz:day'],
    ['HGETALL','hz:score_sum'],
    ['HGETALL','hz:score_cnt'],
  ]);

  const [totalRaw, topRaw, dayRaw, sumRaw, cntRaw] = results.map(r => r?.result);

  const total = Math.max(0, Number(totalRaw) || 0);

  // byParty: raw counts
  const byParty = {};
  if (Array.isArray(topRaw)) {
    for (let i = 0; i < topRaw.length; i += 2) byParty[topRaw[i]] = Number(topRaw[i+1]) || 0;
  }

  // byDay: raw counts
  const byDay = {};
  if (Array.isArray(dayRaw)) {
    for (let i = 0; i < dayRaw.length; i += 2) byDay[dayRaw[i]] = Number(dayRaw[i+1]) || 0;
  }

  // avgScores: average match % per party
  const sumMap = {}, cntMap = {};
  if (Array.isArray(sumRaw)) for (let i = 0; i < sumRaw.length; i += 2) sumMap[sumRaw[i]] = Number(sumRaw[i+1]) || 0;
  if (Array.isArray(cntRaw)) for (let i = 0; i < cntRaw.length; i += 2) cntMap[cntRaw[i]] = Number(cntRaw[i+1]) || 0;
  const avgScores = {};
  Object.keys(sumMap).forEach(k => { if (cntMap[k]) avgScores[k] = Math.round(sumMap[k] / cntMap[k]); });

  res.status(200).json({ total, byParty, byDay, avgScores });
}
