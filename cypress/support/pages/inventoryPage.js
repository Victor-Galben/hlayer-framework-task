import selectors from "../../fixtures/ui/sauceDemoSelectors.json";

class InventoryPage {
  shouldBeVisible() {
    cy.getByTestId(selectors.inventoryContainer).should("be.visible");
  }

  addProductsToCart(products) {
    products.forEach((product) => {
      cy.getByTestId(product).should("be.visible").click();
    });
  }

  openCart() {
    cy.getByTestId(selectors.shoppingCartLink).should("be.visible").click();
  }
}

export default new InventoryPage();
