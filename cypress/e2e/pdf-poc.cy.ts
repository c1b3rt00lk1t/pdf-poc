/// <reference types="cypress" />

describe("Test pdf-poc spec", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit("localhost:5173/");
  });

  it("shows the buttons names in large screen", () => {
    cy.get("h2").contains("PDF Utils").should("be.visible");
    cy.get("span").contains("Remove").should("be.visible");
    cy.get("span").contains("Rotate").should("be.visible");
    cy.get("span").contains("Combine").should("be.visible");
    cy.get("span").contains("Numbers").should("be.visible");
    cy.get("span").contains("Watermark").should("be.visible");
    cy.get("span").contains("Split").should("be.visible");
    cy.get("button").contains("Add").should("be.visible");
    cy.get("button").contains("Reset").should("be.visible");
    cy.get("button").contains("Order").should("be.visible");
  });
});
