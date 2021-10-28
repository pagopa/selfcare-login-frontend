import { storageDelete } from '../../lib/storage-utils';
import { STORAGE_KEY_ON_SUCCESS, STORAGE_KEY_TOKEN, STORAGE_KEY_USER } from '../../utils/constants';
import { redirectToLogin } from '../../utils/utils';

const Logout = () => {
  storageDelete(STORAGE_KEY_ON_SUCCESS);
  storageDelete(STORAGE_KEY_TOKEN);
  storageDelete(STORAGE_KEY_USER);
  redirectToLogin();

  return <div />;
};

export default Logout;
