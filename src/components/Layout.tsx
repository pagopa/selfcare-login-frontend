import { Box } from '@mui/material';
import { Footer } from '@pagopa/selfcare-common-frontend/lib';
import { ENV } from '../utils/env';
import { LoginHeader } from './LoginHeader';

type Props = {
  children: any;
};

const Layout = ({ children }: Props) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  >
    <LoginHeader />
    {children}
    <Box >
      <Footer loggedUser={false} productsJsonUrl={ENV.JSON_URL.PRODUCTS} />
    </Box>
  </Box>
);

export default Layout;
