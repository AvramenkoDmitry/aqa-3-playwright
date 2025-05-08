import { Page } from "@playwright/test";

class SignInPage {
  page: Page;
  emailInput: string;
  passwordInput: string;
  loginButton: string;
  errorMessage: string;
  url: string = "https://anatoly-karpovich.github.io/aqa-course-project/";

  constructor(page: Page) {
    this.page = page;
    // Локаторы элементов
    this.emailInput = "#emailinput";
    this.passwordInput = "#passwordinput";
    this.loginButton = 'button[type="submit"]';
    this.errorMessage = "#errorMessage";
  }

  // Метод для навигации на страницу
  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  // Метод для заполнения полей email и password
  async fillCredentials(email: string, password: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
  }

  // Метод для клика по кнопке login
  async clickLoginButton(): Promise<void> {
    await this.page.click(this.loginButton);
  }

  // Метод для получения сообщения об ошибке
  async getErrorMessage(): Promise<string> {
    return await this.page.innerText(this.errorMessage);
  }
}

export { SignInPage };
