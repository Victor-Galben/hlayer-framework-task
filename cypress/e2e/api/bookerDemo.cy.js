/// <reference types="cypress" />
import { bookingBody, partialBooking } from "../../fixtures/api/requestResponse.json";

describe("Booker API demo", () => {
  let bookingId;

  beforeEach(() => {
    cy.createBooking().then((response) => {
      expect(response.status).to.eq(200);

      bookingId = response.body.bookingid;
      expect(response.body).to.deep.equal({
        bookingid: bookingId,
        booking: bookingBody,
      });
    });
  });

  afterEach(() => {
    cy.deleteBooking(bookingId).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(201);
      cy.getBooking(bookingId, { failOnStatusCode: false }).its("status").should("eq", 404);
    });
  });

  it("partially updates an existing booking", () => {
    cy.partiallyUpdateBooking(bookingId, partialBooking).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal({
        ...bookingBody,
        ...partialBooking,
      });
    });
  });

  it("updates an existing booking", () => {
    const updatedBooking = {
      ...bookingBody,
      firstname: "Updated John",
    };

    cy.updateBooking(bookingId, updatedBooking).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal(updatedBooking);
    });
  });

  it("rejects deleting a booking without authentication", () => {
    cy.deleteBooking(bookingId, { headers: {}, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).to.equal("Forbidden");
    });
  });
});
