import { describe, expect, it } from 'vitest';
import { isSpam, validateContact } from '@/lib/validation';
import { memoryLimit } from '@/lib/rate-limit';

describe('validateContact', () => {
  const ok = {
    name: 'Alex Morgan',
    email: 'alex@company.com',
    message: 'We are hiring a design engineer for our platform team.',
  };

  it('accepts a valid message', () => {
    expect(validateContact(ok)).toEqual({});
  });

  it('flags each invalid field', () => {
    const errors = validateContact({ name: 'A', email: 'not-an-email', message: 'too short' });
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name']);
  });

  it('enforces maximum lengths', () => {
    expect(validateContact({ ...ok, name: 'x'.repeat(81) }).name).toBeDefined();
    expect(validateContact({ ...ok, message: 'x'.repeat(2001) }).message).toBeDefined();
  });

  it('detects the honeypot', () => {
    expect(isSpam({ ...ok, website: 'http://spam.example' })).toBe(true);
    expect(isSpam(ok)).toBe(false);
  });
});

describe('memoryLimit', () => {
  it('allows up to the limit then blocks until the window resets', () => {
    const key = `test-${Math.random()}`;
    const t0 = 1_000_000;
    expect(memoryLimit(key, 2, 60, t0).ok).toBe(true);
    expect(memoryLimit(key, 2, 60, t0 + 1).ok).toBe(true);
    const blocked = memoryLimit(key, 2, 60, t0 + 2);
    expect(blocked.ok).toBe(false);
    expect(blocked.resetSeconds).toBeGreaterThan(0);
    expect(memoryLimit(key, 2, 60, t0 + 61_000).ok).toBe(true);
  });
});
