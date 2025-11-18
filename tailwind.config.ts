import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          darkest: '#051F20',
          dark: '#000000',
          mediumDark: '#163832',
          medium: '#235347',
          light: '#8EB69B',
          lightest: '#DAF1DE',
        },
      },
    },
  },
  plugins: [],
}
export default config



