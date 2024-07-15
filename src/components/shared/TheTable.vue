<template>
  <div>
    <template v-if="isLoading"
      ><div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div></template
    >
    <template v-else>
      <div
        class="position-sticky d-flex align-items-center justify-content-between flex-wrap py-3 px-5 z-3"
        style="top: 80px; background-color: #f5f5f5; border-bottom: 1px solid"
      >
        <h3 class="m-0">{{ route.meta.plural }}</h3>
        <button
          type="button"
          class="btn text-white bg-red"
          data-bs-toggle="modal"
          data-bs-target="#form-dialog"
        >
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            transform="translate(0,-1)"
            style="margin-right: 5px"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z"
                fill="#ffffff"
              ></path>
            </g></svg
          >{{ addNew }}
        </button>
      </div>
      <div class="text-center w-100 mt-5" style="width: 200px" v-if="hasItems">
        U ovoj tablici trenutno nema podataka.
      </div>
      <div class="p-5 mt-3" style="min-height: 200px" v-else>
        <div id="alertPlaceholder"></div>
        <div class="d-flex flex-column flex-md-row align-items-md-center mb-3">
          <div
            class="input-group me-md-3 py-2"
            style="max-width: 300px; min-width: 100px"
          >
            <input
              type="search"
              class="form-control"
              placeholder="Pretraži..."
              v-model="searchInput"
            />
          </div>
        </div>
        <div class="table-responsive">
          <table
            class="table table-bordered table-success table-hover border-danger"
          >
            <thead style="background-color: #f5f5f9">
              <tr>
                <th
                  v-for="(header, index) in headers"
                  :key="index"
                  @mouseenter="handleMouseEnter(index, true)"
                  @mouseleave="handleMouseLeave(index, false)"
                  @click="handleHeaderClick(index, header)"
                  :class="{
                    sortable:
                      sortIcon[index] !== undefined &&
                      isVisible[index] !== undefined,
                  }"
                  :style="{
                    minWidth: `${setMinMaxWidth(index)}px`,
                    maxWidth: `${setMinMaxWidth(index)}px`,
                  }"
                >
                  {{ header }}
                  <svg
                    :class="{
                      visible: isVisible[index],
                      invisible: !isVisible[index],
                    }"
                    v-if="sortIcon[index] === 1"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="var(--red-color)"
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    class="bx--table-sort__icon-unsorted"
                  >
                    <path
                      d="M27.6 20.6L24 24.2 24 4 22 4 22 24.2 18.4 20.6 17 22 23 28 29 22zM9 4L3 10 4.4 11.4 8 7.8 8 28 10 28 10 7.8 13.6 11.4 15 10z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="sortIcon[index] === 2"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                    enable-background="new 0 0 32 32"
                    xml:space="preserve"
                    width="24"
                    height="24"
                    fill="var(--red-color)"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <line
                        fill="none"
                        stroke="var(--red-color)"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        x1="16"
                        y1="6"
                        x2="16"
                        y2="28"
                      ></line>
                      <polyline
                        fill="none"
                        stroke="var(--red-color)"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        points="7.5,14 16,5.5 24.5,14 "
                      ></polyline>
                    </g>
                  </svg>
                  <svg
                    v-else-if="sortIcon[index] === 3"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                    enable-background="new 0 0 32 32"
                    xml:space="preserve"
                    width="24"
                    height="24"
                    fill="var(--red-color)"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <line
                        fill="none"
                        stroke="var(--red-color)"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        x1="16"
                        y1="26"
                        x2="16"
                        y2="4"
                      ></line>
                      <polyline
                        fill="none"
                        stroke="var(--red-color)"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        points="24.5,18 16,26.5 7.5,18 "
                      ></polyline>
                    </g>
                  </svg>
                </th>
                <th>OBRIŠI ?</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in rows" :key="row.id">
                <td
                  v-for="(propertyName, propIndex) in propertyNames"
                  :key="propIndex"
                  :class="{
                    'fw-semibold': propIndex === 0,
                  }"
                  :style="{
                    height: propIndex === 1 ? '150px' : 'auto',
                  }"
                >
                  <template v-if="propIndex === 0">
                    <a
                      @click="
                        route.name !== 'News'
                          ? (selectedAnimal = row)
                          : (selectedNews = row)
                      "
                      data-bs-toggle="modal"
                      data-bs-target="#form-dialog"
                      >{{
                        getProcessedValue(row[propertyName], propertyName)
                      }}</a
                    >
                  </template>
                  <template v-else-if="propIndex === 1">
                    <div
                      v-if="!imageLoaded[rowIndex]"
                      class="spinner-grow"
                      role="status"
                      style="z-index: 0"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <img
                      :key="reRenderImage"
                      :src="row[propertyName][0]"
                      class="img-fluid"
                      :class="{ 'fade-in': imageLoaded[rowIndex] }"
                      style="
                        min-width: 200px;
                        max-width: 200px;

                        opacity: 0;
                        transition: opacity 0.5s ease-in-out;
                      "
                      @load="handleImageLoad(rowIndex)"
                    />
                  </template>
                  <template v-else>
                    {{
                      getProcessedValue(row[propertyName], propertyName, row)
                    }}</template
                  >
                </td>
                <td>
                  <button
                    id="delete"
                    class="btn btn-outline-danger"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-dialog"
                    @click="openDeleteDialog(row)"
                  ></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <the-pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @decrement="$emit('decrement')"
          @increment="$emit('increment')"
          @active-page="handleActivePage"
        ></the-pagination>
        <AnimalForm
          :selectedAnimal="selectedAnimal"
          @closed="selectedAnimal = ''"
          @open-delete-dialog="triggerOpenDeleteDialog"
          v-if="route.name !== 'News'"
        ></AnimalForm
        ><NewsForm
          :selectedNews="selectedNews"
          @closed="selectedNews = ''"
          @open-delete-dialog="triggerOpenDeleteDialog"
          v-else
        >
        </NewsForm>
        <the-modal
          :modalId="'delete-dialog'"
          :modalTitle="deleteModalTitle"
          :submitted="isLoading"
        >
          <p class="my-2">
            Jeste li sigurni da želite obrisati
            {{
              route.name === "Dogs"
                ? "psa"
                : route.name === "Cats"
                ? "mačku"
                : "članak"
            }}
            - <span class="fw-bold">"{{ subject }}"</span> ?
          </p>
          <template #footer>
            <button class="btn btn-danger" @click="deleteItem">Obriši</button>
          </template></the-modal
        >
      </div></template
    >
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ThePagination from "./ThePagination.vue";
import AnimalForm from "../../pages/forms/AnimalForm.vue";
import NewsForm from "../../pages/forms/NewsForm.vue";
import apiRequests from "../../services/apiRequests.js";

const props = defineProps({
  isLoading: Boolean,
  subject: String,
  headers: Array,
  rows: Array,
  allItems: Array,
  propertyNames: Array,
  sortIcon: Array,
  isVisible: Array,
  totalItems: Array,
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits([
  "mouseEnter",
  "mouseLeave",
  "headerClick",
  "decrement",
  "increment",
  "active-page",
  "update:modelValue",
]);

const route = useRoute();

const router = useRouter();

const searchInput = ref("");

const selectedAnimal = ref("");

const selectedNews = ref("");

const imageLoaded = ref(Array(props.rows.length).fill(false));

const reRenderImage = ref(0);

const handleImageLoad = (rowIndex) => {
  console.log(rowIndex);
  imageLoaded.value[rowIndex] = true;
};

watch(
  () => props.rows,
  (newRows) => {
    reRenderImage.value++;
    imageLoaded.value = Array(newRows.length).fill(false);
  }
);

watch(searchInput, (newValue) => {
  emit("update:modelValue", newValue);
});

const handleMouseEnter = (index, value) => {
  emit("mouseEnter", { index, value });
};
const handleMouseLeave = (index, value) => {
  emit("mouseLeave", { index, value });
};
const handleHeaderClick = (index, header) => {
  emit("headerClick", { index, header });
};

const handleActivePage = (page) => {
  emit("active-page", page);
};

const setMinMaxWidth = (index) => {
  switch (index) {
    case 0:
      return 250;
    case 1:
      return 200;
    case 2:
      return 200;
    case 3:
      return route.name !== "News" ? 125 : 200;
    case 4:
      return 250;
    case 5:
      return 250;
    case 6:
      return 200;
    case 7:
      return 200;
    case 8:
      return 250;
  }
};

const hasItems = ref(props.allItems.length !== 0);

const addNew = computed(() => {
  if (route.path === "/dogs") {
    return "Novi pas";
  } else if (route.path === "/cats") {
    return "Nova mačka";
  } else {
    return "Novi članak";
  }
});

const getProcessedValue = (value, property) => {
  if (property === "category") {
    let joinedString = value.join(",");

    const replacements = {
      "in-memoriam": "In-memoriam",
      adopted: "Udomljen",
      [route.name === "Cats" ? "kitten" : "puppy"]:
        route.name === "Cats" ? "Mačići" : "Štene",
      young: "Mladi",
      adult: "Odrasli",
      old: "Stari",
      "permanent-care": "Na trajnom čuvanju",
      disabled: "Invalidni",
    };

    for (const [key, replacement] of Object.entries(replacements)) {
      if (joinedString.includes(key)) {
        joinedString = joinedString.replace(new RegExp(key, "g"), replacement);
      }
    }

    return joinedString;
  } else if (property === "treatment") {
    if (!value) {
      return "";
    }
    let joinedString = value.join(",");

    let modifiedString = joinedString
      .split(",")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(",");

    return modifiedString;
  } else if (property === "gender") {
    if (value === "F") {
      return "Ž";
    } else return value;
  } else if (property === "timestamp") {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } else return value;
};

const deleteModalTitle = ref("");
const deleteId = ref("");
const isLoading = ref(false);
const subject = ref("");

const openDeleteDialog = (row) => {
  subject.value = route.name !== "News" ? row.name : row.title;
  deleteModalTitle.value = `Obriši "${subject.value}" ?`;
  deleteId.value = row.id;
};

const deleteItem = async () => {
  isLoading.value = true;
  await apiRequests.delete(
    route.name === "Dogs" ? "dogs" : route.name === "Cats" ? "cats" : "news",
    deleteId.value
  );
  localStorage.setItem("action", "delete");
  localStorage.setItem("item", subject.value);
  router.go(0);
};

const triggerOpenDeleteDialog = (row) => {
  openDeleteDialog(row);
};
</script>

<style scoped>
thead tr th {
  white-space: nowrap;
  text-align: center;
  position: relative;
}

td {
  vertical-align: middle;
  text-align: center;
  position: relative;
}

.table {
  --bs-table-bg: unset !important;
}

th.sortable {
  background-color: #f4f6f9;
  user-select: none;
}

th.sortable:hover {
  cursor: pointer;
}

th:not(.sortable) {
  user-select: text;
}

.clickable-table-link:hover {
  cursor: pointer;
  color: var(--light-purple-color);
}

thead svg {
  position: absolute;
  right: 10px;
}

#delete::before {
  content: "";
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M10 11V17' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M14 11V17' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M4 7H20' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
}

#delete:hover::before {
  background-image: url("data:image/svg+xml,%3Csvg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M10 11V17' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M14 11V17' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M4 7H20' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
}

.fade-in {
  opacity: 1 !important;
}
</style>
