/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primarycolor: "#F9A826",
      },
    },
    fontFamily: {
      display: ["DM Sans", "sans-serif"],
    },
  },
  plugins: [],
};
