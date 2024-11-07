/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      cursive: ["Dancing Script", "cursive"],
      sourGummy: ["Sour Gummy", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
    },
    colors: {
      //frontface
      darkWhite: "#EEEEEE",
      orang: "#FF9D3D",
      shadow: "#F8EDE3",

      //admin Dashboard
      neonBlue: "#00BFFF",
      magenta: "#FF007F",

      // Secondary Colors
      electricPurple: "#9B4DCA",
      limeGreen: "#32CD32",

      // Accent Colors
      sunsetOrange: "#FF4500",
      goldenYellow: "#FFD700",

      // Neutral Colors
      slateGray: "#2F4F4F",
      lightSlateGray: "#708090",
      gray: "#708090",
      white: "#FFFFFF",
      black: "#000000",
      red: "#e11d48",
      transparent: "transparent",
      black: "#18181b",
      current: "currentColor",
      white: "#ffffff",
      tahiti: {
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
    },
  },
  plugins: [],
};
