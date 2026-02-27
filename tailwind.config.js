/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(80vh)' }
        }
      },
      animation: {
        scan: 'scan 3s linear infinite'
      }
    }
  },
  plugins: []
};

