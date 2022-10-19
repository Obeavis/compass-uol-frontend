/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF2D04",
        "primary-dark": "#C13216",
        secondary: "#E9B425",
        tertiary: "#313439",
        "tertiary-dark": "#1c1d20",
        quartiary: "#C12D18",
      },
      fontFamily: {
        "mark-pro": ["Mark-Pro"],
      },
    },
  },
  plugins: [],
};
