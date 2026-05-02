import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    // 🔥 Dev server only (Netlify ignores this)
    server: {
      port: 5173,
      open: true,
      proxy: isDev
        ? {
            "/api": {
              target: "http://localhost:5000",
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },

    // 🔥 Build optimization
    build: {
      outDir: "dist",
      sourcemap: false,
      minify: "esbuild",

      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            charts: ["chart.js", "react-chartjs-2"],
            motion: ["framer-motion"],
          },
        },
      },
    },

    // 🔥 Define global constants
    define: {
      __APP_ENV__: JSON.stringify(mode),
    },
  };
});
