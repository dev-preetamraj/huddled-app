/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryLight: '#2563eb',
        secondaryLight: '#a7c388',
        backgroundLight: '#e8ebfd',
        cardLight: '#f1f5f9',
        textLight: '#383838',
        headerTextLight: '#111827',
        borderLight: '#383838',
        primaryDark: '#0369a1',
        secondaryDark: '#5a773c',
        backgroundDark: '#020617',
        cardDark: '#0f172a',
        textDark: '#c7c7c7',
        headerTextDark: '#f3f4f6',
        borderDark: '#475569',
      },
    },
  },
  plugins: [],
};
