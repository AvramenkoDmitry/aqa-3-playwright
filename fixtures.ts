import { test as base, expect, Page } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    // Шаги для логина
    await page.goto("URL_Сайта_для_логина");
    await page.fill('input[name="username"]', "ваш_логин");
    await page.fill('input[name="password"]', "ваш_пароль");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("URL_после_логина");

    await use(page); // передаем страницу в тест
  },
});
