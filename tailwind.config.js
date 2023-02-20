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

    extend: {
      colors: {
        'chenkster-blue': '#0973E1',
        'chenkster-gray': '#212E5B',
        'chenkster-gray-light': '#F2F2F2',
        'chenkster-gray-lighter': '#F9F9F9',
        'chenkster-green': '#3CD24B',
      },
      backgroundImage: {
        italy: "url('/images/italy.png')",
      },
    },
  },
  plugins: [],
};
