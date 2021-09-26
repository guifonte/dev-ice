module.exports = {
  displayName: 'api',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/test',
    '.module.ts',
    '<rootDir>/src/main.ts',
    '<rootDir>/src/environments',
  ],
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['lcov', 'json', 'text', 'clover'],
  coverageDirectory: '../../coverage/apps/api',
};
