import { Fragment } from 'react';
import Icon from '@mui/material/Icon';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Button from '@mui/material/Button';
import { IDPS } from '../IDPS';
import SpidBig from '../assets/spid_big.svg';
const Login = ({ onBack }: { onBack: () => void }) => {
  const getSPID = (entityID: string) => {
    /*    window.location.assign(
      `${process.env.REACT_APP_SPID_LOGIN}/login?entityID=${entityID}&authLevel=SpidL2`
    ); */
    window.location.assign(
      `${process.env.REACT_APP_SPID_LOGIN}/login?entityID=${entityID}&authLevel=SpidL2`
    );
  };

  return (
    <Fragment>
      <Box style={{ width: '100%' }}>
        <img src={SpidBig} style={{ marginLeft: '100px', marginTop: '20px' }} />
        <Icon onClick={onBack} />
      </Box>
      <Box style={{ marginTop: '80px', marginBottom: '80px', width: '100%' }}>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing="10">
          <Grid item>
            <Typography
              style={{
                padding: '40px 0px',
                fontFamily: 'Titillium Web',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '32px',
                lineHeight: '44px',
                textAlign: 'center',
                color: '#17324D',
              }}
              component="div"
            >
              Scegli il tuo SPID
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" justifyContent="center" spacing={2}>
              {IDPS.identityProviders.map((IP, i) => (
                <Grid item key={IP.entityId} xs={6}>
                  <div
                    style={{
                      justifyContent: i % 2 === 0 ? 'end' : 'start',
                      display: 'flex',
                    }}
                  >
                    <Button onClick={() => getSPID(IP.entityId)}>
                      <Icon sx={{ width: '100px', height: '48px' }}>
                        <img width="100px" src={IP.imageUrl} alt={IP.name} />
                      </Icon>
                    </Button>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontFamily: 'Titillium Web',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '24px',
                textAlign: 'center',
                color: '#17324D',
                padding: '24px 0px',
              }}
              component="div"
            >
              Non hai SPID? <Link href={IDPS.richiediSpid}>{' Scopri di più'}</Link>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              style={{
                background: '#0073E6',
                borderRadius: '4px',
                width: '328px',
                height: '50px',
              }}
              onClick={onBack}
            >
              Annulla
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Login;
