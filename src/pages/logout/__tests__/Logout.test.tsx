import {
  storageTokenOps,
  storageUserOps,
} from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { render } from '@testing-library/react';
import { ROUTE_LOGIN } from '../../../utils/constants';
import { storageOnSuccessOps } from '../../../utils/storage';
import Logout from '../Logout';

beforeEach(() => {
  vi.stubGlobal('location', { assign: vi.fn() });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test('test logout', () => {
  storageOnSuccessOps.write('ON_SUCCESS');
  storageTokenOps.write('TOKEN');
  storageUserOps.write({
    uid: 'UID',
    name: 'NAME',
    surname: 'SURNAME',
    email: 'EMAIL',
    taxCode: 'TAXCODE',
  });

  render(<Logout />);

  expect(storageOnSuccessOps.read()).toBeUndefined();
  expect(storageTokenOps.read()).toBeUndefined();
  expect(storageUserOps.read()).toBeUndefined();

  expect(global.window.location.assign).toBeCalledWith(ROUTE_LOGIN);
});
