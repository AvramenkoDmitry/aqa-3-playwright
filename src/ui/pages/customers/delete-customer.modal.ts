import { Locator, Page } from "@playwright/test";

export class DeleteCustomerModal {
  page: Page;
  modal: Locator;
  confirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Селектор для модалки
    this.modal = this.page.locator(".modal");
    // Кнопка подтверждения удаления
    this.confirmButton = this.modal.locator('button:has-text("Yes, Delete")');
  }

  // Метод для подтверждения удаления
  async confirmDelete() {
    await this.confirmButton.click();
    // Ожидаем, что модалка исчезнет, передаем строку селектора
    await this.page.waitForSelector(".modal", { state: "detached" });
    // Добавляем небольшую задержку для стабильности
    await this.page.waitForTimeout(500);
  }
}
