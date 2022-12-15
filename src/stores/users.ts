import { defineStore } from "pinia";
import axios from "axios";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    displayUsers() {
      console.log(this.users);
    },
    async loadUsersFromAPI() {
      let { data } = await axios.get(
        `https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb`
      );
      this.users = data.results[0];
    },
  },
});
