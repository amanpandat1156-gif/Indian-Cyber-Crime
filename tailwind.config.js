/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ncrp: {
          navy: '#12304A',
          darkNavy: '#0B2235',
          warmBg: '#F8F7F3',
          white: '#FFFFFF',
          text: '#1C252C',
          muted: '#5E6B73',
          border: '#DDE2E4',
          green: '#237A57',
          amber: '#B7791F',
          red: '#B33A3A',
          saffron: '#D8891C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'card': '10px',
        'subtle': '8px',
        'badge': '6px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(18, 48, 74, 0.04), 0 1px 2px rgba(18, 48, 74, 0.02)',
        'card-hover': '0 4px 12px rgba(18, 48, 74, 0.08), 0 1px 3px rgba(18, 48, 74, 0.04)',
        'popover': '0 10px 25px -5px rgba(11, 34, 53, 0.1), 0 8px 10px -6px rgba(11, 34, 53, 0.1)',
      }
    },
  },
  plugins: [],
}
