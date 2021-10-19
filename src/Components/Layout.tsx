import { Box } from '@material-ui/core';

import Footer from './Footer';
import Header from './Header';

type Props = {
  children: any;
};

const Layout = ({ children }: Props) => (
  <Box>
    <Header></Header>
    {children}
    <Footer></Footer>
  </Box>
);

export default Layout;
