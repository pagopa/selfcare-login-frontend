import { OidcExchangeRequest } from '../generated/selfcare-auth/OidcExchangeRequest';
import { OidcExchangeResponse } from '../generated/selfcare-auth/OidcExchangeResponse';

export const SelfcareAuthApiMock = {
  oneIdentityCodeExchangeMock: async (
    _oidcExchangeRequest: OidcExchangeRequest
  ): Promise<OidcExchangeResponse> =>
    Promise.resolve({ sessionToken: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9hMjo3YTo0NjozYjoyYTo2MDo1Njo0MDo4ODphMDo1ZDphNDpmODowMToxZTozZSJ9.eyJmYW1pbHlfbmFtZSI6InNpc3RpIiwiZmlzY2FsX251bWJlciI6IlNTVE1UVDgwQTAxRjIwNUMiLCJuYW1lIjoibWF0dGlhIiwic3BpZF9sZXZlbCI6Imh0dHBzOi8vd3d3LnNwaWQuZ292Lml0L1NwaWRMMiIsImZyb21fYWEiOmZhbHNlLCJ1aWQiOiJkZWE1ZDJjNC05YzNiLTQ3YzEtYmQ5YS0zZTM4YTIwMzcwMDkiLCJsZXZlbCI6IkwyIiwiaWF0IjoxNzQzNjAxMjI2LCJleHAiOjE3NDM2MzM2MjYsImF1ZCI6ImFwaS5kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwiaXNzIjoiU1BJRCIsImp0aSI6Il9mNWVkNjJkY2UwYmFjN2U5YzNiMSJ9.BYjW64cwbjYfJlEkrkhuKWcTZmSCA02AUC2gqojKQSgWUuHRdf_3jRWJd-TM30HCRIGMQoajWxJ8ErZXUyF0AqBy9wdOD7d9yCNF_5GCY3GNAnnYVeFKvpA0UP_YsLuE_Yrwf04g9ZW48-3E61hnyNwcEMBTnksIFS_l-nYAeoIrnUYMF_A6sEePMqSK3h7yZZXGTP0kGbCUtRxLGRnOgDJ4eddExiSYrye_eVZEyB7J2XWAStOIap3Qpg6G-rx7omogKJE8QkaNKJgZdes6dPbur2IIAtZ-cEwJiF6ouEMtRprnwhyDwTodMYmTHGfw8MMgCM_Iuirde4lXSTAFQQ` }),
};
