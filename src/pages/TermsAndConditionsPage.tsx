/* eslint-disable functional/immutable-data */
import { Grid } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { useRef } from 'react';
import { OneTrustNoticeConfig, useOneTrustNotice } from '../hooks/useOneTrustNotice';

const normalConfig: OneTrustNoticeConfig = {
  noticeId: '6f92cced-3bd1-4859-9295-baecfc74c64a',
  settings:
    'eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyIsImNvbnRlbnRBcGlVcmwiOiJodHRwczovL3ByaXZhY3lwb3J0YWwtZGUub25ldHJ1c3QuY29tL3JlcXVlc3QvdjEvZW50ZXJwcmlzZXBvbGljeS9kaWdpdGFscG9saWN5L2NvbnRlbnQiLCJtZXRhZGF0YUFwaVVybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9lbnRlcnByaXNlcG9saWN5L2RpZ2l0YWxwb2xpY3kvbWV0YS1kYXRhIn0=',
  jsonUrl:
    'https://privacyportalde-cdn.onetrust.com/storage-container/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/6f92cced-3bd1-4859-9295-baecfc74c64a/published/privacynotice.json',
};

/** OneTrust notice used when the page is reached from a Backstage/PagoPA context
 * (`origin=backstage` query param appended by `@pagopa/selfcare-common-frontend`). */
const backstageConfig: OneTrustNoticeConfig = {
  noticeId: 'f2ca8812-959e-48e9-8eed-61a72d131052',
  settings:
    'eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyIsImNvbnRlbnRBcGlVcmwiOiJodHRwczovL3ByaXZhY3lwb3J0YWwtZGUub25ldHJ1c3QuY29tL3JlcXVlc3QvdjEvZW50ZXJwcmlzZXBvbGljeS9kaWdpdGFscG9saWN5L2NvbnRlbnQiLCJtZXRhZGF0YUFwaVVybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9lbnRlcnByaXNlcG9saWN5L2RpZ2l0YWxwb2xpY3kvbWV0YS1kYXRhIn0=',
  jsonUrl:
    'https://privacyportalde-cdn.onetrust.com/storage-container/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/f2ca8812-959e-48e9-8eed-61a72d131052/published/privacynotice.json',
};

export function TermsAndConditionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { noticeId, isBackstage } = useOneTrustNotice(containerRef, normalConfig, backstageConfig);

  return (
    <Grid container item xs={12} p={3} bgcolor={theme.palette.background.default}>
      {isBackstage && (
        <Grid xs={12}>
          {/* Language Drop-down element that will control in which language the notice is displayed */}
          <div className="ot-privacy-notice-language-dropdown-container"></div>
        </Grid>
      )}
      <Grid>
        <div id={`otnotice-${noticeId}`} className="otnotice" ref={containerRef}></div>
      </Grid>
    </Grid>
  );
}

export default TermsAndConditionsPage;
