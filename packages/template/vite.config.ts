import { mergeConfig } from "vite";
import { config } from "@dwidget/vite";

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
  {}
);
