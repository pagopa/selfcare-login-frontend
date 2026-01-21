import { LoadingOverlayComponent } from '@pagopa/selfcare-common-frontend/lib';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { v4 as uuidv4 } from 'uuid';
import LoginError from './pages/loginError/LoginError';
import LoginSuccess from './pages/loginSuccess/LoginSuccess';
import Logout from './pages/logout/Logout';
import OneIdentityAuthCallbackPage from './pages/oneIdentityAuthCallback/OneIdentityAuthCallback';
import OTPPage from './pages/otp/OTPPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import ValidateSession from './pages/ValidateSession/ValidateSession';
import {
  ROUTE_AUTH_CALLBACK,
  ROUTE_LOGIN,
  ROUTE_LOGIN_ERROR,
  ROUTE_LOGIN_SUCCESS,
  ROUTE_LOGOUT,
  ROUTE_OTP,
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

const onLoginError = (queryParams: URLSearchParams) => <LoginError queryParams={queryParams} />;

/** if exists already a session */
const onAlreadyInSession = (sessionToken: string) => (
  <ValidateSession sessionToken={sessionToken} />
);

/** login request operations */
const onLoginRequest = () => {
  storageOnSuccessOps.delete();
  storageStateOps.delete();
  storageNonceOps.delete();
  storageTokenOps.delete();
  storageRedirectURIOps.delete();
  handleLoginRequestOnSuccessRequest();
  return <LoadingOverlayComponent open={true} />;
};

const onOneIdentityAuthCallback = () => <OneIdentityAuthCallbackPage />;

const handleLoginRequestOnSuccessRequest = () => {
  const onSuccess: string | null = new URLSearchParams(window.location.search).get('onSuccess');
  const generateRandomUniqueString = () => uuidv4().replace(/-/g, '').slice(0, 15);
  const state = generateRandomUniqueString();
  const nonce = generateRandomUniqueString();
  const redirect_uri = ENV.URL_FE.LOGIN + '/login/callback';
  const encodedRedirectUri = encodeURIComponent(redirect_uri);

  if (onSuccess) {
    storageOnSuccessOps.write(onSuccess);
  }
  storageStateOps.write(state);
  storageNonceOps.write(nonce);
  storageRedirectURIOps.write(redirect_uri);
  trackEvent('LOGIN_INTENT', {
    origin: location.origin,
  });

  window.location.assign(
    `${ENV.ONE_IDENTITY.BASE_URL}/login?response_type=CODE&scope=openid&client_id=${ENV.ONE_IDENTITY.CLIENT_ID}&state=${state}&nonce=${nonce}&redirect_uri=${encodedRedirectUri}`
  );
};

const onLoginSuccess = () => <LoginSuccess />;

const onOTPRequest = () => <OTPPage />;

const resolveRoute = (
  path: string,
  token: string | null,
  queryParams: URLSearchParams
): JSX.Element => {
  const isOTPEnabled = ENV.ENABLE_OTP === true;

  if (path === ROUTE_LOGOUT) {
    return onLogout();
  }
  if (path === ROUTE_TERMS_AND_CONDITION) {
    return onTermsAndCondition();
  }
  if (path === ROUTE_PRIVACY_DISCLAIMER) {
    return onPrivacyDisclaimer();
  }

  if (token) {
    return onAlreadyInSession(token);
  }

  switch (path) {
    case ROUTE_LOGIN:
      return onLoginRequest();
    case ROUTE_AUTH_CALLBACK:
      return onOneIdentityAuthCallback();
    case ROUTE_LOGIN_SUCCESS:
      return onLoginSuccess();
    case ROUTE_LOGIN_ERROR:
      return onLoginError(queryParams);
    case ROUTE_OTP:
      return isOTPEnabled ? onOTPRequest() : onLoginRequest();
    default:
      return onLoginRequest();
  }
};

function App(): JSX.Element {
  const token = storageTokenOps.read();
  const queryParams = new URLSearchParams(window.location.search);
  return resolveRoute(window.location.pathname, token, queryParams);
}

export default App;
