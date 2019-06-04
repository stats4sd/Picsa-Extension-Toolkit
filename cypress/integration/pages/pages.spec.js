/// <reference types="Cypress" />

// baseurl specified in cypress.json
const routes = ["/", "/home", "/resources", "/tools", "/data"];

describe("Direct Routing", function() {
  routes.forEach(route => {
    it("loads", () => {
      cy.visit(`${route}`);

      // note, can't query shadow after reroute without injecting daywalker again
      // *** Todo - add injection and check page actually loads correctly
      cy.wait(500);
    });
  });
});
