// GET /api/admin/stats?key=... — aggregated poll stats (key-gated)
const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const ADMIN_KEY   = process.env.ADMIN_KEY || 'hamatzpen-admin-2026';

async function redisGet(cmd) {
  const res = await fetch(`${REDIS_URL}/${cmd.map(c => encodeURIComponent(c)).join('/')}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();
  return data.result;
}

// HGETALL returns a flat array [k, v, k, v, ...] — convert to object
function toObj(arr) {
  if (!Array.isArray(arr)) return {};
  const o = {};
  for (let i = 0; i < arr.length; i += 2) o[arr[i]] = arr[i + 1];
  return o;
}

export default async function handler(req, res) {
  if (req.query.key !== ADMIN_KEY) return res.status(403).json({ error: 'forbidden' });

  const [total, byParty, byDay, scoreSum, scoreCnt] = await Promise.all([
    redisGet(['GET',    'hz:total']),
    redisGet(['HGETALL','hz:top']),
    redisGet(['HGETALL','hz:day']),
    redisGet(['HGETALL','hz:score_sum']),
    redisGet(['HGETALL','hz:score_cnt']),
  ]);

  const byPartyObj  = toObj(byParty);
  const byDayObj    = toObj(byDay);
  const scoreSumObj = toObj(scoreSum);
  const scoreCntObj = toObj(scoreCnt);

  // Numeric conversions
  Object.keys(byPartyObj).forEach(k => { byPartyObj[k] = Number(byPartyObj[k]); });
  Object.keys(byDayObj).forEach(k  => { byDayObj[k]   = Number(byDayObj[k]); });

  const avgScores = {};
  Object.keys(scoreSumObj).forEach(p => {
    const cnt = Number(scoreCntObj[p]) || 1;
    avgScores[p] = Math.round(Number(scoreSumObj[p]) / cnt);
  });

  res.status(200).json({
    total:     Number(total) || 0,
    byParty:   byPartyObj,
    avgScores,
    byDay:     byDayObj,
  });
}
