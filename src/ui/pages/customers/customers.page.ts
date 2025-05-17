import { expect, Locator, Page } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";
import { DeleteCustomerModal } from "./delete-customer.modal";

export class CustomersPage extends SalesPortalPage {
  addNewCustomerButton = this.page.getByRole("button", {
    name: "Add Customer",
  });

  deleteCustomerButton = this.page.locator('button[title="Delete"]'); // Кнопка удаления
  uniqueElement = this.addNewCustomerButton;

  // Конструктор для инициализации локаторов
  constructor(page: Page) {
    super(page);
  }

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async clickDeleteCustomer() {
    // Берём первую строку таблицы
    const firstRow = this.page.locator("table tbody tr").first();
    // Находим кнопку удаления внутри этой строки
    const deleteButton = firstRow.locator('button[title="Delete"]');
    await expect(deleteButton).toBeVisible({ timeout: 5000 });
    await deleteButton.click();
  }

  async confirmDelete(customerEmail: string) {
    // Используем DeleteCustomerModal
    const deleteCustomerModal = new DeleteCustomerModal(this.page);

    // Вызов метода confirmDelete из модалки
    await deleteCustomerModal.confirmDelete();
  }

  async getFirstRowData() {
    const firstRow = this.page.locator("tbody tr").first();
    const cells = firstRow.locator("td");
    const values = await cells.allTextContents();
    return {
      email: values[0],
      name: values[1],
      country: values[2],
    };
  }

  async expectFirstRowToMatch(data: {
    email: string;
    name: string;
    country: string;
  }) {
    const firstRow = this.page.locator("tbody tr").first();
    const cells = firstRow.locator("td");
    await expect(cells.nth(0)).toHaveText(data.email);
    await expect(cells.nth(1)).toHaveText(data.name);
    await expect(cells.nth(2)).toHaveText(data.country);
  }
}
