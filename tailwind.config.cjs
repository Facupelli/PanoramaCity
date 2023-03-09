/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["Josefin Slab", "serif"],
        barlow: ["Barlow", "sans-serif"],
        inconsolata: ["Inconsolata", "monospace"],
        archivo: ["Archivo Narrow", "sans-serif"],
      },
      colors: {
        marino: "#1f233f",
        oliva: "#90c228",
      },
      height: {
        nav: "70px",
      },
      width: {
        "p-card": "330px",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat( auto-fill, minmax(280px, 1fr) )",
      },
    },
  },
  plugins: [],
};

module.exports = config;
