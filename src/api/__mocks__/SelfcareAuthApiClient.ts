import { OidcExchangeResponse, otpVerifyResponse } from '../../models/authentication';
import { OidcExchangeRequest } from '../generated/selfcare-auth/OidcExchangeRequest';
import { OtpVerifyRequest } from '../generated/selfcare-auth/OtpVerifyRequest';

const mockedSessionToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTc1MDQxNjAxMH0.yvLnfaZEZ-DMh7pW_7DkWj637qXg4uJ7XcJQiF-8Wiw`;

export const SelfcareAuthApiMock = {
  oneIdentityCodeExchangeMock: async (
    oidcExchangeRequest: OidcExchangeRequest
  ): Promise<OidcExchangeResponse> => {
    console.log('oidcExchangeRequest.code', oidcExchangeRequest.code);
    if (oidcExchangeRequest.code === 'test-otp-code') {
      return Promise.resolve({
        requiresOtpFlow: true,
        otpSessionUid: 'otpSessionUid',
        maskedEmail: 'maskedEmail***@***.com',
      });
    }

    return Promise.resolve({
      requiresOtpFlow: false,
      sessionToken: mockedSessionToken,
    });
  },

  otpVerifyMock: async (_otpVerifyRequest: OtpVerifyRequest): Promise<otpVerifyResponse> =>
    await Promise.resolve({
      sessionToken: mockedSessionToken,
    }),
};
