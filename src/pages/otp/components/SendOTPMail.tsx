import { Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useErrorDispatcher } from '@pagopa/selfcare-common-frontend/lib';
import { NonEmptyString } from '@pagopa/ts-commons/lib/strings';
import { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { otpResendService } from '../../../services/selfcareAuth';
import { storageOTPSessionUidOps } from '../../../utils/storage';

type Props = {
  errorType: string;
};

export const SendOTPMail = ({ errorType }: Props) => {
  const [timer, setTimer] = useState(0);
  const timeOutCallback = useCallback(() => setTimer((currTimer) => currTimer - 1), []);
  const addError = useErrorDispatcher();

  const otpSessionUid = storageOTPSessionUidOps.read();

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

  const resendOtpMail = async () => {
    resetTimer();
    otpResendService({
      otpUuid: otpSessionUid as NonEmptyString,
    })
      .then((res) => {
        if (res) {
          storageOTPSessionUidOps.write(res.otpSessionUid as NonEmptyString);
        }

        setTimer(60);
      })
      .catch((error) => {
        addError({
          id: `resend mail error`,
          blocking: false,
          error,
          techDescription: error.message,
          toNotify: true,
        });
      });
  };

  return (
    <Typography variant="body1" mt={4}>
      {errorType === 'expiredOtp' && (
        <Trans
          i18nKey={'otp.resendExpired'}
          components={{
            0: <span />,
            1: (
              <ButtonNaked
                sx={{ color: 'primary.main', fontSize: 'large', fontWeight: 'fontWeightRegular' }}
                disabled={timer > 0}
                onClick={resendOtpMail}
              />
            ),
          }}
          values={{ timer: timer > 0 ? `tra ${timer}s.` : '' }}
        ></Trans>
      )}
      {errorType !== 'expiredOtp' && (
        <Trans
          i18nKey={'otp.resend'}
          components={{
            1: (
              <ButtonNaked
                sx={{ color: 'primary.main', fontSize: 'large', fontWeight: 'fontWeightRegular' }}
                disabled={timer > 0}
                onClick={resendOtpMail}
              />
            ),
          }}
          values={{ timer: timer > 0 ? `tra ${timer}s.` : '' }}
        />
      )}
    </Typography>
  );
};
