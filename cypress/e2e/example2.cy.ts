// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.intercept({
      method: "GET",
      url: "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb",
    }).as("getUsers");
    cy.visit("/");
    cy.wait("@getUsers").then((interception) => {
      console.log(interception);
      assert.isNotNull(
        interception.response?.body.results[0],
        "Api has responded with Data "
      );
    });
    cy.contains("select", "10");
    cy.get("select").should("have.value", "10");
    cy.get("table tbody tr").should("have.length", 10);
    cy.get(".search input").should("have.value", "");
    cy.get(".search input").type("9");
    cy.get("table tbody tr").should("have.length.at.least", 1);
    cy.get(".search input").clear()
    cy.get("table tbody tr").should("have.length", 10);
  });
});
