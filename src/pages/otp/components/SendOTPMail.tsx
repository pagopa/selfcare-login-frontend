import { Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useErrorDispatcher } from '@pagopa/selfcare-common-frontend/lib';
import { NonEmptyString } from '@pagopa/ts-commons/lib/strings';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { OtpErrorTypeEnum } from '../../../models/authentication';
import { otpResendService } from '../../../services/selfcareAuth';
import { storageOTPSessionUidOps } from '../../../utils/storage';

type Props = {
  errorType: string;
  clearErrorType: () => void;
};

export const SendOTPMail = ({ errorType = 'test', clearErrorType }: Props) => {
  const isInitiallyExpired = errorType === OtpErrorTypeEnum.ExpiredOtp;
  const [timer, setTimer] = useState(isInitiallyExpired ? 0 : 60);
  const addError = useErrorDispatcher();
  const otpSessionUid = storageOTPSessionUidOps.read();

  // Countdown effect
  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [timer]);

  // Reset timer when errorType changes
  useEffect(() => {
    if (errorType === OtpErrorTypeEnum.ExpiredOtp) {
      setTimer(0);
    }
  }, [errorType]);

  const resendOtpMail = async () => {
    clearErrorType();
    setTimer(60);
    try {
      const res = await otpResendService({
        otpUuid: otpSessionUid as NonEmptyString,
      });

      if (res) {
        storageOTPSessionUidOps.write(res.otpSessionUid as NonEmptyString);
      }
    } catch (error) {
      addError({
        id: 'TOAST_NOTIFY_ERROR',
        error: error as Error,
        techDescription: `not possible to resend OTP mail`,
        toNotify: true,
        component: 'Toast',
        blocking: false,
      });
    }
  };

  const isExpired = errorType === OtpErrorTypeEnum.ExpiredOtp;
  const isButtonDisabled = timer > 0;
  const timerText = timer > 0 ? `tra ${timer}s.` : '';

  return (
    <Typography variant="body1" mt={4}>
      {isExpired ? (
        <Trans
          i18nKey="otp.resendExpired"
          components={{
            0: <span />,
            1: (
              <ButtonNaked
                sx={{ color: 'primary.main', fontSize: 'large', fontWeight: 'fontWeightRegular' }}
                disabled={isButtonDisabled}
                onClick={resendOtpMail}
              />
            ),
          }}
          values={{ timer: timerText }}
        />
      ) : (
        <Trans
          i18nKey="otp.resend"
          components={{
            1: (
              <ButtonNaked
                sx={{ color: 'primary.main', fontSize: 'large', fontWeight: 'fontWeightRegular' }}
                disabled={isButtonDisabled}
                onClick={resendOtpMail}
              />
            ),
          }}
          values={{ timer: timerText }}
        />
      )}
    </Typography>
  );
};
