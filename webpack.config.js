const path = require("path");

module.exports = {
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components/"),
      pages: path.resolve(__dirname, "./src/pages/"),
      utils: path.resolve(__dirname, "./src/utils/"),
      db: path.resolve(__dirname, "./src/db/"),
      store: path.resolve(__dirname, "./src/store/"),
      // Services: path.resolve(__dirname, "../src/services/"),
    },
  },
};
