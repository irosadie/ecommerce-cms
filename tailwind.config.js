/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
    './public/**/*.html'
  ],
  theme: {
    screens: {
      'mini': '320px',
      'phone': '360px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      content: {
        'triangle-up': 'url("/img/triangle-up.svg")',
        'triangle-down': 'url("/img/triangle-down.svg")',
      },
      colors: {
        pageactive: '#4AC3BE',
        primary: {
          '0': '#D1F9F1',
          '25': '#87DED6',
          '50': '#4AC3BE',
          '100': '#326D82'
        },
        success: {
          '0': '#DDF5FC',
          '25': '#56CCF2',
          '50': '#2D9CDB',
          '100': '#2F80ED'
        },
        error: {
          '0': '#FBDDDD',
          '25': '#F7BCBC',
          '50': '#EB5757',
          '100': '#B61515'
        },
        alert: {
          '0': '#FCF9CE',
          '25': '#F9F29D',
          '50': '#F0DF09',
          '100': '#C4B607'
        },
        warning: {
          '0': '#FEEEE0',
          '25': '#FDDEC1',
          '50': '#FAAC64',
          '100': '#C56206'
        },
        main: {
          '-50': '#EDEFF3',
          '-25': '#E2E4E9',
          '0': '#D8D9DE',
          '25': '#9D9EA1',
          '50': '#545455',
          '100': '#242424'
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s forwards ease-in',
        fadeOut: 'fadeOut 0.2s forwards ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { 'background-color': 'transparent', 'padding-top': '48px', 'padding-bottom': '48px' },
          '100%': { 'background-color': '#fff', 'padding-top':'24px', 'padding-bottom': '24px', 'color':'#4893da'},
        },
        fadeOut: {
          '0%': { 'background-color': '#fff', 'padding-top': '24px', 'padding-bottom': '24px' },
          '100%': { 'background-color': 'transparent', 'padding-top':'48px', 'padding-bottom': '48px', 'color':'#fff'},
        }
      }
    },
    backgroundImage: {}
  },
  plugins: [require('flowbite/plugin')],
}
