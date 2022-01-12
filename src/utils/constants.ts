import { PUBLIC_URL, URL_FE_LANDING } from './env';

export const BASE_ROUTE = PUBLIC_URL;

export const ROUTE_LOGIN = BASE_ROUTE + '/login';
export const ROUTE_LOGIN_SUCCESS = BASE_ROUTE + '/login/success';
export const ROUTE_LOGIN_ERROR = BASE_ROUTE + '/login/error';
export const ROUTE_LOGOUT = BASE_ROUTE + '/logout';

export const ENABLE_LANDING_REDIRECT = !URL_FE_LANDING.endsWith('/auth/logout');

export const STORAGE_KEY_TOKEN = 'token';
export const STORAGE_KEY_USER = 'user';
export const STORAGE_KEY_ON_SUCCESS = 'LOGIN:onSuccess';
