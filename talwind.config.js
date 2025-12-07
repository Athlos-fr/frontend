/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // The "Sodal" Brand Colors
        sodal: {
          50: "#ecfdf5", // Very light mint (backgrounds)
          100: "#d1fae5", // Light mint (tags/accents)
          500: "#10b981", // Primary Brand Color (Buttons)
          600: "#059669", // Hover state
          900: "#064e3b", // Text color
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // Clean, modern font
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(16, 185, 129, 0.1)", // Green-tinted shadow
        glow: "0 0 15px rgba(16, 185, 129, 0.3)", // Hover glow
      },
    },
  },
  plugins: [],
};