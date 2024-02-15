
describe("test labels", () => {
  it("passes", () => {
    cy.visit('/');

    cy.contains('.navbar__link', 'Play online').click();
    cy.location('pathname').should('include', '/challenges.html');
    cy.visit('/challenges.html');
    cy.get(".filterButton").click();

    cy.get("#linux")
      .should("have.text", "Linux")
      .click()
      .should("have.class", "active")
      .click()
      .should("not.have.class", "active");

    cy.get("#cryptography")
      .should("have.text", "Cryptography")
      .click()
      .should("have.class", "active")
      .click()
      .should("not.have.class", "active");

    cy.get("#bash")
      .click()

    cy.get("#javascript")
      .click()

    cy.get("#electronics")
      .click()

    cy.get("#bash")
      .should("have.class", "active")
    
    cy.contains("No matching challenges").should("exist")  
    
    cy.get("#javascript")
      .should("have.class", "active")
    
    cy.get("#electronics")
      .should("have.class", "active")
    
    cy.get("#linux")
      .should("not.have.class", "active")
  });
});
