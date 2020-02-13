module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-env"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator"
  ]
};
