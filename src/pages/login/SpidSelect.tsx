import { Fragment } from 'react';
import Icon from '@mui/material/Icon';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Button from '@mui/material/Button';
import { IDPS } from '../../utils/IDPS';
import SpidBig from '../../assets/spid_big.svg';
import { URL_API_LOGIN } from '../../utils/constants';

const Login = ({ onBack }: { onBack: () => void }) => {
  const getSPID = (entityID: string) => {
    window.location.assign(`${URL_API_LOGIN}/login?entityID=${entityID}&authLevel=SpidL2`);
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
              sx={{
                padding: '40px 0px',
                fontWeight: 'bold',
                fontSize: '32px',
                lineHeight: '44px',
                textAlign: 'center',
                color: 'text.primary',
              }}
              component="div"
            >
              Scegli il tuo SPID
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" justifyItems="center" spacing={2}>
              {IDPS.identityProviders.map((IP, i) => (
                <Grid item key={IP.entityId} xs={6} textAlign={i % 2 === 0 ? 'end' : 'start'}>
                  <Button onClick={() => getSPID(IP.entityId)}>
                    <Icon sx={{ width: '100px', height: '48px' }}>
                      <img width="100px" src={IP.imageUrl} alt={IP.name} />
                    </Icon>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
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
              Non hai SPID? <Link href={IDPS.richiediSpid}>{' Scopri di più'}</Link>
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
              Annulla
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Login;
