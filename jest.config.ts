import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['/**/*.spec.(ts|tsx|js)'],
  globals: {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
  },
};

export default config;
