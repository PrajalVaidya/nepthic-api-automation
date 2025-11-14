import { AUTH_SIGN_UP_URL } from '@endpoints/endpoints';
import { createApiClient } from '../../helpers/api.helpers';
import { expectSuccessResponse, expectErrorResponse } from '../../helpers/assertion.helpers';
import { authFixtures } from '../../fixtures/auth.fixtures';
import { TEST_CONSTANTS } from '../../config/test-constants';

describe('Sign-up validation', () => {
  const signUpScenarios = [
    {
      name: 'valid signup',
      data: authFixtures.randomSignUpData(),
      expectedStatus: TEST_CONSTANTS.HTTP_STATUS.CREATED,
    },
    {
      name: 'invalid email format',
      data: authFixtures.invalidSignUpData.invalidEmail(),
      expectedStatus: TEST_CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
    },
    {
      name: 'passwords do not match',
      data: authFixtures.invalidSignUpData.passwordMismatch(),
      expectedStatus: TEST_CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
    },
    {
      name: 'missing required field (email)',
      data: authFixtures.invalidSignUpData.missingEmail(),
      expectedStatus: TEST_CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
    },
    {
      name: 'empty username',
      data: authFixtures.invalidSignUpData.emptyUsername(),
      expectedStatus: TEST_CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
    },
  ];

  it.each(signUpScenarios)(
    'should handle $name',
    async ({ data, expectedStatus }) => {
      const apiClient = createApiClient();
      const res = await apiClient.post(AUTH_SIGN_UP_URL, data);

      if (expectedStatus === TEST_CONSTANTS.HTTP_STATUS.CREATED) {
        expectSuccessResponse(res, expectedStatus);
      } else {
        expectErrorResponse(res, expectedStatus);
      }
    }
  );
});

