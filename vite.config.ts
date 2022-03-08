import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  base: "/nao/",
  plugins: [react()],
  esbuild: {
    minify: false,
    minifyWhitespace: false,
    minifyIdentifiers: false,
    minifySyntax: false,
    keepNames: true,
    pure: ["React.createElement"],
  },
  build: {
    minify: false,
  },
});
