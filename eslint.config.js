import js from '@eslint/js';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import typescript from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default [
  // Base configurations
  js.configs.recommended,
  reactRecommended,
  reactJsxRuntime,
  ...typescript.configs.recommended,

  // Global ignores
  {
    ignores: [
      '**/node_modules/*',
      '**/dist/*',
      '**/build/*',
      '**/*.config.js',
      '.turbo',
      '.next',
      '**/coverage/*',
      '**/public/*'
    ]
  },

  // Configuration for JavaScript and TypeScript files
  {
    files: [
      'packages/**/*.{js,jsx,ts,tsx}',
      '**/*.{js,jsx,ts,tsx}'
    ],
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json']
        }
      },
      react: {
        version: 'detect'
      }
    },
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',

      // React specific rules
      'react/jsx-filename-extension': [1, {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }],
      'react/function-component-definition': [2, {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }],
      'react/react-in-jsx-scope': 'off',

      // Import and module rules
      'import/extensions': ['error', 'ignorePackages', {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }],
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: [
          '**/*.test.{js,jsx,ts,tsx}',
          '**/*.spec.{js,jsx,ts,tsx}',
          '**/test/**/*.{js,jsx,ts,tsx}',
          '**/tests/**/*.{js,jsx,ts,tsx}'
        ]
      }],

      // Accessibility rules
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton']
        }
      ],

      // Customizations
      'max-len': ['error', {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }],
      'no-console': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];