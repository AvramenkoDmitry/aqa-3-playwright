import { test, expect } from "@playwright/test";

test("Login and navigate", async ({ page }) => {
  // Открыть URL
  await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");

  // Ввести данные для входа
  await page.locator('input[type="email"]').fill("test@gmail.com");
  await page.locator('input[type="password"]').fill("12345678");

  // Нажать на кнопку для входа
  await page.locator('button[type="submit"]').click();

  // Дождаться исчезновения спиннера
  await page.locator("div.spinner").waitFor({ state: "hidden" });

  // Проверить, что пользователь вошел с логином "Anatoly"
  const userName = await page.locator("a#dropdownUser1 strong").textContent();
  expect(userName).toBe("Anatoly");

  // Проверить, что выбранная страница — "Home"
  const selectedMenu = await page.locator("a.nav-link.active").textContent();
  expect(selectedMenu?.trim()).toBe("Home");

  // Ожидаем, что элемент #sidebar станет видимым
  const sidebar = await page.locator("#sidebar");

  // Ждем, пока элемент станет видимым
  await sidebar.waitFor({ state: "visible", timeout: 10000 });

  // Делаем скриншот бокового меню с выбранной страницей
  await sidebar.screenshot({ path: "./screenshots/sidebar_home.png" });
});
