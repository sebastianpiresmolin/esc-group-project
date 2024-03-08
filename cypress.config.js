const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'bfrr4e',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
