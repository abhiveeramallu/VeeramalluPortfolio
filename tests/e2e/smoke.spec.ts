import { expect, test, type Page } from '@playwright/test';

/** Collects console errors and uncaught exceptions; every test asserts there were none. */
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem('portfolio_intro_seen_v1', 'true');
    } catch {
      // storage unavailable
    }
  });
});

test('multilingual intro displays Abhiram and titles seamlessly when forced or fresh', async ({ page }) => {
  await page.goto('/?intro=true');
  const intro = page.getByRole('dialog', { name: 'Welcome introduction' });
  await expect(intro).toBeVisible();
  await expect(intro).toContainText('ABHIRAM');
  await expect(intro).toContainText('FULL STACK DEVELOPER');
  const skipBtn = intro.getByRole('button', { name: 'Skip introduction' });
  await expect(skipBtn).toBeVisible();
  await skipBtn.click();
  await expect(intro).not.toBeVisible();
});

test('home shows name, intro, CTAs and every project in HTML', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Veeramallu Sai Abhiram');
  await expect(page.getByText('I build intelligent systems').first()).toBeVisible();
  await expect(page.getByRole('link', { name: /see what i’ve built/i })).toHaveAttribute('href', '#projects');
  await expect(page.getByRole('link', { name: /let’s connect/i })).toHaveAttribute('href', '#contact');
  await expect(page.getByRole('link', { name: /r[ée]sum[ée]/i }).first()).toHaveAttribute(
    'href',
    '/resume',
  );
  await expect(page.locator('article[id^="project-"]')).toHaveCount(10);
  await expect(page.getByRole('img', { name: /Illustration for RouteFusion/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /GitHub repository for RouteFusion/ }).first()).toHaveAttribute(
    'href',
    'https://github.com/abhiveeramallu/RouteFusion',
  );
  await page.waitForTimeout(1500);
  expect(errors).toEqual([]);
});

test('primary navigation navigates to the digital résumé page and allows download at bottom', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click();
  }
  const resumeLink = isMobile
    ? page.locator('#mobile-menu').getByRole('link', { name: /r[ée]sum[ée]/i })
    : page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Resume' });
  await expect(resumeLink).toHaveAttribute('href', '/resume');
  await resumeLink.click();
  await expect(page).toHaveURL(/\/resume/);
  const downloadLink = page.locator('#download-section').getByRole('link', { name: /Download Resume/i });
  await expect(downloadLink).toHaveAttribute('href', '/DigitalVeeramalluSaiAbhiram.pdf');
  await expect(downloadLink).toHaveAttribute('download', 'Veeramallu_Sai_Abhiram_Resume.pdf');
});

test('the playground is gone', async ({ page, request }) => {
  expect((await request.get('/playground')).status()).toBe(404);
  expect((await request.get('/playground/flow-gradient')).status()).toBe(404);
  await page.goto('/');
  await expect(page.getByRole('link', { name: /playground/i })).toHaveCount(0);
});

test('every project has its own illustration and no WebGL is loaded', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/');
  await page.mouse.move(300, 300);
  await expect(page.locator('#projects .pop')).toHaveCount(10);
  await expect(page.getByRole('img', { name: /Illustration for ThreatLensAI/ })).toBeVisible();
  await page.waitForTimeout(800);
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('reduced motion keeps every illustration and all content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('img', { name: /Illustration for RouteFusion/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ThreatLensAI' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Say hello/ })).toBeAttached();
});

test('hero shows a single comic character in a 3D pop-up card, not a photo', async ({ page }) => {
  await page.goto('/');
  const hero = page.getByRole('img', { name: /Ideas to execution/ });
  await expect(hero).toBeVisible();
  await expect(hero.locator('svg')).toHaveCount(3); // back, mid and front layers
  expect((await page.request.get('/me/photo.png')).status()).toBe(404);
});

test('skip link moves focus to main content', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard-only check');
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('navigation reaches every top-level page', async ({ page, isMobile }) => {
  const errors = watchErrors(page);
  await page.goto('/');
  for (const [name, path, heading] of [
    ['About', '/about', /Abhiram/],
    ['Contact', '/contact', /talk/],
  ] as const) {
    if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click({ force: true });
    await page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name, exact: true })
      .or(page.locator('#mobile-menu').getByRole('link', { name, exact: true }))
      .first()
      .click();
    await expect(page).toHaveURL(path);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(heading);
  }
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click({ force: true });
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Projects', exact: true })
    .or(page.locator('#mobile-menu').getByRole('link', { name: 'Projects', exact: true }))
    .first()
    .click();
  await expect(page).toHaveURL('/work');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('built');
  expect(errors).toEqual([]);
});

test('projects page lists everything and filters by area', async ({ page, request }) => {
  const errors = watchErrors(page);
  expect((await request.get('/projects', { maxRedirects: 0 })).status()).toBe(308);
  await page.goto('/work');
  const featured = page.locator('[data-areas]');
  await expect(featured).toHaveCount(10);
  await expect(page.locator('#archive h3')).toHaveCount(11);
  await page.getByRole('button', { name: 'Embedded' }).click();
  await expect(page.getByRole('button', { name: 'Embedded' })).toHaveAttribute('aria-pressed', 'true');
  await expect(featured.filter({ visible: true })).toHaveCount(1);
  await page.getByRole('button', { name: 'All' }).click();
  await expect(featured.filter({ visible: true })).toHaveCount(10);
  expect(errors).toEqual([]);
});

test('case study renders the full structure with real links', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/work/threatlens-ai');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ThreatLensAI');
  for (const id of [
    'overview',
    'problem',
    'goals',
    'contribution',
    'architecture',
    'implementation',
    'decisions',
    'challenges',
    'status',
    'limitations',
    'learned',
  ]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByText('50% (4 of 8)')).toBeVisible();
  await expect(page.getByRole('link', { name: /Live demo/ }).first()).toHaveAttribute(
    'href',
    'https://threatlensai-atzs.onrender.com/',
  );
  await expect(page.getByRole('navigation', { name: 'Next project' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('contact form validates and reports delivery honestly', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Please tell me your name.')).toBeVisible();
  await expect(page.getByText(/doesn’t look right/)).toBeVisible();
  await expect(page.getByLabel('Name')).toBeFocused();

  await page.getByLabel('Name').fill('Alex Morgan');
  await page.locator('#email').fill('alex@company.com');
  await page.getByLabel(/talk about/).fill('We have an internship opening on our platform team.');
  await page.getByRole('button', { name: 'Send message' }).click();
  // No RESEND_API_KEY in tests → honest fallback to the mail app, never a fake "sent".
  await expect(page.getByRole('link', { name: /open in mail app/i })).toBeVisible();
  expect(errors).toEqual([]);
});

test('chat answers from content without an API key', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /ask me anything/i }).click();
  const dialog = page.getByRole('dialog', { name: /Ask about/ });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'How can I contact you?' }).click();
  await expect(dialog.getByText(/abhiram97137@gmail\.com/).first()).toBeVisible({ timeout: 10_000 });
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('command palette opens with "?" and navigates', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard shortcut');
  await page.goto('/about');
  // Palette and chat hydrate together as lazy islands; wait for them before using the shortcut.
  await expect(page.getByRole('button', { name: /ask me anything/i })).toBeVisible();
  await page.locator('body').press('?');
  const palette = page.getByRole('dialog', { name: 'Command palette' });
  await expect(palette).toBeVisible();
  await page.keyboard.type('imageguard');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/work/imageguard');
});

test('digital résumé, sitemap and OG image are served', async ({ request }) => {
  const pdf = await request.get('/DigitalVeeramalluSaiAbhiram.pdf');
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  expect((await request.get('/resume.pdf')).status()).toBe(404);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/work/routefusion');
  expect(sitemap).toContain('/DigitalVeeramalluSaiAbhiram.pdf');
  expect(sitemap).not.toContain('playground');
  const og = await request.get('/opengraph-image');
  expect(og.headers()['content-type']).toContain('image/png');
});

test('404 page leads back to the archive', async ({ page }) => {
  const res = await page.goto('/definitely-not-a-page');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('missing');
  await expect(page.getByRole('link', { name: /RouteFusion/ }).first()).toBeVisible();
});

test('multilingual intro displays fixed typography and can be skipped', async ({ page }) => {
  await page.goto('/?intro=true');
  const dialog = page.getByRole('dialog', { name: /Welcome introduction/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('ABHIRAM')).toBeVisible();
  await expect(dialog.getByText(/Full Stack Developer/i)).toBeVisible();
  const skipButton = dialog.getByRole('button', { name: /Skip/i });
  await expect(skipButton).toBeVisible();
  await skipButton.click();
  await expect(dialog).toBeHidden({ timeout: 5000 });
});
