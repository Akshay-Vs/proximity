const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
  ],
  "plugins": ["react", "react-native"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  "env": {
    "react-native/react-native": true
  }
}