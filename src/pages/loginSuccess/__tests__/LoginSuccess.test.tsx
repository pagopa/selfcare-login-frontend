import React from 'react';
import { render } from '@testing-library/react';
import LoginSuccess from '../LoginSuccess';
import { storageRead, storageWrite } from '../../../lib/storage-utils';
import {
  ROUTE_LOGIN,
  STORAGE_KEY_ON_SUCCESS,
  STORAGE_KEY_TOKEN,
  STORAGE_KEY_USER,
  URL_FE_DASHBOARD,
} from '../../../utils/constants';
import { User } from '../../../models/User';

const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsImxldmVsIjoiTDIiLCJpYXQiOjE2MzUzNjI4MTUsImV4cCI6MTYzNTM2NjQxNSwiaXNzIjoiU1BJRCIsImp0aSI6IjAxRksxS0dGVFhGNk1IMzBLUjJFMUZFQ0hEIiwidWlkIjoiMCJ9.dJyfFPobeK7OfH43JWuhWbVxr1ukOMVsg49G2b3aV_DqMER-gn3M-0FgeqeK4ZaCHqgkQMR37N_DGWNXRSOPCuOoTTpbFBGhSp-vxDCdVJgCgvRLzX0QawlvEthigNsFVSlw0_psXe4OcQpoVWWFdetRQmY_hWa-cT2Ulefb7YVXa6WBNrVZP8Yq5M19G3y7vBs-IKHKjdRoKAvr3m0PkGTRFIVbcoQzvmbo7QpWMKOYcDUf3zapESp07EQgWx4TjpOZjETz-zdQbH-fuN0IR_aiSIISNw4H2sTT5WPtkkeEKU5RSVSkacQsXpCQm_bNEqkGHhKpFMYeIM1s0q1Siw';

const oldWindowLocation = global.window.location;
const mockedLocation = { assign: jest.fn(), hash: '#token=' + token, origin: 'MOCKEDORIGIN' };

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: mockedLocation });
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test('test login success', () => {
  render(<LoginSuccess />);

  expect(storageRead(STORAGE_KEY_TOKEN, 'string')).toBe(token);

  const user: User = storageRead(STORAGE_KEY_USER, 'object');
  expect(user).not.toBeNull();
  expect(user.uid).toBe('0');
  expect(user.taxCode).toBe('SRTNLM09T06G635S');
  expect(user.name).toBe('Anselmo');
  expect(user.surname).toBe('Sartori');
  expect(user.email).toBe('furiovitale@martino.it');

  expect(global.window.location.assign).toBeCalledWith(URL_FE_DASHBOARD);
});

test('test login success when redirect registered', () => {
  const requestedPath = 'prova';
  testSuccessRedirect(requestedPath, true, mockedLocation.origin + '/' + requestedPath);
});

test('test login success when invalid redirect', () => {
  const requestedPath = 'prova?';
  testSuccessRedirect(requestedPath, true, URL_FE_DASHBOARD);
});

test('test login success no token', () => {
  mockedLocation.hash = undefined;
  const requestedPath = 'prova?';
  testSuccessRedirect(requestedPath, false, ROUTE_LOGIN);
});

function testSuccessRedirect(
  requestedPath: string,
  expectOnSuccessDelete: boolean,
  expectedPathRedirect: string
) {
  storageWrite(STORAGE_KEY_ON_SUCCESS, requestedPath, 'string');

  render(<LoginSuccess />);

  expect(global.window.location.assign).toBeCalledWith(expectedPathRedirect);
  if (expectOnSuccessDelete) expect(storageRead(STORAGE_KEY_ON_SUCCESS, 'string')).toBeUndefined();
  else expect(storageRead(STORAGE_KEY_ON_SUCCESS, 'string')).toBe(requestedPath);
}
