<template>
  <div>
    <template v-if="isLoading"
      ><div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div></template
    >
    <template v-else>
      <div
        class="d-flex align-items-center justify-content-between flex-wrap my-3 mx-5"
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
      <hr />
      <div class="mt-3" v-if="allItems.length === 0">
        U ovoj tablici trenutno nema podataka.
      </div>
      <div class="p-5 mt-3" style="min-height: 200px" v-else>
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
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                <td
                  v-for="(propertyName, propIndex) in propertyNames"
                  :key="propIndex"
                  :class="{
                    'fw-semibold': propIndex === 0,
                  }"
                >
                  {{ getProcessedValue(row[propertyName], propertyName) }}
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
        <DogForm></DogForm></div
    ></template>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref, computed } from "vue";
import { useRoute } from "vue-router";
import ThePagination from "./ThePagination.vue";
import DogForm from "../../pages/DogForm.vue";

defineProps({
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

const searchInput = ref("");

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
      return 125;
    case 3:
      return 250;
    case 4:
      return 250;
    case 5:
      return 150;
    case 6:
      return 200;
    case 7:
      return 250;
  }
};

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
  } else return value;
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
</style>
