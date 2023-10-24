import path from "path";
import fs from "fs";
import compression from "unplugin-compression/vite";

export const bundle = () => {
  return compression({
    adapter: "zip",
    formatter: "dwidget-bundle.{{ext}}",
    hooks: {
      "compress:after"(_ctx, source) {
        fs.renameSync(
          source.resolvedOutput,
          path.resolve(
            process.cwd(),
            `./dist/${path.basename(source.resolvedOutput)}`
          )
        );
      },
    },
  });
};
