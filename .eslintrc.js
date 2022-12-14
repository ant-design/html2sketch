const config = require('@umijs/max/eslint');

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'no-param-reassign': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['html2sketch', './src/'],
          ['html2sketch/*', './src/*'],
          ['@docs-utils', './docs/__utils__'],
          ['@test-utils', './tests/__utils__'],
        ],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
