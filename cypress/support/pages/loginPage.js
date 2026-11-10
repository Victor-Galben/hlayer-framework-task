import selectors from "../../fixtures/ui/sauceDemoSelectors.json";

class LoginPage {
  login(username, password) {
    cy.env([username, password, "UI_URL"]).then((credentials) => {
      cy.log(credentials);
      cy.visit(credentials.UI_URL);
      cy.getByTestId(selectors.username).type(credentials[username]);
      cy.getByTestId(selectors.password).type(credentials[password]);
      cy.getByTestId(selectors.loginButton).click();
    });
  }
}

export default new LoginPage();
