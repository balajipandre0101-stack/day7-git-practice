import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TicketPage } from '../pages/TicketPage';
import { TicketListPage } from '../pages/TicketListPage';

type MyFixtures = {
    todoPage: TodoPage;
    ticketPage: TicketPage;
    ticketListPage: TicketListPage;
};

export const test = base.extend<MyFixtures>({
    todoPage: async ({ page }, use) => {
        await use(new TodoPage(page));
    },

    ticketPage: async ({ page }, use) => {
        await use(new TicketPage(page));
    },

    ticketListPage: async ({ page }, use) => {
        await use(new TicketListPage(page));
    },
});

export { expect } from '@playwright/test';