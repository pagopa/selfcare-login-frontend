/* eslint-disable functional/immutable-data */
import { useEffect, useRef } from 'react';
import { Breadcrumbs, Button, Grid, Link, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { theme } from '@pagopa/mui-italia';
import { ENV } from '../utils/env';

export function TermsAndConditionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

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
        (window as any).OneTrust.NoticeApi.LoadNotices([ENV.OT.RESOURCE_TERMS_AND_CONDITION]);
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
              Termini e condizioni d&apos;uso
            </Link>
          </Breadcrumbs>
        </Grid>
        <Grid mt={5}>
          <div
            id="otnotice-6f92cced-3bd1-4859-9295-baecfc74c64a"
            className="otnotice"
            ref={containerRef}
          ></div>
        </Grid>
      </Stack>
    </Grid>
  );
}

export default TermsAndConditionsPage;
