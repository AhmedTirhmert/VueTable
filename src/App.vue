<!-- @format -->

<script setup>
import dataTable from "./components/table/table.vue";
import userProfile from "./components/profile/profile.vue";
import { useUsersStore } from "@/stores/users";
import { reactive, onBeforeMount } from "vue";

const emit = defineEmits(["showProfileModal"]);
const user = reactive({
  infos: null,
});
const usersStore = useUsersStore();


function showProfileModal(userInfos) {
  user.infos = userInfos;
}
</script>

<template>
  <section class="container">
    <data-table @showProfileModal="showProfileModal"></data-table>
    <user-profile :user="user.infos" />
  </section>
</template>

<style scoped></style>
