module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#db4c3f",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
