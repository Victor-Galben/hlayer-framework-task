const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  env: {
    BOOKER_USERNAME: process.env.BOOKER_USERNAME,
    BOOKER_PASSWORD: process.env.BOOKER_PASSWORD,
  },
  e2e: {
    baseUrl: "https://restful-booker.herokuapp.com",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
