import { SelfcareAuthApi } from '../api/SelfcareAuthApiClient';
import { SelfcareAuthApiMock } from '../api/__mocks__/SelfcareAuthApiClient';
import { OidcExchangeRequest } from '../api/generated/selfcare-auth/OidcExchangeRequest';

export const selfcareAuthService = async (oidcExchangeRequest: OidcExchangeRequest) => {
  if (process.env.REACT_APP_API_MOCK_PARTIES === 'true') {
    await SelfcareAuthApiMock.oneIdentityCodeExchangeMock(oidcExchangeRequest);
  } else {
    await SelfcareAuthApi.oneIdentityCodeExchange(oidcExchangeRequest);
  }
};
