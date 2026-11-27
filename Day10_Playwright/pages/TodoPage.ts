import { Page, Locator } from '@playwright/test';

export class TodoPage {

    readonly page: Page;
    readonly todoInput: Locator;
    readonly todoItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.todoInput = page.getByRole('textbox', {
            name: 'What needs to be done?'
        });
        this.todoItems = page.getByRole('listitem');
    }

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc/');
    }

    async addTodo(todo: string) {
        await this.todoInput.fill(todo);
        await this.todoInput.press('Enter');
    }

    async toggleTodo(todo: string) {
        const item = this.todoItems.filter({ hasText: todo });
        await item.getByLabel('Toggle Todo').check();
    }

}