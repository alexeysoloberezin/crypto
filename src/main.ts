import { createApp } from "vue";
import App from "./App.vue";
/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "@/router";
import store from "@/store";
import ApiService from "@/core/services/ApiService";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import i18n from "@/i18n";
import Equal from 'equal-vue'
import 'equal-vue/dist/style.css'
import 'mosha-vue-toastify/dist/style.css'
// import MockService from "@/core/mock/MockService";
// if app have type any then app.use(Load script) will work, but error in browser
const app = createApp(App);

app.use(Equal)
app.use(store);
app.use(router);
ApiService.init(app);
// MockService.init(app);
initInlineSvg(app);
app.use(i18n);

app.mount("#app");
