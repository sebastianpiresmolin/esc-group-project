describe('Check if site is live', () => {
  it('should have correct H1 heading', () => {
    cy.visit('https://sebastianpiresmolin.github.io/esc-group-project/');
    cy.get('h1').contains('Hacker Escape Rooms');
  });
});
