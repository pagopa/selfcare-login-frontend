import { LoadingOverlay } from '../../components/LoadingOverlay';
import { ROUTE_LOGIN_ERROR } from '../../utils/constants';
import { storageStateOps } from '../../utils/storage';

export const OneIdentityAuthCallbackPage = () => {
  console.log('onOneIdentityAuthCallback');
  const urlParams = new URLSearchParams(window.location.search);
  const receivedState = urlParams.get('state');
  const storedState = storageStateOps.read();
  if (!receivedState || receivedState !== storedState) {
    console.error('Invalid state parameter');
    // TODO habndle specific error cases based on query param
    window.location.assign(ROUTE_LOGIN_ERROR);
    return <></>;
  }

  return <LoadingOverlay loadingText="" />;
};
