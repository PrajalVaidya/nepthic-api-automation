import {
  AUTH_CSRF_URL,
  AUTH_CREDENTIALS_CALLBACK_URL,
  PROFILE_URL,
} from "../../../endpoints/endpoints";
import { authenticateUser, fetchCsrfToken } from "../../helpers/auth.helpers";
import { createApiClient } from "../../helpers/api.helpers";
import {
  expectSuccessResponse,
  expectNoSessionCookie,
  expectSessionCookie,
} from "../../helpers/assertion.helpers";
import { TEST_CREDENTIALS } from "../../config/test-env";

describe("Sign-in (credentials) flow", () => {
  it("should sign in with valid credentials", async () => {
    const apiClient = createApiClient();

    // 1) Get CSRF token
    const csrfRes = await apiClient.get(AUTH_CSRF_URL);
    expectSuccessResponse(csrfRes, 200);

    const csrfToken = csrfRes.data?.csrfToken;
    expect(typeof csrfToken).toBe("string");

    // Collect cookies from CSRF response
    const csrfSetCookie: string[] =
      (csrfRes.headers["set-cookie"] as string[]) || [];

    // 2) Post credentials to NextAuth callback
    const form = new URLSearchParams();
    form.set("csrfToken", csrfToken);
    form.set("identifier", TEST_CREDENTIALS.valid.identifier);
    form.set("password", TEST_CREDENTIALS.valid.password);
    form.set("callbackUrl", "http://localhost:3000");
    form.set("json", "true");

    const loginRes = await apiClient.post(AUTH_CREDENTIALS_CALLBACK_URL, form, {
      headers: {
        Cookie: csrfSetCookie.map((c) => c.split(";")[0]).join("; "),
      },
    });

    // 3) Assert success
    if (loginRes.headers["content-type"]?.includes("application/json")) {
      expectSuccessResponse(loginRes, 200);
      expect(loginRes.data?.url).toBeTruthy();
      expect(loginRes.data?.error).toBeFalsy();
    } else {
      expect([200, 302, 308, 307]).toContain(loginRes.status);
    }

    // 4) Assert session cookie is present
    expectSessionCookie(loginRes);
  });

  it("should reject invalid credentials", async () => {
    const apiClient = createApiClient();
    const csrfRes = await apiClient.get(AUTH_CSRF_URL);
    const csrfToken = csrfRes.data?.csrfToken as string;

    const form = new URLSearchParams();
    form.set("csrfToken", csrfToken);
    form.set("identifier", TEST_CREDENTIALS.invalid.identifier);
    form.set("password", TEST_CREDENTIALS.invalid.password);
    form.set("callbackUrl", "http://localhost:3000");
    form.set("json", "true");

    const res = await apiClient.post(AUTH_CREDENTIALS_CALLBACK_URL, form);

    // Check that no session cookie is present for invalid credentials
    expectNoSessionCookie(res);
  });

  it("should validate extracted session token", async () => {
    const authContext = await authenticateUser();

    // Test the token immediately
    const testRes = await authContext.axiosInstance.get(PROFILE_URL);
    expectSuccessResponse(testRes, 200);

    console.log("Token validated! User:", testRes.data);
  });
});
