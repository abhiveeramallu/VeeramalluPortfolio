import type { Metadata } from 'next';
import './globals.css';
import { SITE_CONFIG } from '@/data/content';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { AskMeChat } from '@/components/ui/AskMeChat';
import { GrainOverlay } from '@/components/ui/GrainOverlay';

export const metadata: Metadata = {
  metadataBase: new URL('https://abhiram.design'),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: `${SITE_CONFIG.name} is a ${SITE_CONFIG.role} based in ${SITE_CONFIG.location}. ${SITE_CONFIG.tagline}`,
  keywords: [
    SITE_CONFIG.name,
    SITE_CONFIG.role,
    'Design Engineer',
    'Product Designer',
    'Design Systems',
    'Creative Developer',
    'Three.js',
    'React',
    'Next.js',
  ],
  authors: [{ name: SITE_CONFIG.name, url: 'https://abhiram.design' }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abhiram.design',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.tagline,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.tagline,
    creator: '@abhiram_design',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Person Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    jobTitle: SITE_CONFIG.role,
    url: 'https://abhiram.design',
    sameAs: [
      SITE_CONFIG.socials.linkedin,
      SITE_CONFIG.socials.github,
      SITE_CONFIG.socials.behance,
      SITE_CONFIG.socials.twitter,
    ],
    knowsAbout: [
      'Product Design',
      'Design Systems',
      'User Experience',
      'Design Engineering',
      'Creative Technology',
      'Three.js',
      'Next.js',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-ink bg-bg selection:bg-accent selection:text-white">
        {/* Grain overlay for tactile texture */}
        <GrainOverlay />

        {/* Morphing interactive custom cursor */}
        <CustomCursor />

        {/* Lenis Smooth Scroll wrapper */}
        <SmoothScroll>
          {/* Floating Pill Navbar */}
          <Navbar />

          {/* Main Page Content */}
          <main id="main-content" className="relative z-10 min-h-screen">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Floating "Ask Me" Chat Drawer */}
          <AskMeChat />
        </SmoothScroll>
      </body>
    </html>
  );
}
