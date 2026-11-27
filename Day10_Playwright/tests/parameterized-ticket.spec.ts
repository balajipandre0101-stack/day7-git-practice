
import { test, expect } from './fixtures';

const ticketData = [
    {
        title: 'Login issue',
        category: 'Software',
        priority: 'High',
        description: 'Unable to login to the application.'
    },
    {
        title: 'Payment issue',
        category: 'Hardware',
        priority: 'Medium',
        description: 'Payment system is not responding.'
    },
    {
        title: 'Application error',
        category: 'Software',
        priority: 'Low',
        description: 'Application displays an unexpected error.'
    }
];

test.describe('Parameterized Ticket Creation Tests', () => {

    for (const ticket of ticketData) {

        test(`Create ticket - ${ticket.title} @regression`, async ({
            ticketPage,
            ticketListPage
        }) => {

            await ticketPage.goto();

            const uniqueTitle = `${ticket.title} ${Date.now()}`;

            await ticketPage.createTicket(
                uniqueTitle,
                ticket.category,
                ticket.priority,
                ticket.description
            );

            await expect(
                ticketListPage.page.getByRole('cell', {
                    name: uniqueTitle,
                    exact: true
                })
            ).toBeVisible();

        });
    }
});
