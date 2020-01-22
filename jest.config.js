module.exports = {
  setupFiles: ["./jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  rootDir: __dirname,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testURL: "http://localhost:4000",
  testRegex: "/__tests__/.*\\.(ts|tsx|js)$",
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.jest.json",
    },
  },
  preset: "ts-jest",
  testMatch: null,
};
