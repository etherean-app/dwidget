import { PluginOption } from "vite";
import progress from "vite-plugin-progress";
import turboConsole from "vite-plugin-turbo-console";
import { visualizer } from "rollup-plugin-visualizer";

export const plugins = (): PluginOption[] => [
  progress(),
  turboConsole(),
  visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
  }),
];
