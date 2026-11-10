Cypress.Commands.add("getByTestId", (testId) => {
  cy.get(`[data-test="${testId}"]`);
});

Cypress.Commands.add("setSauceDemoSession", (username) => {
  cy.visit(Cypress.expose("UI_URL"));
  cy.setCookie("session-username", username);
  cy.window().then((window) => {
    window.history.pushState({}, "", "/inventory.html");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
});
