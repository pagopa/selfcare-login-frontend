import { ROUTE_LOGIN, ROUTE_LOGIN_ERROR, ROUTE_LOGOUT_GOGGLE } from './constants';

export const redirectToLogin = (isGoogleLogin = false) => {
  if (isGoogleLogin) {
    globalThis.location.assign(ROUTE_LOGOUT_GOGGLE);
    return;
  }
  globalThis.location.assign(ROUTE_LOGIN);
};

export const redirectToErrorPage = () => {
  globalThis.location.assign(ROUTE_LOGIN_ERROR);
};

export const isPnpg =
  globalThis.location.hostname?.startsWith('pnpg') ||
  globalThis.location.hostname?.startsWith('imprese');
