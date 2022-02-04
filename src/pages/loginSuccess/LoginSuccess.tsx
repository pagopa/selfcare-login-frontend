import {
  storageDelete,
  storageRead,
  storageWrite,
} from '@pagopa/selfcare-common-frontend/utils/storage-utils';
import { User, userFromJwtToken } from '../../models/User';
import { ENV } from '../../utils/env';
import { STORAGE_KEY_ON_SUCCESS, STORAGE_KEY_TOKEN, STORAGE_KEY_USER } from '../../utils/constants';
import { redirectToLogin } from '../../utils/utils';

export const readUserFromToken = (token: string) => {
  const user: User = userFromJwtToken(token);
  if (user) {
    storageWrite(STORAGE_KEY_USER, user, 'object');
  }
};

const validOnSuccessPattern = new RegExp('^[\\w/-]+$');
export const redirectSuccessLogin = () => {
  const onSuccess: string | null = storageRead(STORAGE_KEY_ON_SUCCESS, 'string');
  const redirectTo =
    onSuccess && validOnSuccessPattern.test(onSuccess)
      ? window.location.origin + '/' + onSuccess.replace(/^\//, '')
      : ENV.URL_FE.DASHBOARD;
  storageDelete(STORAGE_KEY_ON_SUCCESS);
  window.location.assign(redirectTo);
};

/** success login operations */
const LoginSuccess = () => {
  const { hash = '' } = window.location;
  const urlToken = hash.replace('#token=', '');

  if (urlToken !== '' && urlToken !== undefined) {
    storageWrite(STORAGE_KEY_TOKEN, urlToken, 'string');
    readUserFromToken(urlToken);
    redirectSuccessLogin();
  } else {
    redirectToLogin();
  }
  return <div />;
};

export default LoginSuccess;
