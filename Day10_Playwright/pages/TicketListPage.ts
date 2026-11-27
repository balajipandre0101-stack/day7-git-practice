import { Page, Locator } from '@playwright/test';

export class TicketListPage {
    readonly page: Page;
    readonly activeUserDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.activeUserDropdown = page.getByLabel('Active User:');
    }

    async selectActiveUser(user: string) {
        await this.activeUserDropdown.selectOption({ label: user });
    }

    async isTicketVisible(title: string) {
        return await this.page.getByRole('cell', {
            name: title,
            exact: true
        }).isVisible();
    }
}