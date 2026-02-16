import {
  ROUTE_LOGIN,
  ROUTE_LOGIN_ERROR,
  ROUTE_LOGIN_GOOGLE,
  ROUTE_LOGOUT,
  ROUTE_LOGOUT_GOOGLE,
} from './constants';

export const redirectToLogin = () => {
  globalThis.location.assign(ROUTE_LOGIN);
};

export const redirectToGoogleLogin = () => {
  globalThis.location.assign(ROUTE_LOGIN_GOOGLE);
};

export const redirectToLogout = () => {
  globalThis.location.assign(ROUTE_LOGOUT);
};

export const redirectToGoogleLogout = () => {
  globalThis.location.assign(ROUTE_LOGOUT_GOOGLE);
};

export const redirectToErrorPage = () => {
  globalThis.location.assign(ROUTE_LOGIN_ERROR);
};

export const isPnpg =
  globalThis.location.hostname?.startsWith('pnpg') ||
  globalThis.location.hostname?.startsWith('imprese');
