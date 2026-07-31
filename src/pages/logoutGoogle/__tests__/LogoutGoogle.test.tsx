import {
  storageTokenOps,
  storageUserOps,
} from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { storageOnSuccessOps } from '../../../utils/storage';
import { redirectToGoogleLogin } from '../../../utils/utils';
import { LogoutGoogle } from '../LogoutGoogle';

// the LoginHeader rendered by Layout relies on react-router's useLocation, so every render needs
// a Router in the tree even though this page itself doesn't use routing
const renderWithRouter = () => render(<LogoutGoogle />, { wrapper: MemoryRouter });

vi.mock('../../../utils/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../utils/utils')>();
  return {
    ...actual,
    redirectToGoogleLogin: vi.fn(),
  };
});

beforeEach(() => {
  vi.stubGlobal('location', { assign: vi.fn(), search: '' });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test('clears the session and drops any pending onSuccess when reached with no destination', () => {
  storageTokenOps.write('TOKEN');
  storageUserOps.write({
    uid: 'UID',
    name: 'NAME',
    surname: 'SURNAME',
    email: 'EMAIL',
    taxCode: 'TAXCODE',
  });
  storageOnSuccessOps.write('STALE_ON_SUCCESS');

  renderWithRouter();

  expect(storageTokenOps.read()).toBeUndefined();
  expect(storageUserOps.read()).toBeUndefined();
  expect(storageOnSuccessOps.read()).toBeUndefined();
});

test('persists the requested destination in storage, since the google login leaves this app', () => {
  vi.stubGlobal('location', {
    assign: vi.fn(),
    search: '?onSuccess=' + encodeURIComponent('/onboarding/user'),
  });

  renderWithRouter();

  expect(storageOnSuccessOps.read()).toBe('/onboarding/user');
});

test('renders the ending page and triggers the google login redirect on button click', () => {
  renderWithRouter();

  const button = screen.getByRole('button', { name: 'Accedi' });
  button.click();

  expect(redirectToGoogleLogin).toHaveBeenCalled();
});
