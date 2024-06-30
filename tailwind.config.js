/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#151f2c',
        primary: '#182433',
        secondary: '#21212B',
        tertiary: '#19191d',
        borders: '#1f2e41'
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
      }
    },
  },
  plugins: [],
}