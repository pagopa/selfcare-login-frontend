import { ROUTE_LOGIN, ROUTE_LOGIN_ERROR } from './constants';
import { ENV } from './env';

export const redirectToLogin = (isGoogleLogin = false) => {
  if (isGoogleLogin) {
    globalThis.location.assign(ENV.GOOGLE_LOGIN_URL);
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
