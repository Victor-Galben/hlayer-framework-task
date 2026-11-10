Cypress.Commands.add("getByTestId", (testId) => {
  cy.get(`[data-test="${testId}"]`);
});
