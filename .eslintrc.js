module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:prettier/recommended",
    "stylelint",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "no-loops", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,
    "sort-imports": 0,
    "node/no-missin-import": 0,
    "node/no-unpublished-import": 0,
    "node/no-missing-import": [
      "error",
      {
        // "allowModules": [],
        // "resolvePaths": ["/path/to/a/modules/directory"],
        tryExtensions: [".js", ".json", ".node", ".ts", ".tsx"],
      },
    ],
  },
  globals: {
    __dirname: true,
    module: true,
  },
};
