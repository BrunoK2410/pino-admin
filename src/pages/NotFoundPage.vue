<template>
  <div
    class="d-flex flex-column align-items-center p-5 text-center"
    style="font-family: 'Bellota', system-ui"
  >
    <img class="img-fluid" src="../assets/dogerror.png" />
    <h1>404</h1>
    <h3>Ups , stranica koju tražite ne postoji</h3>
    <router-link to="/dogs"> &larr; Natrag na pse </router-link
    ><router-link to="/cats"> &larr; Natrag na mačke </router-link
    ><router-link to="/news"> &larr; Natrag na novosti </router-link>
  </div>
</template>
