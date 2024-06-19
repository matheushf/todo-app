import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "thalos-apps",
      filename: "remoteEntry.js",
      exposes: {
        "./TodoApp": "./src/modules/TodoApp/TodoApp.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
});
