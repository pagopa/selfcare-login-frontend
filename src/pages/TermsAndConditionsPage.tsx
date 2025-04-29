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

    (script as any).settings = process.env.REACT_APP_OT_TOKEN;

    document.body.appendChild(script);

    // eslint-disable-next-line functional/immutable-data
    script.onload = () => {
      (window as any).OneTrust.NoticeApi.Initialized.then(() => {
        (window as any).OneTrust.NoticeApi.LoadNotices([
          process.env.REACT_APP_OT_TERMS_AND_CONDITION_RESOURCE,
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
      <Grid mt={5}>
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
