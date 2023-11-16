import path from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { plugins } from "./plugins";

// https://vitejs.dev/config/
export const config = ({
  dirname,
}: {
  dirname: string;
}) =>
  defineConfig({
    plugins: [preact(), plugins()],
    resolve: {
      alias: {
        "@": path.resolve(dirname, "./src/"),
      },
    },
  });
