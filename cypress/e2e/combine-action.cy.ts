/// <reference types="cypress" />

describe("Test combine action page", () => {
  beforeEach(() => {
    cy.visit("localhost:5173/");
    cy.viewport(375, 667);
  });
});
