import { expect, test } from '@playwright/test';

test('visible city', async ({ page }) => {
	await page.goto('/flights/listing');
	expect(await page.isVisible("New Delhi"));
});


