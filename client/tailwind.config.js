module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#db4c3f",
        danger: "",
        warning: "",
        sign: "",
        signup: "",
      },
      fontFamily: {
        roboto: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        menu: ["Libre Baskerville", "Georgia,serif"],
        input: ["Lucida Casual", "Comic Sans MS"],
        button: ["Helvetica"],
      },
      spacing: {
        xl: "48px",
      },
      borderColor: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
