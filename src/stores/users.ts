import { defineStore } from "pinia";
import axios from "axios";

// Interfaces
interface Entry {
  first: string;
  last: string;
  email: string;
  address: string;
  created: string;
  balance: string;
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    data: <Entry[]>[],
    displayData: <Entry[]>[],
  }),
  getters: {
    getData: (state): Entry[] => state.data,
    getDataLength: (state): number => state.data.length,
    getDisplayData: (state): Array<Entry> => state.displayData,
    getPaginationString: (state): string =>
      `Showing ${
        state.data.findIndex((Entry: Entry) => state.displayData.at(0)) + 1
      } to ${
        state.data.findIndex((Entry: Entry) => state.displayData.at(-1)) + 1
      } from ${state.data.length}`,
  },
  actions: {
    displayedData(startIndex: number = 0, rowsCount: number = 10) {
      const stopIndex =
        startIndex + rowsCount <= this.data.length - 1
          ? startIndex + rowsCount - 1
          : this.data.length - 1;
      this.displayData = this.data.filter((elem, index) => {
        return index >= startIndex && index <= stopIndex;
      });
      return this.displayData;
    },
    searchData(searchQuery: string) {
      const searchResults = this.data.filter((elem: Entry) => {
        return Object.values(elem)
          .join("")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      this.displayData = searchQuery.length
        ? searchResults
        : this.displayedData();
    },
    async loadUsersFromAPI() {
      const { data } = await axios.get(
        `https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb`
      );
      this.data = data.results[0];
      this.displayedData();
    },
    nextPage(rowsCount: number) {
      const startIndex =
        this.data.findIndex((Entry: Entry) => this.displayData.at(-1)) + 1;
      // startIndex =
      //   startIndex + rowsCount <= this.getDataLength
      //     ? startIndex
      //     : this.getDataLength - rowsCount;
      this.displayedData(startIndex, rowsCount);
    },
    prevPage(rowsCount: number) {
      let startIndex =
        this.data.findIndex((Entry: Entry) => this.displayData.at(-1)) -
        rowsCount;
      startIndex = startIndex > 0 ? startIndex : 0;
      this.displayedData(startIndex, rowsCount);
    },
  },
});
