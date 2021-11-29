import { Box } from '@mui/material';
import Footer from './footer/Footer';
import Header from './header/Header';

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
    <Header withSecondHeader={false} onExitAction={null} />
    {children}
    <Box mt={16}>
      <Footer />
    </Box>
  </Box>
);

export default Layout;
