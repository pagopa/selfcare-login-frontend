import React, { useRef, useState } from 'react';
import {
  Grid,
  Button,
  Icon,
  Typography,
  List,
  ListItemButton,
  ClickAwayListener,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { theme } from '@pagopa/mui-italia';
import { IdentityProvider, IDPS } from '../../utils/IDPS';
import { ENV } from '../../utils/env';
import { storageSpidSelectedOps } from '../../utils/storage';
import { IdpStatus, spidIcon } from './Login';

type Props = {
  idpStatus?: Array<IdpStatus>;
  isCurrentVersion: boolean;
};

const SpidDropdown = ({ idpStatus, isCurrentVersion }: Props) => {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [_buttonRect, setButtonRect] = useState<DOMRect>();

  const open = Boolean(anchorEl);

  const getSPID = (IDP: IdentityProvider) => {
    const providerStatus = idpStatus && idpStatus.find((p) => IDP.entityId === p.idp && p.migrated);
    const basePath =
      isCurrentVersion || !providerStatus?.migrated ? ENV.URL_API.LOGIN : ENV.URL_API.LOGIN_SPID;
    storageSpidSelectedOps.write(IDP.entityId);
    const redirectUrl = `${basePath}/login?entityID=${IDP.entityId}&authLevel=SpidL2&RelayState=selfcare_pagopa_it`;
    trackEvent(
      'LOGIN_IDP_SELECTED',
      {
        SPID_IDP_NAME: IDP.name,
        SPID_IDP_ID: IDP.entityId,
      },
      () => window.location.assign(redirectUrl)
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    const rect = buttonRef.current?.getBoundingClientRect();
    setButtonRect(rect);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container xs={12}>
      <Button
        id="spidButton"
        ref={buttonRef}
        aria-controls={open ? 'idp-spid-menu' : undefined}
        sx={{
          borderRadius: '4px',
          width: '100%',
          marginBottom: '5px',
          outline: open ? '2px solid #FF8C00 !important' : null,
          outlineOffset: open ? '1px' : '0px',
        }}
        onClick={!open ? handleClick : handleClose}
        variant="contained"
        disableElevation
        startIcon={spidIcon()}
      >
        <Typography
          sx={{
            fontWeight: 'fontWeightMedium',
            textAlign: 'center',
            color: theme.palette.primary.contrastText,
          }}
        >
          {t('loginPage.loginBox.spidLogin')}
        </Typography>
      </Button>
      {open && (
        <ClickAwayListener onClickAway={handleClose}>
          <List
            key="spid-idp-menu"
            sx={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              left: '8px',
              bottom: '12px',
              py: 0,
              listStyle: 'none',
              boxShadow: '0 0 5px rgba(0,0,0,0.2)',
              overflow: 'visible',
              width: '100%',
              '::before': {
                content: "''",
                position: 'absolute',
                top: '-7px',
                left: '9px',
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                borderBottom: '8px solid white',
              },
            }}
            onClick={handleClose}
          >
            {IDPS.identityProviders.map((IDP, index, idps) => (
              <ListItemButton
                key={IDP.entityId}
                divider={idps.length - 1 !== index ? true : false}
                onClick={() => getSPID(IDP)}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5px',
                }}
                aria-label={IDP.name}
                id={IDP.entityId}
              >
                <Icon
                  sx={{ width: '100px', height: '48px', display: 'flex', alignItems: 'center' }}
                >
                  <img width="100px" src={IDP.imageUrl} alt={IDP.name} />
                </Icon>
              </ListItemButton>
            ))}
          </List>
        </ClickAwayListener>
      )}
    </Grid>
  );
};

export default SpidDropdown;
