import env from 'env-var';

export const readEnv = (values: Record<string, string | undefined>, baseUrl: string) => {
  const source = env.from(values);
  const PUBLIC_URL = baseUrl.replace(/\/+$/, '');
  const currentEnv: string = source.get('VITE_ENV').required().asString();

  return {
    ENV: currentEnv,
    PUBLIC_URL,

    ENABLED_SPID: source.get('VITE_LOGIN_SPID_ENABLED').required().asBool(),

    OT: {
      SRC: source.get('VITE_OT_SRC').required().asString(),
      TOKEN: source.get('VITE_OT_TOKEN').required().asString(),

      RESOURCE_TERMS_AND_CONDITION: source
        .get('VITE_OT_TERMS_AND_CONDITION_RESOURCE')
        .required()
        .asString(),
      TOS_RESOURCE: source.get('VITE_OT_TOS_RESOURCE').required().asString(),
    },

    ASSISTANCE: {
      ENABLE: source.get('VITE_ENABLE_ASSISTANCE').required().asBool(),
      EMAIL: source.get('VITE_PAGOPA_HELP_EMAIL').required().asString(),
    },

    JSON_URL: {
      PRODUCTS: source.get('VITE_PRODUCTS_ASSET').required().asString(),
      ALERT: source.get('VITE_LOGIN_ALERT_BANNER').required().asString(),
    },

    URL_FE: {
      LOGOUT: PUBLIC_URL + '/logout',
      ONBOARDING: source.get('VITE_URL_FE_ONBOARDING').required().asString(),
      DASHBOARD: source.get('VITE_URL_FE_DASHBOARD').required().asString(),
      LANDING: source.get('VITE_URL_FE_LANDING').required().asString(),
      ASSISTANCE: source.get('VITE_URL_FE_ASSISTANCE').required().asString(),
    },

    URL_DOCUMENTATION: ' https://docs.pagopa.it/area-riservata/',

    URL_API: {
      LOGIN: source.get('VITE_URL_API_LOGIN').required().asString(),
    },

    URL_FOOTER: {
      PRIVACY_DISCLAIMER: source.get('VITE_URL_PRIVACY_DISCLAIMER').required().asString(),
      TERMS_AND_CONDITIONS: source.get('VITE_URL_TERMS_AND_CONDITIONS').required().asString(),
    },

    SPID_TEST_ENV_ENABLED: source.get('VITE_SPID_TEST_ENV_ENABLED').required().asBool(),

    SPID_CIE_ENTITY_ID: source.get('VITE_SPID_CIE_ENTITY_ID').required().asString(),

    ANALYTCS: {
      ENABLE: source.get('VITE_ANALYTICS_ENABLE').default('false').asBool(),
      MOCK: source.get('VITE_ANALYTICS_MOCK').default('false').asBool(),
      DEBUG: source.get('VITE_ANALYTICS_DEBUG').default('false').asBool(),
      TOKEN: source.get('VITE_MIXPANEL_TOKEN').required().asString(),
      API_HOST: source
        .get('VITE_MIXPANEL_API_HOST')
        .default('https://api-eu.mixpanel.com')
        .asString(),
    },
  };
};
