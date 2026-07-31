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
export const ROUTE_LOGOUT = BASE_ROUTE + '/logout';
export const ROUTE_LOGOUT_GOOGLE = BASE_ROUTE + '/logout/google';
export const ROUTE_OTP = BASE_ROUTE + '/login/otp';
export const ROUTE_LOGIN_GOOGLE = ENV.GOOGLE_LOGIN_URL;

export const ENABLE_LANDING_REDIRECT = !ENV.URL_FE.LANDING.endsWith('/auth/logout');

export const LOADING_TASK_VERIFY_OTP = 'VERIFY_OTP';

/**
 * The redirect_uri sent to OneIdentity is deterministic per environment, so it must be recomputed
 * (rather than read back from storage) on the auth callback page: relying on storage for this value
 * exposes the flow to browser anti-tracking mitigations (e.g. Safari ITP) that can purge localStorage
 * on the selfcare.it -> oneId.it -> selfcare.it redirect bounce, leaving nothing to read on return.
 */
// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
export const getOneIdentityRedirectUri = () => ENV.URL_FE.LOGIN + '/login/callback';
