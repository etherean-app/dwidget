import { mergeConfig } from "vite";
import { config } from "@dwidget/vite";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default mergeConfig(
  config({
    pkg,
    dirname: __dirname,
    metadata: {
      name: "Uniswap Widget",
      version: pkg.version,
      description: pkg.description,
      longDescription: undefined,
      website: pkg.homepage,
      props: undefined,
      contact: pkg.author,
      entrypoints: {
        default: {
          src: "https://etherean-app.github.io/dwidget/uniswap-swap/",
          sizes: {
            default: {
              height: 343,
            },
          },
        },
      },
      screenshots: undefined,
    },
  }),
  {}
);
