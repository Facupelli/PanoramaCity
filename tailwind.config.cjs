/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
        philo: ["Philosopher", "sans-serif"],
      },
      colors: {
        "m-blue": "#1D2A36",
        "s-blue": "#2C3E50",
        "t-blue": "#74A7D6",
        "m-green": "#939C4E",
        "m-white": "#faf7f2",
        "m-black": "#232323",
      },
      height: {
        nav: "70px",
      },
      width: {
        "p-card": "330px",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat( auto-fill, minmax(300px, 1fr) )",
        "auto-s3": "repeat( auto-fill, minmax(200px, 1fr) )",
        "auto-utilities": "repeat( auto-fill, minmax(200px, 1fr) )",
      },
      backgroundImage: {
        "landing-image":
          "linear-gradient(rgba(0,0,0,.3) 70px,transparent 310px)",
      },
      boxShadow: {
        landing: "0px 0px 20px 150px #2c4358",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "25%" },
        },
        move: {
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        move: "move 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

module.exports = config;
