import {
  buildFetchApi,
  extractResponse,
} from '@pagopa/selfcare-common-frontend/lib/utils/api-utils';
import { OidcExchangeResponse } from '../models/tokenExchange';
import { ENV } from '../utils/env';
import { createClient } from './generated/selfcare-auth/client';
import { OidcExchangeRequest } from './generated/selfcare-auth/OidcExchangeRequest';

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
};
