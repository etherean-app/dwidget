import path from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { plugins } from "./plugins";
import { Pkg } from "../types";
import { WidgetBuildJson } from "./plugins/metadata";

// https://vitejs.dev/config/
export const config = ({
  pkg,
  dirname,
  metadata,
}: {
  pkg: Pkg;
  dirname: string;
  metadata: WidgetBuildJson;
}) =>
  defineConfig({
    base: `/${pkg.name.replace("@", "")}`,
    plugins: [preact(), plugins({ pkg, metadata })],
    resolve: {
      alias: {
        "@": path.resolve(dirname, "./src/"),
      },
    },
  });
