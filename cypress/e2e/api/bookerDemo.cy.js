/// <reference types="cypress" />
import { bookingBody } from "../../fixtures/requestResponse.json";

describe('Booker API demo', () => {
  let bookingId;

  beforeEach(() => {
      cy.createBooking().then((response) => {
      expect(response.status).to.eq(200)
      
      bookingId = response.body.bookingid
      expect(response.body).to.deep.equal({
        bookingid: bookingId,
        booking: bookingBody
      })
    })
  })
})