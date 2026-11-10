import js from "@eslint/js";
import globals from "globals";
import pluginCypress from "eslint-plugin-cypress";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  {
    ignores: ["node_modules/", "cypress/screenshots/", "cypress/videos/", "cypress/downloads/"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
    rules: {
      "no-unused-vars": ["error", { args: "none" }],
    },
  },
  {
    files: ["cypress/**/*.js"],
    ...pluginCypress.configs.recommended,
    languageOptions: {
      ...pluginCypress.configs.recommended.languageOptions,
      sourceType: "module",
    },
  },
  eslintConfigPrettier,
];
