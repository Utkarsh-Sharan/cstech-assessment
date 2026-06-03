/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#210F37",
          secondary: "#4F1C51",
          tertiary: "#A55B4B",
          accent: "#DCA06D"
        }
      }
    },
  },
  plugins: [],
}

