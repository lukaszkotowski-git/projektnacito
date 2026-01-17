/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        'warm-gray': '#33302E',
        'warm-border': '#E5DED4',
        'warm-accent': '#8C7E6A',
        'warm-bg': '#F2EBE1',
        'warm-hover': '#F7F2EB',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
