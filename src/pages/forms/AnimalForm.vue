<template>
  <the-modal
    :modalId="'form-dialog'"
    :modalTitle="modalTitle"
    :submitted="formSubmitted"
    @closed="handleClose"
  >
    <form
      id="animal-form"
      ref="form"
      class="row gap-4 needs-validation"
      novalidate
      @submit.prevent="validate"
    >
      <div>
        <label for="name-id" class="form-label fw-bold"
          >Ime<span class="required"> *</span></label
        >
        <input
          type="text"
          class="form-control"
          id="name-id"
          v-model.trim="name"
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
          <label class="form-check-label" for="f">Ž</label>
          <div class="invalid-feedback">More example invalid feedback text</div>
        </div>
      </div>
      <div>
        <label for="breed-id" class="form-label fw-bold">Pasmina</label>
        <input
          type="text"
          class="form-control"
          id="breed-id"
          v-model.trim="breed"
        />
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
              @change="validateCategory"
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
              @change="validateCategory"
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
              @change="validateCategory"
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
              id="baby-id"
              :value="route.name === 'Dogs' ? 'puppy' : 'kitten'"
              v-model="category"
              @change="validateCategory"
            />
            <label class="form-check-label" for="baby-id">{{
              route.name === "Dogs" ? "Štene" : "Mačić"
            }}</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="young-id"
              value="young"
              v-model="category"
              @change="validateCategory"
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
              :value="cleanedFromParasites"
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
              :value="vaccinatedAgainstDiseases"
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
              :value="vaccinatedAgainstRabies"
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
              :value="neutered"
              v-model="treatment"
            />
            <label class="form-check-label" for="k">Kastriran/a</label>
          </div>
        </div>
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
        @click="emitOpenDeleteDialog(selectedAnimal)"
        v-if="selectedAnimal"
      >
        Obriši
      </button>
      <button type="submit" form="animal-form" class="btn btn-success">
        {{ !selectedAnimal ? "Dodaj" : "Uredi" }}
      </button>
    </template>
  </the-modal>
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
import { useRoute, useRouter } from "vue-router";
import apiRequests from "../../services/apiRequests.js";
import { storage } from "../../firebase.js";
import {
  ref as firebaseStorageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import DatePicker from "vue-datepicker-next";
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
  selectedAnimal: [String, Object],
});

const emit = defineEmits(["closed", "open-delete-dialog"]);

const route = useRoute();

const router = useRouter();

const form = ref(null);

const formSubmitted = ref(false);

const animalId = ref("");
const timestamp = ref("");

const name = ref("");
const gender = ref("M");
const breed = ref("");
const categoryQuery = ref("for-adoption");
const category = ref([]);
const birthday = ref("");
const microchip = ref("");
const treatment = ref([]);
const images = ref([]);

const modalTitle = computed(() => {
  return !props.selectedAnimal && route.name === "Dogs"
    ? "Dodaj novog psa"
    : !props.selectedAnimal && route.name === "Cats"
    ? "Dodaj novu mačku"
    : props.selectedAnimal
    ? `Uredi - "${props.selectedAnimal.name}"`
    : "";
});

const cleanedFromParasites = computed(() =>
  gender.value === "M" ? "očišćen od parazita" : "očišćena od parazita"
);
const vaccinatedAgainstDiseases = computed(() =>
  gender.value === "M"
    ? "cijepljen protiv zaraznih bolesti"
    : "cijepljena protiv zaraznih bolesti"
);
const vaccinatedAgainstRabies = computed(() =>
  gender.value === "M"
    ? "cijepljen protiv bjesnoće"
    : "cijepljena protiv bjesnoće"
);
const neutered = computed(() =>
  gender.value === "M" ? "kastriran" : "kastrirana"
);

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

function parseDate(dateString) {
  const [day, month, year] = dateString.split(".");
  return new Date(year, month - 1, day);
}

function formatDate(dateString) {
  if (dateString !== "") {
    const date = new Date(dateString);

    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  } else {
    return "";
  }
}

const checkIfNumber = (event) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, "");
};

const validateCategory = () => {
  if (form.value.classList.contains("was-validated")) {
    const checkboxes = document.querySelectorAll(
      "#category-checkboxes-container .form-check-input"
    );
    const labels = document.querySelectorAll(
      "#category-checkboxes-container .form-check-label"
    );
    if (categoryQuery.value === "for-adoption") {
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
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.classList.remove("is-valid");
        checkbox.classList.remove("is-invalid");
        labels.forEach((label) => {
          label.classList.remove("is-valid");
          label.classList.remove("is-invalid");
        });
      });
    }
  }
};

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
  animalId.value = "";
  name.value = "";
  gender.value = "M";
  breed.value = "";
  categoryQuery.value = "for-adoption";
  category.value = [];
  birthday.value = "";
  microchip.value = "";
  treatment.value = [];
  images.value = [];
};

const fillForm = (animal) => {
  animalId.value = animal.id;
  timestamp.value = animal.timestamp;
  name.value = animal.name;
  gender.value = animal.gender;
  breed.value = animal.breed;
  categoryQuery.value = animal.category_query;
  category.value =
    animal.category_query !== "for-adoption" ? [] : animal.category;
  birthday.value = parseDate(animal.birthday);
  microchip.value = animal.microchip;
  treatment.value = animal.treatment || [];
  images.value = animal.images
    ? animal.images.map((image) => ({
        source: image,
        options: {
          type: "local",
        },
      }))
    : [];
};

const numOfCalls = ref(0);

const controller = ref(new AbortController());

const addAnimal = async () => {
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

      const animalData = {
        name: name.value,
        gender: gender.value,
        breed: breed.value,
        category_query: categoryQuery.value,
        category:
          categoryQuery.value === "adopted" ||
          categoryQuery.value === "in-memoriam"
            ? [categoryQuery.value]
            : [...category.value],
        birthday: formatDate(birthday.value),
        microchip: microchip.value,
        treatment: [...treatment.value],
        images: [...uploadedImages],
        timestamp: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      };

      await apiRequests.addNew(
        route.name === "Dogs" ? "dogs" : "cats",
        animalData,
        controller.value.signal
      );
      localStorage.setItem("action", "add");
      localStorage.setItem("item", animalData.name);
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

const updateAnimal = async () => {
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

      const animalData = {
        name: name.value,
        gender: gender.value,
        breed: breed.value,
        category_query: categoryQuery.value,
        category:
          categoryQuery.value === "adopted" ||
          categoryQuery.value === "in-memoriam"
            ? [categoryQuery.value]
            : [...category.value],
        birthday: formatDate(birthday.value),
        microchip: microchip.value,
        treatment: [...treatment.value],
        images: [...uploadedImages],
        timestamp: timestamp.value,
      };

      await apiRequests.update(
        route.name === "Dogs" ? "dogs" : "cats",
        animalId.value,
        animalData,
        controller.value.signal
      );
      localStorage.setItem("action", "edit");
      localStorage.setItem("item", animalData.name);
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

  validateCategory();
  validateFile();

  const datepicker = document.querySelector(".mx-datepicker input");
  datepicker.style.borderColor = "var(--bs-form-valid-border-color)";

  if (categoryQuery.value === "for-adoption" && category.value.length === 0) {
    event.preventDefault();
    event.stopPropagation();
    errors++;
  }
  console.log(errors);
  if (errors === 0) {
    if (props.selectedAnimal === "") addAnimal();
    else updateAnimal();
  }
};

const handleClose = () => {
  controller.value.abort();
  controller.value = new AbortController();
  emit("closed");
};

const emitOpenDeleteDialog = () => {
  emit("open-delete-dialog", props.selectedAnimal);
};

watch(gender, () => {
  const cleanedParasites = cleanedFromParasites.value;
  const vaccinatedDiseases = vaccinatedAgainstDiseases.value;
  const vaccinatedRabies = vaccinatedAgainstRabies.value;
  const neuter = neutered.value;

  treatment.value = treatment.value.map((treatment) => {
    if (treatment.includes("očišćen") || treatment.includes("očišćena")) {
      return cleanedParasites;
    } else if (
      treatment.includes("cijepljen protiv zaraznih") ||
      treatment.includes("cijepljena protiv zaraznih")
    ) {
      return vaccinatedDiseases;
    } else if (
      treatment.includes("cijepljen protiv bjesnoće") ||
      treatment.includes("cijepljena protiv bjesnoće")
    ) {
      return vaccinatedRabies;
    } else if (
      treatment.includes("kastriran") ||
      treatment.includes("kastrirana")
    ) {
      return neuter;
    } else {
      return treatment;
    }
  });
});

watch(images.value, () => {
  validateFile();
});

watch(
  () => props.selectedAnimal,
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
