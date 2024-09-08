/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#ed1c24",
        bgGray: "rgb(241, 241, 241)",
        textBrown: "#8b8b8b",
      },
    },
  },
  plugins: [],
};
