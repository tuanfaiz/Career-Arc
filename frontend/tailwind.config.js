/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        chassis: '#e0e5ec',
        surface: '#f0f2f5',
        muted: '#d1d9e6',
        'text-primary': '#2d3436',
        'text-muted': '#4a5568',
        accent: '#ff4757',
        'border-shadow': '#babecc',
        'border-light': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '8px 8px 16px #babecc, -8px -8px 16px #ffffff',
        floating: '12px 12px 24px #babecc, -12px -12px 24px #ffffff',
        pressed: 'inset 6px 6px 12px #babecc, inset -6px -6px 12px #ffffff',
        recessed: 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff',
      },
      letterSpacing: { widest: '0.2em' },
    },
  },
  plugins: [],
}
