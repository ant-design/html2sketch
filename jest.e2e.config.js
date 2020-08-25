module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    uuid: '<rootDir>/test/__mocks__/uuid.ts',
    html2sketch: '<rootDir>/src',
  },
  setupFilesAfterEnv: ['./tests/setupTests.js'],
  testMatch: ['**/__tests__/**/?(*.)+(e2e).ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
