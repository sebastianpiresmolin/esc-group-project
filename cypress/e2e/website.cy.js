describe('The website is up', () => {
  it('The web page loads correctly', () => {
    cy.visit('/');
    cy.get('img.header__logo').should('have.attr', 'src', 'media/logo.png');
    cy.get('img.header__logo').should(
      'have.attr',
      'alt',
      "Logo displaying\n      letters 'ETC'"
    );
    cy.get('li').eq(0).contains('Play online');
    cy.get('li').eq(1).contains('Play on-site');
    cy.get('li').eq(2).contains('The story');
    cy.get('li').eq(3).contains('Contact us');
    
    // Wait for a button to be visible
    //cy.get('.filterButton').should('be.visible').and('contain.text', 'Filter challenges').click();
    //cy.intercept('https://sebastianpiresmolin.github.io/esc-group-project/');
    //cy.get('.closeFilter').click();
    cy.contains('button', 'Book this room').first().click();
    cy.contains("button", "Search available times").click();
    cy.contains("button", "Submit booking").click();

    cy.get('.footer__boxOne .footer__title')
    .should('be.visible') // Checks that the element is visible
    .and('contain.text', '[Esc] Hacker Escape Rooms');

    cy.get('.footer__title').should('contain.text', 'Follow us on');
    cy.get('a.footer__link')
    .contains('Facebook')
    .should('have.attr', 'href', 'index.html');
    cy.get('a.footer__link')
    .contains('Instagram')
    .should('have.attr', 'href', 'index.html');
    cy.get('a.footer__link.footerLinkLast') // Using both class names for specificity
      .contains('Twitter')
      .should('have.attr', 'href', 'index.html');
  });
});
