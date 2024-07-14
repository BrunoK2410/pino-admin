<template>
  <div class="position-fixed w-100 h-100 bg-red"></div>
  <div
    class="position-absolute start-50 translate-middle bg-red"
    style="top: 40%"
  >
    <form class="d-flex flex-column" novalidate @submit.prevent="login">
      <img
        class="img-fluid"
        src="../assets/login-logo.png"
        alt="Pino"
        style="transform: translateX(-5px)"
      />
      <hr />
      <div
        v-if="showError"
        class="rounded p-3 mb-3 text-white text-center"
        style="background-color: var(--red-color)"
      >
        Uneseni podaci nisu ispravni. <br />Molim Vas pokušajte ponovo.
      </div>
      <h1 class="h3 mb-3 text-center fw-bold">Prijava</h1>
      <div class="input-group mb-4">
        <span class="input-group-text" id="email"></span>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            required
            v-model="email"
          />
          <label>Email</label>
        </div>
      </div>
      <div class="input-group mb-4">
        <span class="input-group-text" id="password"></span>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            placeholder="Lozinka"
            required
            v-model="password"
          />
          <label>Lozinka</label>
        </div>
      </div>
      <button
        class="btn btn-lg bg-white text-red"
        style="border: 3px solid var(--darker-red-color)"
        type="submit"
        :disabled="isLoading"
      >
        <span
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
          v-if="isLoading"
        ></span>
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import apiRequests from "../services/apiRequests.js";

const showError = ref(false);

const isLoading = ref(false);

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    isLoading.value = true;
    await apiRequests
      .login({
        email: email.value,
        password: password.value,
        returnSecureToken: true,
      })
      .then((response) => {
        localStorage.setItem("token", response.idToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        location.reload();
      });
  } catch (error) {
    showError.value = true;
  } finally {
    isLoading.value = false;
    email.value = "";
    password.value = "";
  }
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: 0 -0.15rem var(--light-pink-color),
    0.15rem 0 var(--light-pink-color), 0 0.15rem var(--light-pink-color);
  border-color: var(--light-pink-color);
}
button:hover {
  background-color: var(--red-color) !important;
  color: #fff !important;
  border-color: #fff !important;
}

.input-group-text {
  width: 48px;
  height: auto;
}

#email::before,
#password::before {
  content: "";
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  width: 48px;
  height: 24px;
}

#email::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Crect x='3' y='5' width='18' height='14' rx='2' stroke='%23000000' stroke-width='2' stroke-linecap='round'%3E%3C/rect%3E%3C/g%3E%3C/svg%3E");
}

#password::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
}
</style>
