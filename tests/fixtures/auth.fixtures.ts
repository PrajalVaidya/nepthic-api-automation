import { TEST_CREDENTIALS } from "../config/test-env";
import { getRandomInt } from "../utils/randomNumberUtility";

export const authFixtures = {
  validCredentials: () => ({
    identifier: TEST_CREDENTIALS.valid.identifier,
    password: TEST_CREDENTIALS.valid.password,
  }),

  invalidCredentials: () => ({
    identifier: TEST_CREDENTIALS.invalid.identifier,
    password: TEST_CREDENTIALS.invalid.password,
  }),

  randomSignUpData: () => ({
    email: `test${getRandomInt(6)}@yopmail.com`,
    password: "test-123",
    confirmPassword: "test-123",
    fullName: "Test User",
    username: `testuser${getRandomInt(6)}`,
    phone: `977${getRandomInt(7)}`,
  }),

  invalidSignUpData: {
    invalidEmail: () => ({
      email: "invalid-email",
      password: "test-123",
      confirmPassword: "test-123",
      fullName: "Test User",
      username: `testuser${getRandomInt(6)}`,
      phone: `977${getRandomInt(7)}`,
    }),

    passwordMismatch: () => ({
      email: `test${getRandomInt(6)}@yopmail.com`,
      password: "test-123",
      confirmPassword: "different-password",
      fullName: "Test User",
      username: `testuser${getRandomInt(6)}`,
      phone: `977${getRandomInt(7)}`,
    }),

    missingEmail: () => ({
      password: "test-123",
      confirmPassword: "test-123",
      fullName: "Test User",
      username: `testuser${getRandomInt(6)}`,
      phone: `977${getRandomInt(7)}`,
    }),

    emptyUsername: () => ({
      email: `test${getRandomInt(6)}@yopmail.com`,
      password: "test-123",
      confirmPassword: "test-123",
      fullName: "Test User",
      username: "",
      phone: `977${getRandomInt(7)}`,
    }),
  },
};
