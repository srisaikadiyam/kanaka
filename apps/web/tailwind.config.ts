import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'rgb(var(--color-brand-50) / <alpha-value>)',
          100: 'rgb(var(--color-brand-100) / <alpha-value>)',
          500: 'rgb(var(--color-brand-500) / <alpha-value>)',
          600: 'rgb(var(--color-brand-600) / <alpha-value>)'
        },
        ink: {
          900: 'rgb(var(--color-ink-900) / <alpha-value>)',
          700: 'rgb(var(--color-ink-700) / <alpha-value>)',
          500: 'rgb(var(--color-ink-500) / <alpha-value>)'
        },
        surface: {
          0: 'rgb(var(--color-surface-0) / <alpha-value>)',
          50: 'rgb(var(--color-surface-50) / <alpha-value>)',
          100: 'rgb(var(--color-surface-100) / <alpha-value>)'
        }
      },
      borderRadius: {
        xl: 'var(--radius-xl)'
      },
      boxShadow: {
        soft: 'var(--shadow-soft)'
      }
    }
  },
  plugins: []
} satisfies Config;
