/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/pages/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    boxShadow: {
      xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      sm: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
      md: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
      lg: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
      xl: "0px 20px 25px -5px rgba(16, 24, 40, 0.08), 0px 10px 10px -5px rgba(16, 24, 40, 0.03)",
    },
    extend: {
      colors: {
        npa: {
          neutral: {
            25: "#fcfcfd",
            50: "#f8fafc",
            100: "#eef2f6",
            200: "#e3e8ef",
            300: "#cdd5df",
            400: "#9aa4b2",
            500: "#697586",
            600: "#4b5565",
            700: "#364152",
            800: "#202939",
            900: "#121926",
          },
          primary: {
            25: "#ccedf3",
            50: "#aae2eb",
            100: "#80d3e0",
            200: "#56c4d6",
            300: "#2bb6cc",
            400: "#01a7c2",
            500: "#018ba2",
            600: "#016f81",
            700: "#005361",
            800: "#003841",
            900: "#002127",
          },
          success: {
            25: "#f6fef9",
            50: "#edfcf2",
            100: "#d3f8df",
            200: "#aaf0c4",
            300: "#73e2a3",
            400: "#3ccb7f",
            500: "#16b364",
            600: "#099250",
            700: "#087443",
            800: "#095c37",
            900: "#084c2e",
          },
          error: {
            25: "#fffbfa",
            50: "#fef3f2",
            100: "#fee4e2",
            200: "#fecdca",
            300: "#fda29b",
            400: "#f97066",
            500: "#f04438",
            600: "#d92d20",
            700: "#b42318",
            800: "#912018",
            900: "#7a271a",
          },
          info: {
            25: "#d6e1f9",
            50: "#bbccf6",
            100: "#98b3f1",
            200: "#769aec",
            300: "#5480e8",
            400: "#3267e3",
            500: "#2a56bd",
            600: "#214597",
            700: "#193371",
            800: "#11224c",
            900: "#0a152d",
          },
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
};
