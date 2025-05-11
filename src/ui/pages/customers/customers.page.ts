import { expect, Locator } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";

export class CustomersPage extends SalesPortalPage {
  addNewCustomerButton = this.page.getByRole("button", {
    name: "Add Customer",
  });

  uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
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
