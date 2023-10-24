import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { createHtmlPlugin } from "vite-plugin-html";
import viteCompression from "vite-plugin-compression";
import path from "path";

export default defineConfig({
  plugins: [
    solidPlugin(),
    createHtmlPlugin({ minify: true }),
    viteCompression({ algorithm: "gzip", ext: ".gz", threshold: 1400 }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1400,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      $: path.resolve(__dirname, "./src/assets"),
    },
  },
  ...(process.env.VITE_PRODUCTION && {
    css: { modules: { generateScopedName: "[contenthash:base64:5]" } },
  }),
});
