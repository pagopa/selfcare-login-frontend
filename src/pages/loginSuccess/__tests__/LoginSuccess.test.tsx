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
vi.mock('@pagopa/selfcare-common-frontend/lib/services/analyticsService', () => ({
  trackEvent: vi.fn(),
}));

const { TextDecoder } = await import('util');
global.TextDecoder = TextDecoder;

// helper to safely mock window.location
const mockLocation = (hash = '', origin = new URL(ENV.URL_FE.DASHBOARD).origin) => {
  vi.stubGlobal('location', {
    hash,
    origin,
    assign: vi.fn(),
  });
};

beforeAll(() => {
  mockLocation();
});

afterEach(() => {
  vi.clearAllMocks();
  mockLocation(); // reset hash and mocks
});

afterAll(() => {
  vi.unstubAllGlobals();
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
