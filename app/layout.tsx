import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_CONFIG } from '@/data/content';
import { fontVariables } from '@/lib/fonts';
import { SITE_URL } from '@/lib/site';
import { personJsonLd, websiteJsonLd } from '@/lib/seo';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { HirePill } from '@/components/ui/HirePill';
import { Preloader } from '@/components/ui/Preloader';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ClientIslands } from '@/components/ui/ClientIslands';
import { JsonLd } from '@/components/ui/JsonLd';
import { PRELOADER_SCRIPT, THEME_SCRIPT } from '@/lib/head-scripts';

const title = `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${SITE_CONFIG.name}` },
  description: `${SITE_CONFIG.tagline} ${SITE_CONFIG.role} in ${SITE_CONFIG.location}. ${SITE_CONFIG.status}.`,
  applicationName: SITE_CONFIG.brandName,
  authors: [{ name: SITE_CONFIG.name, url: SITE_URL }],
  creator: SITE_CONFIG.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title,
    description: SITE_CONFIG.tagline,
    siteName: SITE_CONFIG.brandName,
  },
  twitter: { card: 'summary_large_image', title, description: SITE_CONFIG.tagline },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#F6F4EF',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Decides before first paint whether this session gets the preloader (no flash on repeat visits). */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT + PRELOADER_SCRIPT }} />
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[10000] -translate-y-24 rounded-pill bg-ink px-5 py-3 font-mono text-sm font-semibold text-bg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <GrainOverlay />
        <ScrollProgress />
        <CustomCursor />
        <SmoothScroll />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="relative z-10 min-h-screen outline-none">
          {children}
        </main>
        <Footer />
        <HirePill />
        <ClientIslands />
      </body>
    </html>
  );
}
