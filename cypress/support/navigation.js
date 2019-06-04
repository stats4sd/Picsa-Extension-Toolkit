/// <reference types="Cypress" />

beforeEach(function() {
  cy.log("test starting");
  // load testing server
  cy.visit("http://localhost:4200");
  // set fixed viewport
});
