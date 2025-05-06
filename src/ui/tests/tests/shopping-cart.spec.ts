import { test, expect } from "@playwright/test";
import { ShoppingCartPage } from "../../../../page-objects/ShoppingCartPage";

test("Shopping Cart Test with single promo code", async ({ page }) => {
  const shoppingCartPage = new ShoppingCartPage(page);

  // Шаг 1: Переходим на страницу и добавляем товары
  await shoppingCartPage.navigate();
  await shoppingCartPage.addProductsToCart();

  // Шаг 2: Проверка количества товаров в бейдже
  const badgeCount = await shoppingCartPage.getBadgeCount();
  expect(badgeCount).toBe("5");

  // Шаг 3: Открыть чекаут
  await shoppingCartPage.goToCheckout();

  // Шаг 4: Проверка суммы товаров до применения промокодов
  const productPrices = await shoppingCartPage.getProductPrices();
  const expectedTotal = productPrices.reduce((acc, price) => acc + price, 0);
  console.log("Expected Total (before promo):", expectedTotal.toFixed(2));

  const actualTotal = await shoppingCartPage.getTotalPrice();
  console.log("Actual Total (before promo):", actualTotal.toFixed(2));
  expect(actualTotal).toBeCloseTo(expectedTotal, 2);

  // Шаг 5: Применяем только один промокод
  const promoCode = "HOT-COURSE";
  console.log(`Applying promo code: ${promoCode}`);
  await shoppingCartPage.applyPromoCode(promoCode);

  // Шаг 6: Проверяем итоговую сумму после применения скидки 10%
  const finalTotalText = await shoppingCartPage.getFinalTotal(); // строка типа "$5085.00 (-$565.00)"
  const finalTotalValue = parseFloat(
    finalTotalText.replace("$", "").split(" ")[0]
  );
  console.log("Final Total (after promo):", finalTotalValue.toFixed(2));

  const expectedFinalTotal = expectedTotal * 0.9;
  console.log(
    "Expected Final Total (after promo):",
    expectedFinalTotal.toFixed(2)
  );

  expect(finalTotalValue).toBeCloseTo(expectedFinalTotal, 2);

  // Шаг 7: Завершение оформления
  await shoppingCartPage.clickCheckoutButton();

  // Шаг 8: Проверка суммы в финальном заказе
  const orderTotalText = await shoppingCartPage.getOrderTotal();
  const orderTotalValue = parseFloat(orderTotalText.replace("$", ""));
  console.log("Order Total after checkout:", orderTotalValue.toFixed(2));
  expect(orderTotalValue).toBeCloseTo(finalTotalValue, 2);
});
