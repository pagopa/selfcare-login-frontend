import { Box, Grid, Typography } from '@mui/material';
import { IllusEmailValidation } from '@pagopa/mui-italia';
import { Trans, useTranslation } from 'react-i18next';
import Layout from '../../components/Layout';
import { ENV } from '../../utils/env';
import OtpInput from './components/OTPInputFields';
import { SendOTPMail } from './components/SendOTPMail';

const OTPPage = () => {
  const { t } = useTranslation();
  console.log('TODO Integrate api');
  return (
    <Layout>
      <Grid sx={{ backgroundColor: '#F5F5F5' }} minHeight={'80vh'} alignContent="center">
        <Box display="flex" flexGrow={1}>
          <Grid
            container
            direction="column"
            key="0"
            style={{ textAlign: 'center' }}
            margin={'auto'}
          >
            <Grid container item justifyContent="center" mb={3}>
              <Grid item xs={6}>
                {<IllusEmailValidation size={72} />}
              </Grid>
            </Grid>
            <Grid container item justifyContent="center">
              <Grid item xs={6}>
                <Typography variant={'h4'}>{t('otp.title')}</Typography>
              </Grid>
            </Grid>
            <Grid container item justifyContent="center" mb={4} mt={1}>
              <Grid item xs={6}>
                <Typography variant={'body1'}>
                  {
                    <Trans
                      i18nKey="otp.description"
                      components={{ 1: <strong />, 2: <br /> }}
                      values={{
                        email: 'm****a@p**.it',
                      }}
                    />
                  }
                </Typography>
              </Grid>
            </Grid>

            <Grid container item justifyContent="center">
              <Grid item xs={6}>
                <>
                  <OtpInput />
                  {ENV.ENABLE_MAIL_OTP && <SendOTPMail />}
                </>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Layout>
  );
};

export default OTPPage;
