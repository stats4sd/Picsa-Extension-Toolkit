/// <reference types="Cypress" />

describe("Page Loads", function() {
  cy.get(".ion-page");
});

describe("Page Has Title", function() {
  // look for custom data-cy elements
  cy.get("[data-cy=title]").should("contain", "Picsa");
});
