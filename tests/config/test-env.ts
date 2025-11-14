// Centralized test environment configuration
export const TEST_CONFIG = {
  baseUrl: "http://localhost:3000",
  apiUrl: process.env.TEST_API_URL || "http://dev.nepthic.com/api",
  timeout: parseInt(process.env.TEST_TIMEOUT || "10000", 10),
  retries: parseInt(process.env.TEST_RETRIES || "2", 10),
};

export const TEST_CREDENTIALS = {
  valid: {
    identifier: process.env.TEST_USER_IDENTIFIER || "test",
    password: process.env.TEST_USER_PASSWORD || "test-123",
  },
  invalid: {
    identifier: "invalid-user",
    password: "invalid-password",
  },
};
