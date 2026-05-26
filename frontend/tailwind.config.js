/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#111111',
        border: '#1E1E1E',
        accent: '#00FFD1',       // Electric cyan — consistent accent across entire site
        'accent-dim': '#00CCa8',
        'text-primary': '#F0F0F0',
        'text-secondary': '#888888',
      },
      fontFamily: {
        display: ['"Clash Display"', 'Syne', 'sans-serif'],
        body: ['"DM Sans"', '"Instrument Sans"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}
