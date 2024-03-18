import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { parseJwt, storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { ENV } from '../../utils/env';
import { redirectToLogin } from '../../utils/utils';
import { storageOnSuccessOps, storageSpidSelectedOps } from '../../utils/storage';

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
    parseJwt(urlToken);
    storageTokenOps.write(urlToken);
    const spidId = storageSpidSelectedOps.read();
    trackEvent('LOGIN_SUCCESS', { SPID_IDP_ID: spidId });
    redirectSuccessLogin();
  } else {
    redirectToLogin();
  }
  return <div />;
};

export default LoginSuccess;
