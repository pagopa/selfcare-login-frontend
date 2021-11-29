import { Box } from '@mui/material';
import Footer from './Footer';
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
    <Box mb={16}>
      <Header withSecondHeader={false} onExitAction={null} />
    </Box>
    {children}
    <Box mt={16}>
      <Footer />
    </Box>
  </Box>
);

export default Layout;
