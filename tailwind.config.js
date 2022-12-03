/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.8)'
      },
      keyframes: {
        wiggle: {
          '0%': {
            transform: 'translatey(-100%)'
          },
          '100%': {
            transform: 'translatey(0)'
          },
        },
        sideopen: {
          '0%': {
            transform: 'translatex(100%)'
          },
          '100%': {
            transform: 'translatex(0)'
          },
        },
        sideclose: {
          '0%': {
            transform: 'translatex(0)'
          },
          '100%': {
            transform: 'translatex(100%)'
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s',
        sideclose: 'sideclose 2s',
        sideopen: 'sideopen 1s',
      }
    },
  },
  plugins: [],
}