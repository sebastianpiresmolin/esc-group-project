describe('Meta Charset Tag Test', () => {
  it('checks for the presence of the meta charset="utf-8" tag', () => {
    cy.visit('/');
    cy.document().then((doc) => {
      const charsetMeta = Array.from(
        doc.head.getElementsByTagName('meta')
      ).find((meta) => meta.getAttribute('charset') === 'utf-8');
      expect(charsetMeta).to.not.be.null;
    });
  });
});

describe('Website test', () => {
  it('Checks that the web page is up', () => {
    cy.visit('/');
  });

  it('Letar efter specifikt webbelement i Challenges', () => {
    // Assuming there is a button or link for Challenges, adjust the selector according to your page
    cy.visit('/');
    cy.get('li').eq(0).contains('Play online');
    cy.contains('.navbar__link', 'Play online').click();
    cy.contains('a', 'Play on-site').click();
    // Check that we navigated correctly
    cy.url().should('include', '/index');
  });
  it('Letar efter specifikt webbelement i Challenges', () => {
    // Assuming there is a button or link for Challenges, adjust the selector according to your page
    cy.visit(
      'https://sebastianpiresmolin.github.io/esc-group-project/challenges.html'
    );
    cy.get('li').eq(0).contains('Play online');
    cy.contains('.navbar__link', 'Play online').click();
    cy.contains('a', 'Play on-site').click();

    cy.url().should('include', '/challenges');
    cy.get('img.img__container').should(
      'have.attr',
      'src',
      'https://placekitten.com/640/480'
    );
    cy.get('.fa-laptop').should('exist');
    cy.get('h2').contains('Project: X of Doom');
    cy.get('.rating__star[src="media/full_star.png"]').first().should('exist');
    cy.get('.rating__star[src="media/full_star.png"]').first().should('exist');
    cy.get('.rating__container span').contains('1 - 4 participants');
  });
});

describe('Do something that goes wrong and check the error message', () => {
  it('URL error message', () => {
    cy.visit(
      'https://sebastianpiresmolin.github.io/esc-group-project/challenges.html'
    );
    cy.wait(400);
    cy.url().should('include', '/challenges');
    //-----Get a error message with /index-----
    cy.url().should('include', '/index');    
  });
});

describe('Form validation error messages', () => {
  it('Displays an error message when submitting an empty form', () => {
    cy.visit(
      'https://sebastianpiresmolin.github.io/esc-group-project/challenges.html'
    );
    // Verify that the entered text is set correctly in the input element
    // display parent element
    cy.get('#filterWindow').invoke('show');

    // then type in the textbox
    cy.get('#searchBox').type('example text');
    cy.get('#searchBox').should('have.value', 'example text');
    //-----Get a error message with------ 
    cy.get('#nonExistentElement').type('This will fail');
  });
});
