<!-- @format -->

<script lang="ts" setup>
import dataTable from "./components/table/table.vue";
import userProfile from "./components/profile/profile.vue";
import { ref } from "vue";

interface User {
  first: string;
  last: string;
  email: string;
  address: string;
  created: string;
  balance: string;
}

const user = ref<User>({
  address: "",
  balance: "",
  created: "",
  email: "",
  first: "",
  last: "",
});

function showProfileModal(userInfos: User) {
  user.value = userInfos;
}
</script>

<template>
  <section class="container">
    <dataTable @showProfileModal="showProfileModal" />
    <userProfile :user="user" />
  </section>
</template>

<style scoped></style>
