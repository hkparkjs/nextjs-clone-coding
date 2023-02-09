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
    'react', '@typescript-eslint'
  ],
  rules: {
    quotes: ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    "no-unused-vars": "off",
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
    "spaced-comment": "off",
    "operator-linebreak": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-ally/anchor-is-valid": "off",  // next js에서는 a에 href 없이 사용
    "global-require": "off",
    "jsx-ally/label-has-associated-control": "off",
    "no-param-reassign": "off",
    "react/jsx-curly-newline": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"]
      }
    }
  }
}
