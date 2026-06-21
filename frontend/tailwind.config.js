/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        app: {
          bg: '#0F172A',
          sidebar: '#111827',
          card: '#1E293B',
          line: '#334155',
        },
        secondary: '#F8FAFC',
        success: '#10B981',
        danger: '#EF4444',
      },
      boxShadow: {
        glow: '0 20px 50px rgba(59, 130, 246, 0.18)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
