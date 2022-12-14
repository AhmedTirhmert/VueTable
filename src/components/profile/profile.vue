<!-- @format -->

<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import { ref } from "vue";

//Interfaces
interface User {
  first: string;
  last: string;
  email: string;
  address: string;
  created: string;
  balance: string;
}
interface Props {
  user: User | null;
}

const props = defineProps<Props>();

const modal = ref<HTMLElement | null>("modal");
let user: User = reactive({
  first: "",
  last: "",
  email: "",
  address: "",
  created: "",
  balance: "",
});
const hideModal = () => {
  modal.value.classList.toggle("hidden");
};
// onMounted(()=>{console.log(props);})
watch(
  () => props.user,
  (value) => {
    modal.value.classList.toggle("hidden");
    user = value;
  }
);
</script>

<template>
  <div class="modal hidden" ref="modal" @click="hideModal">
    <div class="modal-content">
      <div class="modal-heading">
        <h2>Profile</h2>
        <span class="close" @click.stop="hideModal">&times;</span>
      </div>
      <div class="modal-body">
        <div class="user-info-group">
          <span class="label">First Name <span>:</span></span>
          <span class="user-info">{{ user.first }}</span>
        </div>
        <div class="user-info-group">
          <span class="label">Last Name <span>:</span></span>
          <span class="user-info">{{ user.last }}</span>
        </div>
        <div class="user-info-group">
          <span class="label">Email <span>:</span></span>
          <span class="user-info">{{ user.email }}</span>
        </div>
        <div class="user-info-group">
          <span class="label">Address <span>:</span></span>
          <span class="user-info">{{ user.address }}</span>
        </div>
        <div class="user-info-group">
          <span class="label">Balance <span>:</span></span>
          <span class="user-info">{{ user.balance }}</span>
        </div>
        <div class="user-info-group">
          <span class="label">Created <span>:</span></span>
          <span class="user-info">{{ user.created }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
