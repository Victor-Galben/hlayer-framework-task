const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  // Public, non-secret values. Read in tests with Cypress.expose("NAME").
  expose: {
    UI_URL: "https://www.saucedemo.com",
  },
  // Secrets loaded from .env (locally) or CI secrets. Read in tests with cy.env([...]).
  env: {
    BOOKER_USERNAME: process.env.BOOKER_USERNAME,
    BOOKER_PASSWORD: process.env.BOOKER_PASSWORD,
    UI_STANDARD_USERNAME: process.env.UI_STANDARD_USERNAME,
    UI_LOCKED_OUT_USERNAME: process.env.UI_LOCKED_OUT_USERNAME,
    UI_PASSWORD: process.env.UI_PASSWORD,
  },
  e2e: {
    baseUrl: "https://restful-booker.herokuapp.com",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
