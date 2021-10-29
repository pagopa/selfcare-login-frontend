import { Box } from '@mui/material';
import Footer from './Footer';
import Header from './Header';

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
    <Header></Header>
    {children}
    <Footer></Footer>
  </Box>
);

export default Layout;
