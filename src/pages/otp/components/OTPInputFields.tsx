import { Box, TextField } from '@mui/material';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { NonEmptyString } from '@pagopa/ts-commons/lib/strings';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { otpVerifyService } from '../../../services/selfcareAuth';
import { ROUTE_LOGIN_ERROR, ROUTE_LOGIN_SUCCESS } from '../../../utils/constants';
import { storageOTPSessionUidOps } from '../../../utils/storage';

const OTP_LENGTH = 6;

const OtpInput: React.FC = () => {
  const [otp, setOtp] = useState<Array<string>>(() => Array.from({ length: OTP_LENGTH }, () => ''));
  const [error, setError] = useState(false);

  const otpSessionUid = storageOTPSessionUidOps.read();

  const inputRefs = useMemo(
    () => Array.from({ length: OTP_LENGTH }, () => React.createRef<HTMLInputElement>()),
    []
  );

  const updateOtpAt = useCallback(
    (index: number, value: string): Array<string> =>
      otp.map((digit, i) => (i === index ? value : digit)),
    [otp]
  );

  const handleChange = useCallback(
    (value: string, index: number) => {
      if (!/^\d?$/.test(value)) {
        return;
      }

      const newOtp = updateOtpAt(index, value);
      setOtp(newOtp);

      if (value && index < OTP_LENGTH - 1) {
        inputRefs[index + 1].current?.focus();
      }
    },
    [updateOtpAt, inputRefs]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace') {
        e.preventDefault();

        if (otp[index]) {
          // Clear current field
          const newOtp = otp.map((char, i) => (i === index ? '' : char));
          setOtp(newOtp);
        } else if (index > 0) {
          // Move to previous and clear it
          const newOtp = otp.map((char, i) => (i === index - 1 ? '' : char));
          setOtp(newOtp);
          inputRefs[index - 1].current?.focus();
        }
      }
    },
    [otp, inputRefs]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('Text').trim();

      const validChars = pastedData.replace(/\D/g, '').slice(0, OTP_LENGTH - index);

      if (validChars.length === 0) {
        return;
      }

      const newOtp = otp.map((char, i) =>
        i >= index && i < index + validChars.length ? validChars[i - index] : char
      );

      setOtp(newOtp);

      const nextIndex = index + validChars.length;
      if (nextIndex < OTP_LENGTH) {
        inputRefs[nextIndex].current?.focus();
      }
    },
    [otp, inputRefs]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (error) {
        setOtp(Array.from({ length: OTP_LENGTH }, () => ''));
        setError(false);
      }

      const input = e.target;
      if (input.value) {
        requestAnimationFrame(() => {
          input.setSelectionRange(0, 1);
        });
      }
    },
    [error]
  );

  const handleVerifyError = (statusCode: number, _otpForbiddenCode: string) => {
    if (statusCode === 403 && _otpForbiddenCode === 'CODE_002') {
      window.location.assign(`${ROUTE_LOGIN_ERROR}?errorType=otpToManyAttempts`);
    }

    if (statusCode === 403 && _otpForbiddenCode === 'CODE_001') {
      // TODO handle in page error with otpForbiddenCode CODE_001=wrong otp
    }

    if (statusCode === 409) {
      // TODO handle in page error expired otp
    }
    return window.location.assign(`${ROUTE_LOGIN_ERROR}?errorType=otpGeneric`);
  };

  useEffect(() => {
    const isOtpFilled = otp.length === OTP_LENGTH && otp.every((char) => char !== '');
    if (isOtpFilled) {
      otpVerifyService({
        otp: otp.join('') as NonEmptyString,
        otpUuid: otpSessionUid as NonEmptyString,
      })
        .then((res) => {
          console.log('this is Res', res);
          storageTokenOps.write(res.sessionToken);
          window.location.assign(ROUTE_LOGIN_SUCCESS);
        })
        .catch((error) => {
          handleVerifyError(error.httpStatus, error.httpBody);
        });
    }
  }, [otp]);

  return (
    <form>
      <Box display="flex" gap={1} justifyContent="center" mt={2} mb={4}>
        {inputRefs.map((ref, index) => (
          <TextField
            key={index}
            inputRef={ref}
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
            onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => handlePaste(e, index)}
            onFocus={handleFocus}
            error={error}
            placeholder="_"
            sx={{
              input: {
                textAlign: 'center',
                fontSize: '24px',
                width: '33px',
                height: '53px',
                padding: 0,
                borderRadius: 1,
              },

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: otp[index]
                    ? error
                      ? 'error.main'
                      : 'primary.main'
                    : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: otp[index] ? (error ? 'error.dark' : 'primary.dark') : 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: error ? 'error.main' : 'primary.main',
                },
              },
            }}
            inputProps={{
              maxLength: 1,
              type: 'tel',
              'aria-label': `OTP character ${index + 1}`,
            }}
            variant="outlined"
          />
        ))}
      </Box>
    </form>
  );
};

export default OtpInput;
