import js from "@eslint/js";
import globals from "globals";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import typescript from "typescript-eslint";

export default [
  // Base configurations
  js.configs.recommended,
  reactRecommended,
  reactJsxRuntime,
  ...typescript.configs.recommended,

  // Global ignores
  {
    ignores: [
      "**/node_modules/*",
      "**/dist/*",
      "**/build/*",
      "**/*.config.js",
      ".turbo",
      ".next"
    ]
  },

  // Configuration for JavaScript and TypeScript files
  {
    files: [
      "apps/**/*.{js,jsx,ts,tsx}",
      "packages/**/*.{js,jsx,ts,tsx}"
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // Customize rules for your Turborepo
      "no-unused-vars": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off"
    }
  }
];