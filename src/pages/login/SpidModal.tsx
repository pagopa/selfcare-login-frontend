import { Button, Dialog, Grid, Icon, Typography } from '@mui/material';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { useTranslation } from 'react-i18next';
import { IDPS, IdentityProvider } from '../../utils/IDPS';
import { ENV } from '../../utils/env';
import { storageSpidSelectedOps } from '../../utils/storage';

type Props = {
  openSpidModal: boolean;
  setOpenSpidModal: (openDialog: boolean) => void;
};

const SpidModal = ({ openSpidModal, setOpenSpidModal }: Props) => {
  const { t } = useTranslation();

  const getSPID = (IDP: IdentityProvider) => {
    storageSpidSelectedOps.write(IDP.entityId);
    const redirectUrl = `${ENV.URL_API.LOGIN}/login?entityID=${IDP.entityId}&authLevel=SpidL2&RelayState=selfcare_pagopa_it`;
    trackEvent(
      'LOGIN_IDP_SELECTED',
      {
        SPID_IDP_NAME: IDP.name,
        SPID_IDP_ID: IDP.entityId,
      },
      () => window.location.assign(redirectUrl)
    );
  };

  return (
    <>
      <Dialog open={openSpidModal}>
        <Typography
          fontSize={24}
          fontWeight={600}
          py={4}
          px={2}
          color="textPrimary"
          sx={{
            textAlign: 'center',
          }}
        >
          {t('spidSelect.modalTitle')}
        </Typography>
        <Grid item maxWidth={375}>
          <Grid container direction="row" justifyItems="center">
            {IDPS.identityProviders.map((IDP, i) => (
              <Grid
                item
                key={IDP.entityId}
                xs={6}
                p={1}
                textAlign={i % 2 === 0 ? 'right' : 'left'}
                sx={{ minWidth: '100px' }}
              >
                <Button
                  onClick={() => getSPID(IDP)}
                  sx={{ backgroundColor: 'background.default', alignItems: 'center' }}
                  aria-label={IDP.name}
                  id={IDP.entityId}
                >
                  <Icon
                    sx={{ width: '100px', height: '48px', display: 'flex', alignItems: ' center' }}
                  >
                    <img width="100px" src={IDP.imageUrl} alt={IDP.name} />
                  </Icon>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid p={4}>
          <Button onClick={() => setOpenSpidModal(false)} fullWidth variant="outlined">
            {t('spidSelect.cancelButton')}
          </Button>
        </Grid>
      </Dialog>
    </>
  );
};

export default SpidModal;
