// POST /api/vote — save anonymous quiz result to Upstash Redis
const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisPipeline(commands) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { topParty, scores } = req.body || {};
  if (!topParty || typeof scores !== 'object') return res.status(400).json({ error: 'invalid' });

  const today = new Date().toISOString().slice(0, 10);
  const cmds = [
    ['INCR',    'hz:total'],
    ['HINCRBY', 'hz:top',  String(topParty).slice(0, 40), 1],
    ['HINCRBY', 'hz:day',  today, 1],
  ];

  Object.entries(scores).forEach(([party, pct]) => {
    if (typeof pct === 'number' && typeof party === 'string') {
      cmds.push(['HINCRBYFLOAT', 'hz:score_sum', party.slice(0, 30), pct]);
      cmds.push(['HINCRBY',      'hz:score_cnt', party.slice(0, 30), 1]);
    }
  });

  await redisPipeline(cmds);
  res.status(200).json({ ok: true });
}
