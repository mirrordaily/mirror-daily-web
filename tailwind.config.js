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
      borderRadius: {
        '2xs': '4px',
      },
      colors: {
        mirror: {
          blue: {
            200: '#F3E2FD',
            300: '#D6CBF1',
            400: '#BDACE9',
            500: '#9A82DA',
            600: '#896fcc',
            700: '#674ab1',
            800: '#3b1e86',
          },
          red: {
            400: '#FF9078',
            500: '#FF5457',
            600: '#E54B29',
          },
        },
        primary: {
          200: '#E5E6E9',
          300: '#CCCED4',
          400: '#B2B5BE',
          500: '#7F8493',
          600: '#68666D',
          700: '#4E4E4E',
          800: '#2B2B2B',
        },
      },
      backgroundImage: {
        'image-mask':
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 40.54%, #000 100%)',
        'slideshow-mask':
          'linear-gradient(to bottom, rgba(255, 255, 255, 0) 648px, rgba(255, 255, 255, 1) 906px)',
      },
      zIndex: {
        'topic-header-mobile': 10,
        'sports-event-select-menu': 10,
        'over-editor-choice': 10,
        'over-shorts': 10,
        'over-mobile-shorts-swiper': 10,
        'over-slides': 10,
        'over-flashnews': 10,
        'city-selection-box': 10,
        'story-share-bar': 10,
        'promote-topic': 10,
        'preferred-source': 10,
        'promote-topic-close-button': 100,
        ad: 9999,
        'global-header': 10000,
        'upload-modal': 1000000,
        'light-box': 10000000,
        'mobile-nav': 1000000000,
        'warning-modal': 1000000000,
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
        modal: ['0px 4px 4px 0px rgba(0, 0, 0, 0.25)'],
        sportsEventsSelect: ['0px 2px 2px rgba(0,0,0,0.15)'],
      },
      keyframes: {
        popup: {
          '0%, 100%': {
            transform: 'translateX(-50%) translateY(-100%)',
            top: '0px',
            opacity: 0,
          },
          '25%, 75%': {
            transform: 'translateX(-50%) translateY(0%)',
            top: '40px',
            opacity: 1,
          },
        },
        'glowing-red': {
          '0%': { boxShadow: '0 0 0px #FF0000' },
          '100%': { boxShadow: '0 0 8px #FF0000' },
        },
      },
      animation: {
        popup: 'popup 1s ease-in-out',
        'glowing-red': 'glowing-red 1250ms infinite alternate',
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
