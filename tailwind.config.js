/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        wizzy: {
          bg: "#0f1115",
          surface: "#1e2128",
          "surface-hover": "#2a2e37",
          border: "#333842",
          accent: "#6366f1",
          "accent-hover": "#4f46e5",
          "text-main": "#f3f4f6",
          "text-muted": "#9ca3af"
        }
      },
      fontFamily: {
        sans: ["Inter","system-ui","-apple-system","sans-serif"]
      }
    }
  },
  plugins: []
}