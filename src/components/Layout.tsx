import { Box } from '@mui/material';
import { ReleaseFooter } from './ReleaseFooter';
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
    <Box mt={16}>
      <ReleaseFooter />
    </Box>
  </Box>
);

export default Layout;
