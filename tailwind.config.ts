import type { Config } from 'tailwindcss'

const { fontFamily } = require('tailwindcss/defaultTheme')

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background1: '#27323E',
        background2: '#212529',
        white: '#F7F7F7',
        primary: '#435585',
        secondary: '#818FB4',
        tertiary: '#F5E8C7'
      },
      fontFamily: {
        roboto: ['var(--font-poppins)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
export default config

''
''
''
''