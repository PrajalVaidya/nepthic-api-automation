import axios, { AxiosInstance } from "axios";
import { TEST_CONFIG } from "../config/test-env";

/**
 * Creates an authenticated API client
 */
export function createAuthenticatedClient(cookieHeader: string[]): AxiosInstance {
  return axios.create({
    baseURL: TEST_CONFIG.apiUrl,
    withCredentials: true,
    headers: {
      Cookie: cookieHeader,
    },
    validateStatus: () => true,
  });
}

/**
 * Creates an unauthenticated API client
 */
export function createApiClient(): AxiosInstance {
  return axios.create({
    baseURL: TEST_CONFIG.apiUrl,
    validateStatus: () => true,
    withCredentials: true,
  });
}

/**
 * Creates an API client with custom configuration
 */
export function createCustomClient(config?: {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
}): AxiosInstance {
  return axios.create({
    baseURL: config?.baseURL || TEST_CONFIG.apiUrl,
    validateStatus: () => true,
    withCredentials: true,
    headers: config?.headers || {},
    timeout: config?.timeout || TEST_CONFIG.timeout,
  });
}
