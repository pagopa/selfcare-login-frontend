import { IllusError } from '@pagopa/mui-italia';
import { EndingPage } from '@pagopa/selfcare-common-frontend/lib';
import { Trans, useTranslation } from 'react-i18next';
import Layout from '../../components/Layout';
import { redirectToLogin } from '../../utils/utils';

const LoginError = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <EndingPage
        minHeight={'100vh'}
        icon={<IllusError size={60} />}
        variantTitle="h4"
        variantDescription="body1"
        title={t('loginError.generic.title')}
        description={
          <Trans i18nKey="loginError.generic.description" components={{ 1: <br /> }}>
            {'Si è verificato un problema durante l’accesso. Riprova tra qualche <1/>minuto.'}
          </Trans>
        }
        variantFirstButton={'contained'}
        buttonLabel={t('loginError.retry')}
        onButtonClick={redirectToLogin}
      />
    </Layout>
  );
};

export default LoginError;
