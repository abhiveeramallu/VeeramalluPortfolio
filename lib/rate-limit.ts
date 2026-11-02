/**
 * Fixed-window rate limiter. Uses Upstash Redis over REST when UPSTASH_REDIS_REST_URL/TOKEN are set
 * (works across serverless instances), otherwise an in-memory map (per instance — fine for a portfolio).
 */
export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetSeconds: number;
}

const memory = new Map<string, { count: number; resetAt: number }>();

export function memoryLimit(
  key: string,
  limit: number,
  windowSeconds: number,
  now = Date.now(),
): RateLimitResult {
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    if (memory.size > 5000) {
      for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
    }
    return { ok: true, remaining: limit - 1, resetSeconds: windowSeconds };
  }
  entry.count += 1;
  return {
    ok: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    resetSeconds: Math.ceil((entry.resetAt - now) / 1000),
  };
}

async function upstashLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL as string;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN as string;
  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([
      ['INCR', key],
      ['EXPIRE', key, String(windowSeconds), 'NX'],
      ['TTL', key],
    ]),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const data = (await res.json()) as { result: number }[];
  const count = data[0].result;
  const ttl = data[2].result;
  return { ok: count <= limit, remaining: Math.max(0, limit - count), resetSeconds: Math.max(0, ttl) };
}

export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return await upstashLimit(`rl:${key}`, limit, windowSeconds);
    } catch (err) {
      console.warn('[rate-limit] Upstash unavailable, falling back to memory:', (err as Error).message);
    }
  }
  return memoryLimit(key, limit, windowSeconds);
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'anonymous';
}
