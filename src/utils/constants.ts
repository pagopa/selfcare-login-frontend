import { ENV } from './env';

const IS_DEVELOP = process.env.NODE_ENV === 'development';

export const LOG_REDUX_ACTIONS = IS_DEVELOP;

export const BASE_ROUTE = ENV.PUBLIC_URL;

export const ROUTE_LOGIN = BASE_ROUTE + '/login';
export const ROUTE_AUTH_CALLBACK = BASE_ROUTE + '/login/callback';
export const ROUTE_LOGIN_SUCCESS = BASE_ROUTE + '/login/success';
export const ROUTE_LOGIN_ERROR = BASE_ROUTE + '/login/error';
export const ROUTE_TERMS_AND_CONDITION = BASE_ROUTE + '/termini-di-servizio';
export const ROUTE_PRIVACY_DISCLAIMER = BASE_ROUTE + '/informativa-privacy';
export const ROUTE_LOGOUT = ENV.URL_FE.LOGOUT;
export const ROUTE_LOGOUT_GOGGLE = BASE_ROUTE + '/logout/google';
export const ROUTE_OTP = BASE_ROUTE + '/login/otp';

export const ENABLE_LANDING_REDIRECT = !ENV.URL_FE.LANDING.endsWith('/auth/logout');

export const LOADING_TASK_VERIFY_OTP = 'VERIFY_OTP';
