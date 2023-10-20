import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import banner from "vite-plugin-banner";
import progress from "vite-plugin-progress";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression2";
import path from "path";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    progress(),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
    }),
    preact(),
    compression({
      algorithm: "gzip",
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      react: path.resolve(__dirname, "./node_modules/preact/compat/"),
      "react-dom": path.resolve(__dirname, "./node_modules/preact/compat/"),
    },
  },
});
