describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://sebastianpiresmolin.github.io/esc-group-project/');
    cy.wait(200);
    cy.contains('button', 'Book this room').click();
    cy.wait(200);
    cy.get('.modal__container1').should('have.css', 'display', 'block');
    cy.get('.input__date').type('2021-06-01');
    cy.get('.button__search').click();
    cy.get('.error__msg') .should('have.text', 'You must choose a date newer than today and within a year!');
    cy.wait(200);
    cy.get('#modal__bg').click(100,100);
    cy.contains('button', 'Book this room').click();
    cy.get('.modal__container1').should('have.css', 'display', 'block');
    cy.get('.input__date').type('1023-06-01');
    cy.get('.button__search').click();
    cy.get('.error__msg') .should('have.text', 'You must choose a date newer than today and within a year!');
    cy.wait(200);
    cy.get('#modal__bg').click(100,100);
    cy.contains('button', 'Book this room').click();
    cy.get('.modal__container1').should('have.css', 'display', 'block');
    cy.get('.input__date').type('2024-06-01');
    cy.get('.button__search').click();
    cy.wait(200);
    cy.get('.input__name').type('Sebastian');
    cy.get('.button__submit').click();
    cy.get('.error__msg') .should('have.text', 'You must enter your first name and last name');
    cy.wait(200);
    cy.get('.input__name').type(' Molin');
    cy.get('.button__submit').click();
    cy.wait(200);
    cy.get('.error__msg') .should('have.text', 'You must enter a valid email!');
    cy.get('.input__mail').type('exampleemail.com');
    cy.wait(200);
    cy.get('.error__msg') .should('have.text', 'You must enter a valid email!');
    cy.get('.input__mail').clear().type('example@email.com');
    cy.wait(200);
    cy.get('.button__submit').click();
    cy.get('.title__thankyou') .should('have.text', 'Thank you!');
  })
})

