<!-- @format -->

<script setup lang="ts">
import { onBeforeMount, computed, onMounted, watch, reactive } from "vue";
import { useUsersStore } from "@/stores/users";

//Interfaces
interface Pagination {
  numberOfPages: number;
  listedEntriesCount: number;
  page: number;
}
interface Search {
  searchQuery: string;
}
interface Entry {
  first: string;
  last: string;
  email: string;
  address: string;
  created: string;
  balance: string;
}
defineEmits(["showProfileModal"]);
// Data
const usersStore = useUsersStore();
const pagination: Pagination = reactive({
  numberOfPages: 0,
  listedEntriesCount: 10,
  page: 1,
});
const search: Search = reactive({
  searchQuery: "",
});

// Life Cycle Hooks
onBeforeMount(async () => {});
onMounted(async () => {
  await usersStore.loadUsersFromAPI();
  calcNumberOfPages();
});

// Methodes

const calcNumberOfPages = () => {
  pagination.numberOfPages = Math.round(
    usersStore.getDataLength / pagination.listedEntriesCount
  );
};
const isCurrentPage = (index: number) => {
  return pagination.page == index;
};
const setlistedEntriesCount = (e: Event) => {
  pagination.listedEntriesCount = parseInt(
    (e.target as HTMLSelectElement).value
  );
  usersStore.displayedData(undefined, pagination.listedEntriesCount);
  pagination.page = 1;
};
const nextPage = () => {
  usersStore.nextPage(pagination.listedEntriesCount);
  pagination.page =
    pagination.page < pagination.numberOfPages
      ? pagination.page + 1
      : pagination.numberOfPages;
};
const prevPage = () => {
  usersStore.prevPage(pagination.listedEntriesCount);
  pagination.page = pagination.page > 1 ? pagination.page - 1 : 1;
};
//Computed
const isLastPage = computed(() => {
  return pagination.page === pagination.numberOfPages;
});
const isFirstPage = computed(() => {
  return pagination.page === 1;
});
// Watchers
watch(
  () => search.searchQuery,
  (searchQuery) => {
    usersStore.searchData(searchQuery);
  }
);
watch(() => pagination.listedEntriesCount, calcNumberOfPages);
</script>

<template>
  <div class="table-heading">
    <div class="pages-count">
      <span>Show</span>
      <select @change="setlistedEntriesCount($event)">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="75">75</option>
      </select>
    </div>
    <div class="search">
      <span>Search</span>
      <input type="text" placeholder="Search" v-model="search.searchQuery" />
    </div>
  </div>
  <div class="table-container">
    <table>
      <thead>
        <th>FIRST NAME</th>
        <th>LAST NAME</th>
        <th>ADDRESS</th>
        <th>EMAIL</th>
        <th>CREATED AT</th>
        <th>BALANCE</th>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in usersStore.getDisplayData"
          :key="index"
          @click.stop="$emit('showProfileModal', row)"
        >
          <td>{{ row.first }}</td>
          <td>{{ row.last }}</td>
          <td>{{ row.address }}</td>
          <td>{{ row.email }}</td>
          <td>{{ row.created }}</td>
          <td>{{ row.balance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="table-footing">
    <div class="info">
      <span v-show="!search.searchQuery.length">{{
        usersStore.getPaginationString
      }}</span>
    </div>
    <div class="pagination" v-show="!search.searchQuery.length">
      <button class="prev" @click="prevPage()" :disabled="isFirstPage">
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.46668 8.53333C5.73334 8.8 5.73334 9.2 5.46668 9.46666C5.33334 9.59999 5.20001 9.66666 5.00001 9.66666C4.80001 9.66666 4.66668 9.59999 4.53334 9.46666L0.533344 5.46666C0.266677 5.2 0.266677 4.79999 0.533344 4.53333L4.53334 0.533328C4.80001 0.266662 5.20001 0.266662 5.46668 0.533328C5.73334 0.799995 5.73334 1.19999 5.46668 1.46666L1.93334 5L5.46668 8.53333Z"
            fill="#0b308e"
          />
        </svg>
      </button>
      <div class="pages">
        <span
          class="pageNmber"
          v-for="i in pagination.numberOfPages"
          :key="i"
          :class="{ active: isCurrentPage(i) }"
          >{{ i }}</span
        >
      </div>
      <button class="next" @click="nextPage()" :disabled="isLastPage">
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.46665 5.46666L1.46665 9.46666C1.33331 9.59999 1.19998 9.66666 0.99998 9.66666C0.79998 9.66666 0.666646 9.59999 0.533313 9.46666C0.266646 9.2 0.266646 8.8 0.533313 8.53333L4.06665 5L0.533313 1.46666C0.266646 1.19999 0.266646 0.799995 0.533313 0.533328C0.79998 0.266662 1.19998 0.266662 1.46665 0.533328L5.46665 4.53333C5.73331 4.79999 5.73331 5.2 5.46665 5.46666Z"
            fill="#0b308e"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
