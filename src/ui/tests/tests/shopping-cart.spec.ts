import { test, expect } from "@playwright/test";
import { ShoppingCartPage } from "../../../../page-objects/ShoppingCartPage";

test("Shopping Cart Test with single promo code", async ({ page }) => {
  const shoppingCartPage = new ShoppingCartPage(page);

  // Шаг 1: Переходим на страницу и добавляем товары
  await shoppingCartPage.navigate();
  await shoppingCartPage.addProductsToCart();

  // Шаг 2: Проверка количества товаров в бейдже
  await shoppingCartPage.addProductsToCart([2, 4, 6, 8, 10]); // передаем конкретные товары

  // Шаг 3: Открыть чекаут
  await shoppingCartPage.clickCheckout();

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

  // Шаг 6: Проверяем итоговую сумму после применения скидки
  const finalTotalText = await shoppingCartPage.getFinalTotal();
  const finalTotalValue = parseFloat(
    finalTotalText.replace("$", "").split(" ")[0]
  );
  console.log("Final Total (after promo):", finalTotalValue.toFixed(2));

  // Извлекаем процент скидки (например, "-10%") из текста, если он существует
  const discountText = await shoppingCartPage.getDiscountText();
  let discountPercentage = 0; // Если скидка не найдена, процент скидки 0

  if (discountText) {
    discountPercentage = parseFloat(discountText.replace("%", "")) / 100;
    console.log("Discount Percentage:", discountPercentage);
  } else {
    console.log("No discount applied.");
  }

  const expectedFinalTotal = expectedTotal * (1 - discountPercentage);
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
