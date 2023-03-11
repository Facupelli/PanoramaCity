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
        "oliva-s": "#BEE36D",
      },
      height: {
        nav: "70px",
      },
      width: {
        "p-card": "330px",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat( auto-fill, minmax(300px, 1fr) )",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "25%" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
