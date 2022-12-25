/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["media"],
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        shano: "#1E90FF",
        "shano-translucent": "#1E90FF11",
        ourblack: "#131313",
      },
      fontFamily: {
        isx: "IranSansX, sans-serif",
      },
    },
  },
  plugins: [],
};
