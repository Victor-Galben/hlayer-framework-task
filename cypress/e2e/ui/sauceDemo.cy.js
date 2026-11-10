/// <reference types="cypress" />
import data from "../../fixtures/ui/sauceDemoData.json";
import selectors from "../../fixtures/ui/sauceDemoSelectors.json";
import loginPage from "../../support/pages/loginPage";
import inventoryPage from "../../support/pages/inventoryPage";
import cartPage from "../../support/pages/cartPage";
import checkoutPage from "../../support/pages/checkoutPage";

describe("Sauce Demo UI", () => {
  //An end-to-end user journey, e.g. log in, add items to the cart and complete checkout
  it("logs in and completes checkout with two products", () => {
    loginPage.login("UI_STANDARD_USERNAME", "UI_PASSWORD");

    cy.location("pathname").should("eq", "/inventory.html");
    inventoryPage.shouldBeVisible();

    inventoryPage.addProductsToCart([selectors.backpackAddButton, selectors.bikeLightAddButton]);
    inventoryPage.openCart();

    cartPage.shouldContainProducts(data.expected.products);
    cartPage.proceedToCheckout();

    checkoutPage.enterCustomerInformation(data.checkout);
    checkoutPage.continue();

    checkoutPage.shouldShowOverview(data.expected);
    checkoutPage.finishOrder();
    checkoutPage.shouldShowOrderConfirmation(data.expected.orderConfirmation);
  });

  //Negative or edge-case test
  it("requires checkout information before continuing", () => {
    loginPage.setSessionFromEnv("UI_STANDARD_USERNAME");

    inventoryPage.shouldBeVisible();
    inventoryPage.addProductsToCart([selectors.backpackAddButton]);
    inventoryPage.openCart();

    cartPage.proceedToCheckout();

    checkoutPage.continue();
    checkoutPage.shouldRequireFirstName();
  });

  it("shows an error when a locked-out user attempts to log in", () => {
    loginPage.login("UI_LOCKED_OUT_USERNAME", "UI_PASSWORD");
    loginPage.shouldShowLockedOutError();
  });
});
