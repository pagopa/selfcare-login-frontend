import { LoadingOverlayComponent } from '@pagopa/selfcare-common-frontend/lib';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { NonEmptyString } from '@pagopa/ts-commons/lib/strings';
import { selfcareAuthService } from '../../services/selfcareAuth';
import { ROUTE_LOGIN_SUCCESS, ROUTE_OTP } from '../../utils/constants';
import {
  storageMaskedEmailOps,
  storageOTPSessionUidOps,
  storageRedirectURIOps,
  storageStateOps,
} from '../../utils/storage';
import { redirectToErrorPage } from '../../utils/utils';

const OneIdentityAuthCallbackPage = () => {
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

        if (res.requiresOtpFlow === true && res.otpSessionUid && res.maskedEmail) {
          storageOTPSessionUidOps.write(res.otpSessionUid);
          storageMaskedEmailOps.write(res.maskedEmail);
          window.location.assign(ROUTE_OTP);
        }
      })
      .catch(() => {
        redirectToErrorPage();
      });
  }

  return <LoadingOverlayComponent open={true} />;
};

export default OneIdentityAuthCallbackPage;
