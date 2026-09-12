import { chromium, expect } from '@playwright/test';
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(process.env.TEST_URL || 'http://localhost:5173');
  await expect(page.locator('.project-card')).toHaveCount(22);
  await page.getByRole('tab', { name: 'Forks' }).click();
  await expect(page.locator('.project-card')).toHaveCount(13);
  await expect(page.getByRole('heading', { name: 'linux', exact: true })).toBeVisible();
  await page.getByRole('searchbox').fill('linux');
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.getByRole('searchbox').fill('no-such-repository-xyz');
  await expect(page.getByRole('heading', { name: 'No projects found' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('.project-card')).toHaveCount(13);
  await page.getByRole('tab', { name: 'My projects' }).click();
  await page.getByLabel('Filter by language').selectOption('Swift');
  await expect(page.locator('.project-card')).toHaveCount(3);
  await page.getByLabel('Filter by language').selectOption('');
  await page.getByLabel('Sort repositories').selectOption('name');
  await expect(page.locator('.project-card h3').first()).toHaveText('api');
  await page.getByRole('tab', { name: 'My projects' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Forks' })).toBeFocused();
  await page.reload();
  await expect(page.getByRole('tab', { name: 'Forks' })).toHaveAttribute('aria-selected', 'true');
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.getByRole('tab', { name: 'My projects' }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width === 390) await page.screenshot({ path: 'test-results/mobile.png', fullPage: false });
  }
  expect(errors).toEqual([]);
  console.log('Browser checks passed: tabs, search, empty state, filters, sorting, keyboard navigation, deep links, responsive widths, and no runtime errors.');
} finally { await browser.close(); }
