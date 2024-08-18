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
  jest: {
    configure: {
      verbose: true,
      moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
        "@components/(.*)": "<rootDir>/src/components/$1",
        "@types/(.*)": "<rootDir>/src/types/$1",
        "@db/(.*)": "<rootDir>/src/db/$1",
        "@store/(.*)": "<rootDir>/src/store/$1",
        "@utils/(.*)": "<rootDir>/src/utils/$1",
      },
    },
  },
};

export default config;
