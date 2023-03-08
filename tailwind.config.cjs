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
      height: {
        nav: "70px",
      },
      width: {
        "p-card": "330px",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat( auto-fit, minmax(330px, 1fr) )",
      },
    },
  },
  plugins: [],
};

module.exports = config;
