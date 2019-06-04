/// <reference types="Cypress" />

context("Load daywalker", () => {
  beforeEach(() => {
    // INJECT THE SCRIPT LIKE THIS:
    cy.on("window:before:load", w => {
      const script1 = w.document.createElement("script");
      // Eventually adjust the path to your node modules
      // script.src = "/node_modules/cypress-daywalker/cypress-daywalker.js";
      // // If you cannot reach your node_modules folder easily (e.g. in a Java application), try to load it via a cdn.
      script1.src =
        "https://cdn.jsdelivr.net/gh/jaysunsyn/cypress-daywalker@0.1.1/cypress-daywalker.js";

      // CC - Additional script to support custom elements
      // https://github.com/manfredsteyer/ngx-build-plus/issues/5
      const script2 = w.document.createElement("script");
      script2.src =
        "https://unpkg.com/@webcomponents/webcomponentsjs@2.0.3/custom-elements-es5-adapter.js";

      w.document.querySelector("head").appendChild(script1);
      w.document.querySelector("head").appendChild(script2);
    });
  });

  it("shadow accessible", () => {
    cy.visit("http://localhost:4200");
    cy.get("app-home").then(() => {
      console.log("content exists");
      expect(true).to.equal(true);
    });
  });
});
