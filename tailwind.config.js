/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFCE1A',
        'secondary': "#0D0842",
        "BG-color": "#F3F3F3",
        'favorite': '#FF5841'
      },
      fontFamily: {
        'primary': ["Montserrat", "serif"],
        'secondary' : ["Nunito Sans", "sans-serif"],
    }
    },
  },
  plugins: [],
}

