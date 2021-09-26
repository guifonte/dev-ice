module.exports = {
  displayName: 'api:e2e',
  resolver: '@nrwl/jest/plugins/resolver',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  testRegex: '.e2e-spec.ts$',
  coverageReporters: ['lcov', 'json', 'text', 'clover'],
  coverageDirectory: '../../coverage/apps/api/e2e',
};
