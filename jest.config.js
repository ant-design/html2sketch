module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // verbose: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    uuid: '<rootDir>/test/__mocks__/uuid.ts',
    html2sketch: '<rootDir>/src',
  },
  setupFilesAfterEnv: ['./tests/setupTests.js'],
  testMatch: undefined,
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
