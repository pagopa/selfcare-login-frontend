import { Fragment } from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Icon from '@mui/material/Icon';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Trans, useTranslation } from 'react-i18next';
import { IdentityProvider, IDPS } from '../../utils/IDPS';
import SpidBig from '../../assets/spid_big.svg';
import { ENV } from '../../utils/env';
import { ENABLE_LANDING_REDIRECT } from '../../utils/constants';
import { storageSpidSelectedOps } from '../../utils/storage';

const Login = ({ onBack }: { onBack: () => void }) => {
  const { t } = useTranslation();
  const getSPID = (IDP: IdentityProvider) => {
    storageSpidSelectedOps.write(IDP.entityId);
    trackEvent(
      'LOGIN_IDP_SELECTED',
      {
        SPID_IDP_NAME: IDP.name,
        SPID_IDP_ID: IDP.entityId,
      },
      () =>
        window.location.assign(
          `${ENV.URL_API.LOGIN}/login?entityID=${IDP.entityId}&authLevel=SpidL2`
        )
    );
  };
  const goBackToLandingPage = () => {
    window.location.assign(`${ENV.URL_FE.LANDING}`);
  };

  return (
    <Fragment>
      <Grid container direction="column">
        <Grid container direction="row" justifyContent="space-around" mt={3} mb={10}>
          <Grid item xs={1}>
            <img src={SpidBig} />
          </Grid>
          <Grid item xs={1} sx={{ textAlign: 'right' }}>
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
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing="10">
          <Grid item>
            <Typography
              py={5}
              px={0}
              color="textPrimary"
              variant="h4"
              sx={{
                textAlign: 'center',
              }}
              component="div"
            >
              {t('spidSelect.title')}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" justifyItems="center" spacing={2}>
              {IDPS.identityProviders.map((IDP, i) => (
                <Grid
                  item
                  key={IDP.entityId}
                  xs={6}
                  textAlign={i % 2 === 0 ? 'right' : 'left'}
                  sx={{ minWidth: '100px' }}
                >
                  <Button onClick={() => getSPID(IDP)} sx={{ width: '100px', padding: '0' }}>
                    <Icon sx={{ width: '100px', height: '48px' }}>
                      <img width="100px" src={IDP.imageUrl} alt={IDP.name} />
                    </Icon>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              py={3}
              px={0}
              color="textPrimary"
              variant="body2"
              sx={{
                fontSize: '14px',
                textAlign: 'center',
              }}
              component="div"
            >
              <Trans i18nKey="hintText">
                Non hai SPID?
                <Link href={IDPS.richiediSpid}>{' Scopri di più'}</Link>
              </Trans>
            </Typography>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                borderRadius: '4px',
                width: '328px',
                height: '50px',
              }}
              onClick={onBack}
            >
              {t('spidSelect.cancelButton')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Login;
