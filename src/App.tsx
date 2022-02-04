import {
  storageWrite,
  storageRead,
  storageDelete,
} from '@pagopa/selfcare-common-frontend/utils/storage-utils';
import Login from './pages/login/Login';
import {
  ROUTE_LOGIN,
  ROUTE_LOGIN_ERROR,
  ROUTE_LOGIN_SUCCESS,
  ROUTE_LOGOUT,
  STORAGE_KEY_ON_SUCCESS,
  STORAGE_KEY_TOKEN,
} from './utils/constants';
import LoginSuccess from './pages/loginSuccess/LoginSuccess';
import { redirectToLogin } from './utils/utils';
import ValidateSession from './pages/ValidateSession/ValidateSession';
import Logout from './pages/logout/Logout';
import LoginError from './pages/loginError/LoginError';

const onLogout = () => <Logout />;

const onLoginError = () => <LoginError />;

/** if exists already a session */
const onAlreadyInSession = (sessionToken: string) => (
  <ValidateSession sessionToken={sessionToken} />
);

/** login request operations */
const onLoginRequest = () => {
  storageDelete(STORAGE_KEY_ON_SUCCESS);
  handleLoginRequestOnSuccessRequest();
  return <Login />;
};

const handleLoginRequestOnSuccessRequest = () => {
  const onSuccess: string | null = new URLSearchParams(window.location.search).get('onSuccess');
  if (onSuccess) {
    storageWrite(STORAGE_KEY_ON_SUCCESS, onSuccess, 'string');
  }
};

const onLoginSuccess = () => <LoginSuccess />;

function App() {
  const token = storageRead(STORAGE_KEY_TOKEN, 'string');

  if (window.location.pathname === ROUTE_LOGOUT) {
    return onLogout();
  } else if (token !== null && token !== undefined) {
    return onAlreadyInSession(token);
  } else {
    switch (window.location.pathname) {
      case ROUTE_LOGIN:
        return onLoginRequest();
      case ROUTE_LOGIN_SUCCESS:
        return onLoginSuccess();
      case ROUTE_LOGIN_ERROR:
        return onLoginError();
      default:
        redirectToLogin();
    }
  }

  return <div />;
}

export default App;
