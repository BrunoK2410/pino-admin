<template>
  <div class="modal fade" tabindex="-1" id="form-dialog" aria-hidden="true">
    <div
      class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
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
        <div class="modal-footer d-flex justify-content-end">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from "vue";

defineProps({
  modalTitle: String,
  buttonText: String,
  isLoading: Boolean,
});

const emit = defineEmits(["closed"]);

onMounted(() => {
  const modalElement = document.getElementById("form-dialog");
  modalElement.addEventListener("hidden.bs.modal", () => {
    emit("closed");
  });
});
</script>
