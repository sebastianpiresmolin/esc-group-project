describe('Check if site is live', () => {
  it('should have correct H1 heading', () => {
    cy.visit('localhost:5501');
    cy.get('h1').contains('Hacker Escape Rooms');
  });
});
