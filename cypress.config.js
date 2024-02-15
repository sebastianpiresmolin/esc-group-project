const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://sebastianpiresmolin.github.io/esc-group-project',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
