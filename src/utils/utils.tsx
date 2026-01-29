import {
  ROUTE_LOGIN_GOOGLE,
  ROUTE_LOGIN,
  ROUTE_LOGIN_ERROR
} from './constants';

export const redirectToLogin = () => {
  globalThis.location.assign(ROUTE_LOGIN);
};

export const redirectToGoogleLogin = () => {
  globalThis.location.assign(ROUTE_LOGIN_GOOGLE);
};

export const redirectToErrorPage = () => {
  globalThis.location.assign(ROUTE_LOGIN_ERROR);
};

export const isPnpg =
  globalThis.location.hostname?.startsWith('pnpg') ||
  globalThis.location.hostname?.startsWith('imprese');
