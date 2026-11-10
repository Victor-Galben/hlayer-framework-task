const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  env: {
    BOOKER_USERNAME: process.env.BOOKER_USERNAME,
    BOOKER_PASSWORD: process.env.BOOKER_PASSWORD,
    UI_STANDARD_USERNAME: process.env.UI_STANDARD_USERNAME,
    UI_LOCKED_OUT_USERNAME: process.env.UI_LOCKED_OUT_USERNAME,
    UI_PASSWORD: process.env.UI_PASSWORD,
    UI_URL: process.env.UI_URL,
  },
  e2e: {
    baseUrl: "https://restful-booker.herokuapp.com",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
