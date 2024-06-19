export default {
  preset: "ts-jest/presets/js-with-ts",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src/$1',
  }
};
