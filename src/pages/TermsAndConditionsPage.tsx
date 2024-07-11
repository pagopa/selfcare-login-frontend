/* eslint-disable functional/immutable-data */
import { useEffect, useRef } from 'react';
import { Breadcrumbs, Button, Grid, Link, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { theme } from '@pagopa/mui-italia';

export function TermsAndConditionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://privacyportalde-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js';
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.id = 'otprivacy-notice-script';

    (script as any).settings =
      'eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyJ9';

    document.body.appendChild(script);

    // eslint-disable-next-line functional/immutable-data
    script.onload = () => {
      (window as any).OneTrust.NoticeApi.Initialized.then(() => {
        (window as any).OneTrust.NoticeApi.LoadNotices([
          'https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/6f92cced-3bd1-4859-9295-baecfc74c64a.json',
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
