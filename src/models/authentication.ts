export type OidcExchangeResponse = {
  maskedEmail?: string;
  otpSessionUid?: string;
  requiresOtpFlow?: boolean;
  sessionToken?: string;
};

export type otpVerifyResponse = {
  sessionToken: string;
};
