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
  storageTokenOps.write(ENV.TEST_TOKEN);
  render(<LoginSuccess />);

  expect(storageTokenOps.read()).toBe(ENV.TEST_TOKEN);

  const user: User = storageUserOps.read();
  expect(user).not.toBeNull();
  expect(user.uid).toBe('0');
  expect(user.taxCode).toBe('UNITTESTS');
  expect(user.name).toBe('Mario');
  expect(user.surname).toBe('Rossi');
  expect(user.email).toBe('1@111sadcx11.com');

  expect(global.window.location.assign).toBeCalledWith(ENV.URL_FE.DASHBOARD);
});

test('test login success with ENV.TEST_TOKEN fragment in URL', () => {
  mockLocation(`#token=${ENV.TEST_TOKEN}`);

  storageTokenOps.delete();
  render(<LoginSuccess />);

  const user: User = storageUserOps.read();
  expect(user).not.toBeNull();
  expect(user.uid).toBe('0');
  expect(user.taxCode).toBe('UNITTESTS');
  expect(user.name).toBe('Mario');
  expect(user.surname).toBe('Rossi');
  expect(user.email).toBe('1@111sadcx11.com');
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

test('test login success no ENV.TEST_TOKEN', () => {
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
  storageTokenOps.write(ENV.TEST_TOKEN);

  render(<LoginSuccess />);

  expect(global.window.location.assign).toBeCalledWith(expectedPathRedirect);
  if (expectOnSuccessDelete) expect(storageOnSuccessOps.read()).toBeUndefined();
  else expect(storageOnSuccessOps.read()).toBe(requestedPath);
}
