module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^uuid$': '<rootDir>/test/__mocks__/uuid.ts',
    html2sketch: '<rootDir>/src',
    '@test-utils': '<rootDir>/tests/utils',
  },
  setupFilesAfterEnv: ['./tests/setupTests.js'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
