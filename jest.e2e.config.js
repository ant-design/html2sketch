module.exports = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    uuid: '<rootDir>/test/__mocks__/uuid.ts',
    html2sketch: '<rootDir>/src',
    '@e2e-utils': '<rootDir>/e2e/utils',
  },
  setupFilesAfterEnv: ['./e2e/setupE2E.ts'],
  testMatch: ['**/__tests__/**/?(*.)+(e2e).ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
