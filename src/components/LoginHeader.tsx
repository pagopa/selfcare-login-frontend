import { Header } from '@pagopa/selfcare-common-frontend/lib';
import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { useEffect, useState } from 'react';
import { ENV } from '../utils/env';
import { isPnpg } from '../utils/utils';

type Props = {
  withSecondHeader?: boolean;
};

export const LoginHeader = ({ withSecondHeader }: Props) => {
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
      withSecondHeader={withSecondHeader ?? false}
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
