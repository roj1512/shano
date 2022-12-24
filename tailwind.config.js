/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["media"],
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        shano: "#1E90FF",
        ourblack: "#131313",
      },
      fontFamily: {
        isx: "IranSansX, sans-serif",
      },
    },
  },
  plugins: [],
};
