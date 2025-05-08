import { test, expect } from "@playwright/test";
import { SignInPage } from "ui/pages/customers/SignInPage";

test("Sign in test", async ({ page }) => {
  await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#"); // Указываем URL страницы

  // Ждем, пока страница полностью загрузится
  await page.waitForLoadState("domcontentloaded"); // Или 'load' для полной загрузки

  const signInPage = new SignInPage(page);

  // Пример использования методов
  await signInPage.fillCredentials("username", "password");
  await signInPage.clickLoginButton();

  const errorMessage = await signInPage.getErrorMessage();
  expect(errorMessage).toBe("Credentials are required");
});
