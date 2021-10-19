import { Fragment } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import LogoPagoPa from '../assets/logo_pago_pa.svg';

const Header = () => (
  <Fragment>
    <AppBar>
      <Toolbar>
        <img src={LogoPagoPa} alt="fireSpot" />
      </Toolbar>
    </AppBar>
  </Fragment>
);

export default Header;
