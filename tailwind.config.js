const plugin = require('tailwindcss/plugin')

const fontWeightPlugin = plugin(function ({ addUtilities, theme }) {
  const utilities = Object.entries(theme('fontWeight')).reduce((acc, [, value]) => {
    acc[`.font-${value}`] = { fontWeight: value }
    return acc
  }, {})
  addUtilities(utilities)
})

const bpPlugin = plugin(function ({ addVariant, theme }) {
  Object.entries(theme('screens')).map(([key, value]) => {
    console.log(`bp${value.replace('px', '')}`)
    addVariant(`bp${value.replace('px', '')}`, `@media (min-width: ${value})`)
  })
})

const colors = {
  'fuel-yellow': {
    '50': '#fffceb',
    '100': '#fff8c6',
    '200': '#ffef88',
    '300': '#ffe04a',
    '400': '#fece21',
    DEFAULT: '#eaa406',
    '600': '#dc8503',
    '700': '#b75e06',
    '800': '#94490c',
    '900': '#7a3c0d',
    '950': '#461e02',
  },
  'puerto-rico': {
    '50': '#effefa',
    '100': '#c9fef5',
    '200': '#93fcea',
    '300': '#56f2df',
    '400': '#23decc',
    DEFAULT: '#0abdaf',
    '600': '#059c94',
    '700': '#097c77',
    '800': '#0c6360',
    '900': '#0f524f',
    '950': '#013232',
  },
  'cerise': {
    '50': '#fef1f9',
    '100': '#fee5f4',
    '200': '#ffcbeb',
    '300': '#ffa1da',
    '400': '#ff67be',
    DEFAULT: '#f93ba3',
    '600': '#eb2788',
    '700': '#cc0a65',
    '800': '#a80c53',
    '900': '#8c0f47',
    '950': '#560127',
  },
  'hemlock': {
    '50': '#f5f3f0',
    '100': '#e9e6de',
    '200': '#d5d0c1',
    '300': '#bbb49b',
    '400': '#a29979',
    DEFAULT: '#867e5c',
    '600': '#635d43',
    '700': '#524e39',
    '800': '#434031',
    '900': '#3b392c',
    '950': '#1e1d15',
  },
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './components/**/*.vue',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: 'Nunito Variable, sans-serif'
      },
      colors,
    },
  },
  plugins: [

    fontWeightPlugin,
    bpPlugin

  ],
}

