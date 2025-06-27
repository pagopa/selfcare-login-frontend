import { Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';

type Props = {
  errorType: string;
};

export const SendOTPMail = ({ errorType }: Props) => {
  console.log('TODO ADD SEND MAIL API');
  const [timer, setTimer] = useState(60);
  const timeOutCallback = useCallback(() => setTimer((currTimer) => currTimer - 1), []);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(timeOutCallback, 1000);
    }
  }, [timer, timeOutCallback, errorType]);

  const resetTimer = () => {
    if (!timer) {
      setTimer(60);
    }
  };

  return (
    <Typography variant="body1" mt={4}>
      {errorType === 'expiredOtp' && (
        <ButtonNaked color="primary" fontSize="fontSize">
          <Trans i18nKey={'otp.error.expired.buttonLabel'} />
        </ButtonNaked>
      )}
      {errorType !== 'expiredOtp' && (
        <Trans
          i18nKey={'otp.resend'}
          components={{
            1: (
              <ButtonNaked
                color="primary"
                disabled={timer > 0}
                onClick={resetTimer}
                fontSize="fontSize"
              />
            ),
          }}
          values={{ timer: timer > 0 ? `tra ${timer}s.` : '' }}
        />
      )}
    </Typography>
  );
};
