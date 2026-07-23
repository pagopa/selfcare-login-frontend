import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ROUTE_LOGOUT } from '../../../utils/constants';
import { ENV } from '../../../utils/env';
import { storageOnSuccessOps } from '../../../utils/storage';
import ValidSession from '../ValidateSession';
const { TextDecoder } = await import('util');

globalThis.TextDecoder = TextDecoder;

const mockedLocation = {
  assign: vi.fn(),
  pathname: '/login',
  search: '',
  hash: '',
  href: '',
};

beforeEach(() => {
  mockedLocation.assign = vi.fn();
  mockedLocation.pathname = '/login';
  mockedLocation.search = '';
  mockedLocation.hash = '';
  vi.stubGlobal('location', mockedLocation);
});

afterEach(() => {
  vi.unstubAllGlobals();
  storageUserOps.delete();
  storageOnSuccessOps.delete();
});

test('test validate session', () => {
  render(
    <MemoryRouter>
      <ValidSession sessionToken={ENV.TEST_TOKEN} />
    </MemoryRouter>
  );

  const user: User = storageUserOps.read();
  expect(user).not.toBeNull();
  expect(user.uid).toBe('0');
  expect(user.taxCode).toBe('UNITTESTS');
  expect(user.name).toBe('Mario');
  expect(user.surname).toBe('Rossi');
  expect(user.email).toBe('1@111sadcx11.com');

  expect(globalThis.window.location.assign).toBeCalledWith(ENV.URL_FE.DASHBOARD);
});

test('test validate session forwards the requested destination when a new login is forced', () => {
  storageUserOps.write({
    uid: 'UID',
    name: 'NAME',
    surname: 'SURNAME',
    email: 'EMAIL',
    taxCode: 'TAXCODE',
    iss: 'PAGOPA',
  });
  storageOnSuccessOps.write('/onboarding/user');

  render(
    <MemoryRouter>
      <ValidSession sessionToken={ENV.TEST_TOKEN} />
    </MemoryRouter>
  );

  expect(globalThis.window.location.assign).toBeCalledWith(
    ROUTE_LOGOUT + '?onSuccess=' + encodeURIComponent('/onboarding/user')
  );
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
  render(
    <MemoryRouter>
      <ValidSession sessionToken={ENV.TEST_TOKEN} />
    </MemoryRouter>
  );

  const user: User = storageUserOps.read();
  expect(JSON.stringify(user)).toBe(JSON.stringify(expectedUser));

  expect(globalThis.window.location.assign).toBeCalledWith(ENV.URL_FE.DASHBOARD);
});
