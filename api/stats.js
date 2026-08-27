// GET /api/stats — public aggregate stats (percentages only, no raw counts)
const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisGet(cmd) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([cmd]),
  });
  const data = await res.json();
  return data[0]?.result;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

  const [topRaw, scoreSum, scoreCnt] = await Promise.all([
    redisGet(['HGETALL', 'hz:top']),
    redisGet(['HGETALL', 'hz:score_sum']),
    redisGet(['HGETALL', 'hz:score_cnt']),
  ]);

  // top-match distribution as percentages
  const topCounts = {};
  if (Array.isArray(topRaw)) {
    for (let i = 0; i < topRaw.length; i += 2) {
      topCounts[topRaw[i]] = Number(topRaw[i + 1]) || 0;
    }
  }
  const totalTop = Object.values(topCounts).reduce((a, b) => a + b, 0);
  const topPct = {};
  if (totalTop > 0) {
    Object.entries(topCounts).forEach(([k, v]) => {
      topPct[k] = Math.round((v / totalTop) * 100);
    });
  }

  // average match score per party as percentages
  const sumMap = {}, cntMap = {};
  if (Array.isArray(scoreSum)) {
    for (let i = 0; i < scoreSum.length; i += 2) sumMap[scoreSum[i]] = Number(scoreSum[i + 1]) || 0;
  }
  if (Array.isArray(scoreCnt)) {
    for (let i = 0; i < scoreCnt.length; i += 2) cntMap[scoreCnt[i]] = Number(scoreCnt[i + 1]) || 0;
  }
  const avgPct = {};
  Object.keys(sumMap).forEach(k => {
    if (cntMap[k]) avgPct[k] = Math.round(sumMap[k] / cntMap[k]);
  });

  res.status(200).json({ topPct, avgPct });
}
