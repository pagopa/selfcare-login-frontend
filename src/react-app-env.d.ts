/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'uat' | 'production';
    REACT_APP_URL_FE_ONBOARDING: string;
    REACT_APP_URL_FE_DASHBOARD: string;
    REACT_APP_URL_API_LOGIN: string;
  }
}
interface Window {
  Stripe: any;
}
