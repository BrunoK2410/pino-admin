<template>
  <teleport to="body">
    <div
      class="modal fade"
      :class="modalId === 'link-dialog' ? 'bg-opacity-50 bg-dark' : ''"
      tabindex="-1"
      :id="modalId"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        :class="modalId === 'link-dialog' ? '' : 'modal-lg'"
      >
        <div class="modal-content">
          <div class="modal-header" style="height: 70px">
            <h5 class="modal-title fw-bold">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="$emit('closed')"
            ></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="spinner-overlay" v-if="submitted">
            <div class="spinner-grow" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div
            class="modal-footer d-flex justify-content-end"
            style="height: 70px"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div></div
  ></teleport>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from "vue";

const props = defineProps({
  modalId: String,
  modalTitle: String,
  submitted: Boolean,
});

const emit = defineEmits(["closed"]);

onMounted(() => {
  const modalElement = document.getElementById(props.modalId);
  modalElement.addEventListener("hidden.bs.modal", () => {
    emit("closed");
  });
});
</script>

<style scoped>
.spinner-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 15;
  background: rgba(0, 0, 0, 0.2);
}
</style>
