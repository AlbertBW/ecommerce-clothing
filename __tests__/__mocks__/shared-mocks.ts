jest.mock("../../src/server/auth", () => ({
  auth: jest.fn(),
}));
