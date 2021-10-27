import Login from './pages/login/Login';
import { storageWrite, storageRead, storageDelete } from './lib/storage-utils';
import {
  ROUTE_LOGIN,
  ROUTE_LOGIN_SUCCESS,
  ROUTE_LOGOUT,
  STORAGE_KEY_ON_SUCCESS,
  STORAGE_KEY_TOKEN,
} from './utils/constants';
import { LoginSuccess } from './pages/loginSuccess/LoginSuccess';
import { redirectToLogin } from './utils/utils';
import { ValidSession } from './pages/ValidSession/ValidSession';
import { Logout } from './pages/logout/Logout';

const onLogout = () => <Logout />;

/** if exists already a session */
const onAlreadyInSession = (sessionToken: string) => <ValidSession sessionToken={sessionToken} />;

/** login request operations */
const onLoginRequest = () => {
  storageDelete(STORAGE_KEY_ON_SUCCESS);
  handleLoginRequestOnSuccessRequest();
  return <Login />;
};

const onLoginSuccess = () => <LoginSuccess />;

const handleLoginRequestOnSuccessRequest = () => {
  const onSuccess: string | null = new URLSearchParams(window.location.search).get('onSuccess');
  if (onSuccess) {
    storageWrite(STORAGE_KEY_ON_SUCCESS, onSuccess, 'string');
  }
};

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
      default:
        redirectToLogin();
    }
  }

  return <div />;
}

export default App;
