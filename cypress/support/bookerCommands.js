import {bookingBody} from '../fixtures/requestResponse.json'

Cypress.Commands.add('createToken', () => {
  cy.env(['BOOKER_USERNAME', 'BOOKER_PASSWORD']).then((credentials) => {
      cy.request({
        method: 'POST',
        url: '/auth',
        body: {
          username: credentials.BOOKER_USERNAME,
          password: credentials.BOOKER_PASSWORD,
        },
      }).then((authResponse) => {
        expect(authResponse.status).to.eq(200)
        expect(authResponse.body.token).to.be.a('string').and.not.be.empty
      })
    },
  )
})

Cypress.Commands.add('createBooking', () => {
  cy.createToken().then((authResponse) => {
    cy.request({
      method: 'POST',
      url: '/booking',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: `token=${authResponse.body.token}`,
      },
      body: bookingBody,
    })
  })
})