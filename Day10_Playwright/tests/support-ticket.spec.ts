
import { test, expect } from '@playwright/test';

// ==========================================
// UI REGRESSION TESTS
// ==========================================

test.describe('Ticket UI Regression Tests', () => {

    test('TC01 - Create ticket with valid details @smoke', async ({ page }) => {
        await page.goto('http://127.0.0.1:8000/');

        const ticketTitle = `Laptop keyboard issue ${Date.now()}`;

        await page.getByLabel(/Ticket Title/).fill(ticketTitle);
        await page.getByLabel('Category').selectOption('Hardware');
        await page.getByLabel('Priority').selectOption('High');
        await page.getByLabel('Description').fill(
            'Laptop keyboard keys are not responding.'
        );

        await page.getByRole('button', { name: 'Submit Ticket' }).click();

        await expect(
            page.getByRole('cell', { name: ticketTitle, exact: true })
        ).toBeVisible();

    });
    test('TC21 - Verify default ticket category @regression', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/');

    await expect(
        page.getByLabel('Category')
    ).toHaveValue('Hardware');
    });
    test('TC22 - Verify default ticket priority @regression', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/');

    await expect(
        page.getByLabel('Priority')
    ).toHaveValue('Medium');
    });
    test('TC23 - Verify successful ticket submission message @regression', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/');

    const ticketTitle = `Success message test ${Date.now()}`;

    await page.getByLabel(/Ticket Title/).fill(ticketTitle);
    await page.getByLabel('Description').fill('Testing success notification.');

    await page.getByRole('button', { name: 'Submit Ticket' }).click();

    await expect(
        page.locator('#alertBox')
    ).toContainText('submitted successfully');
});
test('TC24 - Verify form clears after successful submission @regression', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/');

    const ticketTitle = `Form reset test ${Date.now()}`;

    const titleField = page.getByLabel(/Ticket Title/);
    const descriptionField = page.getByLabel('Description');

    await titleField.fill(ticketTitle);
    await descriptionField.fill('Testing form reset.');

    await page.getByRole('button', { name: 'Submit Ticket' }).click();

    await expect(titleField).toHaveValue('');
    await expect(descriptionField).toHaveValue('');
});
test('TC25 - Filter tickets by High priority @regression', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/');

    const ticketTitle = `High priority test ${Date.now()}`;

    await page.getByLabel(/Ticket Title/).fill(ticketTitle);
    await page.getByLabel('Priority').selectOption('High');
    await page.getByLabel('Description').fill('Testing high priority filter.');

    await page.getByRole('button', { name: 'Submit Ticket' }).click();

    await page.locator('#priorityFilter').selectOption('High');

    await expect(
        page.getByRole('cell', { name: ticketTitle, exact: true })
    ).toBeVisible();
});
test('TC26 - Filter tickets by Low priority @regression', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/');

    const ticketTitle = `Low priority test ${Date.now()}`;

    await page.getByLabel(/Ticket Title/).fill(ticketTitle);
    await page.getByLabel('Priority').selectOption('Low');
    await page.getByLabel('Description').fill('Testing low priority filter.');

    await page.getByRole('button', { name: 'Submit Ticket' }).click();

    await page.locator('#priorityFilter').selectOption('Low');

    await expect(
        page.getByRole('cell', { name: ticketTitle, exact: true })
    ).toBeVisible();
});
test('TC27 - Filter tickets by Open status @regression', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/');

    const ticketTitle = `Open status test ${Date.now()}`;

    await page.getByLabel(/Ticket Title/).fill(ticketTitle);
    await page.getByLabel('Description').fill('Testing open status filter.');

    await page.getByRole('button', { name: 'Submit Ticket' }).click();

    await page.locator('#statusFilter').selectOption('Open');

    await expect(
        page.getByRole('cell', { name: ticketTitle, exact: true })
    ).toBeVisible();
});
test('TC28 - Verify ticket count after filtering @regression', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/');

    await page.locator('#priorityFilter').selectOption('High');

    const ticketCount = page.locator('#ticketCount');
    const initialCount = Number(await ticketCount.textContent());

    const ticketTitle = `Count test ${Date.now()}`;

    await page.getByLabel(/Ticket Title/).fill(ticketTitle);
    await page.getByLabel('Priority').selectOption('High');
    await page.getByLabel('Description').fill('Testing ticket count.');

    await page.getByRole('button', { name: 'Submit Ticket' }).click();

    // Wait until the newly created ticket appears
    await expect(
        page.getByRole('cell', { name: ticketTitle, exact: true })
    ).toBeVisible();

    // Verify that the filtered count has increased
    const finalCount = Number(await ticketCount.textContent());
expect(finalCount).toBeGreaterThan(initialCount);
});
test('TC29 - Verify ticket details in modal @regression', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/');

    const ticketTitle = `Modal details test ${Date.now()}`;
    const description = 'Verifying ticket details modal.';

    await page.getByLabel(/Ticket Title/).fill(ticketTitle);
    await page.getByLabel('Description').fill(description);

    await page.getByRole('button', { name: 'Submit Ticket' }).click();

    const ticketRow = page.getByRole('row').filter({
        hasText: ticketTitle
    });

    await ticketRow.getByRole('button', { name: 'View / Comment' }).click();

    await expect(page.locator('#ticketModal')).toBeVisible();
    await expect(page.locator('#modalTitle')).toContainText(ticketTitle);
    await expect(page.locator('#modalDetails')).toContainText(description);
});
test('TC31 - Verify ticket details modal closes @regression', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/');

    const ticketTitle = `Modal close test ${Date.now()}`;

    await page.getByLabel(/Ticket Title/).fill(ticketTitle);
    await page.getByLabel('Description').fill('Testing modal close button.');

    await page.getByRole('button', { name: 'Submit Ticket' }).click();

    const ticketRow = page.getByRole('row').filter({
        hasText: ticketTitle
    });

    await ticketRow.getByRole('button', { name: 'View / Comment' }).click();

    await expect(page.locator('#ticketModal')).toBeVisible();

    await page.locator('#ticketModal')
        .getByRole('button', { name: 'Close' }).click();

    await expect(page.locator('#ticketModal')).toBeHidden();
});


    test('TC02 - Create ticket with empty title @regression', async ({ page }) => {
        await page.goto('http://127.0.0.1:8000/');

        await page.getByLabel('Category').selectOption('Hardware');
        await page.getByLabel('Priority').selectOption('High');
        await page.getByLabel('Description').fill(
            'Laptop keyboard is not working'
        );

        await page.getByRole('button', { name: 'Submit Ticket' }).click();

        await expect(
            page.getByRole('cell', { name: '', exact: true })
        ).toHaveCount(0);
    });

    test('TC03 - Create ticket with empty description @regression', async ({ page }) => {
        await page.goto('http://127.0.0.1:8000/');

        await page.getByLabel(/Ticket Title/).fill('Missing description test');
        await page.getByLabel('Category').selectOption('Hardware');
        await page.getByLabel('Priority').selectOption('High');

        await page.getByRole('button', { name: 'Submit Ticket' }).click();

        await expect(
            page.getByRole('cell', {
                name: 'Missing description test',
                exact: true
            })
        ).toHaveCount(0);
    });

    test('TC04 - Create ticket with 100 character title @regression', async ({ page }) => {
        await page.goto('http://127.0.0.1:8000/');

        const ticketTitle = 'A'.repeat(100);

        await page.getByLabel(/Ticket Title/).fill(ticketTitle);
        await page.getByLabel('Category').selectOption('Hardware');
        await page.getByLabel('Priority').selectOption('High');
        await page.getByLabel('Description').fill(
            'Testing 100 character title.'
        );

        await page.getByRole('button', { name: 'Submit Ticket' }).click();

        await expect(
            page.getByRole('cell', {
                name: ticketTitle,
                exact: true
            }).first()
        ).toBeVisible();
    });

    test('TC05 - Verify title cannot exceed 100 characters @regression', async ({ page }) => {
        await page.goto('http://127.0.0.1:8000/');

        const ticketTitle = 'A'.repeat(101);
        const titleField = page.getByLabel(/Ticket Title/);

        await titleField.fill(ticketTitle);

        await expect(titleField).toHaveValue('A'.repeat(100));
    });

    test('TC11 - Employee cannot view another employee ticket @regression', async ({ page }) => {
        await page.goto('http://127.0.0.1:8000/');

        const ticketTitle = `Ravi private ticket ${Date.now()}`;

        await page.getByLabel(/Ticket Title/).fill(ticketTitle);
        await page.getByLabel('Category').selectOption('Hardware');
        await page.getByLabel('Priority').selectOption('High');
        await page.getByLabel('Description').fill(
            'Testing employee ticket access.'
        );

        await page.getByRole('button', { name: 'Submit Ticket' }).click();

        await page.getByLabel('Active User:').selectOption({
            label: 'Priya (Employee)'
        });

        await expect(
            page.getByRole('cell', {
                name: ticketTitle,
                exact: true
            })
        ).toHaveCount(0);
    });

});

// ==========================================
// API REGRESSION TESTS
// ==========================================

test.describe('Ticket API Regression Tests', () => {

    test('TC15 - Employee cannot change ticket status @regression', async ({ request }) => {
        const response = await request.post(
            'http://127.0.0.1:8000/api/tickets/1/status',
            {
                headers: {
                    'X-User-Name': 'Ravi',
                    'X-User-Role': 'employee'
                },
                data: {
                    status: 'In Progress'
                }
            }
        );

        expect(response.status()).toBe(403);

        const result = await response.json();

        expect(result.error).toContain(
            'Only support staff can change ticket status.'
        );
    });

    test('TC16 - Support staff can change ticket status @smoke', async ({ request }) => {
        const response = await request.post(
            'http://127.0.0.1:8000/api/tickets/1/status',
            {
                headers: {
                    'X-User-Name': 'Kiran',
                    'X-User-Role': 'support'
                },
                data: {
                    status: 'In Progress'
                }
            }
        );

        expect(response.status()).toBe(200);

        const result = await response.json();

        expect(result.status).toBe('In Progress');
    });

    test('TC30 - Add comment to a closed ticket @regression', async ({ request }) => {

        const closeResponse = await request.post(
            'http://127.0.0.1:8000/api/tickets/1/status',
            {
                headers: {
                    'X-User-Name': 'Kiran',
                    'X-User-Role': 'support'
                },
                data: {
                    status: 'Closed'
                }
            }
        );

        expect(closeResponse.status()).toBe(200);

        const commentResponse = await request.post(
            'http://127.0.0.1:8000/api/tickets/1/comments',
            {
                headers: {
                    'X-User-Name': 'Ravi',
                    'X-User-Role': 'employee'
                },
                data: {
                    text: 'Comment added to closed ticket'
                }
            }
        );

        expect(commentResponse.status()).toBe(201);

        const result = await commentResponse.json();

        expect(result.text).toBe('Comment added to closed ticket');
    });

});
