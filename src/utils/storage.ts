import { storageOpsBuilder } from '@pagopa/selfcare-common-frontend/lib/utils/storage-utils';

export const storageOnSuccessOps = storageOpsBuilder<string>('LOGIN:onSuccess', 'string', false);
export const storageSpidSelectedOps = storageOpsBuilder<string>('SPID_SELECTED', 'object', false);
