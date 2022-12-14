import Profile from "./profile.vue";
const user = {
  first: "Ahmed",
  last: "Tirhmert",
  email: "ahmed@gmail.com",
  address: "Houda - Agadir",
  balance: "9000",
  created: "12 jun 2021",
};
describe("<Profile />", () => {
  it("renders", () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(Profile, {
      props: {
        user: user,
      },
    });
    cy.get(".modal").should("be.hidden");

  });
});
