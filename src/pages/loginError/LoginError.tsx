import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { EndingPage } from '@pagopa/selfcare-common-frontend/lib';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/Layout';
import { redirectToLogin } from '../../utils/utils';

import { ReactComponent as UmbrellaIcon } from '../../assets/Umbrella.svg';

const errorConfig: Record<
  string,
  { titleKey: string; descriptionKey: string; buttonLabel: string }
> = {
  generic: {
    titleKey: 'loginError.generic.title',
    descriptionKey: 'loginError.generic.description',
    buttonLabel: 'loginError.retry',
  },
  otpGeneric: {
    titleKey: 'otp.error.generic.title',
    descriptionKey: 'otp.error.generic.description',
    buttonLabel: 'otp.error.generic.buttonLabel',
  },
  otpToManyAttempts: {
    titleKey: 'otp.error.toManyAttempts.title',
    descriptionKey: 'otp.error.toManyAttempts.description',
    buttonLabel: 'otp.error.toManyAttempts.buttonLabel',
  },
};

type LoginErrorProps = {
  queryParams?: URLSearchParams;
};

const LoginError: React.FC<LoginErrorProps> = ({ queryParams }: LoginErrorProps): JSX.Element => {
  const { t } = useTranslation();
  const errorType = queryParams?.get('errorType') ?? 'generic';
  const config = errorConfig[errorType] ?? errorConfig.generic;

  return (
    <Layout>
      <Grid sx={{ backgroundColor: '#F5F5F5' }} minHeight={'80vh'} alignContent="center">
        <EndingPage
          icon={errorType === 'otpToManyAttempts' ? <UmbrellaIcon /> : <IllusError size={60} />}
          variantTitle="h4"
          variantDescription="body1"
          title={t(config.titleKey)}
          description={t(config.descriptionKey)}
          variantFirstButton={'contained'}
          buttonLabel={t(config.buttonLabel)}
          onButtonClick={redirectToLogin}
        />
      </Grid>
    </Layout>
  );
};

export default LoginError;
