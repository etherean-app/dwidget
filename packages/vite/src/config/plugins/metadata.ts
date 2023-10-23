import generateFile from "vite-plugin-generate-file";

export type WidgetBuildJson = {
  /** 32 character limit for seed constraints */
  name: string;
  /** Semantic version of the widget  */
  version: string;
  /** 40 character maximum */
  description: string;
  /** optional longer form description */
  longDescription?: string;
  website: string;
  props?: any;
  /** Generic field for entering a method of contact */
  contact: string;
  /** Relative paths to the entrypoint files */
  entrypoints: {
    default: string;
    [entry: string]: string;
  };
  /** Relative paths to asset files */
  screenshots?: string[];
};

export const metadata = (data: WidgetBuildJson): any => {
  return generateFile([
    {
      type: "json",
      output: "./metadata.json",
      data,
    },
  ]);
};
