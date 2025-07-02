import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import css from "@eslint/css";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
  {
    plugins: { "@stylistic": stylistic },
    rules: {
      "react/prop-types": "off",
      "@stylistic/indent": ["error", 2],
      "@stylistic/no-trailing-spaces": ["error", { ignoreComments: true }],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/max-len": ["error", { code: 100 }],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/arrow-spacing": ["error", { after: true, before: true }],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
      "@stylistic/computed-property-spacing": ["error", "never"],
      "@stylistic/object-curly-spacing": ["error", "always"],
    },
  },
]);
