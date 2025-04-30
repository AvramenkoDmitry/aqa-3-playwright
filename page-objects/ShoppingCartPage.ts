// page-objects/ShoppingCartPage.ts
import { Page } from "@playwright/test";

export class ShoppingCartPage {
  private page: Page;
  private cartBadge = "#badge-number";
  private checkoutButton = "#shopping-cart-btn";
  private productNames = "#amount-of-products-in-cart";
  private totalPrice = "#total-price"; // Всё это поле
  private promoCodeInput = "#rebate-input";
  private applyPromoButton = "#apply-promocode-button";
  private finalTotal = "#total-price"; // Используем тот же селектор
  private checkoutSubmitButton = "#continue-to-checkout-button";
  private orderTotal = ".text-muted";
  private addToCartButtons = 'button[name="add-to-card"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(
      "https://anatoly-karpovich.github.io/demo-shopping-cart/"
    );
  }

  async addProductsToCart() {
    const buttons = await this.page.locator(this.addToCartButtons);
    const indicesToClick = [1, 3, 5, 7, 9]; // Индексы товаров

    for (const index of indicesToClick) {
      const button = buttons.nth(index);
      await button.waitFor({ state: "visible" });
      await button.click();
      await this.page.waitForTimeout(300); // Небольшая пауза
    }
  }

  async getBadgeCount() {
    return await this.page.locator(this.cartBadge).innerText();
  }

  async goToCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = await this.page.locator(".text-muted.fw-bold");
    const prices = await priceElements.allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "").trim()));
  }

  async getTotalPrice(): Promise<number> {
    const totalPrice = await this.page.locator(this.totalPrice).innerText();
    return parseFloat(totalPrice.replace("$", "").trim());
  }

  async applyPromoCode(promoCode: string) {
    await this.page.fill(this.promoCodeInput, ""); // очищаем
    await this.page.fill(this.promoCodeInput, promoCode);
    await this.page.click(this.applyPromoButton);
    await this.page
      .locator(`span.my-0`, { hasText: promoCode })
      .waitFor({ timeout: 2000 });
  }

  async getAppliedPromoCodes(): Promise<string[]> {
    return await this.page.locator("span.my-0").allTextContents();
  }

  // Используем тот же селектор для finalTotal
  async getFinalTotal(): Promise<string> {
    const fullText = await this.page.locator(this.finalTotal).innerText();
    const match = fullText.match(/\$[\d.]+/);
    return match ? match[0] : "$0";
  }

  async completeCheckout() {
    await this.page.click(this.checkoutSubmitButton);
  }

  async getOrderTotal(): Promise<string> {
    return await this.page.locator(this.orderTotal).innerText();
  }
}
