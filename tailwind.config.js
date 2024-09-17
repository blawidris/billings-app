/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "aeonik-bold": "AeonikTrail-Bold",
        aeonik: [
          "AeonikTrail-Regular",
          "AeonikTrail-RegularItalic",
          "AeonikTrail-Light",
          "AeonikTrail-LightItalic",
          "AeonikTrail-BoldItalic",
          "AeonikTrail-Bold",
        ],
        raleway: [
          "Raleway-Regular",
          "Raleway-Medium",
          "Raleway-SemiBold",
          "Raleway-Bold",
          "Raleway-ExtraBold",
          "Raleway-Italic",
        ],
      },
      colors: {
        primary: "#1F6CAB",
      },
    },
  },
  plugins: [],
};
