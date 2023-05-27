import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // imported from @types/node package
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@page": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@routes": path.resolve(__dirname, "./src/route"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
  server: {
    port: 3000,
    cors: true,
    open: true,
  },
  preview: {
    cors: true,
    port: 4000,
  },
  build: {
    outDir: "build",
  },
  plugins: [react()],
});
