import { Box } from '@material-ui/core';

import Footer from '../Extra_components/Footer';
import Header from '../Extra_components/Header';

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
