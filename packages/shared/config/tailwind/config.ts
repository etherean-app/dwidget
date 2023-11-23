import { Config } from "tailwindcss";
import { withMaterialColors } from "tailwind-material-colors";

export const tailwind = (config?: Config): Config =>
  withMaterialColors(
    {
      darkMode: "class",
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@dwidget/shared/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@dwidget/shared-dapp/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        fontFamily: {
          sans: ["Roboto", "sans-serif"],
          serif: ["Roboto Slab", "serif"],
          body: ["Roboto", "sans-serif"],
        },
      },
      ...config,
    },
    {
      primary: "#1460A5",
      primary94: { hex: "#E6EEFF", harmonize: false },
    }
  );
