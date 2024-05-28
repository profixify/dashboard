import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig, loadEnv } from "vite";



export default defineConfig(({ mode }) => {
  return {
    envDir: "./env",
    base: mode === "development" ? "" : "/dashboard",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});