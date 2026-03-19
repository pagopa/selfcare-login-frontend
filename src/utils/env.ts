const PUBLIC_URL: string = import.meta.env.BASE_URL;
const currentEnv: string = import.meta.env.VITE_ENV;

export const ENV = {
  ENV: currentEnv,
  PUBLIC_URL,

  TEST_TOKEN:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMTExc2FkY3gxMS5jb20iLCJmYW1pbHlfbmFtZSI6IlJvc3NpIiwiZmlzY2FsX251bWJlciI6IlVOSVRURVNUUyIsIm5hbWUiOiJNYXJpbyIsImZyb21fYWEiOmZhbHNlLCJsZXZlbCI6IkwyIiwiaWF0IjoxNjM1MzYyODE1LCJleHAiOjE2MzUzNjY0MTUsImlzcyI6IlNQSUQiLCJqdGkiOiIwMUZLMUtHRlRYRjZNSDMwS1IyRTFGRUNIRCIsInVpZCI6IjAifQ.EuJlVuuQa2mqpaR_nj7wT95Ig3FuDTKmVGs5FEt3cZZovI6xegM3DV9Xiz3fjGk0Lg-S1qjf6oyvg1e6d7692CGbSuadkSeJNojeUaTK2yHwBRl207DpSEEqhWpqFM5qDZPgbwPFb1Oau5oE9kEwE8Z7KIBBu5gBzCb6dSKXKe_7wvR6QFwZKvjuWf82fCxuIZbHdI4bQwWoqXGCRh45T5VsMPDQ-xuJQTvxvRczEp8W3RF1INyF8vnY_wKXzjrZG4p_2kVS4RM6npy9oGluzlMTZxTaQZb1OSBv9YDzmEbJbgJ0KAt_4CrSORUi_NP38S1C2RLKCG_-Yt4H5JGWrQ',

  OT: {
    SRC: import.meta.env.VITE_OT_SRC,
    TOKEN: import.meta.env.VITE_OT_TOKEN,
    VITE_OT_TOS_RESOURCE: import.meta.env.VITE_OT_TOS_RESOURCE,
    RESOURCE_TERMS_AND_CONDITION: import.meta.env.VITE_OT_TERMS_AND_CONDITION_RESOURCE,
  },

  ASSISTANCE: {
    ENABLE: import.meta.env.VITE_ENABLE_ASSISTANCE === 'true',
    EMAIL: import.meta.env.VITE_PAGOPA_HELP_EMAIL,
  },

  JSON_URL: {
    PRODUCTS: import.meta.env.VITE_PRODUCTS_ASSET,
    ALERT: import.meta.env.VITE_LOGIN_ALERT_BANNER,
  },

  URL_FE: {
    LOGOUT: PUBLIC_URL + '/logout',
    LOGIN: import.meta.env.VITE_URL_FE_LOGIN,
    ONBOARDING: import.meta.env.VITE_URL_FE_ONBOARDING,
    DASHBOARD: import.meta.env.VITE_URL_FE_DASHBOARD,
    LANDING: import.meta.env.VITE_URL_FE_LANDING,
    ASSISTANCE: import.meta.env.VITE_URL_FE_ASSISTANCE,
  },

  URL_DOCUMENTATION: ' https://docs.pagopa.it/area-riservata/',

  URL_API: {
    LOGIN: import.meta.env.VITE_URL_API_LOGIN,
    AUTH: import.meta.env.VITE_URL_API_AUTH,
  },

  URL_FOOTER: {
    PRIVACY_DISCLAIMER: import.meta.env.VITE_URL_PRIVACY_DISCLAIMER,
    TERMS_AND_CONDITIONS: import.meta.env.VITE_URL_TERMS_AND_CONDITIONS,
  },

  SPID_TEST_ENV_ENABLED: import.meta.env.VITE_SPID_TEST_ENV_ENABLED,

  SPID_CIE_ENTITY_ID: import.meta.env.VITE_SPID_CIE_ENTITY_ID,

  ONE_IDENTITY: {
    CLIENT_ID: import.meta.env.VITE_OI_CLIENT_ID,
    BASE_URL: import.meta.env.VITE_OI_BASE_URL,
  },

  ENABLE_OTP: import.meta.env.VITE_ENABLE_OTP,
  ENABLE_MAIL_OTP: import.meta.env.VITE_ENABLE_SEND_MAIL_OTP === 'true',
  GOOGLE_LOGIN_URL: import.meta.env.VITE_GOOGLE_LOGIN_URL,

  API_TIMEOUT_MS: {
    DASHBOARD: import.meta.env.VITE_API_DASHBOARD_TIMEOUT_MS,
  },

  ANALYTCS: {
    ENABLE: import.meta.env.VITE_ANALYTICS_ENABLE === 'true',
    MOCK: import.meta.env.VITE_ANALYTICS_MOCK === 'true',
    DEBUG: import.meta.env.VITE_ANALYTICS_DEBUG === 'true',
    TOKEN: import.meta.env.VITE_MIXPANEL_TOKEN,
    API_HOST: import.meta.env.VITE_MIXPANEL_API_HOST || 'https://api-eu.mixpanel.com',
  },
};
