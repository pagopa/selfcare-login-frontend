import { Box } from '@mui/material';
import { Footer, Header } from '@pagopa/selfcare-common-frontend';
import { ENV } from '../utils/env';
import { isPnpg } from '../utils/utils';

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
    <Header
      withSecondHeader={false}
      enableAssistanceButton={ENV.ENV !== 'UAT'}
      assistanceEmail={ENV.ASSISTANCE.ENABLE ? ENV.ASSISTANCE.EMAIL : undefined}
      enableLogin={false}
      loggedUser={false}
      onDocumentationClick={
        !isPnpg
          ? () => {
              window.open(ENV.URL_DOCUMENTATION, '_blank');
            }
          : undefined
      }
    />
    {children}
    <Box mt={16}>
      <Footer loggedUser={false} productsJsonUrl={ENV.JSON_URL.PRODUCTS} />
    </Box>
  </Box>
);

export default Layout;
