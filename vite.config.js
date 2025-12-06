import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Rule: Whenever the frontend sees a request starting with /api...
      "/api": {
        target: "http://localhost:3000", // ...forward it to the backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
