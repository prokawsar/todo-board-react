import path from "path";

const config = {
  webpack: {
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

export default config;
