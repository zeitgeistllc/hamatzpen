// GET /admin-hamatzpen?key=... — serves admin dashboard HTML (key-gated)
const fs   = require('fs');
const path = require('path');
const ADMIN_KEY = process.env.ADMIN_KEY || 'hamatzpen-admin-2026';

module.exports = function handler(req, res) {
  if (req.query.key !== ADMIN_KEY) {
    res.status(403).send('<html><body><h1>403 Forbidden</h1></body></html>');
    return;
  }
  const html = fs.readFileSync(path.join(process.cwd(), 'admin.html'), 'utf8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.send(html);
};
