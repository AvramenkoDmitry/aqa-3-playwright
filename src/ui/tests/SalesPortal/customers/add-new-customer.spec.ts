import test, { expect } from "@playwright/test";
import { COUNTRIES } from "data/customers/countries.data";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/customers/SignInPage";
import { DeleteCustomerModal } from "ui/pages/customers/delete-customer.modal";

const EMAIL = "username";
const PASSWORD = "password";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should create customer with smoke data", async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);
    const deleteCustomerModal = new DeleteCustomerModal(page);
    // Зайти на сайт
    await signInPage.navigate();
    // Залогиниться
    await signInPage.fillCredentials(EMAIL, PASSWORD);
    await signInPage.clickLoginButton();

    // Перейти на страницу Customers
    await homePage.waitForOpened();
    // Перейти на страницу Add New Customer
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    //  Создать покупателя
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    // Проверка созданного покупателя
    await customersPage.expectFirstRowToMatch(data);
    // 7. Кликнуть на кнопку "Delete" для созданного покупателя
    await customersPage.clickDeleteCustomer();

    // 8. В модалке удаления кликнуть кнопку Yes, Delete
    await deleteCustomerModal.confirmDelete();

    // 9. Дождаться исчезновения модалки и загрузки страницы
    await customersPage.waitForOpened();

    // 10. Проверить, что покупатель отсутствует в таблице
    const firstRowData = await customersPage.getFirstRowData();
    expect(firstRowData.email).not.toBe(data.email);
  });
});

test("Should NOT create customer with duplicated email", async ({ page }) => {
  const homePage = new HomePage(page);
  const customersPage = new CustomersPage(page);
  const addNewCustomerPage = new AddNewCustomerPage(page);
  await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
  await page.locator("#emailinput").fill("test@gmail.com");
  await page.locator("#passwordinput").fill("12345678");
  await page.getByRole("button", { name: "Login" }).click();

  await homePage.waitForOpened();
  await homePage.clickModuleButton("Customers");
  await customersPage.waitForOpened();
  await customersPage.clickAddNewCustomer();
  await addNewCustomerPage.waitForOpened();
  const data = generateCustomerData();
  await addNewCustomerPage.fillInputs(data);
  await addNewCustomerPage.clickSaveNewCustomer();
  await customersPage.waitForOpened();
  await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

  await customersPage.clickAddNewCustomer();
  await addNewCustomerPage.waitForOpened();
  await addNewCustomerPage.fillInputs(
    generateCustomerData({ email: data.email })
  );
  await addNewCustomerPage.clickSaveNewCustomer();
  await customersPage.waitForNotification(
    NOTIFICATIONS.CUSTOMER_DUPLICATED(data.email)
  );
});
