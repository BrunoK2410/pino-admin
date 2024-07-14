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

const headers = ["ID", "SLIKA", "NASLOV", "DATUM OBJAVE"];

const propertyNames = ["id", "images", "title", "timestamp"];

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
  "news",
  [1, undefined, 1, 1],
  [false, undefined, false, false],
  headers,
  propertyNames
);
</script>
