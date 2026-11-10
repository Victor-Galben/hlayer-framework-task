import { bookingBody } from "../fixtures/requestResponse.json";

Cypress.Commands.add("createToken", () => {
  cy.env(["BOOKER_USERNAME", "BOOKER_PASSWORD"]).then((credentials) => {
    cy.request({
      method: "POST",
      url: "/auth",
      body: {
        username: credentials.BOOKER_USERNAME,
        password: credentials.BOOKER_PASSWORD,
      },
    });
  });
});

Cypress.Commands.add("createBooking", () => {
  cy.createToken().then((authResponse) => {
    cy.request({
      method: "POST",
      url: "/booking",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `token=${authResponse.body.token}`,
      },
      body: bookingBody,
    });
  });
});

Cypress.Commands.add("getBooking", (bookingId, options = {}) => {
  cy.createToken().then((authResponse) => {
    cy.request({
      method: "GET",
      url: `/booking/${bookingId}`,
      headers: {
        Cookie: `token=${authResponse.body.token}`,
      },
      ...options,
    });
  });
});

Cypress.Commands.add("deleteBooking", (bookingId, options = {}) => {
  cy.createToken().then((authResponse) => {
    cy.request({
      method: "DELETE",
      url: `/booking/${bookingId}`,
      headers: {
        Cookie: `token=${authResponse.body.token}`,
      },
      ...options,
    });
  });
});

Cypress.Commands.add("partiallyUpdateBooking", (id, partialBooking) => {
  cy.createToken().then((authResponse) => {
    cy.request({
      method: "PATCH",
      url: `/booking/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `token=${authResponse.body.token}`,
      },
      body: partialBooking,
    });
  });
});

Cypress.Commands.add("updateBooking", (id, updatedBooking = bookingBody) => {
  cy.createToken().then((authResponse) => {
    cy.request({
      method: "PUT",
      url: `/booking/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `token=${authResponse.body.token}`,
      },
      body: updatedBooking,
    });
  });
});
