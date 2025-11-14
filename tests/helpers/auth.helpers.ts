import axios, { AxiosInstance } from "axios";
import {
  AUTH_CSRF_URL,
  AUTH_CREDENTIALS_CALLBACK_URL,
} from "@/endpoints/endpoints";
import { TEST_CONFIG, TEST_CREDENTIALS } from "../config/test-env";
import { TEST_CONSTANTS } from "../config/test-constants";

export interface AuthContext {
  csrfToken: string;
  sessionCookies: string[];
  cookieHeader: string;
  axiosInstance: AxiosInstance;
}

/**
 * Authenticates a user and returns auth context
 */
export async function authenticateUser(
  identifier?: string,
  password?: string
): Promise<AuthContext> {
  const creds = {
    identifier: identifier || TEST_CREDENTIALS.valid.identifier,
    password: password || TEST_CREDENTIALS.valid.password,
  };

  // Get CSRF token
  const csrfRes = await axios.get(AUTH_CSRF_URL, {
    withCredentials: true,
    validateStatus: () => true,
  });

  if (csrfRes.status !== 200) {
    throw new Error(`Failed to get CSRF token: ${csrfRes.status}`);
  }

  const csrfToken = csrfRes.data?.csrfToken;
  if (typeof csrfToken !== "string") {
    throw new Error("Invalid CSRF token response");
  }

  const csrfCookies: string[] =
    (csrfRes.headers["set-cookie"] as string[]) || [];

  // Authenticate
  const form = new URLSearchParams();
  form.set("csrfToken", csrfToken);
  form.set("identifier", creds.identifier);
  form.set("password", creds.password);
  form.set("callbackUrl", TEST_CONFIG.baseUrl);
  form.set("json", "true");

  const loginRes = await axios.post(AUTH_CREDENTIALS_CALLBACK_URL, form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: csrfCookies,
    },
    withCredentials: true,
    validateStatus: () => true,
  });

  const loginSetCookie = loginRes.headers["set-cookie"] as string[];

  const isSessionCookie = (name: string) =>
    TEST_CONSTANTS.SESSION_COOKIE_PATTERNS.some(
      (pattern) => name === pattern || name.startsWith(pattern)
    );

  const sessionCookies = loginSetCookie
    .map((c) => c.split(";")[0])
    .filter(Boolean)
    .filter((kv) => {
      const name = kv.split("=")[0] || "";
      return isSessionCookie(name);
    });
  console.log(sessionCookies.length);

  if (sessionCookies.length === 0) {
    throw new Error("No NextAuth session cookie was set on login");
  }

  const cookieHeader = sessionCookies.join("; ");

  // Create authenticated axios instance
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      Cookie: cookieHeader,
    },
    validateStatus: () => true,
  });

  return {
    csrfToken,
    sessionCookies,
    cookieHeader,
    axiosInstance,
  };
}

/**
 * Fetches CSRF token only
 */
export async function fetchCsrfToken(): Promise<string> {
  const csrfRes = await axios.get(AUTH_CSRF_URL, {
    withCredentials: true,
    validateStatus: () => true,
  });

  if (csrfRes.status !== 200) {
    throw new Error(`Failed to fetch CSRF token: ${csrfRes.status}`);
  }

  const csrfToken = csrfRes.data?.csrfToken;
  if (typeof csrfToken !== "string") {
    throw new Error("Invalid CSRF token response");
  }

  return csrfToken;
}

/**
 * Checks if response has session cookie
 */
export function hasSessionCookie(
  setCookieHeader: string[] | undefined
): boolean {
  if (!Array.isArray(setCookieHeader)) return false;

  return setCookieHeader.some((cookie: string) =>
    TEST_CONSTANTS.SESSION_COOKIE_PATTERNS.some((pattern) =>
      cookie.includes(pattern)
    )
  );
}
