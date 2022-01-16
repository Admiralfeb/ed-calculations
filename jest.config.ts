import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!<rootDir>/node_modules/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'json-summary', 'text', 'lcov', 'clover'],
  moduleDirectories: ['<rootDir>', 'src', '__mocks__', 'node_modules'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

export default jestConfig;
