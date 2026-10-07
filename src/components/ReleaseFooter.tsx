import { MouseEvent } from 'react';
import { Box } from '@mui/material';
import { Footer } from '@pagopa/selfcare-common-frontend/lib';
import { ENV } from '../utils/env';

const preservePrivacyNavigation = (event: MouseEvent<HTMLElement>) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const link = event.target.closest('a');
  if (link?.getAttribute('href') === ENV.URL_FOOTER.PRIVACY_DISCLAIMER) {
    // Common 2.5 opens privacy in a new tab; this release retains same-tab navigation.
    event.preventDefault();
    event.stopPropagation();
    window.location.assign(ENV.URL_FOOTER.PRIVACY_DISCLAIMER);
  }
};

export const ReleaseFooter = () => (
  <Box onClickCapture={preservePrivacyNavigation}>
    <Footer loggedUser={false} productsJsonUrl={ENV.JSON_URL.PRODUCTS} />
  </Box>
);
