import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import TheTable from "./components/shared/TheTable.vue";
import TheModal from "./components/shared/TheModal.vue";

createApp(App)
  .use(router)
  .component("the-table", TheTable)
  .component("the-modal", TheModal)
  .mount("#app");
