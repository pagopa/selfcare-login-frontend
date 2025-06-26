import { Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { Trans } from 'react-i18next';

type Props = {
  errorType: string;
};

export const SendOTPMail = ({ errorType }: Props) => {
  console.log('TODO ADD SEND MAIL API');

  return (
    <Typography variant="body1" mt={4}>
      {errorType === 'otpToManyAttempts' && (
        <Trans
          i18nKey={'otp.resend'}
          components={{ 1: <ButtonNaked color="primary" fontSize="fontSize" /> }}
        />
      )}
      {errorType === 'expiredOtp' && (
        <ButtonNaked color="primary" fontSize="fontSize">
          <Trans i18nKey={'otp.error.expired.buttonLabel'} />
        </ButtonNaked>
      )}
    </Typography>
  );
};
