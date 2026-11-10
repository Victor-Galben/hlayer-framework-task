Cypress.Commands.add("getByTestId", (testId) => {
  cy.get(`[data-test="${testId}"]`);
});

Cypress.Commands.add("setSauceDemoSession", (username) => {
  cy.env(["UI_URL"]).then((url) => {
    cy.visit(url.UI_URL);
    cy.setCookie("session-username", username);
    cy.reload;
  });

  cy.setCookie("session-username", username);
  cy.window().then((window) => {
    window.history.pushState({}, "", "/inventory.html");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
});
