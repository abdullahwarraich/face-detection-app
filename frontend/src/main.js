import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import { BACKEND_API_URL } from "@/utils/constants";

const app = createApp(App);

// Set up Axios
app.config.globalProperties.$axios = axios.create({
  baseURL: BACKEND_API_URL,
});

app.use(router).mount("#app");
