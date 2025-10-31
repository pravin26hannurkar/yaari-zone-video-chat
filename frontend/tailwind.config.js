/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yaari-purple': '#7F00FF',
        'yaari-pink': '#E100FF',
        'yaari-blue': '#00D4FF',
        'yaari-dark': '#0A0A0A',
        'yaari-gray': '#1A1A1A',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #7F00FF 0%, #E100FF 50%, #00D4FF 100%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(127, 0, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(225, 0, 255, 0.5)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
      },
      animation: {
        'pulse-neon': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(127, 0, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(127, 0, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
