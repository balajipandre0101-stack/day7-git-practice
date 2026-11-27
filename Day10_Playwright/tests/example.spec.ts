import { test, expect } from './fixtures';

test('Add and complete todos', async ({ todoPage }) => {

    await todoPage.goto();

    // Add first todo
    await todoPage.addTodo('Learn Playwright');

    // Add second todo
    await todoPage.addTodo('Practice POM');

    // Verify both todos exist
    await expect(todoPage.page.getByText('Learn Playwright')).toBeVisible();
    await expect(todoPage.page.getByText('Practice POM')).toBeVisible();

    // Complete first todo
    await todoPage.toggleTodo('Learn Playwright');

    // Verify completed todo
    const firstTodo = todoPage.todoItems.filter({
        hasText: 'Learn Playwright'
    });

    await expect(firstTodo).toHaveClass(/completed/);

});