/**
 * המצפן — server.js
 * Pure Node.js, zero dependencies.
 * Run: node server.js
 *
 * Locally stores votes in data/votes.json.
 * On Vercel, the api/ serverless functions + Upstash Redis are used instead.
 */
const http = require('http');
const fs   = require('fs');
const path = require('path');

// Load .env if present (for local testing with Upstash credentials)
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) {
  fs.readFileSync(envFile, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.+)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  });
}
const url  = require('url');

const PORT       = process.env.PORT       || 3000;
const ADMIN_KEY  = process.env.ADMIN_KEY  || 'hamatzpen-admin-2026';
const ADMIN_PATH = '/admin-hamatzpen';
const DATA_FILE  = path.join(__dirname, 'data', 'votes.json');

// ── boot ──────────────────────────────────────────────────────
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

// ── helpers ───────────────────────────────────────────────────
function readVotes()        { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
function writeVotes(votes)  { fs.writeFileSync(DATA_FILE, JSON.stringify(votes, null, 2), 'utf8'); }

const MIME = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.json':'application/json', '.ico':'image/x-icon' };

function json(res, status, obj) {
  res.writeHead(status, { 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' });
  res.end(JSON.stringify(obj));
}

// ── blocked paths ─────────────────────────────────────────────
const BLOCKED = ['/admin.html', '/server.js', '/data/', '/.gitignore', '/.env'];

// ── server ────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const parsed   = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // ── POST /api/vote  (save anonymous result) ─────────────────
  if (req.method === 'POST' && pathname === '/api/vote') {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 4096) req.destroy(); });
    req.on('end', () => {
      try {
        const d = JSON.parse(body);
        if (!d.topParty || typeof d.scores !== 'object') return json(res, 400, { error: 'invalid' });
        // Sanitise — store only what we need
        const vote = {
          ts:       new Date().toISOString(),
          topParty: String(d.topParty).slice(0, 60),
          scores:   Object.fromEntries(
            Object.entries(d.scores)
              .filter(([k, v]) => typeof k === 'string' && typeof v === 'number')
              .map(([k, v]) => [k.slice(0, 30), Math.round(v)])
          ),
        };
        const votes = readVotes();
        votes.push(vote);
        writeVotes(votes);
        json(res, 200, { ok: true, total: votes.length });
      } catch { json(res, 400, { error: 'bad json' }); }
    });
    return;
  }

  // ── GET /api/admin/stats  (aggregated stats, key-gated) ─────
  if (req.method === 'GET' && pathname === '/api/admin/stats') {
    if (parsed.query.key !== ADMIN_KEY) return json(res, 403, { error: 'forbidden' });
    const votes   = readVotes();
    const byParty = {};
    const sumScores = {};
    const cntScores = {};
    votes.forEach(v => {
      byParty[v.topParty] = (byParty[v.topParty] || 0) + 1;
      Object.entries(v.scores || {}).forEach(([p, s]) => {
        sumScores[p] = (sumScores[p] || 0) + s;
        cntScores[p] = (cntScores[p] || 0) + 1;
      });
    });
    const avgScores = {};
    Object.keys(sumScores).forEach(p => { avgScores[p] = Math.round(sumScores[p] / cntScores[p]); });
    // Daily breakdown (last 30 days)
    const byDay = {};
    votes.forEach(v => {
      const day = v.ts.slice(0, 10);
      byDay[day] = (byDay[day] || 0) + 1;
    });
    return json(res, 200, { total: votes.length, byParty, avgScores, byDay });
  }

  // ── GET /admin-hamatzpen  (admin HTML, key-gated) ────────────
  if (req.method === 'GET' && pathname === ADMIN_PATH) {
    if (parsed.query.key !== ADMIN_KEY) {
      res.writeHead(403, { 'Content-Type': 'text/html' });
      return res.end('<html><body><h1>403 Forbidden</h1></body></html>');
    }
    const adminFile = path.join(__dirname, 'admin.html');
    if (!fs.existsSync(adminFile)) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(fs.readFileSync(adminFile));
  }

  // ── block private files ──────────────────────────────────────
  if (BLOCKED.some(b => pathname.startsWith(b))) {
    res.writeHead(403); return res.end('Forbidden');
  }

  // ── static files ─────────────────────────────────────────────
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath === '/' ? 'index.html' : safePath);
  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  🧭  המצפן is running');
  console.log('');
  console.log('  Public:  http://localhost:' + PORT);
  console.log('  Admin:   http://localhost:' + PORT + ADMIN_PATH + '?key=' + ADMIN_KEY);
  console.log('');
  console.log('  Set ADMIN_KEY env var to change the admin password.');
  console.log('');
});
