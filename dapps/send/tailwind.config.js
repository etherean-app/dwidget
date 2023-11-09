/** @type {import('tailwindcss').Config} */
import { withMaterialColors } from "tailwind-material-colors";

export default withMaterialColors(
  {
    darkMode: "class",
    content: [
      "./node_modules/actify/lib/*.{js,mjs}",
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Roboto Slab", "serif"],
        body: ["Roboto", "sans-serif"],
      },
    },
    plugins: [],
  },
  {
    primary: "#1460A5",
    primary94: { hex: "#E6EEFF", harmonize: false },
  }
);
