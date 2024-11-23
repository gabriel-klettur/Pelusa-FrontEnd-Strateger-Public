/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Configura Roboto como fuente sans-serif
      },
      colors: {
        african_violet: {
          DEFAULT: '#a393bf',
          100: '#1f192a',
          200: '#3f3255',
          300: '#5e4b7f',
          400: '#7e67a6',
          500: '#a393bf',
          600: '#b5a8cc',
          700: '#c7bdd9',
          800: '#dad3e5',
          900: '#ece9f2',
        },
        ecru: {
          DEFAULT: '#BFB48F',
          100: '#2A261B', // Tonalidad más oscura
          200: '#554C37',
          300: '#807354',
          400: '#AA9970',
          500: '#BFB48F', // Color base
          600: '#D2C6A7',
          700: '#E5D8BF',
          800: '#F0E8D6',
          900: '#F9F4EA', // Tonalidad más clara
        },
        tview_text: {
          DEFAULT: '#403A43',          
        },
      },
    },
  },
  plugins: [],
};
