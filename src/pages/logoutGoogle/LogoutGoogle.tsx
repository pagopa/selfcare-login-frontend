import { Grid, Typography } from '@mui/material';
import { IllusCompleted } from '@pagopa/mui-italia';
import { EndingPage } from '@pagopa/selfcare-common-frontend/lib';
import {
  storageTokenOps,
  storageUserOps,
} from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/Layout';
import { storageOnSuccessOps } from '../../utils/storage';
import { redirectToGoogleLogin } from '../../utils/utils';

export const LogoutGoogle = () => {
  const { t } = useTranslation();

  storageOnSuccessOps.delete();
  storageTokenOps.delete();
  storageUserOps.delete();

  return (
    <Layout>
      <Grid sx={{ backgroundColor: '#F5F5F5' }} minHeight={'80vh'} alignContent="center">
        <EndingPage
          icon={<IllusCompleted size={60} />}
          variantTitle="h4"
          variantDescription="body1"
          title={t('logoutGoogle.title')}
          description={t('logoutGoogle.subTitle')}
          variantFirstButton={'contained'}
          buttonLabel={t('logoutGoogle.loginButton')}
          onButtonClick={redirectToGoogleLogin}
          isParagraphPresent={true}
          paragraph={
            <Typography variant="body2" color="text.secondary">
              {t('logoutGoogle.closeWindow')}
            </Typography>
          }
        />
      </Grid>
    </Layout>
  );
};
