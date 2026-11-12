import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite is only used for the style guide. The library itself is built by tsc.
export default defineConfig({
  root: "styleguide",
  base: "./",
  plugins: [react()],
  server: { port: 5199, strictPort: true },
  build: { outDir: "../styleguide-dist", emptyOutDir: true },
});
