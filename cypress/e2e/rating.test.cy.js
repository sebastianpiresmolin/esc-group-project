describe('test labels', () => {
  it('passes', () => {
    cy.visit('https://sebastianpiresmolin.github.io/esc-group-project/');

    cy.contains('.navbar__link', 'Play online').click();
    cy.location('pathname').should('include', '/challenges.html');
    cy.visit('/challenges.html');

    cy.get('.filterButton').click();

    cy.get('#fromOne').click().should('have.class', 'checked');
    cy.get('#fromOne').click().should('have.class', 'checked');

    cy.get('#fromTwo').click().should('have.class', 'checked');
    cy.get('#fromOne').click();
    cy.get('#fromTwo').should('not.have.class', 'checked');

    cy.get('#fromFive').click().should('have.class', 'checked');
    cy.get('#fromTwo').should('have.class', 'checked');
    cy.get('#fromThree').click().should('have.class', 'checked');
    cy.get('#fromFour').should('not.have.class', 'checked');
    cy.get('#fromFive').should('not.have.class', 'checked');

    cy.get('#fromOne').click();

    cy.get('#toOne').click().should('have.class', 'checked');
    cy.get('#toOne').click().should('have.class', 'checked');

    cy.get('#toTwo').click().should('have.class', 'checked');
    cy.get('#toOne').click();
    cy.get('#toTwo').should('not.have.class', 'checked');

    cy.get('#toFive').click().should('have.class', 'checked');
    cy.get('#toTwo').should('have.class', 'checked');
    cy.get('#toThree').click().should('have.class', 'checked');
    cy.get('#toFour').should('not.have.class', 'checked');
    cy.get('#toFive').should('not.have.class', 'checked');

    cy.get('#toFour').click();
    cy.get('#fromFive').click().should('not.have.class', 'checked');
    cy.get('#fromFour').click().should('have.class', 'checked');

    cy.get('#toTwo').click();
    cy.get('#fromThree').should('not.have.class', 'checked');
    cy.get('#fromFour').should('not.have.class', 'checked');
    cy.get('#fromFive').should('not.have.class', 'checked');
  });
});
