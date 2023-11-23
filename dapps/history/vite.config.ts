import { mergeConfig } from "vite";
import { config } from "@dwidget/vite-dapp";

// https://vitejs.dev/config/
export default mergeConfig(
  config({
    dirname: __dirname,
  }),
  {
    base: "/dwidget/dapps/history",
  }
);
