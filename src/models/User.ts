import { parseJwt } from '../lib/jwt-utils';
import { JWTUser } from './JwtUser';

export type User = {
  uid: string;
  taxCode: string;
  name: string;
  surname: string;
  email: string;
};

export const userFromJwtToken: (token: string) => User = function (token: string) {
  const jwtUser: JWTUser = parseJwt(token);
  return {
    uid: jwtUser.uid,
    taxCode: jwtUser.fiscal_number,
    name: jwtUser.name.replace(/Ã/g, 'à').replace(/ /g, ''),
    surname: jwtUser.family_name.replace(/Ã/g, 'à').replace(/ /g, ''),
    email: jwtUser.email,
  };
};
