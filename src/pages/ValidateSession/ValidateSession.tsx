import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { readUserFromToken, redirectSuccessLogin } from '../loginSuccess/LoginSuccess';

type Props = {
  sessionToken: string;
};

const ValidateSession = ({ sessionToken }: Props) => {
  const user: User = storageUserOps.read();

  if (!user) {
    readUserFromToken(sessionToken);
  }
  redirectSuccessLogin();

  return <div />;
};

export default ValidateSession;
