describe('test labels', () => {
  it('passes', () => {
    cy.visit('/');

    cy.contains('.navbar__link', 'Play online').click();
    cy.location('pathname').should('include', '/challenges.html');
    cy.visit('/challenges.html');
    cy.get('.filterButton').click();

    cy.get('#linux')
      .should('have.text', 'Linux')
      .click()
      .should('have.class', 'active')
      .click()
      .should('not.have.class', 'active');

    cy.get('#cryptography')
      .should('have.text', 'Cryptography')
      .click()
      .should('have.class', 'active')
      .click()
      .should('not.have.class', 'active');

    cy.get('#bash').click();

    cy.get('#javascript').click();

    cy.get('#electronics').click();

    cy.get('#bash').should('have.class', 'active');

    cy.contains('No matching challenges').should('exist');

    cy.get('#javascript').should('have.class', 'active');

    cy.get('#electronics').should('have.class', 'active');

    cy.get('#linux').should('not.have.class', 'active');
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

    cy.visit('https://sebastianpiresmolin.github.io/esc-group-project/');
    cy.wait(200);
    cy.contains('button', 'Book this room').click();
    cy.wait(200);
    cy.get('.modal__container1').should('have.css', 'display', 'block');
    cy.get('.input__date').type('2021-06-01');
    cy.get('.button__search').click();
    cy.get('.error__msg').should(
      'have.text',
      'You must choose a date newer than today and within a year!'
    );
    cy.wait(200);
    cy.get('#modal__bg').click(100, 100);
    cy.contains('button', 'Book this room').click();
    cy.get('.modal__container1').should('have.css', 'display', 'block');
    cy.get('.input__date').type('1023-06-01');
    cy.get('.button__search').click();
    cy.get('.error__msg').should(
      'have.text',
      'You must choose a date newer than today and within a year!'
    );
    cy.wait(200);
    cy.get('#modal__bg').click(100, 100);
    cy.contains('button', 'Book this room').click();
    cy.get('.modal__container1').should('have.css', 'display', 'block');
    cy.get('.input__date').type('2024-06-01');
    cy.get('.button__search').click();
    cy.wait(200);
    cy.get('.input__name').type('Sebastian');
    cy.get('.button__submit').click();
    cy.get('.error__msg').should(
      'have.text',
      'You must enter your first name and last name'
    );
    cy.wait(200);
    cy.get('.input__name').type(' Molin');
    cy.get('.button__submit').click();
    cy.wait(200);
    cy.get('.error__msg').should('have.text', 'You must enter a valid email!');
    cy.get('.input__mail').type('exampleemail.com');
    cy.wait(200);
    cy.get('.error__msg').should('have.text', 'You must enter a valid email!');
    cy.get('.input__mail').clear().type('example@email.com');
    cy.wait(200);
    cy.get('.button__submit').click();
    cy.get('.error__msg').should(
      'have.text',
      'You must enter a 10-digit phone number'
    );
    cy.wait(200);
    cy.get('input[type="tel"]').type('0761398158');
    cy.wait(200);
    cy.get('.button__submit').click();
    cy.get('.title__thankyou').should('have.text', 'Thank you!');
  });
});
