import { test, expect } from "@playwright/test";

test("Dynamic Controls: checkbox add/remove flow", async ({ page }) => {
  // Открываем главную страницу
  await page.goto("https://the-internet.herokuapp.com/");

  // Переходим на страницу Dynamic Controls
  await page.getByRole("link", { name: "Dynamic Controls" }).click();

  // Ждем появления кнопки Remove
  const removeButton = page.getByRole("button", { name: "Remove" });
  await expect(removeButton).toBeVisible();

  // Валидируем текст заголовка страницы
  await expect(
    page.getByRole("heading", { name: "Dynamic Controls" })
  ).toBeVisible();

  // Чекбокс
  const checkbox = page.locator("#checkbox input[type='checkbox']");
  await expect(checkbox).toBeVisible();
  await checkbox.check();

  // Кликаем по кнопке Remove
  await removeButton.click();

  // Ждем исчезновения чекбокса
  await expect(checkbox).toBeHidden({ timeout: 10000 });

  // Проверяем наличие кнопки Add
  const addButton = page.getByRole("button", { name: "Add" });
  await expect(addButton).toBeVisible();

  // Завалидировать текст "It's gone!"
  await expect(page.locator("#message")).toHaveText("It's gone!");

  // Кликаем на кнопку Add
  await addButton.click();

  // Ждем появления чекбокса
  const checkbox2 = page.locator("#checkbox");
  await expect(checkbox2).toBeVisible({ timeout: 10000 });

  // Завалидировать текст "It's back!"
  await expect(page.locator("#message")).toHaveText("It's back!");
});
