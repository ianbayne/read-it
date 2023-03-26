module.exports = {
  env: {
    es2021: true,
    node: true,
    webextensions: true,
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    // Disable explicit-function-return-type for all files, but enable for TS files below in overrides
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  overrides: [
    {
      // Enable explicit-function-return-type specifically for TS files
      files: ["*.ts", "*.mts", "*.cts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
      },
    },
  ],
};
