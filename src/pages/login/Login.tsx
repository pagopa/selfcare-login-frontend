import { useState } from 'react';
import Button from '@mui/material/Button';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
// commented following SELC-1165
// import Divider from '@mui/material/Divider';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Trans, useTranslation } from 'react-i18next';
import Layout from '../../components/Layout';
import { IDPS } from '../../utils/IDPS';
import SpidIcon from '../../assets/SpidIcon.svg';
import CIEIcon from '../../assets/CIEIcon.svg';
import { ENV } from '../../utils/env';
import { ENABLE_LANDING_REDIRECT } from '../../utils/constants';
// commented following SELC-1165
// import { storageSpidSelectedOps } from '../../utils/storage';
import SpidSelect from './SpidSelect';

export const spidIcon = () => (
  <Icon sx={{ width: '25px', height: '25px' }}>
    <img src={SpidIcon} width="25" height="25" />
  </Icon>
);

export const cieIcon = () => (
  <Icon sx={{ width: '25px', height: '25px' }}>
    <img src={CIEIcon} width="25" height="25" />
  </Icon>
);

const Login = () => {
  const [showIDPS, setShowIDPS] = useState(false);

  const { t } = useTranslation();

  // commented following SELC-1165
  // const goCIE = () => {
  //   storageSpidSelectedOps.write(ENV.SPID_CIE_ENTITY_ID);
  //   trackEvent(
  //     'LOGIN_IDP_SELECTED',
  //     {
  //       SPID_IDP_NAME: 'CIE',
  //       SPID_IDP_ID: ENV.SPID_CIE_ENTITY_ID,
  //     },
  //     () =>
  //       window.location.assign(
  //         `${ENV.URL_API.LOGIN}/login?entityID=${ENV.SPID_CIE_ENTITY_ID}&authLevel=SpidL2`
  //       )
  //   );
  // };

  const goBackToLandingPage = () => {
    window.location.assign(`${ENV.URL_FE.LANDING}`);
  };

  if (showIDPS) {
    return <SpidSelect onBack={() => setShowIDPS(false)} />;
  }

  const redirectPrivacyLink = () =>
    trackEvent('LOGIN_PRIVACY', { SPID_IDP_NAME: 'LOGIN_PRIVACY' }, () =>
      window.location.assign(ENV.URL_FILE.PRIVACY_DISCLAIMER)
    );
  return (
    <Layout>
      <Grid container direction="column" my={'auto'}>
        <Grid container direction="row" justifyContent="flex-end" mt={6}>
          <Grid item xs={2}>
            {ENABLE_LANDING_REDIRECT && (
              <IconButton
                color="primary"
                sx={{
                  maxWidth: '17.42px',
                  '&:hover': { backgroundColor: 'transparent !important' },
                }}
                onClick={() => goBackToLandingPage()}
              >
                <ClearOutlinedIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Grid container item justifyContent="center">
          <Grid item xs={4}>
            <Typography
              variant="h3"
              py={1}
              px={0}
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
            >
              {t('loginPage.title')}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item justifyContent="center">
          <Grid item xs={6}>
            <Typography
              variant="body1"
              mb={8}
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
            >
              {/* commented following SELC-1165 */}
              {/* {t('loginPage.description')} */}

              <Trans i18nKey="loginPage.description">
                Accedi con la tua identità digitale, inserendo le credenziali del
                <br />
                tuo gestore.
              </Trans>
            </Typography>
          </Grid>
        </Grid>

        <Grid container item justifyContent="center">
          <Grid item xs={6} md={5} lg={4} xl={3}>
            <Box
              sx={{
                boxShadow:
                  '0px 8px 10px -5px rgba(0, 43, 85, 0.1), 0px 16px 24px 2px rgba(0, 43, 85, 0.05), 0px 6px 30px 5px rgba(0, 43, 85, 0.1)',
                borderRadius: '16px',
                p: 1,
              }}
            >
              {/* commented following SELC-1165 */}
              {/* <Typography
                py={4}
                px={0}
                color="textPrimary"
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
                component="div"
              >
                {t('loginPage.loginBox.title')}
              </Typography> */}

              <Box display="flex" justifyContent="center" alignItems="center" my={3}>
                <Button
                  id="spidButton"
                  sx={{
                    borderRadius: '4px',
                    width: '90%',
                    height: '50px',
                  }}
                  onClick={() => setShowIDPS(true)}
                  variant="contained"
                  startIcon={spidIcon()}
                >
                  {t('loginPage.loginBox.spidLogin')}
                </Button>
              </Box>
              {/* 
              // commented following SELC-1165
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  sx={{
                    borderRadius: '4px',
                    width: '90%',
                    height: '50px',
                    marginTop: 1,
                  }}
                  variant="contained"
                  startIcon={cieIcon()}
                  onClick={() => goCIE()}
                >
                  {t('loginPage.loginBox.cieLogin')}
                </Button>
              </Box> */}

              {/* commented following SELC-1165 */}
              {/* <Box mt={4}>
                <Divider variant="middle" />
              </Box> */}

              <Typography
                mb={3}
                px={0}
                color="#000000"
                variant="body1"
                sx={{
                  textAlign: 'center',
                  fontWeight: '400',
                }}
                component="div"
              >
                <Trans i18nKey="loginPage.hintText">
                  Non hai SPID?
                  <Link href={IDPS.richiediSpid} color="primary.dark">
                    Scopri di più
                  </Link>
                </Trans>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container item justifyContent="center">
          <Grid item xs={6}>
            <Typography
              color="textPrimary"
              mt={8}
              px={0}
              sx={{
                textAlign: 'center',
              }}
              component="div"
              variant="body1"
            >
              <Trans i18nKey="loginPage.privacyAndCondition" shouldUnescape>
                Autenticandoti dichiari di aver letto e compreso l&apos;
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none !important',
                    fontWeight: '400',
                    color: 'primary.main',
                  }}
                  onClick={redirectPrivacyLink}
                >
                  Informativa
                </Link>
                <br />
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none !important',
                    fontWeight: '400',
                    color: 'primary.main',
                  }}
                  onClick={redirectPrivacyLink}
                >
                  Privacy
                </Link>
                {' e i '}
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none !important',
                    fontWeight: '400',
                    color: 'primary.main',
                  }}
                  onClick={() => {
                    trackEvent('LOGIN_TOS', { SPID_IDP_NAME: 'LOGIN_TOS' }, () =>
                      window.location.assign(ENV.URL_FILE.TERMS_AND_CONDITIONS)
                    );
                  }}
                >
                  {'Termini e condizioni d’uso'}
                </Link>
                {" dell'Area Riservata."}
              </Trans>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
