// Shared state for the bracket, stored in Upstash Redis (installed via the
// Vercel Marketplace — Vercel's older native "KV" product was sunset and
// replaced by this Marketplace integration).
//
// The Marketplace lets you pick a custom variable prefix when connecting
// the database (default "STORAGE"), so the exact env var names can vary
// by project. Rather than hardcoding one name, this scans for whichever
// "<PREFIX>_URL" / "<PREFIX>_TOKEN" pair Vercel actually created.
//
// GET  -> public, anyone can read the current results.
// POST -> requires { adminKey, state } in the body. adminKey is checked
//         against the ADMIN_KEY environment variable on the server —
//         the real secret never ships to the browser, so it can't be
//         read out of the page source or dev tools.
import { Redis } from '@upstash/redis';

function resolveRedisCredentials() {
  const env = process.env;
  // Known naming conventions, checked first.
  const known = [
    ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
    ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
    ['STORAGE_URL', 'STORAGE_TOKEN'],
    ['STORAGE_REST_API_URL', 'STORAGE_REST_API_TOKEN'],
    ['REDIS_URL', 'REDIS_TOKEN'],
  ];
  for (const [u, t] of known) {
    if (env[u] && env[t]) return { url: env[u], token: env[t] };
  }
  // Fallback: find any "<PREFIX>_URL" with a matching "<PREFIX>_TOKEN",
  // whatever custom prefix was chosen when connecting the integration.
  for (const key of Object.keys(env)) {
    if (key.endsWith('_URL') && !key.startsWith('VERCEL_')) {
      const prefix = key.slice(0, -4);
      const tokenKey = prefix + '_TOKEN';
      if (env[tokenKey]) return { url: env[key], token: env[tokenKey] };
    }
  }
  return null;
}

const STATE_KEY = 'bracket_state';

export default async function handler(req, res) {
  const creds = resolveRedisCredentials();
  if (!creds) {
    return res.status(500).json({
      error: 'Tidak menemukan kredensial Redis. Pastikan database sudah di-Connect ke proyek ini di tab Storage.',
    });
  }
  const redis = new Redis({ url: creds.url, token: creds.token });

  if (req.method === 'GET') {
    const state = (await redis.get(STATE_KEY)) || null;
    return res.status(200).json({ state });
  }

  if (req.method === 'POST') {
    const { adminKey, state } = req.body || {};

    if (!process.env.ADMIN_KEY) {
      return res.status(500).json({ error: 'ADMIN_KEY belum diset di server' });
    }
    if ((adminKey || '').trim() !== (process.env.ADMIN_KEY || '').trim()) {
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
