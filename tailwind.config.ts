/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dilu: {
          bg: '#09090f',
          surface: '#0f0f1a',
          border: '#1e1e2e',
          purple: '#7c3aed',
          blue: '#3b82f6',
          green: '#10b981',
          muted: '#6b7280',
        },
      },
      backgroundImage: {
        'dilu-gradient': 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
        'dilu-glow': 'radial-gradient(ellipse at top, rgba(124,58,237,0.15) 0%, transparent 60%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
