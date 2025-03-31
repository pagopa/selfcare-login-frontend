import { OidcExchangeRequest } from '../generated/selfcare-auth/OidcExchangeRequest';

export const SelfcareAuthApiMock = {
  oneIdentityCodeExchangeMock: async (
    oidcExchangeRequest: OidcExchangeRequest
  ): Promise<OidcExchangeRequest> => Promise.resolve({ ...oidcExchangeRequest }),
};
