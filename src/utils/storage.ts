import { storageOpsBuilder } from '@pagopa/selfcare-common-frontend/lib/utils/storage-utils';

export const storageOnSuccessOps = storageOpsBuilder<string>('LOGIN:onSuccess', 'string', true);
export const storageStateOps = storageOpsBuilder<string>('StateGenerated', 'string', true);
export const storageNonceOps = storageOpsBuilder<string>('Nonce', 'string', true);
export const storageRedirectURIOps = storageOpsBuilder<string>('redirect_uri', 'string', true);
export const storageOTPSessionUidOps = storageOpsBuilder<string>('OTPSessionUid', 'string', true);
export const storageMaskedEmailOps = storageOpsBuilder<string>('MaskedEmail', 'string', true);
