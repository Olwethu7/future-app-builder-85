import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Ignore build output directory
  { ignores: ["dist"] },
  {
    // Extend recommended configurations for JavaScript and TypeScript
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // Apply these rules to TypeScript and TypeScript React files
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      // Use modern ECMAScript features
      ecmaVersion: 2020,
      // Provide browser global variables like window, document, etc.
      globals: globals.browser,
    },
    plugins: {
      // React hooks linting rules
      "react-hooks": reactHooks,
      // React Fast Refresh linting rules
      "react-refresh": reactRefresh,
    },
    rules: {
      // Include all recommended React hooks rules
      ...reactHooks.configs.recommended.rules,
      // Warn when components are not properly exported for Fast Refresh
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Disable unused variables warning (useful during development)
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
