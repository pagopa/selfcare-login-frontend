import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import {
  storageTokenOps,
  storageUserOps,
} from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { render } from '@testing-library/react';
import { ROUTE_LOGIN } from '../../../utils/constants';
import { ENV } from '../../../utils/env';
import { storageOnSuccessOps } from '../../../utils/storage';
import LoginSuccess from '../LoginSuccess';

// mock analytics service
jest.mock('@pagopa/selfcare-common-frontend/lib/services/analyticsService', () => ({
  trackEvent: jest.fn(),
}));

const { TextDecoder } = require('util');
global.TextDecoder = TextDecoder;

// sample valid JWT token (decoded fields tested below)
const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsImxldmVsIjoiTDIiLCJpYXQiOjE2MzUzNjI4MTUsImV4cCI6MTYzNTM2NjQxNSwiaXNzIjoiU1BJRCIsImp0aSI6IjAxRksxS0dGVFhGNk1IMzBLUjJFMUZFQ0hEIiwidWlkIjoiMCJ9.dJyfFPobeK7OfH43JWuhWbVxr1ukOMVsg49G2b3aV_DqMER-gn3M-0FgeqeK4ZaCHqgkQMR37N_DGWNXRSOPCuOoTTpbFBGhSp-vxDCdVJgCgvRLzX0QawlvEthigNsFVSlw0_psXe4OcQpoVWWFdetRQmY_hWa-cT2Ulefb7YVXa6WBNrVZP8Yq5M19G3y7vBs-IKHKjdRoKAvr3m0PkGTRFIVbcoQzvmbo7QpWMKOYcDUf3zapESp07EQgWx4TjpOZjETz-zdQbH-fuN0IR_aiSIISNw4H2sTT5WPtkkeEKU5RSVSkacQsXpCQm_bNEqkGHhKpFMYeIM1s0q1Siw';

// save the original window.location
const oldWindowLocation = global.window.location;

// helper to safely mock window.location
const mockLocation = (hash = '', origin = 'MOCKEDORIGIN') => {
  Object.defineProperty(window, 'location', {
    value: {
      hash,
      origin,
      assign: jest.fn(),
    },
    writable: true,
  });
};

beforeAll(() => {
  mockLocation();
});

afterEach(() => {
  jest.clearAllMocks();
  mockLocation(); // reset hash and mocks
});

afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test('test login success (token from storage)', () => {
  storageTokenOps.write(token);
  render(<LoginSuccess />);

  expect(storageTokenOps.read()).toBe(token);

  const user: User = storageUserOps.read();
  expect(user).not.toBeNull();
  expect(user.uid).toBe('0');
  expect(user.taxCode).toBe('SRTNLM09T06G635S');
  expect(user.name).toBe('Anselmo');
  expect(user.surname).toBe('Sartori');
  expect(user.email).toBe('furiovitale@martino.it');

  expect(global.window.location.assign).toBeCalledWith(ENV.URL_FE.DASHBOARD);
});

test('test login success with token fragment in URL', () => {
  mockLocation(`#token=${token}`);

  storageTokenOps.delete();
  render(<LoginSuccess />);

  const user: User = storageUserOps.read();
  expect(user).not.toBeNull();
  expect(user.uid).toBe('0');
  expect(user.taxCode).toBe('SRTNLM09T06G635S');
  expect(user.name).toBe('Anselmo');
  expect(user.surname).toBe('Sartori');
  expect(user.email).toBe('furiovitale@martino.it');

  expect(global.window.location.assign).toBeCalledWith(ENV.URL_FE.DASHBOARD);
});

test('test login success when redirect registered', () => {
  const requestedPath = 'prova';
  testSuccessRedirect(requestedPath, true, window.location.origin + '/' + requestedPath);
  testSuccessRedirect(`/${requestedPath}`, true, window.location.origin + '/' + requestedPath);
});

test('test login success when invalid redirect', () => {
  const requestedPath = 'prova%';
  testSuccessRedirect(requestedPath, true, ENV.URL_FE.DASHBOARD);
});

test('test login success no token', () => {
  storageTokenOps.delete();
  render(<LoginSuccess />);
  expect(global.window.location.assign).toBeCalledWith(ROUTE_LOGIN);
});

function testSuccessRedirect(
  requestedPath: string,
  expectOnSuccessDelete: boolean,
  expectedPathRedirect: string
) {
  storageOnSuccessOps.write(requestedPath);
  storageTokenOps.write(token);

  render(<LoginSuccess />);

  expect(global.window.location.assign).toBeCalledWith(expectedPathRedirect);
  if (expectOnSuccessDelete) expect(storageOnSuccessOps.read()).toBeUndefined();
  else expect(storageOnSuccessOps.read()).toBe(requestedPath);
}
