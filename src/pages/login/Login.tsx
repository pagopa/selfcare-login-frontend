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
      <Grid container direction="column">
        {/* <Box style={{ marginTop: '80px', marginBottom: '80px', width: '100%' }}> */}
        <Grid container direction="row" justifyContent="flex-end" mt={6} xs={11}>
          <Grid item xs={1}>
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
              sx={{
                padding: '10px 0px',
                fontWeight: 'bold',
                fontSize: '32px',
                lineHeight: '48px',
                textAlign: 'center',
                color: 'text.primary',
              }}
            >
              Accedi con SPID/CIE
            </Typography>
          </Grid>
        </Grid>
        <Grid container item justifyContent="center">
          <Grid item xs={6}>
            <Typography
              sx={{
                marginBottom: '60px',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '24px',
                textAlign: 'center',
                color: 'text.primary',
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
                sx={{
                  padding: '40px 0px',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  lineHeight: '24px',
                  textAlign: 'center',
                  color: 'text.primary',
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
                  Autenticati con SPID
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
                  Autenticati con CIE
                </Button>
              </Box>

              <Divider variant="middle" style={{ marginTop: '32px' }} />

              <Typography
                sx={{
                  fontWeight: 'normal',
                  fontSize: '14px',
                  lineHeight: '24px',
                  textAlign: 'center',
                  color: 'text.primary',
                  padding: '24px 0px',
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
              sx={{
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '24px',
                textAlign: 'center',
                color: 'text.primary',
                padding: '24px 0px',
              }}
              component="div"
            >
              Prima di proseguire prendi visione dell &apos;{' '}
              <Link href="#">{' Informativa sulla Privacy'}</Link>
            </Typography>
            {/* </Box> */}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
