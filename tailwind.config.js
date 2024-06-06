/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './shared-components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: '720px',
      lg: '1200px',
    },
    extend: {
      colors: {
        mirror: {
          500: '#004EBC',
          700: '#212944',
          800: '#000928',
        },
      },
    },
  },
  plugins: [],
}
