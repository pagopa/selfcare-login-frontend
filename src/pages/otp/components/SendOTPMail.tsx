import { Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { Trans } from 'react-i18next';

export const SendOTPMail = () => {
  console.log('TODO ADD SEND MAIL API');

  return (
    <Typography variant="body1">
      <Trans i18nKey="otp.resend" components={{ 1: <ButtonNaked color="primary" /> }} />{' '}
    </Typography>
  );
};
