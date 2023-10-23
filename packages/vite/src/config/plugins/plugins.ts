import { Plugin } from "vite";
import progress from "vite-plugin-progress";
import banner from "vite-plugin-banner";
import compression from "vite-plugin-compression2";
import turboConsole from "vite-plugin-turbo-console";
// import archive from "unplugin-compression/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { WidgetBuildJson, metadata as metadataPlugin } from "./metadata";
import { Pkg } from "../../types";

export const plugins = ({
  pkg,
  metadata,
}: {
  pkg: Pkg;
  metadata: WidgetBuildJson;
}): Plugin[] => [
  progress(),
  // TODO: use join
  banner({
    content: `/**\n * name: ${pkg.name}\n * version: v${
      pkg.version
    }\n * description: ${pkg.description}\n * author: ${pkg.author}${
      pkg.homepage ? "\n * homepage: ${pkg.homepage}\n" : ""
    }*/`,
  }),
  compression({
    algorithm: "gzip",
    exclude: [/\.(br)$ /, /\.(gz)$/],
  }),
  compression({
    algorithm: "brotliCompress",
    exclude: [/\.(br)$ /, /\.(gz)$/],
  }),
  metadataPlugin(metadata),
  // archive({
  //   adapter: "tar",
  //   outDir: "./dist",
  // }),
  turboConsole(),
  visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
  }),
];
