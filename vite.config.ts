import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // imported from @types/node package

// https://vitejs.dev/config/
export default defineConfig({
  // Tauri Configs
  // prevent vite from obscuring rust errors
  clearScreen: false,
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
    // Tauri Configs
    // Tauri expects a fixed port, fail if that port is not available
    strictPort: true,
  },
  preview: {
    cors: true,
    port: 4000,
  },
  // Tauri Config
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
  // env variables
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    outDir: "build",
    // Tauri Configs
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  plugins: [react()],
});
