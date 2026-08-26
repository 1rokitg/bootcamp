/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050608',
          900: '#0a0c10',
          800: '#11141b',
          700: '#1a1e28',
          600: '#252a37',
          500: '#3a4150',
          400: '#5b6478',
          300: '#8892a6',
          200: '#b8c0d0',
          100: '#e6e9f0',
        },
        accent: {
          50: '#ecfdf7',
          100: '#d1faec',
          200: '#a7f3da',
          300: '#6ee7c2',
          400: '#34d3a4',
          500: '#10b888',
          600: '#059369',
          700: '#047553',
          800: '#065d44',
          900: '#054c39',
        },
        gold: {
          300: '#f5d99a',
          400: '#e7be6b',
          500: '#d4a544',
          600: '#b8882f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.7s ease forwards',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'ticker': 'ticker 40s linear infinite',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
