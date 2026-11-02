import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/data/content';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { isSpam, validateContact, type ContactInput } from '@/lib/validation';

export const runtime = 'nodejs';

/**
 * Sends the message through Resend when RESEND_API_KEY is set. Without it the API says so honestly
 * (`delivered: false`) and the form offers a pre-filled mailto instead of pretending it worked.
 */
export async function POST(req: Request) {
  const limit = await rateLimit(`contact:${clientIp(req)}`, 5, 60 * 60);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages — please email me directly.' },
      { status: 429, headers: { 'Retry-After': String(limit.resetSeconds) } },
    );
  }

  let body: Partial<ContactInput>;
  try {
    body = (await req.json()) as Partial<ContactInput>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Bots get a silent success so they don't retry.
  if (isSpam(body)) return NextResponse.json({ ok: true, delivered: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: true, delivered: false });

  const name = String(body.name).trim();
  const email = String(body.email).trim();
  const message = String(body.message).trim();

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL ?? SITE_CONFIG.email],
      reply_to: email,
      subject: `Portfolio: message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  });

  if (!res.ok) {
    console.error('[contact] Resend failed with status', res.status);
    return NextResponse.json({ ok: true, delivered: false });
  }
  return NextResponse.json({ ok: true, delivered: true });
}
