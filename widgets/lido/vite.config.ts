import { mergeConfig } from "vite";
import { config } from "@dwidget/vite";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default mergeConfig(config({ pkg, dirname: __dirname }), {});
