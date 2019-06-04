/// <reference types="Cypress" />

// set browser size
cy.viewport({
  viewportWidth: 1920,
  viewportHeight: 1000
});

describe("Page Loads", function() {
  cy.get("#title").should("contain", "Picsa");
});
