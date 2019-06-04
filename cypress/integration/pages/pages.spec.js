/// <reference types="Cypress" />

describe("Page Loads", function() {
  it("loads", () => {
    cy.get(".ion-page");
  });
  it("has title", () => {
    // look for custom data-cy elements
    // *** NOTE - currently not workign due to lack of shadow dom support
    // https://github.com/cypress-io/cypress/issues/144
    cy.get("[data-cy=title]").should("contain", "Picsa");
  });
});
