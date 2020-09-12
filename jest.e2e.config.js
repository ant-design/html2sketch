module.exports = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    uuid: '<rootDir>/test/__mocks__/uuid.ts',
    html2sketch: '<rootDir>/src',
    '@e2e-utils': '<rootDir>/docs/__utils__',
  },
  setupFilesAfterEnv: ['./e2e/setupE2E.ts'],
  testMatch: ['**/e2e/?(*.)+(e2e).ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
