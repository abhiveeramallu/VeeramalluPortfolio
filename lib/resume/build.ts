import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import { SITE_CONFIG } from '@/data/content';
import { SITE_URL } from '@/lib/site';
import { toWinAnsi, wrapText } from './text';

const hex = (h: string) => {
  const n = parseInt(h.replace('#', ''), 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

const C = {
  ink: hex('#171811'),
  muted: hex('#5C5A50'),
  line: hex('#DDD8C4'),
  deep: hex('#171811'),
  ice: hex('#F4F0DE'),
  accent: hex('#E5C542'),
  accentText: hex('#20594F'),
};

// A4 in points.
const W = 595.28;
const H = 841.89;
const M = 44;
const COL = W - M * 2;

interface Fonts {
  regular: PDFFont;
  bold: PDFFont;
  mono: PDFFont;
}

class Writer {
  y: number;
  constructor(
    private page: PDFPage,
    private fonts: Fonts,
    startY: number,
  ) {
    this.y = startY;
  }

  text(
    raw: string,
    opts: {
      size?: number;
      font?: keyof Fonts;
      color?: ReturnType<typeof rgb>;
      x?: number;
      width?: number;
      leading?: number;
    } = {},
  ) {
    const { size = 9.5, font = 'regular', color = C.ink, x = M, width = COL, leading = 1.38 } = opts;
    const f = this.fonts[font];
    const lines = wrapText(toWinAnsi(raw), width, (s) => f.widthOfTextAtSize(s, size));
    for (const line of lines) {
      this.y -= size * leading;
      this.page.drawText(line, { x, y: this.y, size, font: f, color });
    }
  }

  gap(n: number) {
    this.y -= n;
  }

  section(title: string) {
    this.gap(14);
    this.page.drawText(toWinAnsi(title.toUpperCase()), {
      x: M,
      y: this.y - 8,
      size: 8,
      font: this.fonts.mono,
      color: C.accentText,
    });
    this.page.drawLine({
      start: { x: M + 110, y: this.y - 5 },
      end: { x: W - M, y: this.y - 5 },
      thickness: 0.6,
      color: C.line,
    });
    this.gap(14);
  }
}

/** Builds the brand-styled one-page résumé straight from content.ts (single source of truth). */
export async function buildResumePdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`${SITE_CONFIG.name} — Résumé`);
  doc.setAuthor(SITE_CONFIG.name);
  doc.setSubject(SITE_CONFIG.role);
  doc.setKeywords(['software engineering', 'machine learning', 'résumé']);
  doc.setCreator(SITE_URL);

  const page = doc.addPage([W, H]);
  const fonts: Fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    mono: await doc.embedFont(StandardFonts.Courier),
  };

  // Header band
  page.drawRectangle({ x: 0, y: H - 132, width: W, height: 132, color: C.deep });
  page.drawRectangle({ x: 0, y: H - 135, width: W, height: 3, color: C.accent });
  page.drawText(toWinAnsi(SITE_CONFIG.name), { x: M, y: H - 70, size: 26, font: fonts.bold, color: C.ice });
  page.drawText(toWinAnsi(SITE_CONFIG.role), {
    x: M,
    y: H - 92,
    size: 12,
    font: fonts.regular,
    color: C.accent,
  });
  const contact = [
    SITE_CONFIG.email,
    SITE_URL.replace(/^https?:\/\//, ''),
    SITE_CONFIG.location,
    SITE_CONFIG.socials.github.replace(/^https?:\/\//, ''),
  ].join('   ·   ');
  page.drawText(toWinAnsi(contact), { x: M, y: H - 114, size: 8.5, font: fonts.mono, color: hex('#D6D1BC') });

  const w = new Writer(page, fonts, H - 150);
  w.text(SITE_CONFIG.subline, { size: 10, color: C.ink, leading: 1.45 });

  w.section('Education');
  for (const j of SITE_CONFIG.journey) {
    w.gap(2);
    w.text(`${j.title} — ${j.org}`, { font: 'bold', size: 10 });
    w.text(j.period, { font: 'mono', size: 8, color: C.muted });
  }

  w.section('Projects');
  for (const p of SITE_CONFIG.projects.slice(0, 6)) {
    w.gap(3);
    w.text(`${p.title}  —  ${p.category} · ${p.status}`, { font: 'bold', size: 10 });
    w.text(p.summary, { color: C.ink, size: 9 });
    w.text(`${p.stack.slice(0, 6).join(' · ')}   |   ${p.repoUrl.replace(/^https:\/\//, '')}`, {
      font: 'mono',
      size: 7.5,
      color: C.accentText,
    });
  }

  w.section('Skills');
  for (const g of SITE_CONFIG.skills) {
    w.text(`${g.group}: ${g.items.join(', ')}`, { size: 9, leading: 1.45 });
  }

  // The résumé must stay on one page; fail the build (and the unit test) instead of overprinting the footer.
  if (w.y < 60) throw new Error(`Résumé content overflows the page (y=${w.y.toFixed(0)})`);

  // Footer
  page.drawLine({ start: { x: M, y: 46 }, end: { x: W - M, y: 46 }, thickness: 0.6, color: C.line });
  page.drawText(
    toWinAnsi(`Case studies, sources and live demos: ${SITE_URL.replace(/^https?:\/\//, '')}/work`),
    {
      x: M,
      y: 32,
      size: 8,
      font: fonts.mono,
      color: C.muted,
    },
  );

  return doc.save();
}
