describe('Test if website is up and running', () => {
  it('should have header', () => {
    cy.visit('http://localhost:5501');

    cy.get('h1').contains('Hacker Escape Rooms');
  });
});
