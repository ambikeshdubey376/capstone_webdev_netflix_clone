/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",       // main blue
        primaryDark: "#1d4ed8",   // hover blue
        secondary: "#f59e0b",     // accent (buttons/badges)
        bg: "#f9fafb",            // page background
        card: "#ffffff",
        textMain: "#111827",
        textSub: "#6b7280",
        borderLight: "#e5e7eb",
      },

      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.08)",
        card: "0 6px 25px rgba(0,0,0,0.1)",
      },

      borderRadius: {
        xl2: "1rem",
        xl3: "1.5rem",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      }
    },
  },
  plugins: [],
};