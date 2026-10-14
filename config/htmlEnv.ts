import env from 'env-var';

export const getOneTrustBaseUrl = (values: Record<string, string | undefined>) =>
  env
    .from({
      VITE_ONE_TRUST_BASE_URL:
        values.REACT_APP_ONE_TRUST_BASE_URL ?? values.VITE_ONE_TRUST_BASE_URL,
    })
    .get('VITE_ONE_TRUST_BASE_URL')
    .required()
    .asString();
