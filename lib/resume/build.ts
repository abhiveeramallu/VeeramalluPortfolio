import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import { SITE_CONFIG } from '@/data/content';
import { SITE_URL } from '@/lib/site';
import { toWinAnsi, wrapText } from './text';

const hex = (h: string) => {
  const n = parseInt(h.replace('#', ''), 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

const C = {
  ink: hex('#111111'),
  muted: hex('#5E5E59'),
  line: hex('#E4E0D8'),
  orange: hex('#FF5A1F'),
  orangeText: hex('#BD3D0C'),
  bg: hex('#F6F4EF'),
  lime: hex('#C6F432'),
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
      color: C.orangeText,
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
  doc.setKeywords(['product design', 'design engineering', 'résumé']);
  doc.setCreator(SITE_URL);

  const page = doc.addPage([W, H]);
  const fonts: Fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    mono: await doc.embedFont(StandardFonts.Courier),
  };

  // Header band
  page.drawRectangle({ x: 0, y: H - 132, width: W, height: 132, color: C.ink });
  page.drawRectangle({ x: 0, y: H - 136, width: W, height: 4, color: C.orange });
  page.drawText(toWinAnsi(SITE_CONFIG.name), { x: M, y: H - 70, size: 30, font: fonts.bold, color: C.bg });
  page.drawText(toWinAnsi(SITE_CONFIG.role), {
    x: M,
    y: H - 92,
    size: 12,
    font: fonts.regular,
    color: C.orange,
  });
  const contact = [
    SITE_CONFIG.email,
    SITE_URL.replace(/^https?:\/\//, ''),
    SITE_CONFIG.location,
    SITE_CONFIG.socials.github.replace(/^https?:\/\//, ''),
  ].join('   ·   ');
  page.drawText(toWinAnsi(contact), { x: M, y: H - 114, size: 8.5, font: fonts.mono, color: hex('#C9C7C0') });

  // Availability chip
  const chip = toWinAnsi(`${SITE_CONFIG.status} ${SITE_CONFIG.availability}`);
  const chipW = fonts.bold.widthOfTextAtSize(chip, 8) + 20;
  page.drawRectangle({ x: W - M - chipW, y: H - 76, width: chipW, height: 18, color: C.lime });
  page.drawText(chip, { x: W - M - chipW + 10, y: H - 70.5, size: 8, font: fonts.bold, color: C.ink });

  const w = new Writer(page, fonts, H - 150);
  w.text(SITE_CONFIG.subline, { size: 10.5, color: C.ink, leading: 1.45 });

  w.section('Selected work');
  for (const p of SITE_CONFIG.projects.slice(0, 4)) {
    w.gap(4);
    w.text(`${p.title}  —  ${p.role}, ${p.year}`, { font: 'bold', size: 10.5 });
    w.text(p.tagline, { color: C.muted });
    const metrics = p.metrics
      .slice(0, 3)
      .map((m) => `${m.value} ${m.label.toLowerCase()}`)
      .join('   ·   ');
    w.text(metrics, { font: 'mono', size: 8, color: C.orangeText });
  }

  w.section('Experience & education');
  for (const j of SITE_CONFIG.journey) {
    w.gap(3);
    w.text(`${j.role}, ${j.company}`, { font: 'bold', size: 10 });
    w.text(`${j.period} · ${j.location}`, { font: 'mono', size: 8, color: C.muted });
    w.text(j.description, { color: C.ink });
  }

  w.section('Skills');
  w.text([...SITE_CONFIG.skillsRow1, ...SITE_CONFIG.skillsRow2].join(' · '), { leading: 1.5 });

  w.section('Tools');
  w.text(SITE_CONFIG.tools.map((t) => t.name).join(' · '));

  // Footer
  page.drawLine({ start: { x: M, y: 46 }, end: { x: W - M, y: 46 }, thickness: 0.6, color: C.line });
  page.drawText(
    toWinAnsi(`Case studies, process and live demos: ${SITE_URL.replace(/^https?:\/\//, '')}/work`),
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
