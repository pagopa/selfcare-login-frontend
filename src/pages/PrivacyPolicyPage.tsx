/* eslint-disable functional/immutable-data */
import { Grid } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { useEffect, useRef } from 'react';

export function PrivacyPolicyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const base = document.querySelector('base');

    if (base) {
      base.href = '/auth/informativa-privacy';
      base.target = '_self';
    }
  }, []);

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
        (window as any).OneTrust.NoticeApi.LoadNotices([process.env.REACT_APP_OT_TOS_RESOURCE]);
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
          id="otnotice-26403d01-dc46-4c89-be70-4894839cf639"
          className="otnotice"
          ref={containerRef}
        ></div>
      </Grid>
    </Grid>
  );
}

export default PrivacyPolicyPage;
