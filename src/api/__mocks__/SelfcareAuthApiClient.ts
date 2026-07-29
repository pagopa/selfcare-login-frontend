/* eslint-disable functional/immutable-data */
import { OidcExchangeResponse, otpVerifyResponse } from '../../models/authentication';
import { OidcExchangeOtpResponse } from '../generated/selfcare-auth/OidcExchangeOtpResponse';
import { OidcExchangeRequest } from '../generated/selfcare-auth/OidcExchangeRequest';
import { OtpResendRequest } from '../generated/selfcare-auth/OtpResendRequest';
import { OtpVerifyRequest } from '../generated/selfcare-auth/OtpVerifyRequest';

/**
 * Test-only token used in unit tests/mocks.
 * IMPORTANT: do not commit real JWTs here.
 * Provide it via environment variable (e.g. .env.test) when needed.
 */
const mockedSessionToken = import.meta.env.VITE_MOCKED_SESSION_TOKEN ?? '';

export const SelfcareAuthApiMock = {
  oneIdentityCodeExchangeMock: async (
    oidcExchangeRequest: OidcExchangeRequest
  ): Promise<OidcExchangeResponse> => {
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

  otpVerifyMock: async (otpVerifyRequest: OtpVerifyRequest): Promise<otpVerifyResponse> => {
    if (otpVerifyRequest.otp === '111666') {
      const error: any = new Error('wrong otp');
      error.httpStatus = 403;
      error.httpBody = {
        otpForbiddenCode: 'CODE_001',
        remainingAttempts: 3,
        otpStatus: 'PENDING',
      };
      throw error;
    }

    if (otpVerifyRequest.otp === '222666') {
      const error: any = new Error('otp attempt exceeded');
      error.httpStatus = 403;
      error.httpBody = {
        otpForbiddenCode: 'CODE_002',
        remainingAttempts: 0,
        otpStatus: 'PENDING',
      };
      throw error;
    }

    if (otpVerifyRequest.otp === '111999') {
      const error: any = new Error('OTP expired');
      error.httpStatus = 409;
      error.httpBody = {
        detail: 'string',
        instance: 'string',
        status: 0,
        title: 'string',
        type: 'string',
      };
      throw error;
    }

    return {
      sessionToken: mockedSessionToken,
    };
  },

  otpResendMock: async (_otpResendRequest: OtpResendRequest): Promise<OidcExchangeOtpResponse> =>
    Promise.resolve({
      sessionToken: mockedSessionToken,
    }),
};
