import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/?(*.)+(test).[tj]s"],
  clearMocks: true,
};

export default config;
