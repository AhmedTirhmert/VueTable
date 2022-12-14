// https://docs.cypress.io/api/introduction/api.html

let x = 75;

describe("Api Response", () => {
  it("visits the app root url", () => {
    cy.intercept({
      method: "GET",
      url: "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb",
    }).as("getUsers");
    cy.visit("/");
    cy.wait("@getUsers").then((interception) => {
      assert.isNotNull(
        interception.response?.body.results[0],
        "Api has responded with Data "
      );
      assert.lengthOf(interception.response?.body.results[0], 75);
    });
  });
});
describe("Show N Entries", () => {
  it("test the records number feature", () => {
    cy.visit("/");
    cy.contains("select", "10");
    cy.get("select").should("have.value", "10");
    cy.get("table tbody tr").should("have.length", 10);
    cy.get("select").select("25");
    cy.get("table tbody tr").should("have.length", 25);
    cy.get("select").select("75");
    cy.get("table tbody tr").should("have.length", 75);
  });
});
describe("Search Input", () => {
  it("tests the search feature", () => {
    cy.visit("/");
    cy.get(".search input").should("have.value", "");
    cy.get(".search input").type("9");
    cy.get("table tbody tr").should("have.length.at.least", 1);
    cy.get(".search input").clear();
    cy.get("table tbody tr").should("have.length", 10);
  });
});
describe("Pagination", () => {
  it("Testing the pagination", () => {
    cy.intercept({
      method: "GET",
      url: "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb",
    }).as("getUsers");
    cy.visit("/");
    cy.wait("@getUsers").then(() => {
      cy.get(".pagination .next").click();
      cy.get(".pages span").eq(1).should("have.class", "active");
      cy.get(".pagination .prev").click();
      cy.get(".pages span").eq(0).should("have.class", "active");
      cy.get("select").select("25");
      cy.get(".pages span").should("have.length", Math.round(x / 25));
    });
  });
});
describe("Profile Modal", () => {
  it("Testing profile modal feature", () => {
    cy.intercept({
      method: "GET",
      url: "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb",
    }).as("getUsers");
    cy.visit("/");
    cy.wait("@getUsers").then(() => {
      cy.get("table tbody tr").eq(0).click();
      cy.get(".modal").should("not.have.class", "hidden");
      cy.get(".modal").click();
      cy.get(".modal").should("have.class", "hidden");
    });
  });
});
