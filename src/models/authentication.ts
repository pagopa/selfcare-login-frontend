export type OidcExchangeResponse = {
  maskedEmail?: string;
  otpSessionUid?: string;
  requiresOtpFlow?: boolean;
  sessionToken?: string;
};

export type otpVerifyResponse = {
  sessionToken: string;
};

export type OtpResend = {
  otpSessionUid: string;
  maskedEmail: string;
};
