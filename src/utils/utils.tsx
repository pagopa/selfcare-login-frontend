import { ROUTE_LOGIN, ROUTE_LOGIN_ERROR } from './constants';

export const redirectToLogin = () => {
  window.location.assign(ROUTE_LOGIN);
};

export const redirectToErrorPage = () => {
  window.location.assign(ROUTE_LOGIN_ERROR);
};

export const isPnpg =
  window.location.hostname?.startsWith('pnpg') || window.location.hostname?.startsWith('imprese');
