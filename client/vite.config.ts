import terser from "@rollup/plugin-terser";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import viteCompression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    checker({ typescript: true, eslint: false }),
    viteCompression({ algorithm: "brotliCompress" }),
    Inspect(),
    visualizer({
      filename: "bundle-stats.html",
      template: "treemap",
      gzipSize: true,
      brotliSize: true,
    }),
    {
      name: "virtual-prebid",
      resolveId(id) {
        if (id === "virtual:prebid") return id;
      },
      load(id) {
        if (id === "virtual:prebid") {
            return `
              import '@/prebit/index.js';
              export default {};
            `;
        }
      },
    },
  ],
  build: {
    rollupOptions: { plugins: [terser()] },
    minify: "terser",
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
      format: { comments: false },
    },
  },
});
