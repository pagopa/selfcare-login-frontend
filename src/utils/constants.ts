export const SPID_TEST_ENV_ENABLED = process.env.REACT_APP_SPID_TEST_ENV_ENABLED;
export const SPID_CIE_ENTITY_ID = process.env.REACT_APP_SPID_CIE_ENTITY_ID;

export const BASE_ROUTE = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';

export const ROUTE_LOGIN = BASE_ROUTE + '/login';
export const ROUTE_LOGIN_SUCCESS = BASE_ROUTE + '/login/success';
export const ROUTE_LOGOUT = BASE_ROUTE + '/logout';

export const URL_FE_ONBOARDING = process.env.REACT_APP_URL_FE_ONBOARDING;
export const URL_FE_DASHBOARD = process.env.REACT_APP_URL_FE_DASHBOARD;

export const URL_API_LOGIN = process.env.REACT_APP_URL_API_LOGIN;

export const STORAGE_KEY_TOKEN = 'token';
export const STORAGE_KEY_USER = 'user';
export const STORAGE_KEY_ON_SUCCESS = 'LOGIN:onSuccess';
