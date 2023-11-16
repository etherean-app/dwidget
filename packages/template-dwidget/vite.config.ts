import { mergeConfig } from "vite";
import { config } from "@dwidget/vite-dwidget";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default mergeConfig(
  config({
    pkg,
    dirname: __dirname,
    metadata: {
      name: "Name", // TODO: name
      version: pkg.version,
      description: pkg.description,
      longDescription: undefined,
      website: pkg.homepage,
      props: undefined,
      contact: pkg.author,
      entrypoints: {
        default: {
          src: "https://use.own.domain", // TODO: url
          sizes: {
            default: {
              height: 100, // TODO: change to your widget height
            },
          },
        },
      },
      screenshots: undefined,
    },
  }),
  {}
);
