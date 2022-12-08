<!-- @format -->

<script setup lang="ts">
  import { reactive } from '@vue/reactivity';
  import { computed, onMounted, watch } from '@vue/runtime-core';
  import axios from 'axios';
  import { useRoute } from 'vue-router';

  defineProps({});
  // Data
  const pagination = reactive({
    startIndex: 0,
    stopIndex: 9,
    numberOfPages: 0,
    listedEntriesCount: 10,
    page: 1,
  });
  const search = reactive({
    searchQuery: '',
    searchResaults: [],
  });
  const entries = reactive({
    data: [],
    displayData: [],
  });

  const route = useRoute();

  // Life Cycle Hooks
  onMounted(() => {
    loadData();
    console.log(route);
  });

  // Methodes
  const loadData = async () => {
    let { data } = await axios.get(
      `https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb`
    );
    entries.data = data.results[0];
    showNEntries();
    calcNumberOfPages();
  };
  const calcNumberOfPages = () => {
    pagination.numberOfPages = Math.round(
      entries.data.length / pagination.listedEntriesCount
    );
  };
  const isCurrentPage = (index) => {
    return pagination.page == index;
  };
  const setlistedEntriesCount = (e) => {
    pagination.listedEntriesCount = parseInt(e.target.value);
    showNEntries();
  };
  const showNEntries = () => {
    pagination.stopIndex =
      pagination.startIndex + pagination.listedEntriesCount - 1;
    entries.displayData = entries.data.filter((elem, index) => {
      return index >= pagination.startIndex && index <= pagination.stopIndex;
    });
  };
  const nextPage = () => {
    if (pagination.page < pagination.numberOfPages) {
      pagination.page++;
      pagination.startIndex += pagination.listedEntriesCount;
    }
  };
  const prevPage = () => {
    if (pagination.page > 1) {
      pagination.page--;
      pagination.startIndex -= pagination.listedEntriesCount;
    }
  };
  const searchData = (searchQuery) => {
    entries.displayData = entries.data.filter((elem) => {
      console.log(Object.values(elem).join(''));
      return Object.values(elem)
        .join('')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  };
  //Computed
  const entriesCount = computed(() => {
    return entries.data.length;
  });
  // Watchers
  watch(
    () => search.searchQuery,
    (searchQuery) => {
      searchQuery.length ? searchData(searchQuery) : showNEntries();
    }
  );
  watch(
    () => pagination.startIndex,
    (startIndex) => {
      showNEntries();
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
        <tr v-for="(row, index) in entries.displayData" :key="index">
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
      <span v-show="!search.searchQuery.length"
        >Showing {{ pagination.startIndex + 1 }} to
        {{ pagination.stopIndex + 1 }} from {{ entriesCount }}</span
      >
    </div>
    <div class="pagination">
      <button class="prev" @click="prevPage()">
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
      <button class="next" @click="nextPage()">
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
