describe("The Home Page", () => {
  it("The home page loaded successfully!", () => {
    cy.visit("https://sebastianpiresmolin.github.io/esc-group-project/");
    cy.wait(200);
    cy.contains("li", "Play on-site").click();
    cy.wait(200);
    cy.contains("button", "Filter challenges").click();
    cy.wait(200);
    cy.contains("label", "CTF").click();
    cy.wait(200);
    cy.get("#ctf").should("exist");
    cy.wait(200);
    cy.contains("li", "Contact us").click();
    cy.wait(200);
    cy.contains("li", "The story").click();
    cy.wait(200);
    cy.contains("a", "Facebook").click();
    cy.wait(200);
    cy.contains("button", "Book this room").click();
    cy.wait(200);
    cy.contains("button", "Search available times").click();
    cy.wait(200);
    cy.contains("button", "Submit booking").click();
    cy.wait(200);
  });
});
