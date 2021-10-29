import { AppBar, SvgIcon, Toolbar } from '@mui/material';
import { ReactComponent as logo } from '../assets/logo_pago_pa_mini.svg';

const Header = () => (
  <AppBar position="relative" sx={{ alignItems: 'center' }}>
    <Toolbar sx={{ width: { xs: '90%', lg: '90%' } }}>
      <SvgIcon component={logo} viewBox="0 0 81 24" sx={{ width: '80px' }} />
    </Toolbar>
  </AppBar>
);

export default Header;
