<template>
  <TheNavbar v-if="route.path !== '/login'" />
  <div :style="{ paddingTop: route.path !== '/login' ? '80px' : '' }">
    <login-page v-if="route.path === '/login'"></login-page>
    <router-view v-slot="{ Component }" v-else>
      <transition name="route" mode="out-in"
        ><component :is="Component"></component
      ></transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import TheNavbar from "./components/layouts/TheNavbar.vue";
import LoginPage from "./pages/LoginPage.vue";

const route = useRoute();
</script>

<style>
:root {
  --red-color: #ec665d;
  --light-pink-color: #f4a39e;
  --darker-red-color: #d45b53;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5 !important;
  min-height: 100vh;
}

html,
body {
  height: 100%;
  background-color: #f5f5f5 !important;
}

.bg-red {
  background-color: var(--red-color) !important;
}

.bg-light-pink {
  background-color: var(--light-pink-color) !important;
}

.text-red {
  color: var(--red-color) !important;
}

.text-light-pink {
  color: var(--light-pink-color) !important;
}

.form-control:focus {
  box-shadow: 0 0 0 0.15rem var(--light-pink-color) !important;

  border-color: var(--light-pink-color) !important;
}

.form-check-input:checked {
  background-color: var(--red-color) !important;
  border-color: var(--red-color) !important;
}

.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem var(--light-pink-color) !important;
}

.spinner-grow {
  color: #343a40;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000002;
}

.mx-input {
  height: 37.6px !important;
}

.mx-table-date .today {
  color: var(--red-color) !important;
}

.mx-calendar-content .cell.active {
  background-color: var(--red-color) !important;
}

.mx-input:hover,
.mx-input:focus {
  border-color: var(--red-color) !important;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
