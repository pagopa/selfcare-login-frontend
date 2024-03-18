import { storageUserOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { User } from '../../models/User';
import { redirectSuccessLogin } from '../loginSuccess/LoginSuccess';
import { handleSession } from '../../utils/utils';

type Props = {
  sessionToken: string;
};

const ValidateSession = ({ sessionToken }: Props) => {
  const user: User = storageUserOps.read();

  if (!user) {
    handleSession(sessionToken);
  }
  redirectSuccessLogin();

  return <div />;
};

export default ValidateSession;
