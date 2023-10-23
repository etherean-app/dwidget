import path from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { plugins } from "./plugins";
import { Pkg } from "../types";

// https://vitejs.dev/config/
export const config = ({ pkg, dirname }: { pkg: Pkg; dirname: string }) =>
  defineConfig({
    base: pkg.name.replace("@", ""),
    plugins: [preact(), plugins({ pkg })],
    resolve: {
      alias: {
        "@": path.resolve(dirname, "./src/"),
      },
    },
  });
