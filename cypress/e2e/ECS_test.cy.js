describe("Check to see if website is working", () => {
  //Check Heading
  it("should have heading", () => {
    cy.visit("https://sebastianpiresmolin.github.io/esc-group-project/");

    cy.get("h1").contains("Hacker Escape Rooms");
  });

  //Check Navbar
  it("should have Navbar", () => {
    cy.visit("/");
    cy.get("nav.navbar").find("li").should("have.length", 4);
  });

  //Check Top3 Challenges (This Test should fail)
  it("should have Top3 Challenges", () => {
    cy.visit("/");
    cy.get(".challenge.animation_finished_loading").should("have.length", 3);
  });

  //Check Footer
  it("should have Footer", () => {
    cy.visit("/");
    cy.get(".footer");
  });

  //Check Challenges Page
  it("should have Challenges Page", () => {
    cy.visit("/challenges.html");
    cy.get("h1").contains("challenges");
  });

  //Check Filters
  it("should have Filters", () => {
    cy.visit("/challenges.html");
    cy.get(".filterButton").click();
    cy.get(".filterWindow").should("exist");

    cy.get("#web")
      .should("have.text", "Web")
      .click()
      .should("have.class", "active")
      .click()
      .should("not.have.class", "active")
      .get(".challenges__container")
      .find("h2")
      .should("have.length", 30);
  });
});
