/// <reference types="cypress" />

describe("Test default and disabled options spec", () => {
  beforeEach(() => {
    cy.visit("localhost:5173/");
    cy.viewport(375, 667);
  });

  it("has the combine action by default", () => {
    // checks a dynamic class that contains the word "selected"
    cy.get("div")
      .contains("Combine")
      .parent()
      .invoke("attr", "class")
      .should("contain", "selected");

    // checks the specific background color
    cy.get("div")
      .contains("Combine")
      .parent()
      .should("have.css", "background-color", "rgba(84, 172, 128, 0.2)");
  });
});
