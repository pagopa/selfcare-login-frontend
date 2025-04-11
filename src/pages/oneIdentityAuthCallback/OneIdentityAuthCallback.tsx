import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { NonEmptyString } from '@pagopa/ts-commons/lib/strings';
import { LoadingOverlayComponent } from '@pagopa/selfcare-common-frontend/lib';
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

  return <LoadingOverlayComponent open={true} />;
};
