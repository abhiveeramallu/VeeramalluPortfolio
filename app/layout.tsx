import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_CONFIG } from '@/data/content';
import { fontVariables } from '@/lib/fonts';
import { SITE_URL } from '@/lib/site';
import { personJsonLd, websiteJsonLd } from '@/lib/seo';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ClientIslands } from '@/components/ui/ClientIslands';
import { JsonLd } from '@/components/ui/JsonLd';
import { PointerVars } from '@/components/art/PointerVars';
import { RevealObserver } from '@/components/art/RevealObserver';

// Before first paint: enable entrance animations only when JS runs, with a failsafe that reveals everything
// if the observer never starts.
const JS_SCRIPT = `document.documentElement.classList.add('js');setTimeout(function(){if(!document.documentElement.classList.contains('reveal-ready'))document.documentElement.classList.remove('js')},4000)`;

const title = `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`;
const description = `${SITE_CONFIG.tagline} Projects in machine learning, full-stack engineering, security and embedded systems, each linked to its GitHub repository.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${SITE_CONFIG.shortName}` },
  description,
  applicationName: SITE_CONFIG.brandName,
  authors: [{ name: SITE_CONFIG.name, url: SITE_URL }],
  creator: SITE_CONFIG.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title,
    description,
    siteName: SITE_CONFIG.brandName,
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#171811',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_SCRIPT }} />
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[10000] -translate-y-24 rounded-pill bg-ink px-5 py-3 font-mono text-sm font-semibold text-night transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="relative min-h-screen outline-none">
          {children}
        </main>
        <Footer />
        <ClientIslands />
        <PointerVars />
        <RevealObserver />
      </body>
    </html>
  );
}
