/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#eef2f6',
        card: '#ffffff',
        sidebar: {
          bg: '#1a1d21',
          text: '#8d939c',
          active: '#ffffff',
          activeText: '#1a1d21',
        },
        pastel: {
          blue: '#e8f2ff',
          purple: '#f3e8ff',
          green: '#e8f5e9',
          yellow: '#fff8e1',
        },
        text: {
          main: '#1e2022',
          muted: '#8a92a6',
        },
        accent: {
          primary: '#3b82f6',
          success: '#10b981',
          danger: '#ef4444',
          warning: '#f59e0b',
        }
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '30px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
