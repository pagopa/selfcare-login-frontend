import React, { Fragment } from "react";
import LogoPagoPa from "../Icons/logo_pago_pa.svg";
import LogoPagoPaMini from "../Icons/logo_pago_pa_mini.svg";
import { Box, AppBar, Toolbar, Container } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Fullscreen } from "@mui/icons-material";
import Header from "../Extra_components/Header";
import Footer from "../Extra_components/Footer";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
type Props = {
  children: any;
};

const Layout = ({ children }: Props) => (
  <Box >
   <Header>
   </Header>
    {children}
    <Footer>
    </Footer>
  </Box>
);

export default Layout;
