module.exports = {
  setupFiles: ["./jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  rootDir: __dirname,
  transform: {
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  testURL: "http://localhost:4000",
  testRegex: "/__tests__/.*\\.(ts|tsx|js)$",
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.jest.json"
    }
  }
};