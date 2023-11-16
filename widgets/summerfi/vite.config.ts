import { mergeConfig } from "vite";
import { config } from "@dwidget/vite-dwidget";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default mergeConfig(
  config({
    pkg,
    dirname: __dirname,
    metadata: {
      name: "Summerfi",
      version: pkg.version,
      description: pkg.description,
      longDescription: undefined,
      website: pkg.homepage,
      props: undefined,
      contact: pkg.author,
      entrypoints: {
        default: {
          src: "https://etherean-app.github.io/dwidget/summerfi/",
          sizes: {
            default: {
              height: 264,
            },
          },
        },
      },
      screenshots: undefined,
    },
  }),
  {}
);
