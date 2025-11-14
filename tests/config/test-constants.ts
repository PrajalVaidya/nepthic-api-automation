// Test constants and shared values
export const TEST_CONSTANTS = {
  // Session cookie patterns
  SESSION_COOKIE_PATTERNS: [
    'next-auth.session-token',
    '__Secure-next-auth.session-token',
    'next-auth.session-token.',
  ],

  // HTTP status codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },

  // Test timeouts
  TIMEOUTS: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
  },
};

