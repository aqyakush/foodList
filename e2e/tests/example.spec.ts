import { test, expect } from '@playwright/test';

test('has correct placeholder in search bar', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const searchPlaceholder = page.getByPlaceholder('Search for recipes');

  await expect(searchPlaceholder).toBeVisible();
});
