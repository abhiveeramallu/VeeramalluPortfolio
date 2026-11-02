/** Contact-form validation shared by the client form and /api/contact, so both agree on every rule. */
export interface ContactInput {
  name: string;
  email: string;
  message: string;
  /** Honeypot: real people never fill this hidden field. */
  website?: string;
}

export type ContactErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export const CONTACT_LIMITS = { nameMax: 80, messageMin: 20, messageMax: 2000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactInput>): ContactErrors {
  const errors: ContactErrors = {};
  const name = (input.name ?? '').trim();
  const email = (input.email ?? '').trim();
  const message = (input.message ?? '').trim();

  if (name.length < 2) errors.name = 'Please tell me your name.';
  else if (name.length > CONTACT_LIMITS.nameMax)
    errors.name = `Keep it under ${CONTACT_LIMITS.nameMax} characters.`;

  if (!EMAIL_RE.test(email)) errors.email = 'That email doesn’t look right — I need it to reply.';

  if (message.length < CONTACT_LIMITS.messageMin)
    errors.message = `A little more detail, please (at least ${CONTACT_LIMITS.messageMin} characters).`;
  else if (message.length > CONTACT_LIMITS.messageMax)
    errors.message = `Please keep it under ${CONTACT_LIMITS.messageMax} characters.`;

  return errors;
}

export const isSpam = (input: Partial<ContactInput>) =>
  Boolean(input.website && input.website.trim().length > 0);
