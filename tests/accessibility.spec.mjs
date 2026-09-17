import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('cumple WCAG 2.0 nivel AA', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});