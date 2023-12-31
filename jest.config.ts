export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "^.+\\.(css)$": "<rootDir>/__mocks__/styleMock.js",
  },
  setupFiles: [
    "<rootDir>/__mocks__/arrayBuffer.mock.ts",
    "<rootDir>/__mocks__/matchMedia.mock.ts",
  ],
};
