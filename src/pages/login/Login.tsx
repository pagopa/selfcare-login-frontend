import { Alert, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { theme } from '@pagopa/mui-italia';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import CIEIcon from '../../assets/CIEIcon.svg';
import SpidIcon from '../../assets/SpidIcon.svg';
import Layout from '../../components/Layout';
import { ENABLE_LANDING_REDIRECT } from '../../utils/constants';
import { ENV } from '../../utils/env';
import { storageSpidSelectedOps } from '../../utils/storage';
import { isPnpg } from '../../utils/utils';
import SpidDropdown from './SpidDropdown';
import SpidSelect from './SpidSelect';

type MapContent = 'alertBanner' | 'idpStatus';

export type IdpStatus = {
  idp: string;
  migrated: boolean;
};

type BannerContent = {
  enable: boolean;
  severity: 'warning' | 'error' | 'info' | 'success';
  description: string;
};

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
  const [isCurrentVersion, setIsCurrentVersion] = useState(true);
  const [fromOnboarding, setFromOnboarding] = useState<boolean>();
  const [product, setProduct] = useState<string>('');
  const [bannerContent, setBannerContent] = useState<Array<BannerContent>>();
  const [idpStatus, setIdpStatus] = useState<Array<IdpStatus>>();

  const mapToArray = (content: MapContent, json: { [key: string]: BannerContent | IdpStatus }) => {
    if (content === 'alertBanner') {
      const mapped = Object.values(json);
      setBannerContent(mapped as Array<BannerContent>);
    } else {
      const mapped = Object.keys(json).map((idp) => ({
        idp,
        migrated: (json[idp] as any).migrated,
      }));
      setIdpStatus(mapped as Array<IdpStatus>);
    }
  };

  const alertMessage = async (loginBanner: string) => {
    try {
      const response = await fetch(loginBanner);
      const res = await response.json();
      mapToArray('alertBanner', res as any);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void alertMessage(ENV.JSON_URL.ALERT);
  }, []);

  const retrieveIdpStatus = async (idpStatus: string) => {
    try {
      const response = await fetch(idpStatus);
      const res = await response.json();
      mapToArray('idpStatus', res as any);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showIDPS && isCurrentVersion) {
      void retrieveIdpStatus(ENV.JSON_URL.IDP_STATUS);
    }
  }, [showIDPS, isCurrentVersion]);

  useEffect(() => {
    const onboardingUrl = new URLSearchParams(window.location.search).get('onSuccess');

    if (onboardingUrl && onboardingUrl.includes('onboarding')) {
      setFromOnboarding(true);
      switch (onboardingUrl) {
        case '/onboarding/prod-interop':
          setProduct('Interoperabilità');
          break;
        case '/onboarding/prod-io':
          setProduct('App Io');
          break;
        case '/onboarding/prod-io/prod-io-premium':
          setProduct('App Io Premium');
          break;
        case '/onboarding/prod-io-sign':
          setProduct('Firma con Io');
          break;
        case '/onboarding/prod-pn':
          setProduct('SEND - Servizio Notifiche Digitali');
          break;
        case '/onboarding/prod-pagopa':
          setProduct('Piattaforma pagoPA');
          break;
        case '/onboarding/prod-cgn':
          setProduct('Carta Giovani');
          break;
        case '/onboarding/prod-ciban':
          setProduct('Check-IBAN');
          break;
        case '/onboarding/prod-idpay':
          setProduct('IDPay');
          break;
        default:
          setProduct('');
      }
    } else {
      setFromOnboarding(false);
    }
  }, []);

  const { t } = useTranslation();

  const goCIE = () => {
    storageSpidSelectedOps.write(ENV.SPID_CIE_ENTITY_ID);
    trackEvent(
      'LOGIN_IDP_SELECTED',
      {
        SPID_IDP_NAME: 'CIE',
        SPID_IDP_ID: ENV.SPID_CIE_ENTITY_ID,
      },
      () =>
        window.location.assign(
          `${ENV.URL_API.LOGIN}/login?entityID=${ENV.SPID_CIE_ENTITY_ID}&authLevel=SpidL2`
        )
    );
  };

  const goBackToLandingPage = () => {
    window.location.assign(`${ENV.URL_FE.LANDING}`);
  };

  const onBackAction = () => {
    setShowIDPS(false);
    setIsCurrentVersion(true);
  };

  const onLinkClick = () => {
    setShowIDPS(true);
    setIsCurrentVersion(false);
  };

  if (showIDPS) {
    return (
      <SpidSelect onBack={onBackAction} isCurrentVersion={isCurrentVersion} idpStatus={idpStatus} />
    );
  }

  const redirectPrivacyLink = () =>
    trackEvent('LOGIN_PRIVACY', { SPID_IDP_NAME: 'LOGIN_PRIVACY' }, () =>
      window.location.assign(ENV.URL_FOOTER.PRIVACY_DISCLAIMER)
    );

  const columnsOccupiedByAlert = 5;

  return (
    <Layout>
      <Grid container direction="column" my={'auto'} alignItems="center">
        <Grid container direction="row" justifyContent="flex-end" mt={8}>
          <Grid item xs={2}>
            {ENABLE_LANDING_REDIRECT && (
              <IconButton
                color="primary"
                sx={{
                  maxWidth: '17.42px',
                  '&:hover': { backgroundColor: 'transparent !important' },
                }}
                onClick={() => goBackToLandingPage()}
              ></IconButton>
            )}
          </Grid>
        </Grid>
        <Grid container item justifyContent="center" mb={isPnpg ? 8 : 0}>
          <Grid item xs={4} maxWidth="100%">
            <Typography
              variant="h3"
              py={1}
              px={0}
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
            >
              {fromOnboarding || isPnpg ? t('loginPageFromOnboarding.title') : t('loginPage.title')}
            </Typography>
          </Grid>
        </Grid>

        {!isPnpg && (
          <Grid container item justifyContent="center">
            <Grid item xs={6}>
              <Typography
                variant="body1"
                mb={5}
                color="textPrimary"
                sx={{
                  textAlign: 'center',
                }}
              >
                {fromOnboarding ? (
                  <Trans i18nKey="loginPageFromOnboarding.description">
                    Seleziona la modalità di accesso che preferisci e inizia il <br /> processo di
                    adesione al prodotto <b>{{ nomeProdotto: product }}</b>.
                  </Trans>
                ) : (
                  t('loginPage.description')
                )}
              </Typography>
            </Grid>
          </Grid>
        )}
        {ENV.ENABLED_SPID && (
          <Grid container justifyContent="center" mb={5}>
            <Grid item>
              <Alert severity="warning">
                {t('loginPage.temporaryLogin.alert')}
                <Link
                  ml={4}
                  sx={{ fontWeight: 'fontWeightBold', cursor: 'pointer', textDecoration: 'none' }}
                  onClick={onLinkClick}
                >
                  {t('loginPage.temporaryLogin.join')}
                </Link>
              </Alert>
            </Grid>
          </Grid>
        )}
        {fromOnboarding &&
          bannerContent &&
          bannerContent.map(
            (bc, index) =>
              bc.enable && (
                <Grid container item justifyContent="center" key={index} mt={2}>
                  <Grid item xs={columnsOccupiedByAlert}>
                    <Box display="flex" justifyContent="center" mb={5}>
                      <Alert severity={bc.severity} sx={{ width: '100%' }}>
                        <Typography textAlign="center">{bc.description}</Typography>
                      </Alert>
                    </Box>
                  </Grid>
                </Grid>
              )
          )}
        <Grid
          container
          xs={6}
          lg={3}
          xl={3}
          sx={{
            boxShadow:
              '0px 8px 10px -5px rgba(0, 43, 85, 0.1), 0px 16px 24px 2px rgba(0, 43, 85, 0.05), 0px 6px 30px 5px rgba(0, 43, 85, 0.1)',
            borderRadius: '16px',
            p: 4,
            justifyContent: 'center',
            width: '100%',
            maxWidth: '100%',
            [theme.breakpoints.down('md')]: {
              width: '80%',
            },
          }}
        >
          <Grid item sx={{ width: '100%' }}>
            <SpidDropdown idpStatus={idpStatus} isCurrentVersion={isCurrentVersion} />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <Button
              sx={{
                borderRadius: '4px',
                width: '100%',
                marginTop: 2,
              }}
              variant="contained"
              startIcon={cieIcon()}
              onClick={() => goCIE()}
            >
              {t('loginPage.loginBox.cieLogin')}
            </Button>
          </Grid>
        </Grid>
        <Grid container item justifyContent="center">
          <Grid item xs={6}>
            <Typography
              color="textPrimary"
              mt={5}
              px={0}
              sx={{
                textAlign: 'center',
              }}
              component="div"
              variant="body1"
            >
              <Trans i18nKey="loginPage.privacyAndCondition" shouldUnescape>
                Accedendo accetti i
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none !important',
                    fontWeight: '400',
                    color: 'primary.main',
                  }}
                  onClick={() => {
                    trackEvent('LOGIN_TOS', { SPID_IDP_NAME: 'LOGIN_TOS' }, () =>
                      window.location.assign(ENV.URL_FOOTER.TERMS_AND_CONDITIONS)
                    );
                  }}
                >
                  {'Termini e condizioni d’uso'}
                </Link>
                del servizio e
                <br />
                confermi di avere letto l&apos;
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none !important',
                    fontWeight: '400',
                    color: 'primary.main',
                  }}
                  onClick={redirectPrivacyLink}
                >
                  Informativa Privacy
                </Link>
              </Trans>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
