export default {
  preset: 'ts-jest',
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  verbose: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^uuid$': '<rootDir>/test/__mocks__/uuid.ts',
    'html2sketch/(.*)$': '<rootDir>/src/$1',
    html2sketch: '<rootDir>/src',
    '@test-utils': '<rootDir>/tests/__utils__',
  },
  testTimeout: 30000,
  testMatch: ['**/?(*.)+(spec|test).ts', '**/?(*.)+(spec|test).tsx'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  coveragePathIgnorePatterns: ['node_modules', '.umi'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
