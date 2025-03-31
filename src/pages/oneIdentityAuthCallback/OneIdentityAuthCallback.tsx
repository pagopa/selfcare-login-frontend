import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { NonEmptyString } from '@pagopa/ts-commons/lib/strings';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { selfcareAuthService } from '../../services/selfcareAuth';
import { ROUTE_LOGIN_SUCCESS } from '../../utils/constants';
import { storageOnSuccessOps, storageStateOps } from '../../utils/storage';
import { redirectToErrorPage } from '../../utils/utils';

export const OneIdentityAuthCallbackPage = () => {
  console.log('onOneIdentityAuthCallback');
  const urlParams = new URLSearchParams(window.location.search);
  const receivedState = urlParams.get('state');
  const oneIdentityCode = urlParams.get('code');
  const storedState = storageStateOps.read();
  const onSuccessUri = storageOnSuccessOps.read();

  if (!oneIdentityCode || !receivedState || receivedState !== storedState) {
    redirectToErrorPage();
    return <></>;
  }

  if (oneIdentityCode && onSuccessUri) {
    selfcareAuthService({
      code: oneIdentityCode as NonEmptyString,
      redirectUri: onSuccessUri as NonEmptyString,
    })
      .then((res) => {
        console.log('selfcareAuthService', res);
        storageTokenOps.write(res.code);
        window.location.assign(ROUTE_LOGIN_SUCCESS);
      })
      .catch(() => redirectToErrorPage());
  }

  return <LoadingOverlay loadingText="" />;
};
