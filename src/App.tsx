import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { uniqueId } from 'lodash';
import LoginError from './pages/loginError/LoginError';
import LoginSuccess from './pages/loginSuccess/LoginSuccess';
import Logout from './pages/logout/Logout';
import { OneIdentityAuthCallbackPage } from './pages/oneIdentityAuthCallback/OneIdentityAuthCallback';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import ValidateSession from './pages/ValidateSession/ValidateSession';
import {
  ROUTE_AUTH_CALLBACK,
  ROUTE_LOGIN,
  ROUTE_LOGIN_ERROR,
  ROUTE_LOGIN_SUCCESS,
  ROUTE_LOGOUT,
  ROUTE_PRIVACY_DISCLAIMER,
  ROUTE_TERMS_AND_CONDITION,
} from './utils/constants';
import { ENV } from './utils/env';
import {
  storageNonceOps,
  storageOnSuccessOps,
  storageRedirectURIOps,
  storageStateOps,
} from './utils/storage';

const onTermsAndCondition = () => <TermsAndConditionsPage />;

const onPrivacyDisclaimer = () => <PrivacyPolicyPage />;

const onLogout = () => <Logout />;

const onLoginError = () => <LoginError />;

/** if exists already a session */
const onAlreadyInSession = (sessionToken: string) => (
  <ValidateSession sessionToken={sessionToken} />
);

/** login request operations */
const onLoginRequest = () => {
  storageOnSuccessOps.delete();
  storageStateOps.delete();
  storageNonceOps.delete();
  storageRedirectURIOps.delete();
  handleLoginRequestOnSuccessRequest();
  return <div />;
};

const onOneIdentityAuthCallback = () => <OneIdentityAuthCallbackPage />;

const handleLoginRequestOnSuccessRequest = () => {
  const onSuccess: string | null = new URLSearchParams(window.location.search).get('onSuccess');
  const generateUniqueString = () => uniqueId().padEnd(15, '0').slice(0, 15);
  const state = generateUniqueString();
  const nonce = generateUniqueString();
  const redirect_uri = `${ENV.URL_FE.LOGIN}${ROUTE_AUTH_CALLBACK}`;
  trackEvent('LOGIN_INTENT', { target: onSuccess ?? 'dashboard' });
  if (onSuccess) {
    storageOnSuccessOps.write(onSuccess);
  }
  storageStateOps.write(state);
  storageNonceOps.write(nonce);
  storageRedirectURIOps.write(redirect_uri);

  window.location.assign(
    `${ENV.ONE_IDENTITY.BASE_URL}?response_type=CODE&scope=openid&client_id=${ENV.ONE_IDENTITY.CLIENT_ID}&state=${state}&nonce=${nonce}&redirect_uri=${redirect_uri}`
  );
};

const onLoginSuccess = () => <LoginSuccess />;

function App(): JSX.Element {
  const token = storageTokenOps.read();

  if (window.location.pathname === ROUTE_LOGOUT) {
    return onLogout();
  } else if (window.location.pathname === ROUTE_TERMS_AND_CONDITION) {
    return onTermsAndCondition();
  } else if (window.location.pathname === ROUTE_PRIVACY_DISCLAIMER) {
    return onPrivacyDisclaimer();
  } else if (token !== null && token !== undefined) {
    return onAlreadyInSession(token);
  } else {
    switch (window.location.pathname) {
      case ROUTE_LOGIN:
        return onLoginRequest();
      case ROUTE_AUTH_CALLBACK:
        return onOneIdentityAuthCallback();
      case ROUTE_LOGIN_SUCCESS:
        return onLoginSuccess();
      case ROUTE_LOGIN_ERROR:
        return onLoginError();
      case ROUTE_TERMS_AND_CONDITION:
        return onTermsAndCondition();
      case ROUTE_PRIVACY_DISCLAIMER:
        return onPrivacyDisclaimer();
      default:
        return <></>;
    }
  }
  return <></>;
}

export default App;
