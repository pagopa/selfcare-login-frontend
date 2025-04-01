import { SelfcareAuthApi } from '../api/SelfcareAuthApiClient';
import { SelfcareAuthApiMock } from '../api/__mocks__/SelfcareAuthApiClient';
import { OidcExchangeRequest } from '../api/generated/selfcare-auth/OidcExchangeRequest';

export const selfcareAuthService = async (
  oidcExchangeRequest: OidcExchangeRequest
): Promise<OidcExchangeRequest> => {
  if (process.env.REACT_APP_API_MOCK === 'true') {
    return await SelfcareAuthApiMock.oneIdentityCodeExchangeMock(oidcExchangeRequest);
  } else {
    return await SelfcareAuthApi.oneIdentityCodeExchange(oidcExchangeRequest);
  }
};
