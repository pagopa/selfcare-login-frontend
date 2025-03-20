import { storageOpsBuilder } from '@pagopa/selfcare-common-frontend/lib/utils/storage-utils';

export const storageOnSuccessOps = storageOpsBuilder<string>('LOGIN:onSuccess', 'string', false);
export const storageStateOps = storageOpsBuilder<string>('StateGenerated', 'string', false);
export const storageNonceOps = storageOpsBuilder<string>('Nonce', 'string', false);
export const storageRedirectURIOps = storageOpsBuilder<string>('redirect_uri', 'string', false);
export const storageSpidSelectedOps = storageOpsBuilder<string>('SPID_SELECTED', 'object', false);
