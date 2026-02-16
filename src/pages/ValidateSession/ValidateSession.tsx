import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import {
  storageTokenOps,
  storageUserOps,
} from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { ROUTE_LOGIN } from '../../utils/constants';
import { redirectToGoogleLogout, redirectToLogout } from '../../utils/utils';
import { readUserFromToken, redirectSuccessLogin } from '../loginSuccess/LoginSuccess';

type Props = {
  sessionToken: string;
  path: string;
};

const ValidateSession = ({ sessionToken, path }: Props) => {
  const user: User = storageUserOps.read();
  const hash = location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const tokenFragment = params.get('token');

  if (!user) {
    readUserFromToken(sessionToken);
  }

  console.log('ValidateSession - sessionToken:', path, tokenFragment);
  if (user && tokenFragment && user.iss !== 'PAGOPA') {
    storageUserOps.delete();
    storageTokenOps.delete();
    redirectToGoogleLogout();
    return;
  }

  if (user && path === ROUTE_LOGIN && user.iss === 'PAGOPA') {
    storageTokenOps.delete();
    storageUserOps.delete();
    redirectToLogout();
    return;
  }

  redirectSuccessLogin();

  return <div />;
};

export default ValidateSession;
