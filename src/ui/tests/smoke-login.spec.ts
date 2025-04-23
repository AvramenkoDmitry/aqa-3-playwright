import { test, expect } from "@playwright/test";

test("Registration Smoke Test", async ({ page }) => {
  // 1. Переход на страницу регистрации
  await page.goto(
    "https://anatoly-karpovich.github.io/demo-registration-form/"
  );

  // 2. Заполнение формы регистрации
  // Заполняем поле "Username"
  await page.locator("input#firstName").fill("John");

  // Заполняем поле "Password"
  await page.locator("input#lastName").fill("Doe");

  // Заполняем поле "Address"
  await page.locator("#address").fill("Aleja 3 Maja 51B");

  // Заполняем Email
  await page.locator("#email").fill("john.doe@example.com");

  // Заполняем поле "Phone"
  await page.locator("#phone").fill("+1234567890");

  // Выбираем страну из выпадающего списка
  await page.locator("#country").selectOption("USA");

  // Выбираем пол (gender)
  await page.locator('input[name="gender"][value="male"]').check();

  // Отмечаем хобби "Travelling"
  await page.locator('input.hobby[value="Travelling"]').check();

  // Заполняем поле "Language"
  await page.locator("#language").fill("English");

  // Выбираем несколько навыков (Skills)
  await page.locator("#skills").selectOption(["JavaScript"]);

  // Выбираем год
  await page.locator("#year").selectOption("1998");

  // Выбираем месяц
  await page.locator("#month").selectOption("June");

  // Выбираем день
  await page.locator("#day").selectOption("8");

  // Заполняем поле "Password"
  await page.locator("#password").fill("StrongPass123");

  // Заполняем поле "Confirm_Password"
  await page.locator("#password-confirm").fill("StrongPass123");

  // Кликаем по кнопке "Submit"
  await page.locator('button[type="submit"]').click();

  // Проверяем, что текст заголовка соответствует "Registration Details"
  await expect(page.locator("h2.text-center")).toHaveText(
    "Registration Details"
  );

  // Проверяем, что данные отображаются корректно
  await expect(page.locator("#fullName")).toHaveText("John Doe");
  await expect(page.locator("#address")).toHaveText("Aleja 3 Maja 51B");
  await expect(page.locator("#email")).toHaveText("john.doe@example.com");
  await expect(page.locator("#phone")).toHaveText("+1234567890");
  await expect(page.locator("#country")).toHaveText("USA");
  await expect(page.locator("#gender")).toHaveText("male");
  await expect(page.locator("#language")).toHaveText("English");
  await expect(page.locator("#skills")).toHaveText("JavaScript");
  await expect(page.locator("#hobbies")).toHaveText("Travelling");
  await expect(page.locator("#dateOfBirth")).toHaveText("8 June 1998");
});
