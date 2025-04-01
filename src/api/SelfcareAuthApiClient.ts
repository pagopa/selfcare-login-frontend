import {
  buildFetchApi,
  extractResponse,
} from '@pagopa/selfcare-common-frontend/lib/utils/api-utils';
import { ENV } from '../utils/env';
import { createClient } from './generated/selfcare-auth/client';
import { OidcExchangeRequest } from './generated/selfcare-auth/OidcExchangeRequest';
import { OidcExchangeResponse } from './generated/selfcare-auth/OidcExchangeResponse';

const apiCLient = createClient({
  baseUrl: 'http://localhost:3000',
  basePath: '',
  fetchApi: buildFetchApi(ENV.API_TIMEOUT_MS.DASHBOARD),
});

export const SelfcareAuthApi = {
  oneIdentityCodeExchange: async (oidcExchangeRequest: OidcExchangeRequest): Promise<OidcExchangeResponse> => {
    const result = await apiCLient.oidcExchange({ body: oidcExchangeRequest });
    return extractResponse(result, 200, () => {});
  },
};
