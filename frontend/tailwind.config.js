/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🌙 enable dark mode toggle
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B85FF",
        secondary: "#EF863E",
      },
    },
  },
  plugins: [],
};


