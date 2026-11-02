/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in production; falls back to the Vercel URL, then the brand domain. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://abhiram.design')
).replace(/\/$/, '');

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const REPO_URL = 'https://github.com/abhiveeramallu/VeeramalluPortfolio';
export const sourceUrl = (path: string) => `${REPO_URL}/blob/main/${path}`;
