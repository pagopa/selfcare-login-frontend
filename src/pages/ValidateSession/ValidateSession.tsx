import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { User } from '../../models/User';
import { readUserFromToken, redirectSuccessLogin } from '../loginSuccess/LoginSuccess';

type Props = {
  sessionToken: string;
};

const ValidateSession = ({ sessionToken }: Props) => {
  const user: User = storageUserOps.read();
  const language = localStorage.getItem('i18nextLng');

  if (!user) {
    readUserFromToken(sessionToken);
  }
  redirectSuccessLogin(language);

  return <div />;
};

export default ValidateSession;
