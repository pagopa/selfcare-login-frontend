import { LoadingOverlayComponent } from '@pagopa/selfcare-common-frontend/lib';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import {
  storageTokenOps,
  storageUserOps,
} from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { userFromJwtToken } from '../../models/User';
import { ENV } from '../../utils/env';
import {
  storageNonceOps,
  storageOnSuccessOps,
  storageRedirectURIOps,
  storageStateOps,
} from '../../utils/storage';
import { redirectToLogin } from '../../utils/utils';

export const readUserFromToken = (token: string) => {
  const user: User = userFromJwtToken(token);
  if (user) {
    storageUserOps.write(user);
  }
};

const validOnSuccessPattern = /^\/?([\w\-./?=&]|%[0-9A-Fa-f]{2})+$/;
export const redirectSuccessLogin = () => {
  const onSuccess: string | null = storageOnSuccessOps.read();
  const redirectTo =
    onSuccess && validOnSuccessPattern.test(onSuccess)
      ? window.location.origin + '/' + onSuccess.replace(/^\//, '')
      : ENV.URL_FE.DASHBOARD;

  storageOnSuccessOps.delete();
  storageStateOps.delete();
  storageNonceOps.delete();
  storageRedirectURIOps.delete();

  trackEvent('LOGIN_SUCCESS', {
    origin: location.origin,
  });
  window.location.assign(redirectTo);
};

/** success login operations */
const LoginSuccess = () => {
  const hash = location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const tokenFragment = params.get('token');

  const selfcareToken = tokenFragment || storageTokenOps.read();

  if (tokenFragment) {
    storageTokenOps.write(tokenFragment);
  }

  if (selfcareToken !== '' && selfcareToken !== undefined) {
    readUserFromToken(selfcareToken);
    redirectSuccessLogin();
  } else {
    redirectToLogin();
  }
  return <LoadingOverlayComponent open={true} />;
};

export default LoginSuccess;
