module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    quotes: ["error", "double"],
    "@typescript-exlint/quotes": ["error", "double"],
    "no-unused-vars": "off",
    "spaced-comment": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "jsx-ally/control-has-associated-label": "off",
    "react/no-array-index-key": "off",
    "comma-dangle": "off",
    "arrow-body-style": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "object-curly-newline": "off",
    "react/jsx-one-expression-per-line": "off",
    "implicit-arrow-linebreak": "off",
    "no-shadow": "off",
    "operator-linebreak": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-ally/anchor-is-valid": "off",
    "global-require": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"]}
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },  //import시 확장자명 사용하지 않는다.
    ]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      }
    }
  }
}
