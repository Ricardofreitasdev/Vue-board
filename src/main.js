import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/main.scss";
import http from "./service/http";

const app = createApp(App);
app.use(store);
app.use(router);
app.config.globalProperties.$http = http;
app.mount("#app");
