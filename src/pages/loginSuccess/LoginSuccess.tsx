import {
  storageTokenOps,
  storageUserOps,
} from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { LoadingOverlayComponent } from '@pagopa/selfcare-common-frontend/lib';
import { User, userFromJwtToken } from '../../models/User';
import { ENV } from '../../utils/env';
import { storageOnSuccessOps } from '../../utils/storage';
import { redirectToLogin } from '../../utils/utils';

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
  const selfcareToken = storageTokenOps.read();

  if (selfcareToken !== '' && selfcareToken !== undefined) {
    readUserFromToken(selfcareToken);
    redirectSuccessLogin();
  } else {
    redirectToLogin();
  }
  return <LoadingOverlayComponent open={true} />;
};

export default LoginSuccess;
