import { parseJwt, storageUserOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { User } from '../../models/User';
import { redirectSuccessLogin } from '../loginSuccess/LoginSuccess';

type Props = {
  sessionToken: string;
};

const ValidateSession = ({ sessionToken }: Props) => {
  const user: User = storageUserOps.read();

  if (!user) {
    parseJwt(sessionToken);
  }
  redirectSuccessLogin();

  return <div />;
};

export default ValidateSession;
