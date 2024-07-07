<template>
  <the-table
    :isLoading="isLoading"
    :headers="headers"
    :rows="slicedItems"
    :allItems="items"
    :propertyNames="propertyNames"
    :sortIcon="sortIcon"
    :isVisible="isVisible"
    :currentPage="currentPage"
    :totalPages="totalPages"
    :totalItems="totalItems"
    @mouseEnter="setSortIcon"
    @mouseLeave="setSortIcon"
    @headerClick="toggleSortIcon"
    @decrement="prev"
    @increment="next"
    @active-page="handleActivePage"
    v-model="searchInput"
  ></the-table>
</template>

<script setup>
import { useTableDataHandling } from "../../hooks/tableDataHandling.js";
import apiRequests from "../../services/apiRequests.js";

const headers = [
  "ID",
  "IME",
  "SPOL",
  "PASMINA",
  "KATEGORIJA",
  "ROĐENDAN",
  "MIKROČIP",
  "OBRADA",
];

const propertyNames = [
  "id",
  "name",
  "gender",
  "breed",
  "category",
  "birthday",
  "microchip",
  "treatment",
];

const {
  isLoading,
  items,
  totalItems,
  searchInput,
  slicedItems,
  sortIcon,
  isVisible,
  setSortIcon,
  toggleSortIcon,
  currentPage,
  totalPages,
  prev,
  handleActivePage,
  next,
} = useTableDataHandling(
  apiRequests.getData,
  "dogs",
  [1, 1, 1, 1, 1, 1, 1, 1],
  [false, false, false, false, false, false, false, false],
  headers,
  propertyNames
);
</script>
