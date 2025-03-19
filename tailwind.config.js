/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './shared-components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '720px',
      lg: '1200px',
    },
    extend: {
      colors: {},
      backgroundColor: {
        mirror: {
          blue: {
            600: '#896fcc',
            700: '#674ab1',
            800: '#3b1e86',
          },
        },
      },
      backgroundImage: {
        'image-mask':
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 40.54%, #000 100%)',
        'slideshow-mask':
          'linear-gradient(to bottom, rgba(255, 255, 255, 0) 648px, rgba(255, 255, 255, 1) 906px)',
      },
      zIndex: {
        'over-editor-choice': 10,
        'over-shorts': 10,
        'over-slides': 10,
        'upload-modal': 1000000,
        'light-box': 10000000,
        'mobile-nav': 1000000000,
      },
      height: {
        header: {
          default: '60px',
          sm: '68px',
        },
        screen: ['100vh', '100dvh'],
      },
      boxShadow: {
        input: ['2px 2px 2px 0px rgba(0,0,0,0.05)'],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // apply to both :hover and :active but doesn't work for group-*
      addVariant('hover-or-active', ['&:hover', '&:active'])
    }),
  ],
}
