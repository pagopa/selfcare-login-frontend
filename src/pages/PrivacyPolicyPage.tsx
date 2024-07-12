/* eslint-disable functional/immutable-data */
import { useEffect, useRef } from 'react';
import { Button, Grid, Link, Stack } from '@mui/material';
import { Breadcrumbs } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { theme } from '@pagopa/mui-italia';
import { ENV } from '../utils/env';

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

    script.src = ENV.OT.SRC;
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.id = 'otprivacy-notice-script';

    (script as any).settings = ENV.OT.TOKEN;

    document.body.appendChild(script);

    // eslint-disable-next-line functional/immutable-data
    script.onload = () => {
      (window as any).OneTrust.NoticeApi.Initialized.then(() => {
        (window as any).OneTrust.NoticeApi.LoadNotices([ENV.OT.REACT_APP_OT_TOS_RESOURCE]);
      });
    };

    return () => {
      document.body.removeChild(script);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  const goBack = () => {
    history.back();
  };

  return (
    <Grid container xs={12} p={3} bgcolor={theme.palette.background.default}>
      <Stack p={3}>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="text"
            color="primary"
            size="small"
            startIcon={<ArrowBackIcon />}
            accessKey="b"
            onClick={goBack}
          >
            Indietro
          </Button>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="none" color={theme.palette.text.disabled} sx={{ cursor: 'default' }}>
              Privacy Policy
            </Link>
          </Breadcrumbs>
        </Grid>
        <Grid mt={5}>
          <div
            id="otnotice-26403d01-dc46-4c89-be70-4894839cf639"
            className="otnotice"
            ref={containerRef}
          ></div>
        </Grid>
      </Stack>
    </Grid>
  );
}

export default PrivacyPolicyPage;
