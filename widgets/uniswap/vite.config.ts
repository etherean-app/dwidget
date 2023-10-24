import { mergeConfig } from "vite";
import { config } from "@dwidget/vite";
import path from "path";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default mergeConfig(
  config({
    pkg,
    dirname: __dirname,
    metadata: {
      name: "Name",
      version: pkg.version,
      description: pkg.description,
      longDescription: undefined,
      website: pkg.homepage,
      props: undefined,
      contact: pkg.author,
      entrypoints: {
        default: "https://use.own.domain",
      },
      screenshots: undefined,
    },
  }),
  {
    resolve: {
      alias: {
        jsbi: path.resolve(__dirname, "./node_modules/jsbi/dist/jsbi-cjs.js"),
        "~@fontsource/ibm-plex-mono": "@fontsource/ibm-plex-mono",
        "~@fontsource/inter": "@fontsource/inter",
      },
    },
    define: {
      global: {},
    },
  }
);
