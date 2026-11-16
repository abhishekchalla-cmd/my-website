const path = require("node:path");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

module.exports = {
  defaultJestConfig: (packagePath) => {
    const rootDirPath = path.resolve(__dirname, "../");
    const prefix = packagePath
      .split(rootDirPath)[1]
      .split("/")
      .filter((e) => !!e)
      .map((e) => "..")
      .join("/");

    return {
      preset: "ts-jest",
      testEnvironment: "node",
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/" + prefix,
      }),
      transform: {
        "^.+\\.(ts|tsx|js|mjs)$": "ts-jest",
      },

      transformIgnorePatterns: [
        path.resolve(__dirname, "../../node_modules") +
          "/(?!(notion-client|p-map|got|notion-utils|p-queue|p-timeout|is-url-superb|memoize|mimic-function|normalize-url)/)",
      ],
    };
  },
};
