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
import { onMounted } from "vue";
import TheNavbar from "./components/layouts/TheNavbar.vue";
import LoginPage from "./pages/LoginPage.vue";
import apiRequests from "./services/apiRequests";

const route = useRoute();

const tokenRefreshInterval = 1 * 60 * 1000;

const scheduleTokenRefresh = (refreshToken) => {
  setTimeout(async () => {
    try {
      const response = await apiRequests.refreshToken(refreshToken);
      localStorage.setItem("token", response.id_token);
      scheduleTokenRefresh(response.refresh_token);
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  }, tokenRefreshInterval);
};
onMounted(() => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    scheduleTokenRefresh(refreshToken);
  }
});
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

a {
  cursor: pointer;
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
  box-shadow: 0 0 0 0.15rem rgba(244, 163, 158, 0.4) !important;

  border-color: rgba(244, 163, 158, 0.4) !important;
}

.form-check-input:checked {
  background-color: var(--red-color) !important;
  border-color: var(--red-color) !important;
}

.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem var(--light-pink-color) !important;
}

.spinner-grow {
  color: var(--red-color);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -1rem;
  margin-top: -1rem;
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

.mx-input:hover {
  border-color: #ccc !important;
}

.mx-input:focus {
  border-color: rgba(244, 163, 158, 0.4) !important;
}

.alert {
  display: flex;
  align-items: center;
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
