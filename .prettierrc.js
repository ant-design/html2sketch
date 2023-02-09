module.exports = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  endOfLine: 'lf',
  overrides: [{ files: '.prettierrc', options: { parser: 'json' } }],
  plugins: [require.resolve('prettier-plugin-organize-imports')],
  pluginSearchDirs: false,
};
