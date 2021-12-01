import { Dialog, Box, Typography } from '@mui/material';
import { redirectToLogin } from '../../utils/utils';

const handleError = (queryParams: string) =>
  console.error(`login unsuccessfull! query params obtained from idp: ${queryParams}`);

const LoginError = () => {
  setTimeout(() => redirectToLogin(), 3000);

  const title = 'Spiacenti, qualcosa è andato storto.';
  const message = (
    <>
      A causa di un errore del sistema non è possibile completare la procedura.
      <br />
      Ti chiediamo di riprovare più tardi.
    </>
  );

  handleError(window.location.search);

  return (
    <Dialog fullScreen={true} open={true} aria-labelledby="responsive-dialog-title">
      <Box m="auto" sx={{ textAlign: 'center', width: '100%' }}>
        <Typography variant="h5" sx={{ fontSize: '18px', fontWeight: '600' }}>
          {title}
        </Typography>

        <Typography variant="body2">{message}</Typography>
      </Box>
    </Dialog>
  );
};

export default LoginError;