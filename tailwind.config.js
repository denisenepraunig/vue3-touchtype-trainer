/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  daisyui: {
    themes: ['light', 'dark', 'cupcake']
  },
  theme: {
    extend: {}
  },
  darkMode: 'selector',
  plugins: ['@tailwindcss/typography', require('daisyui')]
}
