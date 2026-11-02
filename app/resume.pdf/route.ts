import { buildResumePdf } from '@/lib/resume/build';
import { SITE_CONFIG } from '@/data/content';

// Rendered once at build time and served as a static file.
export const dynamic = 'force-static';

export async function GET() {
  const pdf = await buildResumePdf();
  const filename = `${SITE_CONFIG.name.replace(/\s+/g, '-')}-Resume.pdf`;
  return new Response(Buffer.from(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
