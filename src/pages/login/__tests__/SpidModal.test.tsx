import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IDPS } from '../../../utils/IDPS';
import SpidModal from '../SpidModal';
import { ENV } from '../../../utils/env';

const oldWindowLocation = global.window.location;
const idps = IDPS.identityProviders;
beforeAll(() => {
  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(window, 'location', { value: { assign: vi.fn() } });
});
afterAll(() => {
  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test('Test: All the Idps from SpidModal component', () => {
  render(<SpidModal openSpidModal={true} setOpenSpidModal={() => {}} />);

  idps.forEach((element) => {
    const spidImg = screen.getByAltText(element.name);
    const spidButton = spidImg.closest('button');
    expect(spidButton).not.toBeNull();
    if (!spidButton) {
      throw new Error(`Missing SPID button for ${element.name}`);
    }
    fireEvent.click(spidButton);
    let id = element.entityId;
    expect(global.window.location.assign).toHaveBeenCalledWith(
      ENV.URL_API.LOGIN +
        '/login?entityID=' +
        id +
        '&authLevel=SpidL2&RelayState=selfcare_pagopa_it'
    );
  });
});
