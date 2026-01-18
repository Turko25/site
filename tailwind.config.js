/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* slate-200 */
        input: "var(--color-input)", /* slate-100 */
        ring: "var(--color-ring)", /* blue-600 */
        background: "var(--color-background)", /* white */
        foreground: "var(--color-foreground)", /* slate-800 */
        surface: "var(--color-surface)", /* slate-50 */
        canvas: "var(--color-canvas)", /* custom-white-green */
        primary: {
          DEFAULT: "var(--color-primary)", /* blue-600 */
          foreground: "var(--color-primary-foreground)", /* white */
          hover: "var(--color-primary-hover)", /* blue-700 */
          light: "var(--color-primary-light)", /* blue-100 */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* emerald-600 */
          foreground: "var(--color-secondary-foreground)", /* white */
          hover: "var(--color-secondary-hover)", /* emerald-700 */
          light: "var(--color-secondary-light)", /* emerald-100 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* red-600 */
          foreground: "var(--color-accent-foreground)", /* white */
          hover: "var(--color-accent-hover)", /* red-700 */
        },
        conversion: {
          DEFAULT: "var(--color-conversion)", /* custom-coral */
          foreground: "var(--color-conversion-foreground)", /* white */
          hover: "var(--color-conversion-hover)", /* custom-coral-dark */
        },
        healthcare: {
          blue: "var(--color-healthcare-blue)", /* custom-medical-blue */
          'blue-foreground': "var(--color-healthcare-blue-foreground)", /* white */
          green: "var(--color-healthcare-green)", /* custom-vitality-green */
          'green-foreground': "var(--color-healthcare-green-foreground)", /* white */
        },
        text: {
          primary: "var(--color-text-primary)", /* slate-800 */
          secondary: "var(--color-text-secondary)", /* slate-500 */
          tertiary: "var(--color-text-tertiary)", /* slate-400 */
          chart: "var(--color-text-chart)", /* custom-charcoal */
          hierarchy: "var(--color-text-hierarchy)", /* custom-gray */
        },
        success: {
          DEFAULT: "var(--color-success)", /* emerald-500 */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-500 */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-500 */
          foreground: "var(--color-error-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-600 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* slate-100 */
          foreground: "var(--color-muted-foreground)", /* slate-500 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white */
          foreground: "var(--color-card-foreground)", /* slate-800 */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* slate-800 */
        },
        trust: {
          DEFAULT: "var(--color-trust)", /* custom-medical-gray-dark */
          foreground: "var(--color-trust-foreground)", /* white */
        },
        cta: {
          DEFAULT: "var(--color-cta)", /* custom-deep-blue */
          foreground: "var(--color-cta-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)", /* 12px */
        md: "var(--radius-md)", /* 8px */
        sm: "var(--radius-sm)", /* 4px */
        xl: "var(--radius-xl)", /* 16px */
      },
      spacing: {
        'xs': "var(--spacing-xs)", /* 8px */
        'sm': "var(--spacing-sm)", /* 16px */
        'md': "var(--spacing-md)", /* 24px */
        'lg': "var(--spacing-lg)", /* 32px */
        'xl': "var(--spacing-xl)", /* 48px */
      },
      boxShadow: {
        'sm': "var(--shadow-sm)",
        'md': "var(--shadow-md)",
        'lg': "var(--shadow-lg)",
        'medical': "var(--shadow-medical)",
        'medical-hover': "var(--shadow-medical-hover)",
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.8' }],
        'sm': ['0.875rem', { lineHeight: '1.8' }],
        'base': ['1rem', { lineHeight: '1.8' }],
        'lg': ['1.125rem', { lineHeight: '1.8' }],
        'xl': ['1.25rem', { lineHeight: '1.8' }],
        '2xl': ['1.5rem', { lineHeight: '1.8' }],
        '3xl': ['1.875rem', { lineHeight: '1.8' }],
        '4xl': ['2.25rem', { lineHeight: '1.8' }],
        '5xl': ['3rem', { lineHeight: '1.8' }],
      },
      transitionDuration: {
        'fast': "var(--transition-fast)", /* 150ms */
        'base': "var(--transition-base)", /* 300ms */
        'slow': "var(--transition-slow)", /* 400ms */
        'medical': "var(--transition-medical)", /* 300ms */
      },
      keyframes: {
        "pulse-rhythm": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.02)" },
        },
        "ripple": {
          "to": {
            width: "100%",
            height: "100%",
            opacity: "0",
          },
        },
      },
      animation: {
        "pulse-rhythm": "pulse-rhythm 1.2s ease-in-out infinite alternate",
        "ripple": "ripple 0.6s ease-out",
      },
    },
  },
  plugins: [],
}