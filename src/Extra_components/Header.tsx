import React, { Fragment } from "react";
import LogoPagoPa from "../Icons/logo_pago_pa.svg";

import { AppBar, Toolbar, Container } from "@material-ui/core";

type Props = {
    children: any;
  };
  

const Header = ({ children }: Props) => (
  <Fragment>
    <AppBar>
      <Toolbar>
        <img src={LogoPagoPa} alt="fireSpot" />
      </Toolbar>
    </AppBar>
  </Fragment>
);

export default Header;