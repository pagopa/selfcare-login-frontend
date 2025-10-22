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
      'eyJjb250ZW50QXBpVXJsIjoiaHR0cHM6Ly9wcml2YWN5cG9ydGFsLWRlLm9uZXRydXN0LmNvbS9yZXF1ZXN0L3YxL2VudGVycHJpc2Vwb2xpY3kvZGlnaXRhbHBvbGljeS9jb250ZW50IiwibWV0YWRhdGFBcGlVcmwiOiJodHRwczovL3ByaXZhY3lwb3J0YWwtZGUub25ldHJ1c3QuY29tL3JlcXVlc3QvdjEvZW50ZXJwcmlzZXBvbGljeS9kaWdpdGFscG9saWN5L21ldGEtZGF0YSJ9'
    );

    document.body.appendChild(script);

    // eslint-disable-next-line functional/immutable-data
    script.onload = () => {
      (window as any).OneTrust.NoticeApi.Initialized.then(() => {
        (window as any).OneTrust.NoticeApi.LoadNotices([
          'https://privacyportalde-cdn.onetrust.com/storage-container/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/6f92cced-3bd1-4859-9295-baecfc74c64a/draft/privacynotice.json',
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
