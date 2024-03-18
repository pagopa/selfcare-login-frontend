import { storageTokenOps, storageUserOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { parseJwt } from '../lib/jwt-utils';
import { JWTUser } from '../models/JwtUser';
import { ROUTE_LOGIN } from './constants';

export const redirectToLogin = () => {
  window.location.assign(ROUTE_LOGIN);
};

export const isPnpg =
  window.location.hostname?.startsWith('pnpg') || window.location.hostname?.startsWith('imprese');

export const handleSession = (token: string) => {
  const jwtUser: JWTUser = parseJwt(token);
  const tokenExpDate = new Date(Number(jwtUser.exp) * 1000);
  const isExpiredToken = new Date() >= tokenExpDate;

  if (isExpiredToken) {
    console.log('expired');
    storageTokenOps.delete();
    storageUserOps.delete();
    redirectToLogin();
  } else {
    console.log('ok!');
    storageTokenOps.write(token);
    storageUserOps.write({
      uid: jwtUser.uid,
      taxCode: jwtUser.fiscal_number,
      name: jwtUser.name,
      surname: jwtUser.family_name,
      email: jwtUser.email,
    });
  }
};
