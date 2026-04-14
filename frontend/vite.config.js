import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // Show useful logs (don't hide errors)
  logLevel: "info",

  build: {
    emptyOutDir: true,
    sourcemap: true,   // helpful for debugging
    minify: "esbuild", // better default
  },

  css: {
    postcss: "./postcss.config.js",
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },

  server: {
    host: true,            // ✅ VERY IMPORTANT (fixes localhost issue)
    port: 5173,            // default Vite port
    strictPort: true,      // ensures it doesn't silently change port
    open: true,            // auto opens browser

    proxy: {
      "/api": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});