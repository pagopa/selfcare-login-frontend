import {
  ROUTE_LOGIN,
  ROUTE_LOGIN_ERROR,
  ROUTE_LOGIN_GOOGLE,
  ROUTE_LOGOUT,
  ROUTE_LOGOUT_GOOGLE,
} from './constants';

/** keeps the requested destination alive across a redirect that wipes the storage */
const withOnSuccess = (route: string, onSuccess?: string | null) =>
  onSuccess ? `${route}?onSuccess=${encodeURIComponent(onSuccess)}` : route;

export const redirectToLogin = (onSuccess?: string | null) => {
  globalThis.location.assign(withOnSuccess(ROUTE_LOGIN, onSuccess));
};

export const redirectToGoogleLogin = () => {
  globalThis.location.assign(ROUTE_LOGIN_GOOGLE);
};

export const redirectToLogout = (onSuccess?: string | null) => {
  globalThis.location.assign(withOnSuccess(ROUTE_LOGOUT, onSuccess));
};

export const redirectToGoogleLogout = (onSuccess?: string | null) => {
  globalThis.location.assign(withOnSuccess(ROUTE_LOGOUT_GOOGLE, onSuccess));
};

export const redirectToErrorPage = () => {
  globalThis.location.assign(ROUTE_LOGIN_ERROR);
};

export const isPnpg =
  globalThis.location.hostname?.startsWith('pnpg') ||
  globalThis.location.hostname?.startsWith('imprese');
