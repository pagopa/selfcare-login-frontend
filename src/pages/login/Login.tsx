import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

import 'typeface-titillium-web';

import Layout from '../../components/Layout';
import { IDPS } from '../../utils/IDPS';
import SpidIcon from '../../assets/SpidIcon.svg';
import CIEIcon from '../../assets/CIEIcon.svg';
import { SPID_CIE_ENTITY_ID, URL_API_LOGIN, URL_FE_LANDING } from '../../utils/constants';
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

  const goCIE = () => {
    window.location.assign(`${URL_API_LOGIN}/login?entityID=${SPID_CIE_ENTITY_ID}`);
  };

  const goBackToLandingPage = () => {
    window.location.assign(`${URL_FE_LANDING}`);
  };

  useEffect(() => {}, []);

  if (showIDPS) {
    return <SpidSelect onBack={() => setShowIDPS(false)} />;
  }

  return (
    <Layout>
      <Grid container direction="column" my={'auto'}>
        <Grid container direction="row" justifyContent="flex-end" mt={6}>
          <Grid item xs={2}>
            <IconButton
              color="primary"
              style={{
                maxWidth: '17.42px',
              }}
              onClick={() => goBackToLandingPage()}
            >
              <ClearOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container item justifyContent="center">
          <Grid item xs={4}>
            <Typography
              variant="h2"
              py={1}
              px={0}
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
            >
              Accedi con SPID o CIE
            </Typography>
          </Grid>
        </Grid>
        <Grid container item justifyContent="center">
          <Grid item xs={6}>
            <Typography
              variant="body2"
              mb={7}
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
            >
              Seleziona la modalità di autenticazione che preferisci e inizia il processo di
              adesione
            </Typography>
          </Grid>
        </Grid>

        <Grid container item justifyContent="center">
          <Grid item xs={6} md={5} lg={4} xl={3}>
            <Paper elevation={1}>
              <Typography
                py={5}
                px={0}
                color="textPrimary"
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
                component="div"
              >
                Login
              </Typography>

              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  sx={{
                    borderRadius: '4px',
                    width: '70%',
                    height: '50px',
                    marginBottom: 1,
                  }}
                  onClick={() => setShowIDPS(true)}
                  variant="contained"
                  startIcon={spidIcon()}
                >
                  {' '}
                  Entra con SPID
                </Button>
              </Box>

              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  sx={{
                    borderRadius: '4px',
                    width: '70%',
                    height: '50px',
                    marginTop: 1,
                  }}
                  variant="contained"
                  startIcon={cieIcon()}
                  onClick={() => goCIE()}
                >
                  {' '}
                  Entra con CIE
                </Button>
              </Box>

              <Box mt={4}>
                <Divider variant="middle" />
              </Box>

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
                Non hai SPID?
                <Link href={IDPS.richiediSpid}>{' Scopri di più'}</Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container item justifyContent="center">
          <Grid item xs={6}>
            <Typography
              color="textPrimary"
              py={3}
              px={0}
              sx={{
                fontSize: '14px',
                textAlign: 'center',
              }}
              component="div"
              variant="body2"
            >
              Autenticandoti dichiari di aver letto e compreso l&apos;
              <Link href={process.env.REACT_APP_URL_FILE_PRIVACY_DISCLAIMER}>
                {'Informativa Privacy'}
              </Link>
              {' e i '}
              <Link href={process.env.REACT_APP_URL_FILE_TERMS_AND_CONDITIONS}>
                {'Termini e condizioni d’uso'}
              </Link>
              {' del Portale Self Care'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
