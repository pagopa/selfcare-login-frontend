/* eslint-disable functional/immutable-data */
import { Grid } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { useEffect, useRef } from 'react';

export function TermsAndConditionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = process.env.REACT_APP_OT_SRC ?? '';
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.id = 'otprivacy-notice-script';

    script.setAttribute(
      'settings',
      'eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyIsImNvbnRlbnRBcGlVcmwiOiJodHRwczovL3ByaXZhY3lwb3J0YWwtZGUub25ldHJ1c3QuY29tL3JlcXVlc3QvdjEvZW50ZXJwcmlzZXBvbGljeS9kaWdpdGFscG9saWN5L2NvbnRlbnQiLCJtZXRhZGF0YUFwaVVybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9lbnRlcnByaXNlcG9saWN5L2RpZ2l0YWxwb2xpY3kvbWV0YS1kYXRhIn0='
    );

    document.body.appendChild(script);

    // eslint-disable-next-line functional/immutable-data
    script.onload = () => {
      (window as any).OneTrust.NoticeApi.Initialized.then(() => {
        (window as any).OneTrust.NoticeApi.LoadNotices([
          'https://privacyportalde-cdn.onetrust.com/storage-container/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/6f92cced-3bd1-4859-9295-baecfc74c64a/published/privacynotice.json',
        ]);
      });
    };

    return () => {
      document.body.removeChild(script);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <Grid container xs={12} p={3} bgcolor={theme.palette.background.default}>
      <Grid>
        <div
          id="otnotice-6f92cced-3bd1-4859-9295-baecfc74c64a"
          className="otnotice"
          ref={containerRef}
        ></div>
      </Grid>
    </Grid>
  );
}

export default TermsAndConditionsPage;
