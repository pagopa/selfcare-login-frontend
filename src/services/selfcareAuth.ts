import { SelfcareAuthApi } from '../api/SelfcareAuthApiClient';
import { SelfcareAuthApiMock } from '../api/__mocks__/SelfcareAuthApiClient';
import { OidcExchangeRequest } from '../api/generated/selfcare-auth/OidcExchangeRequest';
import { OtpVerifyRequest } from '../api/generated/selfcare-auth/OtpVerifyRequest';
import { OidcExchangeResponse, otpVerifyResponse } from '../models/authentication';

export const selfcareAuthService = async (
  oidcExchangeRequest: OidcExchangeRequest
): Promise<OidcExchangeResponse> => {
  if (process.env.REACT_APP_API_MOCK === 'true') {
    return await SelfcareAuthApiMock.oneIdentityCodeExchangeMock(oidcExchangeRequest);
  } else {
    return await SelfcareAuthApi.oneIdentityCodeExchange(oidcExchangeRequest);
  }
};

export const otpVerifyService = async (otpVerifyRequest: OtpVerifyRequest): Promise<otpVerifyResponse> => {
  if (process.env.REACT_APP_API_MOCK === 'true') {
    return await SelfcareAuthApiMock.otpVerifyMock(otpVerifyRequest);
  } else {
    return await SelfcareAuthApi.otpVerify(otpVerifyRequest);
  }
};
