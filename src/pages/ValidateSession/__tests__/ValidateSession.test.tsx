import React from 'react';
import { render } from '@testing-library/react';
import ValidSession from '../ValidateSession';
import { ENV } from '../../../utils/env';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
const { TextDecoder } = require('util');

jest.mock('i18next', () => ({
  changeLanguage: jest.fn((lng) => {
    currentLanguage = lng;
  }),
  t: jest.fn((key) => key),
}));

global.TextDecoder = TextDecoder;

const oldWindowLocation = global.window.location;
let currentLanguage = 'it';

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: { assign: jest.fn() } });
  i18n.changeLanguage('it');
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test('test validate session', () => {
  render(<ValidSession sessionToken={ENV.TEST_TOKEN} />);

  const user: User = storageUserOps.read();
  expect(user).not.toBeNull();
  expect(user.uid).toBe('0');
  expect(user.taxCode).toBe('UNITTESTS');
  expect(user.name).toBe('Mario');
  expect(user.surname).toBe('Rossi');
  expect(user.email).toBe('1@111sadcx11.com');

  expect(global.window.location.assign).toBeCalledWith(ENV.URL_FE.DASHBOARD);
});

test('test validate session when already user stored', () => {
  const expectedUser: User = {
    uid: 'UID',
    name: 'NAME',
    surname: 'SURNAME',
    email: 'EMAIL',
    taxCode: 'TAXCODE',
  };
  storageUserOps.write(expectedUser);
  render(<ValidSession sessionToken={ENV.TEST_TOKEN} />);

  const user: User = storageUserOps.read();
  expect(JSON.stringify(user)).toBe(JSON.stringify(expectedUser));

  expect(global.window.location.assign).toBeCalledWith(ENV.URL_FE.DASHBOARD);
});
