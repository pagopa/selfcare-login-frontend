import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

import 'typeface-titillium-web';

import Layout from '../../components/Layout';
import { IDPS } from '../../utils/IDPS';
import SpidIcon from '../../assets/SpidIcon.svg';
import CIEIcon from '../../assets/CIEIcon.svg';
import { SPID_CIE_ENTITY_ID, URL_API_LOGIN } from '../../utils/constants';
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

  useEffect(() => {}, []);

  if (showIDPS) {
    return <SpidSelect onBack={() => setShowIDPS(false)} />;
  }

  return (
    <Layout>
      <Box style={{ marginTop: '80px', marginBottom: '80px', width: '100%' }}>
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
          Seleziona la modalità di autenticazione che preferisci e inizia il processo di adesione
        </Typography>

        <Grid container style={{ flexGrow: 1, width: '100%' }} justifyContent={'center'}>
          <Grid item xs={6} md={6} lg={5}>
            <Paper elevation={16}>
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

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{
                  padding: '16px 0px',
                }}
              >
                <Button
                  sx={{
                    borderRadius: '4px',
                    width: '70%',
                    height: '50px',
                  }}
                  onClick={() => setShowIDPS(true)}
                  variant="contained"
                  startIcon={spidIcon()}
                >
                  {' '}
                  Autenticati con SPID
                </Button>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{
                  padding: '16px 0px',
                }}
              >
                <Button
                  sx={{
                    borderRadius: '4px',
                    width: '70%',
                    height: '50px',
                  }}
                  variant="contained"
                  startIcon={cieIcon()}
                  onClick={() => goCIE()}
                >
                  {' '}
                  Autenticati con CIE
                </Button>
              </Box>

              <Divider variant="middle" />

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
      </Box>
    </Layout>
  );
};

export default Login;
