import "virtual:windi.css";
import "@/assets/styles/reset.css";
import "@/assets/styles/global.scss";
import { createApp } from "vue";
import App from "./App.vue";
import SvgIcon from "@/components/base/SvgIcon/SvgIcon.js";
// import { router } from "@/router/index.js";

const app = createApp(App);
app.component("SvgIcon", SvgIcon);
// app.use(router);
app.mount("#app");
