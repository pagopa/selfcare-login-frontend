import {
  buildFetchApi,
  extractResponse,
} from '@pagopa/selfcare-common-frontend/lib/utils/api-utils';
import { OidcExchangeResponse, otpVerifyResponse } from '../models/authentication';
import { ENV } from '../utils/env';
import { createClient } from './generated/selfcare-auth/client';
import { OidcExchangeOtpResponse } from './generated/selfcare-auth/OidcExchangeOtpResponse';
import { OidcExchangeRequest } from './generated/selfcare-auth/OidcExchangeRequest';
import { OtpResendRequest } from './generated/selfcare-auth/OtpResendRequest';
import { OtpVerifyRequest } from './generated/selfcare-auth/OtpVerifyRequest';

const apiClient = createClient({
  baseUrl: ENV.URL_API.AUTH,
  basePath: '',
  fetchApi: buildFetchApi(ENV.API_TIMEOUT_MS.DASHBOARD),
});

export const SelfcareAuthApi = {
  oneIdentityCodeExchange: async (
    oidcExchangeRequest: OidcExchangeRequest
  ): Promise<OidcExchangeResponse> => {
    const result = await apiClient.oidcExchange({ body: oidcExchangeRequest });
    return extractResponse(result, [200, 201], () => {});
  },

  otpVerify: async (otpVerifyRequest: OtpVerifyRequest): Promise<otpVerifyResponse> => {
    const result = await apiClient.otpVerify({ body: otpVerifyRequest });
    return extractResponse(result, 200, () => {});
  },

  otpResend: async (otpResendRequest: OtpResendRequest): Promise<OidcExchangeOtpResponse> => {
    const result = await apiClient.otpResend({ body: otpResendRequest });
    return extractResponse(result, 200, () => {});
  },
};
