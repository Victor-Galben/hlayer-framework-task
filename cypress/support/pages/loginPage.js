import selectors from "../../fixtures/ui/sauceDemoSelectors.json";

class LoginPage {
  login(username, password) {
    cy.env([username, password]).then((credentials) => {
      cy.visit(Cypress.expose("UI_URL"));
      cy.getByTestId(selectors.username).type(credentials[username]);
      cy.getByTestId(selectors.password).type(credentials[password]);
      cy.getByTestId(selectors.loginButton).click();
    });
  }

  setSessionFromEnv(usernameKey) {
    cy.env([usernameKey]).then((credentials) => {
      cy.setSauceDemoSession(credentials[usernameKey]);
    });
  }

  shouldShowLockedOutError() {
    cy.location("pathname").should("eq", "/");
    cy.getByTestId(selectors.loginError).should(
      "contain.text",
      "Sorry, this user has been locked out.",
    );
  }
}

export default new LoginPage();
