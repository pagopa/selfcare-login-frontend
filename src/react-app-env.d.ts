/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'uat' | 'production';
    REACT_APP_URL_FE_ONBOARDING: string;
    REACT_APP_URL_FE_DASHBOARD: string;
    REACT_APP_URL_FE_LANDING: string;
    REACT_APP_URL_API_LOGIN: string;
    REACT_APP_SPID_TEST_ENV_ENABLED: boolean;
    REACT_APP_SPID_CIE_ENTITY_ID: string;
    REACT_APP_PAGOPA_HELP_EMAIL: string;
  }
}
interface Window {
  Stripe: any;
}
