import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:3000", // Replace with your backend's URL
        target: "http://13.53.35.96:3000", // Replace with your backend's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' prefix
      },
    },
  },
});
