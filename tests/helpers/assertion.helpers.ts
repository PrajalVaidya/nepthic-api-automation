import { AxiosResponse } from 'axios';
import { TEST_CONSTANTS } from '../config/test-constants';

/**
 * Asserts that a response has a successful status code
 */
export function expectSuccessResponse(response: AxiosResponse, expectedStatus = 200) {
  expect(response.status).toBe(expectedStatus);
  expect(response.data).toBeDefined();
}

/**
 * Asserts that a response has an error status code
 */
export function expectErrorResponse(
  response: AxiosResponse,
  expectedStatus: number,
  errorMessage?: string
) {
  expect(response.status).toBe(expectedStatus);
  if (errorMessage) {
    expect(response.data?.error || response.data?.message).toContain(errorMessage);
  }
}

/**
 * Asserts that a response has a session cookie
 */
export function expectSessionCookie(response: AxiosResponse) {
  const setCookie = response.headers['set-cookie'] || [];
  const hasSession = setCookie.some((cookie: string) =>
    TEST_CONSTANTS.SESSION_COOKIE_PATTERNS.some((pattern) =>
      cookie.includes(pattern)
    )
  );
  expect(hasSession).toBe(true);
}

/**
 * Asserts that a response does not have a session cookie
 */
export function expectNoSessionCookie(response: AxiosResponse) {
  const setCookie = response.headers['set-cookie'] || [];
  const hasSession = setCookie.some((cookie: string) =>
    TEST_CONSTANTS.SESSION_COOKIE_PATTERNS.some((pattern) =>
      cookie.includes(pattern)
    )
  );
  expect(hasSession).toBe(false);
}

