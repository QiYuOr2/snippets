import { createRouter, createWebHashHistory } from "vue-router";
import { Router } from "./utils/constants";

import PC from "./pages/pc.vue";
import H5 from "./pages/h5.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: Router.PC, component: PC },
    { path: "/h5", name: Router.H5, component: H5 },
  ],
});
