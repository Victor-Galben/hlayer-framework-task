import selectors from "../../fixtures/ui/sauceDemoSelectors.json";

class CartPage {
  shouldContainProducts(products) {
    cy.getByTestId(selectors.cartItems).should("be.visible").should("have.length", products.length);
    products.forEach((product) => {
      cy.getByTestId(selectors.cartItemNames).should("contain", product);
    });
  }

  proceedToCheckout() {
    cy.getByTestId(selectors.checkoutButton).should("be.visible").click();
  }
}

export default new CartPage();
