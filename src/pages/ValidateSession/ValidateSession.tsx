import { storageRead } from '@pagopa/selfcare-common-frontend/utils/storage-utils';
import { User } from '../../models/User';
import { STORAGE_KEY_USER } from '../../utils/constants';
import { readUserFromToken, redirectSuccessLogin } from '../loginSuccess/LoginSuccess';

type Props = {
  sessionToken: string;
};

const ValidateSession = ({ sessionToken }: Props) => {
  const user: User = storageRead(STORAGE_KEY_USER, 'object');
  if (!user) {
    readUserFromToken(sessionToken);
  }
  redirectSuccessLogin();

  return <div />;
};

export default ValidateSession;
