const defaultTheme = require("tailwindcss/defaultTheme");
import starlightPlugin from "@astrojs/starlight-tailwind";

// Generated color palettes
const accent = {
  200: "#f8b3c0",
  600: "#c50059",
  900: "#600428",
  950: "#420d1e",
};
const gray = {
  100: "#f8f6f1",
  200: "#f2ede3",
  300: "#c7c1b5",
  400: "#958a72",
  500: "#615740",
  700: "#413721",
  800: "#2f2510",
  900: "#1c180e",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: { accent, gray },
      fontFamily: {
        sans: [
          '"InterVariable", "Inter"',
          {
            fontFeatureSettings:
              '"liga" 1, "calt" 1, "dlig" 1, "cv05" 1, "cv11" 1',
          },
          ...defaultTheme.fontFamily.sans,
        ],
      },
      screens: {
        "sl-wide": "800px",
      },
    },
  },
  plugins: [starlightPlugin()],
};
