import selectors from "../../fixtures/ui/sauceDemoSelectors.json";

class CheckoutPage {
  enterCustomerInformation({ firstName, lastName, postalCode }) {
    cy.getByTestId(selectors.firstName).should("be.visible").type(firstName);
    cy.getByTestId(selectors.lastName).should("be.visible").type(lastName);
    cy.getByTestId(selectors.postalCode).should("be.visible").type(postalCode);
  }

  continue() {
    cy.getByTestId(selectors.continueButton).should("be.visible").click();
  }

  shouldShowOverview(expected) {
    cy.getByTestId(selectors.checkoutSummary).should("be.visible");
    cy.getByTestId(selectors.overviewItems).should("have.length", expected.products.length);
    cy.getByTestId(selectors.itemTotal).should("have.text", expected.itemTotal);
    cy.getByTestId(selectors.tax).should("have.text", expected.tax);
    cy.getByTestId(selectors.total).should("have.text", expected.total);
  }

  finishOrder() {
    cy.getByTestId(selectors.finishButton).should("be.visible").click();
  }

  shouldShowOrderConfirmation(message) {
    cy.getByTestId(selectors.completeHeader).should("have.text", message);
  }

  shouldRequireFirstName() {
    cy.location("pathname").should("eq", "/checkout-step-one.html");
    cy.getByTestId(selectors.checkoutError).should("have.text", "Error: First Name is required");
  }
}

export default new CheckoutPage();
