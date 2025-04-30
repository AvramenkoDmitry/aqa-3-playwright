// tests/registration-negative.spec.ts
import { test, expect } from "@playwright/test";
import { TestCase } from "../../../../types/testData";
import { RegistrationPage } from "../../../../page-objects/RegistrationPage";

const negativeTestCases: TestCase[] = [
  {
    username: "",
    password: "Password123",
    error: "Username is required",
    description: "Пустое имя пользователя",
  },
  {
    username: "ab",
    password: "Password123",
    error: "Username should contain at least 3 characters",
    description: "Имя пользователя слишком короткое",
  },
  // Такой валидации нету на странице
  // {
  //   username: "a".repeat(41),
  //   password: "Password123",
  //   error: "Username must be at most 40 characters",
  //   description: "Имя пользователя слишком длинное",
  // },
  // Тесты для пароля
  {
    username: "validUser",
    password: "",
    error: "Password is required",
    description: "Пустой пароль",
  },
  {
    username: "validUser",
    password: "short",
    error: "Password should contain at least 8 characters",
    description: "Пароль слишком короткий",
  },
  // Такой валидации нету на странице
  // {
  //   username: "validUser",
  //   password: "a".repeat(21),
  //   error: "Password must be at most 20 characters",
  //   description: "Пароль слишком длинный",
  // },
  // {
  //   username: "validUser",
  //   password: "password123",
  //   error: "Password should contain at least one character in lower case",
  //   description: "Пароль без заглавной буквы",
  // },
  {
    username: "validUser",
    password: "PASSWORD123",
    error: "Password should contain at least one character in lower case",
    description: "Пароль без строчной буквы",
  },
  {
    username: "validUser",
    password: "         ",
    error: "Password is required",
    description: "Пароль состоит только из пробелов",
  },
];

test.describe("Negative Registration Tests", () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
    // Нажимаем кнопку регистрации, чтобы открыть форму
    await registrationPage.clickRegisterButton();
  });

  for (const testCase of negativeTestCases) {
    test(`${testCase.description}`, async () => {
      // Заполняем форму регистрации
      await registrationPage.fillUsername(testCase.username);
      await registrationPage.fillPassword(testCase.password);
      await registrationPage.submit();

      // Получаем сообщение об ошибке
      const error = await registrationPage.getErrorMessage();
      expect(error).toContain(testCase.error);
    });
  }
});
