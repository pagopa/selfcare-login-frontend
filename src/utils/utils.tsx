import { JwtUser } from '@pagopa/selfcare-common-frontend/model/JwtUser';
import { User } from '../models/User';
import { ROUTE_LOGIN } from './constants';

export const redirectToLogin = () => {
  window.location.assign(ROUTE_LOGIN);
};

export const isPnpg =
  window.location.hostname?.startsWith('pnpg') || window.location.hostname?.startsWith('imprese');

export const jwtUser2User = (jwtUser: JwtUser): User => ({
  uid: jwtUser.uid,
  name: jwtUser.name,
  surname: jwtUser.family_name,
  email: jwtUser.email,
  taxCode: jwtUser.fiscal_number,
});
