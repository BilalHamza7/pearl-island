/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      saira: ['Saira', 'sans-serif '],
      montserrat: ['Montserrat', 'mono'],
      crimson: ['Crimson Text', 'sans-serif'],
      ibmplexserif: ['IBM Plex Serif', 'sans-serif'],
      cormorant: ['Cormorant', 'sans-serif'],
      spectral: ['Spectral', 'sans-serif'],
    },
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 20s linear infinite', // Adjust duration
      },
      keyframes: {
        'infinite-scroll': {
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}

