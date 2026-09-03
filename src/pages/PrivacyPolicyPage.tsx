/* eslint-disable functional/immutable-data */
import { Grid } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { useRef } from 'react';
import { OneTrustNoticeConfig, useOneTrustNotice } from '../hooks/useOneTrustNotice';

const normalConfig: OneTrustNoticeConfig = {
  noticeId: '26403d01-dc46-4c89-be70-4894839cf639',
  settings:
    'eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyIsImNvbnRlbnRBcGlVcmwiOiJodHRwczovL3ByaXZhY3lwb3J0YWwtZGUub25ldHJ1c3QuY29tL3JlcXVlc3QvdjEvZW50ZXJwcmlzZXBvbGljeS9kaWdpdGFscG9saWN5L2NvbnRlbnQiLCJtZXRhZGF0YUFwaVVybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9lbnRlcnByaXNlcG9saWN5L2RpZ2l0YWxwb2xpY3kvbWV0YS1kYXRhIn0=',
  jsonUrl:
    'https://privacyportalde-cdn.onetrust.com/storage-container/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/26403d01-dc46-4c89-be70-4894839cf639/published/privacynotice.json',
};

/** OneTrust notice used when the page is reached from a Backstage/PagoPA context
 * (`origin=backstage` query param appended by `@pagopa/selfcare-common-frontend`). */
const backstageConfig: OneTrustNoticeConfig = {
  noticeId: '0bae3115-c67a-4f3a-ace2-ca5291a0d7aa',
  settings:
    'eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyIsImNvbnRlbnRBcGlVcmwiOiJodHRwczovL3ByaXZhY3lwb3J0YWwtZGUub25ldHJ1c3QuY29tL3JlcXVlc3QvdjEvZW50ZXJwcmlzZXBvbGljeS9kaWdpdGFscG9saWN5L2NvbnRlbnQiLCJtZXRhZGF0YUFwaVVybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9lbnRlcnByaXNlcG9saWN5L2RpZ2l0YWxwb2xpY3kvbWV0YS1kYXRhIn0=',
  jsonUrl:
    'https://privacyportalde-cdn.onetrust.com/storage-container/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/0bae3115-c67a-4f3a-ace2-ca5291a0d7aa/published/privacynotice.json',
};

export function PrivacyPolicyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { noticeId, isBackstage } = useOneTrustNotice(containerRef, normalConfig, backstageConfig);

  return (
    <Grid container xs={12} p={3} bgcolor={theme.palette.background.default}>
      {isBackstage && (
        <Grid xs={12}>
          {/* Language Drop-down element that will control in which language the Privacy Notice is displayed */}
          <div className="ot-privacy-notice-language-dropdown-container"></div>
        </Grid>
      )}
      <Grid>
        <div id={`otnotice-${noticeId}`} className="otnotice" ref={containerRef}></div>
      </Grid>
    </Grid>
  );
}

export default PrivacyPolicyPage;
