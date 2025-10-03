import terser from "@rollup/plugin-terser";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import viteCompression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";
import virtualModules from "./plugins/virtual-modules.plugins";

export default defineConfig(({ mode }) => ({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	plugins: [
		react(),
		virtualModules(mode),
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
	],
	build: {
		rollupOptions: { plugins: [terser()] },
		minify: "terser",
		terserOptions: {
			compress: { drop_console: true, drop_debugger: true },
			format: { comments: false },
		},
	},
}));
