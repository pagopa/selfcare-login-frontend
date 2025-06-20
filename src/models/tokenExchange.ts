export type OidcExchangeResponse = {
  maskedEmail?: string;
  otpSessionUid?: string;
  requiresOtpFlow?: boolean;
  sessionToken?: string;
};
