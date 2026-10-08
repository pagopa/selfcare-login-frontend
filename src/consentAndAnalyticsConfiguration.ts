/* eslint-disable functional/immutable-data */
import { CONFIG } from '@pagopa/selfcare-common-frontend/lib/config/env';
import { ENV } from './utils/env';

export const configureCommon = () => {
  CONFIG.URL_FE.LOGOUT = ENV.URL_FE.LOGOUT;
  CONFIG.URL_FE.ASSISTANCE = ENV.URL_FE.ASSISTANCE;
  CONFIG.ANALYTCS.ENABLE = ENV.ANALYTCS.ENABLE;
  CONFIG.ANALYTCS.MOCK = ENV.ANALYTCS.MOCK;
  CONFIG.ANALYTCS.DEBUG = ENV.ANALYTCS.DEBUG;
  CONFIG.ANALYTCS.TOKEN = ENV.ANALYTCS.TOKEN;
  CONFIG.ANALYTCS.API_HOST = ENV.ANALYTCS.API_HOST;
  CONFIG.ANALYTCS.ADDITIONAL_PROPERTIES_IMPORTANT = { env: ENV.ENV };
};

export const configureConsent = async () => {
  configureCommon();
  // Consent initialization reads CONFIG immediately when an existing consent cookie is present.
  await import('@pagopa/selfcare-common-frontend/lib/consentManagementConfigure');
};
