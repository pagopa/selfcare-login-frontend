import { Box, Container } from '@material-ui/core';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import LogoPagoPa from '../assets/logo_pago_pa.svg';
import 'typeface-titillium-web';

const Footer = () => (
  <Box
    sx={{
      flexGrow: 1,
      bgcolor: '#01254C',
    }}
  >
    <Container maxWidth="lg">
      <Grid container direction="row" spacing={4}>
        <Grid item xs={3} md={3} lg={3}>
          <img src={LogoPagoPa} alt="fireSpot" />
        </Grid>
        <Grid item xs={9} md={9} lg={9}>
          <Typography
            component="div"
            style={{
              fontFamily: 'Titillium Web',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: '15px',
              lineHeight: '15px',
              textAlign: 'center',
              color: '#FFFFFF',
            }}
          >
            PagoPA S.p.A. - società per azioni con socio unico - capitale sociale di euro 1,000,000
            interamente versato - sede legale in Roma, Piazza Colonna 370, CAP 00187 - n. di
            iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009
          </Typography>
        </Grid>
        <Typography
          style={{
            fontFamily: 'Titillium Web',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '15px',
            lineHeight: '15px',
            textAlign: 'center',
            color: 'gray',

            padding: '20px 0px',
          }}
          component="div"
        >
          <Link
            href="https://www.pagopa.gov.it/it/privacy-policy/"
            underline="none"
            style={{ margin: '10px' }}
          >
            {'Privacy Policy '}{' '}
          </Link>
          <Link
            href="https://pagopa.portaleamministrazionetrasparente.it/"
            underline="none"
            style={{ margin: '10px' }}
          >
            {'Società Trasparente '}{' '}
          </Link>
          <Link
            href="https://www.pagopa.it/it/lavora-con-noi/"
            underline="none"
            style={{ margin: '10px' }}
          >
            {'Lavora Con Noi '}{' '}
          </Link>
          <Link
            href="https://www.pagopa.gov.it/it/privacy-policy/"
            underline="none"
            style={{ margin: '10px' }}
          >
            {'Sicurezza '}{' '}
          </Link>
          <Link
            href="https://www.pagopa.gov.it/it/privacy-policy/"
            underline="none"
            style={{ margin: '10px' }}
          >
            {'Privacy Policy'}{' '}
          </Link>
        </Typography>
      </Grid>
    </Container>
  </Box>
);

export default Footer;
