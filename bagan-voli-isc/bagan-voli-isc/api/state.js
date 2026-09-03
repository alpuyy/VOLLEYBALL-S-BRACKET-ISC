// Shared state for the bracket, stored in Upstash Redis (installed via the
// Vercel Marketplace — Vercel's older native "KV" product was sunset and
// replaced by this Marketplace integration).
// GET  -> public, anyone can read the current results.
// POST -> requires { adminKey, state } in the body. adminKey is checked
//         against the ADMIN_KEY environment variable on the server —
//         the real secret never ships to the browser, so it can't be
//         read out of the page source or dev tools.
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const STATE_KEY = 'bracket_state';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const state = (await redis.get(STATE_KEY)) || null;
    return res.status(200).json({ state });
  }

  if (req.method === 'POST') {
    const { adminKey, state } = req.body || {};

    if (!process.env.ADMIN_KEY) {
      return res.status(500).json({ error: 'ADMIN_KEY belum diset di server' });
    }
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    if (!state || typeof state !== 'object') {
      return res.status(400).json({ error: 'invalid payload' });
    }

    await redis.set(STATE_KEY, state);
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).end('Method Not Allowed');
}
