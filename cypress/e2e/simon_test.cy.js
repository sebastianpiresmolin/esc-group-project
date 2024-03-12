describe('Test if website is up and running', () => {
  it('should have header', () => {
    cy.visit('https://sebastianpiresmolin.github.io/esc-group-project/');

    cy.get('h1').contains('Hacker Escape Rooms');
  });
});
