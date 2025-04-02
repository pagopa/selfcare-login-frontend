import { OidcExchangeRequest } from '../generated/selfcare-auth/OidcExchangeRequest';
import { OidcExchangeResponse } from '../generated/selfcare-auth/OidcExchangeResponse';

export const SelfcareAuthApiMock = {
  oneIdentityCodeExchangeMock: async (
    oidcExchangeRequest: OidcExchangeRequest
  ): Promise<OidcExchangeResponse> =>
    Promise.resolve({ sessionToken: `sessionToken-${oidcExchangeRequest.code}` }),
};
