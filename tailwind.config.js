module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "1/5": "20%",
        "2/5": "40%",
        "1/7": "14.28%",
        "1/8": "12.5%",
      },
      boxShadow: {
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.35)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
