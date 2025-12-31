/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFFFFF',
          dark: '#2C3E50'
        },
        accent: {
          DEFAULT: '#1BA9A9',
          light: '#4DD4D4',
          dark: '#138A8A'
        },
        teal: {
          50: '#F0FAFA',
          100: '#D4F1F1',
          200: '#A8E3E3',
          300: '#7DD5D5',
          400: '#4DD4D4',
          500: '#1BA9A9',
          600: '#138A8A',
          700: '#0F6B6B',
          800: '#0B4D4D',
          900: '#072E2E'
        },
        cream: '#FFF9F0',
        footer: '#1A1A1A'
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        heading: ['Righteous', 'cursive'],
        sans: ['Poppins', 'sans-serif']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        'container': '1200px',
      }
    },
  },
  plugins: [],
}
