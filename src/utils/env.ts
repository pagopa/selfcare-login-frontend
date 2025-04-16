import * as env from 'env-var';

const PUBLIC_URL: string = env.get('PUBLIC_URL').default('').asString();
const currentEnv: string = env.get('REACT_APP_ENV').required().asString();

export const ENV = {
  ENV: currentEnv,
  PUBLIC_URL,

  OT: {
    SRC: env.get('REACT_APP_OT_SRC').required().asString(),
    TOKEN: env.get('REACT_APP_OT_TOKEN').required().asString(),
    REACT_APP_OT_TOS_RESOURCE: env.get('REACT_APP_OT_TOS_RESOURCE').required().asString(),
    RESOURCE_TERMS_AND_CONDITION: env
      .get('REACT_APP_OT_TERMS_AND_CONDITION_RESOURCE')
      .required()
      .asString(),
  },

  ASSISTANCE: {
    ENABLE: env.get('REACT_APP_ENABLE_ASSISTANCE').required().asBool(),
    EMAIL: env.get('REACT_APP_PAGOPA_HELP_EMAIL').required().asString(),
  },

  JSON_URL: {
    PRODUCTS: env.get('REACT_APP_PRODUCTS_ASSET').required().asString(),
    ALERT: env.get('REACT_APP_LOGIN_ALERT_BANNER').required().asString(),
  },

  URL_FE: {
    LOGOUT: PUBLIC_URL + '/logout',
    LOGIN: env.get('REACT_APP_URL_FE_LOGIN').required().asString(),
    ONBOARDING: env.get('REACT_APP_URL_FE_ONBOARDING').required().asString(),
    DASHBOARD: env.get('REACT_APP_URL_FE_DASHBOARD').required().asString(),
    LANDING: env.get('REACT_APP_URL_FE_LANDING').required().asString(),
    ASSISTANCE: env.get('REACT_APP_URL_FE_ASSISTANCE').required().asString(),
  },

  URL_DOCUMENTATION: ' https://docs.pagopa.it/area-riservata/',

  URL_API: {
    LOGIN: env.get('REACT_APP_URL_API_LOGIN').required().asString(),
    AUTH: env.get('REACT_APP_URL_API_AUTH').required().asString(),
  },

  URL_FOOTER: {
    PRIVACY_DISCLAIMER: env.get('REACT_APP_URL_PRIVACY_DISCLAIMER').required().asString(),
    TERMS_AND_CONDITIONS: env.get('REACT_APP_URL_TERMS_AND_CONDITIONS').required().asString(),
  },

  SPID_TEST_ENV_ENABLED: env.get('REACT_APP_SPID_TEST_ENV_ENABLED').required().asBool(),

  SPID_CIE_ENTITY_ID: env.get('REACT_APP_SPID_CIE_ENTITY_ID').required().asString(),

  ONE_IDENTITY: {
    CLIENT_ID: env.get('REACT_APP_OI_CLIENT_ID').required().asString(),
    BASE_URL: env.get('REACT_APP_OI_BASE_URL').required().asString(),
  },

  API_TIMEOUT_MS: {
    DASHBOARD: env.get('REACT_APP_API_DASHBOARD_TIMEOUT_MS').required().asInt(),
  },

  ANALYTCS: {
    ENABLE: env.get('REACT_APP_ANALYTICS_ENABLE').default('false').asBool(),
    MOCK: env.get('REACT_APP_ANALYTICS_MOCK').default('false').asBool(),
    DEBUG: env.get('REACT_APP_ANALYTICS_DEBUG').default('false').asBool(),
    TOKEN: env.get('REACT_APP_MIXPANEL_TOKEN').required().asString(),
    API_HOST: env
      .get('REACT_APP_MIXPANEL_API_HOST')
      .default('https://api-eu.mixpanel.com')
      .asString(),
  },
};
