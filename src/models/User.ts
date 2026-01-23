import { JwtUser } from '@pagopa/selfcare-common-frontend/lib/model/JwtUser';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { parseJwt } from '../lib/jwt-utils';

export const userFromJwtToken: (token: string) => User = function (token: string) {
  const jwtUser: JwtUser = parseJwt(token);
  return {
    uid: jwtUser.uid,
    taxCode: jwtUser.fiscal_number,
    name: jwtUser.name,
    surname: jwtUser.family_name,
    email: jwtUser.email,
    iss: jwtUser.iss,
  };
};
