
module.exports = {
  extends: "next/core-web-vitals",
  settings: {
    "import/resolver": {
      node: {
        extensions: [ ".js", ".jsx", ".ts", ".tsx", ".json" ],
      },
      "babel-plugin-root-import": {
        rootPathPrefix: "~",
        rootPathSuffix: "src",
      },
    },
  },
  rules: {
    "no-console": [ 1, { allow: [ "warn", "error" ] }],
    "prefer-const": "error",
    "comma-dangle": [ "error", "always-multiline" ],
    indent: [ "error", 2, { SwitchCase: 1 }],
    "no-empty-function": "error",
    "newline-before-return": "error",
    "max-len": [ "error", { code: 120, ignorePattern: "^import\\W.*" }],
    "no-multiple-empty-lines": [ "error", { max: 1, maxBOF: 0, maxEOF: 0 }],
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    "import/order": 0,
    semi: [ "error", "never" ],
    quotes: ["error", "single"],
    "object-curly-spacing": [ "error", "always" ],
    "object-curly-newline": [ "error", {
      multiline: true,
      consistent: true,
      minProperties: 4,
    }],
    "array-bracket-spacing": [ "error", "always", {
      objectsInArrays: false,
      arraysInArrays: false,
    }],
  },
}
