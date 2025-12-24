/** @type {import('tailwindcss').Config} */
import tokens from './src/styles/design-tokens.json';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
        accent: tokens.colors.accent,
        text: tokens.colors.text,
        background: tokens.colors.background,
        status: tokens.colors.status,
      },

      fontFamily: {
        sans: [
          tokens.typography.fontFamily.primary
            .split(', ')[0]
            .replace(/'/g, ''),
          'sans-serif',
        ],
      },

      borderRadius: {
        card: tokens.borderRadius.card,
        '3xl': tokens.borderRadius['3xl'],
      },

      boxShadow: {
        glow: tokens.shadows.glow,
        xl: tokens.shadows.xl,
      },

      /* ===============================
         ✨ Animations (Professional)
      =============================== */
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },

        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(12px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '50%': { transform: 'translateX(4px)' },
          '75%': { transform: 'translateX(-4px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        slideUp: 'slideUp 0.35s ease-out',
        shake: 'shake 0.25s ease-in-out',
      },
    },
  },
  plugins: [],
};

