import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react()],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "@/*": path.resolve(__dirname, "src/*"),
        "@components": path.resolve(__dirname, "src/components"),
        "@types": path.resolve(__dirname, "src/types/"),
        "@db": path.resolve(__dirname, "src/db/"),
        "@store": path.resolve(__dirname, "src/store"),
        "@utils": path.resolve(__dirname, "src/utils/"),
      },
    },
  };
});
