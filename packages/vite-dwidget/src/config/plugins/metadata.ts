import generateFile from "vite-plugin-generate-file";

type Size = {
  height?: number;
  width?: number;
};

type Widget = {
  src: string;
  sizes?: {
    default: Size;
    [entry: string]: Size;
  };
};

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
    default: Widget;
    [entry: string]: Widget;
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
