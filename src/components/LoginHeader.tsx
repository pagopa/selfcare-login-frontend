import { Header } from '@pagopa/selfcare-common-frontend';
import i18n from '@pagopa/selfcare-common-frontend/locale/locale-utils';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { useEffect, useState } from 'react';
import { ENV } from '../utils/env';
import { isPnpg } from '../utils/utils';

export const LoginHeader = () => {
  const [showDocBtn, setShowDocBtn] = useState(false);

  useEffect(() => {
    if (i18n.language === 'it') {
      setShowDocBtn(true);
    } else {
      setShowDocBtn(false);
    }
  }, [i18n.language]);

  return (
    <Header
      withSecondHeader={false}
      enableAssistanceButton={ENV.ENV !== 'UAT'}
      assistanceEmail={ENV.ASSISTANCE.ENABLE ? ENV.ASSISTANCE.EMAIL : undefined}
      enableLogin={false}
      loggedUser={false}
      onDocumentationClick={
        !isPnpg && showDocBtn
          ? () => {
              trackEvent('OPEN_OPERATIVE_MANUAL', {
                from: 'login',
              });
              window.open(ENV.URL_DOCUMENTATION, '_blank');
            }
          : undefined
      }
    />
  );
};
