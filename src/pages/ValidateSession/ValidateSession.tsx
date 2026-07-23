import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import {
  storageTokenOps,
  storageUserOps,
} from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { storageOnSuccessOps } from '../../utils/storage';
import { redirectToGoogleLogout, redirectToLogout } from '../../utils/utils';
import { readUserFromToken, redirectSuccessLogin } from '../loginSuccess/LoginSuccess';

type Props = {
  sessionToken: string;
};

const ValidateSession = ({ sessionToken }: Props) => {
  const user: User = storageUserOps.read();
  const hash = location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const tokenFragment = params.get('token');

  if (!user) {
    readUserFromToken(sessionToken);
  }

  // both branches below force a new login: carry the requested destination over, otherwise the
  // storage cleanup performed while logging out drops it and the user lands on the dashboard
  const onSuccess = storageOnSuccessOps.read();

  if (user && tokenFragment && user.iss !== 'PAGOPA') {
    storageUserOps.delete();
    storageTokenOps.delete();
    redirectToGoogleLogout(onSuccess);
    return;
  }

  if (!tokenFragment && user?.iss === 'PAGOPA') {
    storageTokenOps.delete();
    storageUserOps.delete();
    redirectToLogout(onSuccess);
    return;
  }

  redirectSuccessLogin();

  return <div />;
};

export default ValidateSession;
