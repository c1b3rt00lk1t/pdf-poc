/// <reference types="cypress" />

describe("Test large and small screens", () => {
  beforeEach(() => {
    cy.visit("localhost:5173/");
  });

  it("shows the button names in large screen", () => {
    cy.viewport(1600, 900);
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

  it("hides the button names in small screen", () => {
    cy.viewport(375, 667);
    cy.get("h2").contains("PDF Utils").should("be.visible");
    cy.get("span").contains("Remove").should("not.be.visible");
    cy.get("span").contains("Rotate").should("not.be.visible");
    cy.get("span").contains("Combine").should("not.be.visible");
    cy.get("span").contains("Numbers").should("not.be.visible");
    cy.get("span").contains("Watermark").should("not.be.visible");
    cy.get("span").contains("Split").should("not.be.visible");
    cy.get("button").contains("Add").should("not.be.visible");
    cy.get("button").contains("Reset").should("not.be.visible");
    cy.get("button").contains("Order").should("not.be.visible");
  });
});
