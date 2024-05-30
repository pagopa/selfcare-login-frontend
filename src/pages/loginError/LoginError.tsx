import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Trans, useTranslation } from 'react-i18next';
import { EndingPage } from '@pagopa/selfcare-common-frontend';
import { IllusError } from '@pagopa/mui-italia';
import { storageSpidSelectedOps } from '../../utils/storage';
import { ENV } from '../../utils/env';
import { redirectToLogin } from '../../utils/utils';

const handleError = (errorCode: string | null) => {
  const spidId = storageSpidSelectedOps.read();
  trackEvent('LOGIN_FAILURE', { reason: errorCode, SPID_IDP_ID: spidId });
  console.error(`login unsuccessfull! query params obtained from idp: ${errorCode}`);
};

const LoginError = () => {
  const { t } = useTranslation();

  const errorCode = new URLSearchParams(window.location.search).get('errorCode');

  setTimeout(() => redirectToLogin(), 3000);

  const title =
    errorCode === '23'
      ? t('loginError.errors.suspendedOrRevoked.title')
      : t('loginError.errors.generic.title');

  const description =
    errorCode === '23' ? (
      <>
        <Trans
          i18nKey="loginError.errors.suspendedOrRevoked.description"
          components={{ 1: <br /> }}
        >
          {
            'La tua identità SPID risulta sospesa o revocata. Per maggiori <1 />informazioni, contatta il tuo fornitore di identità SPID.'
          }
        </Trans>
      </>
    ) : (
      <Trans i18nKey="loginError.errors.generic.description" components={{ 1: <br /> }}>
        {
          'A causa di un errore del sistema non è possibile completare la procedura.<1 /> Ti chiediamo di riprovare più tardi.'
        }
      </Trans>
    );
  handleError(errorCode);

  return (
    <EndingPage
      icon={errorCode === '23' ? <IllusError size={60} /> : undefined}
      minHeight={'100vh'}
      variantTitle="h4"
      title={title}
      variantDescription="body1"
      description={description}
      buttonLabel={errorCode === '23' ? t('loginError.errors.suspendedOrRevoked.close') : undefined}
      onButtonClick={
        errorCode === '23' ? () => window.location.assign(ENV.URL_FE.LANDING) : undefined
      }
    />
  );
};

export default LoginError;
