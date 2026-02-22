const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    reportPageTitle: "API Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    baseUrl: "http://lojaebac.ebaconline.art.br",

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      return config;
    },

    env: {
      ADMIN_EMAIL: "admin@admin.com",
      ADMIN_PASSWORD: "admin123",
    },
  },
});