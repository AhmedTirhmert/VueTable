<!-- @format -->

<script setup lang="ts">
  import { reactive, watch } from 'vue';
  import { ref } from 'vue';
  const props = defineProps({
    user: null,
  });
  const modal = ref('modal');
  const user = reactive({
    infos: {},
  });
  const hideModal = () => {
    modal.value.classList.toggle('hidden');
  };
  watch(
    () => props.user,
    (value) => {
      modal.value.classList.toggle('hidden');
      user.infos = value;
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
          <span class="user-info">{{ user.infos.first }}</span>
        </div>
        <div class="user-info-group">
          <span class="label">Last Name <span>:</span></span>
          <span class="user-info">{{ user.infos.last }}</span>
        </div>
        <div class="user-info-group">
          <span class="label">Email <span>:</span></span>
          <span class="user-info">{{ user.infos.email }}</span>
        </div>
        <div class="user-info-group">
          <span class="label">Address <span>:</span></span>
          <span class="user-info">{{ user.infos.address }}</span>
        </div>
        <div class="user-info-group">
          <span class="label">Balance <span>:</span></span>
          <span class="user-info">{{ user.infos.balance }}</span>
        </div>
        <div class="user-info-group">
          <span class="label">Created <span>:</span></span>
          <span class="user-info">{{ user.infos.created }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
