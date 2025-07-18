/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#dcd7cb',
          100: '#a1b189',
          500: '#588158',
          600: '#3b5a42',
          700: '#334e41',
        }
      },
      animation: {
        'pulse': 'pulse 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
