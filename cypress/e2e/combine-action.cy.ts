/// <reference types="cypress" />

describe("Test combine action page", () => {
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

  it("follows a complete combine flow", () => {
    cy.get("#add-btn").click();
    // a manual action is needed to load the folder selecttion
    // click resume after the folder (four files) is loaded
    cy.pause();

    // Checks that pdf files are loaded
    cy.contains("This is a test file").should("be.visible");
    cy.contains("Another test file").should("be.visible");
    cy.contains("A third test file").should("be.visible");
    cy.contains("Fourth test file").should("be.visible");

    // Deletes one pdf file
    cy.contains("A third test file").parent().parent().find("svg").click();
    cy.contains("A third test file").should("not.exist");

    // Checks the sorting btn
    cy.get("#file-list a").first().contains("Another test file");
    cy.get("#sort-btn").click();
    cy.get("#file-list a").first().contains("This is a test file");

    // Combines the files and downloads the result
    cy.get("#combine-btn").click();
    cy.readFile("cypress/downloads/Another test file.pdf");

    // Adds letters to basename and combines the files keeping the output as input
    cy.get("input").get("#basename").type(" addletters");
    cy.contains("Fourth test file").should("be.visible");
    cy.get("#combine-keep-output-as-input").click();
    cy.get("#combine-btn").click();
    cy.contains("Another test file addletters - combined.pdf").should(
      "be.visible"
    );

    // Checks that the files are deleted
    cy.contains("This is a test file").should("not.exist");
    cy.contains("/^Another test file$/").should("not.exist");
    cy.contains("A third test file").should("not.exist");
    cy.contains("Fourth test file").should("not.exist");

    // Checks the reset btn
    cy.get("#reset-file-btn").click();
    cy.contains("Another test file addletters - combined.pdf").should(
      "not.exist"
    );
  });
});
