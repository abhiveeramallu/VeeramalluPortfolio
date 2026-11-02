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

test.beforeEach(async ({ page }) => {
  // Skip the once-per-session preloader so tests start on the content.
  await page.addInitScript(() => sessionStorage.setItem('pl', '1'));
});

test('home loads with hero, proof and CTAs', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I design products');
  await expect(page.getByText('Available for full-time roles').first()).toBeVisible();
  await expect(page.getByRole('link', { name: /see my work/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /download résumé/i })).toHaveAttribute('href', '/resume.pdf');
  await page.waitForTimeout(500);
  expect(errors).toEqual([]);
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
    ['Work', '/work', /untangled/],
    ['About', '/about', /engineer/],
    ['Playground', '/playground', /learn/],
  ] as const) {
    if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
    await page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name, exact: true })
      .or(page.locator('#mobile-menu').getByRole('link', { name, exact: true }))
      .first()
      .click();
    await expect(page).toHaveURL(path);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(heading);
  }
  expect(errors).toEqual([]);
});

test('case study renders the full story', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/work/routefusion');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('RouteFusion');
  for (const id of [
    'tldr',
    'problem',
    'constraints',
    'process',
    'decisions',
    'solution',
    'outcome',
    'retro',
  ]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByRole('slider')).toBeAttached(); // before/after
  await expect(page.getByRole('navigation', { name: 'Next project' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('lightbox opens, navigates with keys and closes on Escape', async ({ page }) => {
  await page.goto('/work/routefusion');
  await page
    .getByRole('button', { name: /^Enlarge:/ })
    .first()
    .click({ force: true });
  const dialog = page.getByRole('dialog', { name: /Image viewer/ });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('contact form validates before sending', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Please tell me your name.')).toBeVisible();
  await expect(page.getByText(/doesn’t look right/)).toBeVisible();
  await expect(page.getByLabel('Name')).toBeFocused();

  await page.getByLabel('Name').fill('Alex Morgan');
  await page.getByLabel('Email').fill('alex@company.com');
  await page.getByLabel(/hiring for/).fill('We are hiring a design engineer for our platform team.');
  await page.getByRole('button', { name: 'Send message' }).click();
  // No RESEND_API_KEY in tests → honest fallback to the mail app.
  await expect(page.getByRole('link', { name: /open in mail app/i })).toBeVisible();
  expect(errors).toEqual([]);
});

test('chat streams a grounded answer without an API key', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /ask me anything/i }).click();
  const dialog = page.getByRole('dialog', { name: /Ask about/ });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Are you available?' }).click();
  await expect(dialog.getByText(/hello@/).first()).toBeVisible({ timeout: 10_000 });
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('command palette opens with "?" and navigates', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard shortcut');
  await page.goto('/');
  // Palette and chat hydrate together as lazy islands; wait for them before using the shortcut.
  await expect(page.getByRole('button', { name: /ask me anything/i })).toBeVisible();
  await page.locator('body').press('?');
  const palette = page.getByRole('dialog', { name: 'Command palette' });
  await expect(palette).toBeVisible();
  await page.keyboard.type('threat');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/work/threatlens-ai');
});

test('résumé, sitemap and OG image are served', async ({ request }) => {
  const pdf = await request.get('/resume.pdf');
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/work/routefusion');
  expect(sitemap).toContain('/playground/flow-gradient');
  const og = await request.get('/opengraph-image');
  expect(og.headers()['content-type']).toContain('image/png');
});

test('404 page sells the best work', async ({ page }) => {
  const res = await page.goto('/definitely-not-a-page');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('wrong turn');
  await expect(page.getByRole('link', { name: /RouteFusion/ }).first()).toBeVisible();
});
