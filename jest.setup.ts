import { jest } from "@jest/globals";

jest.mock("./src/logger", () => ({
  Logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));
