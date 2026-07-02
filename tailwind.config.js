/** @type {import('tailwindcss').Config} */
// ordering_02 — Klassische Pizzeria: warmes Creme + Tomatenrot, elegante Serife
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fffbf5",
        sand: "#fbe9d9",
        coffee: "#3a2a1f",
        terra: "#c0392b",
        terradark: "#a13325",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
