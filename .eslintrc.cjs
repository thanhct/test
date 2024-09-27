defaultConfig = require('@gaia/config/eslint/library');
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...defaultConfig,
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
};
