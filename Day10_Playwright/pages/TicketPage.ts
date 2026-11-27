import { Page, Locator } from '@playwright/test';

export class TicketPage {

    readonly page: Page;
    readonly titleInput: Locator;
    readonly categoryDropdown: Locator;
    readonly priorityDropdown: Locator;
    readonly descriptionInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.titleInput = page.getByLabel(/Ticket Title/);
        this.categoryDropdown = page.getByLabel('Category');
        this.priorityDropdown = page.getByLabel('Priority');
        this.descriptionInput = page.getByLabel('Description');
        this.submitButton = page.getByRole('button', {
            name: 'Submit Ticket'
        });
    }

    async goto() {
        await this.page.goto('http://127.0.0.1:8000/');
    }

    async createTicket(
        title: string,
        category: string,
        priority: string,
        description: string
    ) {
        await this.titleInput.fill(title);
        await this.categoryDropdown.selectOption(category);
        await this.priorityDropdown.selectOption(priority);
        await this.descriptionInput.fill(description);
        await this.submitButton.click();
    }
}