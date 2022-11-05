import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~vue": path.resolve(__dirname, "../../lib/vue"),
      "~shared": path.resolve(__dirname, "../../lib/shared"),
      "~style": path.resolve(__dirname, "../../lib/style"),
    },
  },
  plugins: [vue()],
});
