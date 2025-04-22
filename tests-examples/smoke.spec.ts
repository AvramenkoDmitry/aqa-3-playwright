import { test, expect } from "@playwright/test";

test("Smoke: Successful registration with valid data", async ({ page }) => {
  // Открываем страницу регистрации
  await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
  await page.pause();

  // Кликаем на ссылку "Register"
  await page.locator("#registerOnLogin").click();

  // Заполняем валидные данные
  await page.locator("#userNameOnRegister").fill("validUser123");
  await page.locator("#passwordOnRegister").fill("ValidPass123");

  // Нажимаем кнопку Register
  await page.getByRole("button", { name: "Register" }).click();

  // Проверяем сообщение об успешной регистрации
  await expect(
    page.getByText(
      "Successfully registered! Please, click Back to return on login page"
    )
  ).toBeVisible();
});
