<template>
  <the-modal
    :modalId="'form-dialog'"
    :modalTitle="modalTitle"
    :submitted="formSubmitted"
    @closed="handleClose"
  >
    <form
      id="news-form"
      ref="form"
      class="row gap-4 needs-validation"
      novalidate
      @submit.prevent="validate"
    >
      <div>
        <label for="title-id" class="form-label fw-bold"
          >Naslov<span class="required"> *</span></label
        >
        <input
          type="text"
          class="form-control"
          id="title-id"
          v-model.trim="title"
          required
        />
        <div class="invalid-feedback">Ovo polje je obavezno.</div>
      </div>
      <div>
        <label class="form-label fw-bold">Tekst</label>

        <div class="buttons-wrapper">
          <button
            type="button"
            data-title="Bold (Ctrl+B)"
            class="btn btn-light border-end rounded-0"
            @click="bold"
            @keydown.ctrl.b="bold"
            :class="{
              active: isBold,
            }"
          >
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-label="Bold (Ctrl+B)"
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              role="img"
              class="bx--btn__icon"
            >
              <path
                d="M18.25,25H9V7h8.5a5.25,5.25,0,0,1,4,8.65A5.25,5.25,0,0,1,18.25,25ZM12,22h6.23a2.25,2.25,0,1,0,0-4.5H12Zm0-7.5h5.5a2.25,2.25,0,1,0,0-4.5H12Z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            data-title="Italic (Ctrl+I)"
            class="btn btn-light border-end rounded-0"
            @click="italic"
            @keydown.ctrl.i="italic"
            :class="{ active: isItalic }"
          >
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-label="Italic (Ctrl+I)"
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              role="img"
              class="bx--btn__icon"
            >
              <path
                d="M25 9L25 7 12 7 12 9 17.14 9 12.77 23 7 23 7 25 20 25 20 23 14.86 23 19.23 9 25 9z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            data-title="Insert link"
            class="btn btn-light rounded-0"
            @click="openLinkDialog"
          >
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-label="Link"
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              role="img"
              class="bx--btn__icon"
            >
              <path
                d="M29.25,6.76a6,6,0,0,0-8.5,0l1.42,1.42a4,4,0,1,1,5.67,5.67l-8,8a4,4,0,1,1-5.67-5.66l1.41-1.42-1.41-1.42-1.42,1.42a6,6,0,0,0,0,8.5A6,6,0,0,0,17,25a6,6,0,0,0,4.27-1.76l8-8A6,6,0,0,0,29.25,6.76Z"
              ></path>
              <path
                d="M4.19,24.82a4,4,0,0,1,0-5.67l8-8a4,4,0,0,1,5.67,0A3.94,3.94,0,0,1,19,14a4,4,0,0,1-1.17,2.85L15.71,19l1.42,1.42,2.12-2.12a6,6,0,0,0-8.51-8.51l-8,8a6,6,0,0,0,0,8.51A6,6,0,0,0,7,28a6.07,6.07,0,0,0,4.28-1.76L9.86,24.82A4,4,0,0,1,4.19,24.82Z"
              ></path>
            </svg>
          </button>
        </div>
        <div
          ref="editor"
          class="text-editor"
          contenteditable="true"
          @input="handleInput"
          @mouseup="saveSelection"
          @keyup="saveSelection"
          @keydown="handleLineBreak"
          @paste="handlePaste"
        ></div>
      </div>
      <file-pond
        name="test"
        ref="pond"
        credits="false"
        label-idle="Ovdje ubacite slike..."
        v-bind:allow-multiple="true"
        accepted-file-types="image/*"
        v-bind:allow-reorder="true"
        v-bind:files="images"
        :server="server"
        v-on:addfile="addImage"
        v-on:reorderfiles="reorderImages"
        v-on:updatefiles="updateFiles"
        labelFileTypeNotAllowed
        fileValidateTypeLabelExpectedTypes="Ovo nije slika"
        v-bind:required="true"
        :class="{
          'is-invalid': images.length === 0,
          'is-valid': images.length > 0,
        }"
      />
    </form>
    <template #footer>
      <button
        class="btn btn-danger"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#delete-dialog"
        @click="emitOpenDeleteDialog(selectedNews)"
        v-if="selectedNews"
      >
        Obriši
      </button>
      <button type="submit" form="news-form" class="btn btn-success">
        {{ !selectedNews ? "Dodaj" : "Uredi" }}
      </button>
    </template></the-modal
  ><the-modal :modalId="'link-dialog'" :modalTitle="'Umetnite vezu'"
    ><div class="mb-3">
      <label for="link-text-id" class="form-label fw-bold">Oznaka</label>
      <input
        type="text"
        class="form-control"
        id="link-text-id"
        v-model.trim="linkText"
      />
    </div>
    <div>
      <label for="url-id" class="form-label fw-bold">Poveznica</label>
      <input
        type="url"
        class="form-control"
        id="url-id"
        pattern="https://.*"
        placeholder="https://primjer.com"
        v-model.trim="linkUrl"
        @paste="validateUrl"
        @input="validateUrl"
      />
    </div>
    <template #footer>
      <button
        type="button"
        class="btn btn-success"
        :disabled="!validUrl"
        @click="insertLink"
      >
        Ubaci
      </button></template
    ></the-modal
  >
</template>
<script setup>
import {
  ref,
  computed,
  watch,
  defineProps,
  defineEmits,
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";
import apiRequests from "../../services/apiRequests.js";
import { Modal } from "bootstrap";
import { storage } from "../../firebase.js";
import {
  ref as firebaseStorageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/hr";

import vueFilePond from "vue-filepond";

import "filepond/dist/filepond.min.css";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

const FilePond = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const server = {
  load: (source, load, error) => {
    fetch(source)
      .then((response) => {
        if (response.ok) {
          response.blob().then((blob) => {
            const fileName = response.url.match(/%2F([^%]+)\?alt/)[1];
            const fileType = blob.type;
            load(new File([blob], fileName, { type: fileType }));
          });
        } else {
          error("Could not load the image");
        }
      })
      .catch(() => {
        error("Error occurred while loading the image");
      });
  },
};

const addImage = (error, file) => {
  if (!error) {
    images.value.push(file);
  }
  const index = images.value.findIndex(
    (img) => img.source === file.source && img.options
  );

  if (index > -1) {
    images.value.splice(index, 1);
  }
};

const reorderImages = (files) => {
  images.value = [...files];
};

const updateFiles = (files) => {
  {
    images.value = [...files];
  }
};

const props = defineProps({
  selectedNews: [String, Object],
});

const emit = defineEmits(["closed", "open-delete-dialog"]);

const router = useRouter();

const form = ref(null);
const editor = ref(null);

const formSubmitted = ref(false);

const newsId = ref("");
const timestamp = ref("");

const title = ref("");
const images = ref([]);

const storedSelection = ref(null);
const isBold = ref(false);
const isItalic = ref(false);

const saveSelection = () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    storedSelection.value = selection.getRangeAt(0).cloneRange();
  }
};

const bold = () => {
  editor.value.focus();
  if (!isBold.value) {
    document.execCommand("bold");
    isBold.value = true;
  } else {
    document.execCommand("bold");
    isBold.value = false;
  }
};
const italic = () => {
  editor.value.focus();
  if (!isItalic.value) {
    document.execCommand("italic");
    isItalic.value = true;
  } else {
    document.execCommand("italic");
    isItalic.value = false;
  }
};

const openLinkDialog = () => {
  let linkModal = new Modal(document.getElementById("link-dialog"), {});
  linkModal.show();
};

const isActive = () => {
  setInterval(() => {
    if (document.activeElement === editor.value) {
      isBold.value = document.queryCommandState("bold");
      isItalic.value = document.queryCommandState("italic");
    }
  }, 250);
};

const handleLineBreak = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.execCommand("insertLineBreak");
  }
};

const handlePaste = (event) => {
  event.preventDefault();
  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData("text/plain");
  document.execCommand("insertHTML", false, pastedText);
};

const handleInput = () => {
  isActive();
  saveSelection();
};

const linkText = ref("");
const linkUrl = ref("https://");
const validUrl = ref(false);

const validateUrl = () => {
  try {
    new URL(linkUrl.value);
    validUrl.value = true;
  } catch (error) {
    validUrl.value = false;
  }
};

const resetLinkInput = () => {
  linkText.value = "";
  linkUrl.value = "";
  validUrl.value = false;
};

const insertLink = () => {
  const link = document.createElement("a");
  link.textContent =
    linkText.value.length === 0 ? linkUrl.value : linkText.value;
  link.href = linkUrl.value;
  link.target = "_blank";
  link.setAttribute("contenteditable", "false");
  if (storedSelection.value) {
    storedSelection.value.deleteContents();
    storedSelection.value.insertNode(link);
  } else {
    editor.value.appendChild(link);
  }
  resetLinkInput();
  let linkModal = document.getElementById("link-dialog");
  Modal.getInstance(linkModal).hide();
};

const modalTitle = computed(() => {
  return !props.selectedNews ? "Dodaj novi članak" : "Uredi članak";
});

const validateFile = () => {
  if (form.value.classList.contains("was-validated")) {
    const filepond = document.querySelector(".filepond--hopper");

    if (images.value.length === 0) {
      filepond.style.outline = "1px solid var(--bs-form-invalid-border-color)";
    } else {
      filepond.style.outline = "1px solid var(--bs-form-valid-border-color)";
    }
  }
};

const resetForm = () => {
  newsId.value = "";
  title.value = "";
  images.value = [];
};

const fillForm = (news) => {
  newsId.value = news.id;
  timestamp.value = news.timestamp;
  title.value = news.title;
  editor.value.innerHTML = news.text;
  images.value = news.images
    ? news.images.map((image) => ({
        source: image,
        options: {
          type: "local",
        },
      }))
    : [];
};

const numOfCalls = ref(0);

const controller = ref(new AbortController());

const addNews = async () => {
  if (numOfCalls.value === 0) {
    try {
      numOfCalls.value++;
      formSubmitted.value = true;
      const uploadedImages = [];
      images.value = images.value.filter(
        (image) => Object.keys(image).length !== 2
      );

      for (const image of images.value) {
        const storageRef = firebaseStorageRef(
          storage,
          `images/${image.filename}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image.file);

        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        uploadedImages.push(downloadURL);
      }

      const newsData = {
        title: title.value,
        text: editor.value.innerHTML,
        images: [...uploadedImages],
        timestamp: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      };

      await apiRequests.addNew("news", newsData, controller.value.signal);
      localStorage.setItem("action", "add");
      localStorage.setItem("item", newsData.title);
      router.go(0);
    } catch (error) {
      numOfCalls.value = 0;
      formSubmitted.value = false;
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  }
};

const updateNews = async () => {
  if (numOfCalls.value === 0) {
    try {
      numOfCalls.value++;
      formSubmitted.value = true;
      const uploadedImages = [];

      for (const image of images.value) {
        const storageRef = firebaseStorageRef(
          storage,
          `images/${image.filename}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image.file);

        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        uploadedImages.push(downloadURL);
      }

      const newsData = {
        title: title.value,
        text: editor.value.innerHTML,
        images: [...uploadedImages],
        timestamp: timestamp.value,
      };

      await apiRequests.update(
        "news",
        newsId.value,
        newsData,
        controller.value.signal
      );
      localStorage.setItem("action", "edit");
      localStorage.setItem("item", newsData.title);
      router.go(0);
    } catch (error) {
      numOfCalls.value = 0;
      formSubmitted.value = false;
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  }
};

const validate = () => {
  let errors = 0;
  if (!form.value.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    errors++;
  }

  form.value.classList.add("was-validated");

  validateFile();

  if (errors === 0) {
    if (props.selectedNews === "") addNews();
    else updateNews();
  }
};

const handleClose = () => {
  controller.value.abort();
  controller.value = new AbortController();
  emit("closed");
};

const emitOpenDeleteDialog = () => {
  emit("open-delete-dialog", props.selectedNews);
};

watch(images.value, () => {
  validateFile();
});

watch(
  () => props.selectedNews,
  (newVal) => {
    if (!newVal) {
      resetForm();
    } else {
      fillForm(newVal);
    }
    form.value.classList.remove("was-validated");
  }
);

onUnmounted(() => {
  controller.value.abort();
});
</script>

<style scoped>
.required {
  color: var(--red-color);
}

.text-editor {
  padding: 10px;
  box-sizing: border-box;
  min-height: 150px;
  resize: vertical;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  max-width: 100%;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.32px;
  font-family: "Gill Sans", sans-serif;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.active {
  background-color: #c0c2c2;
  color: #1354c3;
  box-shadow: inset 1px 2px 5px #777;
}
</style>
