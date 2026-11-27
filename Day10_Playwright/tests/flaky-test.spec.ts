import { test, expect } from '@playwright/test';

test('Fixed test - Reliable element wait', async ({ page }, testInfo) => {

    await page.setContent('<div id="status"></div>');

    const delay = testInfo.repeatEachIndex % 2 === 0 ? 50 : 300;

    await page.evaluate((time) => {
        setTimeout(() => {
            document.querySelector('#status')!.textContent = 'Ready';
        }, time);
    }, delay);

    // Wait automatically until the expected text appears
    await expect(page.locator('#status')).toHaveText('Ready');
});