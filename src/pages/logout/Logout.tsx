import {
  storageTokenOps,
  storageUserOps,
} from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { storageOnSuccessOps } from '../../utils/storage';
import { redirectToLogin } from '../../utils/utils';

const Logout = () => {
  const onSuccess = new URLSearchParams(globalThis.location.search).get('onSuccess');

  storageOnSuccessOps.delete();
  storageTokenOps.delete();
  storageUserOps.delete();
  // forwarded through the querystring instead of the storage, which has just been wiped
  redirectToLogin(onSuccess);

  return <div />;
};

export default Logout;
