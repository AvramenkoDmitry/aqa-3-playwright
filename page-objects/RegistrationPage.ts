import { Page } from "@playwright/test";

export class RegistrationPage {
  private page: Page;
  private usernameField = "#userNameOnRegister";
  private passwordField = "#passwordOnRegister";
  private submitButton = "#register";
  private errorMessage = "#errorMessageOnRegister";
  private registerButton = "#registerOnLogin"; // Новый локатор для кнопки регистрации

  constructor(page: Page) {
    this.page = page;
  }

  // Навигация на страницу
  async navigate() {
    await this.page.goto(
      "https://anatoly-karpovich.github.io/demo-login-form/"
    );
  }

  // Клик по кнопке регистрации (для перехода к форме)
  async clickRegisterButton() {
    await this.page.click(this.registerButton);
  }

  // Заполнение поля для имени пользователя
  async fillUsername(username: string) {
    await this.page.fill(this.usernameField, username);
  }

  // Заполнение поля для пароля
  async fillPassword(password: string) {
    await this.page.fill(this.passwordField, password);
  }

  // Клик по кнопке регистрации (отправка формы)
  async submit() {
    await this.page.click(this.submitButton);
  }

  // Получение сообщения об ошибке
  async getErrorMessage() {
    return await this.page.locator(this.errorMessage).innerText();
  }
}
