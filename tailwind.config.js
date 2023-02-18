/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      lato: ['Lato', 'sans-serif', 'ui-sans-serif', 'system-ui'],
      poppins: ['Poppins', 'sans-serif', 'ui-sans-serif', 'system-ui'],
    },

    extend: {},
  },
  plugins: [],
};
