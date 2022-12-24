/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shano: "#1E90FF",
      },
      fontFamily: {
        isx: "IranSansX, sans-serif",
      },
    },
  },
  plugins: [],
};
