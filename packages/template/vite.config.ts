import path from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { plugins } from "@dwidget/vite";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  base: "dwidget/lido",
  plugins: [preact(), plugins({ pkg })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
