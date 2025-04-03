import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { NonEmptyString } from '@pagopa/ts-commons/lib/strings';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { selfcareAuthService } from '../../services/selfcareAuth';
import { ROUTE_LOGIN_SUCCESS } from '../../utils/constants';
import { storageRedirectURIOps, storageStateOps } from '../../utils/storage';
import { redirectToErrorPage } from '../../utils/utils';

export const OneIdentityAuthCallbackPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const receivedState = urlParams.get('state');
  const oneIdentityCode = urlParams.get('code');
  const error = urlParams.get('error');
  const storedState = storageStateOps.read();
  const redirectURI = storageRedirectURIOps.read();

  if (error || !oneIdentityCode || !receivedState || receivedState !== storedState) {
    // TODO pass error code to error page if its required to show a different message based on the error
    redirectToErrorPage();
    return <></>;
  }

  if (oneIdentityCode && redirectURI) {
    selfcareAuthService({
      code: oneIdentityCode as NonEmptyString,
      redirectUri: redirectURI as NonEmptyString,
    })
      .then((res) => {
        if (res.sessionToken) {
          storageTokenOps.write(res.sessionToken);
          window.location.assign(ROUTE_LOGIN_SUCCESS);
        }
      })
      .catch(() => {
        redirectToErrorPage();
      });
  }

  return <LoadingOverlay loadingText="" />;
};
