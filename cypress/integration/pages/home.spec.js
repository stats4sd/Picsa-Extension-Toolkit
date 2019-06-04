/// <reference types="Cypress" />
// 'describe', 'context', 'specify' and 'it' all represent test groupings

describe("Page Basic", function() {
  it("loads", () => {
    cy.get(".ion-page");
  });
  it("has title", () => {
    // look for custom data-cy elements
    // *** NOTE - currently not workign due to lack of shadow dom support
    // https://github.com/cypress-io/cypress/issues/144
    cy.get("[data-cy=title]");
  });
});

describe("Home Page Links", function() {
  it("pages exist and link correctly", () => {
    // use each when iterating over dom elements
    cy.get("[data-cy=link]").each(link => {
      console.log("link", link);
      // use wrap to make the child link subject of the next function
      cy.wrap(link).click();
      cy.go("back");
    });
  });
});
