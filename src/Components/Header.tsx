import { AppBar, Toolbar } from '@material-ui/core';
import LogoPagoPa from '../assets/logo_pago_pa.svg';

const Header = () => (
  <AppBar>
    <Toolbar>
      <img src={LogoPagoPa} alt="fireSpot" />
    </Toolbar>
  </AppBar>
);

export default Header;
