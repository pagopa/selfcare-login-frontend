import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import {
  storageTokenOps,
  storageUserOps,
} from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { User, userFromJwtToken } from '../../models/User';
import { ENV } from '../../utils/env';
import { redirectToLogin } from '../../utils/utils';
import { storageOnSuccessOps, storageSpidSelectedOps } from '../../utils/storage';

export const readUserFromToken = (token: string) => {
  const user: User = userFromJwtToken(token);
  if (user) {
    storageUserOps.write(user);
  }
};

const validOnSuccessPattern = new RegExp('^[\\w?=&/-]+$');
export const redirectSuccessLogin = () => {
  const onSuccess: string | null = storageOnSuccessOps.read();
  const redirectTo =
    onSuccess && validOnSuccessPattern.test(onSuccess)
      ? window.location.origin + '/' + onSuccess.replace(/^\//, '')
      : ENV.URL_FE.DASHBOARD;
  storageOnSuccessOps.delete();
  window.location.assign(redirectTo);
};

/** success login operations */
const LoginSuccess = () => {
  const { hash = '' } = window.location;
  const urlToken = hash.replace('#token=', '');

  if (urlToken !== '' && urlToken !== undefined) {
    const spidId = storageSpidSelectedOps.read();
    trackEvent('LOGIN_SUCCESS', { SPID_IDP_ID: spidId });
    storageTokenOps.write(urlToken);
    readUserFromToken(urlToken);
    redirectSuccessLogin();
  } else {
    redirectToLogin();
  }
  return <div />;
};

export default LoginSuccess;
