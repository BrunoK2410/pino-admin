<template>
  <the-modal>
    <form
      id="animal-form"
      ref="form"
      class="row gap-4 needs-validation"
      novalidate
      @submit.prevent="addNew"
    >
      <div>
        <label for="name-id" class="form-label fw-bold"
          >Ime<span class="required"> *</span></label
        >
        <input
          type="text"
          class="form-control"
          id="name-id"
          v-model="name"
          required
        />
        <div class="invalid-feedback">Ovo polje je obavezno.</div>
      </div>
      <div>
        <label class="d-block mb-2 fw-bold"
          >Spol<span class="required"> *</span></label
        >
        <div class="form-check form-check-inline">
          <input
            type="radio"
            class="form-check-input"
            id="m"
            value="M"
            v-model="gender"
            required
          />
          <label class="form-check-label" for="m">M</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            type="radio"
            class="form-check-input"
            id="f"
            value="F"
            v-model="gender"
            required
          />
          <label class="form-check-label" for="f">F</label>
          <div class="invalid-feedback">More example invalid feedback text</div>
        </div>
      </div>
      <div>
        <label for="breed-id" class="form-label fw-bold">Pasmina</label>
        <input type="text" class="form-control" id="breed-id" v-model="breed" />
      </div>
      <div>
        <label class="d-block mb-2 fw-bold"
          >Kategorija<span class="required"> *</span></label
        >
        <div class="d-flex flex-column flex-sm-row gap-3">
          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              id="for-adoption-id"
              value="for-adoption"
              v-model="categoryQuery"
              required
            />
            <label class="form-check-label" for="for-adoption-id"
              >Za udomljavanje</label
            >
          </div>
          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              id="adopted-id"
              value="adopted"
              v-model="categoryQuery"
              required
            />
            <label class="form-check-label" for="adopted-id">Udomljen</label>
          </div>
          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              id="in-memoriam-id"
              value="in-memoriam"
              v-model="categoryQuery"
              required
            />
            <label class="form-check-label" for="in-memoriam-id"
              >In-memoriam</label
            >
          </div>
        </div>
      </div>
      <div class="row" v-if="categoryQuery === 'for-adoption'">
        <div
          id="category-checkboxes-container"
          class="d-flex flex-column flex-lg-row flex-wrap gap-3"
        >
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="puppy-id"
              value="puppy"
              v-model="category"
              @change="validateCategory"
              required
            />
            <label class="form-check-label" for="puppy-id">Štene</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="young-id"
              value="young"
              v-model="category"
              @change="validateCategory"
              required
            />
            <label class="form-check-label" for="young-id">Mladi</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="adult-id"
              value="adult"
              v-model="category"
              @change="validateCategory"
              required
            />
            <label class="form-check-label" for="adult-id">Odrasli</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="old-id"
              value="old"
              v-model="category"
              @change="validateCategory"
              required
            />
            <label class="form-check-label" for="old-id">Stari</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="disabled-id"
              value="disabled"
              v-model="category"
              @change="validateCategory"
              required
            />
            <label class="form-check-label" for="disabled-id">Invalidni</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permanent-care-id"
              value="permanent-care"
              v-model="category"
              @change="validateCategory"
              required
            />
            <label class="form-check-label" for="permanent-care-id"
              >Na trajnom čuvanju</label
            >
          </div>
        </div>
      </div>
      <div>
        <label class="d-block mb-2 fw-bold" for="birthday-id">Rođendan</label>
        <date-picker
          :formatter="formatter"
          v-model:value="birthday"
        ></date-picker>
      </div>
      <div>
        <label for="microchip-id" class="form-label fw-bold">Mikročip</label>
        <input
          type="text"
          class="form-control"
          maxlength="15"
          id="microchip-id"
          v-model="microchip"
          @input="checkIfNumber"
        />
      </div>
      <div>
        <label class="fw-bold mb-2 d-block">Obrada</label>
        <div class="d-flex flex-column flex-lg-row flex-wrap gap-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="oop-id"
              value="puppy"
              v-model="treatment"
            />
            <label class="form-check-label" for="oop-id"
              >Očišćen/a od parazita</label
            >
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="cpzb-id"
              value="young"
              v-model="treatment"
            />
            <label class="form-check-label" for="cpzb-id"
              >Cijepljen/a protiv zaraznih bolesti</label
            >
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="cpb-id"
              value="adult"
              v-model="treatment"
            />
            <label class="form-check-label" for="cpb-id"
              >Cijepljen/a protiv bjesnoće</label
            >
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="k"
              value="old"
              v-model="treatment"
            />
            <label class="form-check-label" for="k">Kastriran/a</label>
          </div>
        </div>
      </div>
      <file-pond
        name="test"
        ref="pond"
        label-idle="Drop files here..."
        v-bind:allow-multiple="true"
        v-bind:files="images"
        @processfile="processFile"
        @removefile="removeFile"
      />
    </form>
    <template #footer>
      <button type="submit" form="animal-form" class="btn btn-success">
        Dodaj
      </button>
    </template>
  </the-modal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/hr";

import vueFilePond from "vue-filepond";

import "filepond/dist/filepond.min.css";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const FilePond = vueFilePond(FilePondPluginImagePreview);

const formatter = {
  parse: (value) => {
    const [day, month, year] = value.split(".");
    return new Date(`${year}-${month}-${day}`);
  },
  stringify: (date) => {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  },
};

const form = ref(null);

const name = ref("");
const gender = ref("M");
const breed = ref("");
const categoryQuery = ref("for-adoption");
const category = ref([]);
const birthday = ref("");
const microchip = ref("");
const treatment = ref([]);
const images = ref([]);
const uploadedImages = ref([]);

const processFile = (error, file) => {
  uploadedImages.value.push(file.filename);
};

const removeFile = (file) => {
  const index = images.value.indexOf(file.filename);
  if (index > -1) {
    uploadedImages.value.splice(index, 1);
  }
};

const addNew = () => {
  console.log(images.value[0]);
  console.log("ok");
  if (!form.value.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    addAnimal();
  }

  form.value.classList.add("was-validated");
};

const validateCategory = () => {
  if (form.value.classList.contains("was-validated")) {
    const checkboxes = document.querySelectorAll(
      "#category-checkboxes-container .form-check-input"
    );
    const labels = document.querySelectorAll(
      "#category-checkboxes-container .form-check-label"
    );
    if (category.value.length === 0) {
      checkboxes.forEach((checkbox) => {
        checkbox.classList.remove("is-valid");
        checkbox.classList.add("is-invalid");
        labels.forEach((label) => {
          label.classList.remove("is-valid");
          label.classList.add("is-invalid");
        });
      });
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.classList.remove("is-invalid");
        checkbox.classList.add("is-valid");
        labels.forEach((label) => {
          label.classList.remove("is-invalid");
          label.classList.add("is-valid");
        });
      });
    }
  }
};

const checkIfNumber = (event) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, "");
};

const addAnimal = async () => {};

onMounted(() => {});
</script>

<style scoped>
.required {
  color: var(--red-color);
}
.form-check-input.is-valid ~ .form-check-label {
  color: var(--bs-form-valid-color) !important;
}
.form-check-input.is-invalid ~ .form-check-label {
  color: var(--bs-form-invalid-color) !important;
}

.form-check-input.is-valid {
  border-color: var(--bs-form-valid-border-color) !important;
}
.form-check-input.is-invalid {
  border-color: var(--bs-form-invalid-border-color) !important;
}
</style>
