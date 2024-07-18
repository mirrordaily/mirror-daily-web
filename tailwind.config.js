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
      backgroundImage: {
        'image-mask':
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 40.54%, #000 100%)',
      },
      zIndex: {
        'over-editor-choice': 10,
        'mobile-nav': 1000000000,
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
