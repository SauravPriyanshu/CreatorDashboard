/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional SaaS Palette (Slate-based)
        primary: {
          DEFAULT: '#111827', // Slate-900 (Black-ish for primary actions)
          hover: '#1F2937',   // Slate-800
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F1F5F9', // Slate-100 (Secondary buttons, backgrounds)
          hover: '#E2E8F0',   // Slate-200
          foreground: '#0F172A',
        },
        accent: {
          DEFAULT: '#2563EB', // Blue-600 (Links, active states, subtle highlights)
          subtle: '#EBF5FF',  // Blue-50
        },
        background: {
          DEFAULT: '#FFFFFF', // Clean white background
          subtle: '#F9FAFB',  // Slate-50 (Sidebar/Header)
        },
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F8FAFC',
        },
        text: {
          primary: '#0F172A',   // Slate-900
          secondary: '#64748B', // Slate-500
          tertiary: '#94A3B8',  // Slate-400
        },
        border: {
          DEFAULT: '#E2E8F0', // Slate-200
          subtle: '#F1F5F9',  // Slate-100
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
