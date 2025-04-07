import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { OneIdentityAuthCallbackPage } from '../OneIdentityAuthCallback';
import React from 'react';
import { SelfcareAuthApiMock } from '../../../api/__mocks__/SelfcareAuthApiClient';
import { ROUTE_LOGIN_SUCCESS } from '../../../utils/constants';
import { storageRedirectURIOps, storageStateOps } from '../../../utils/storage';
import { redirectToErrorPage } from '../../../utils/utils';

jest.mock('@pagopa/selfcare-common-frontend/lib/utils/storage', () => ({
  storageTokenOps: {
    write: jest.fn(),
  },
}));

jest.mock('../../../api/__mocks__/SelfcareAuthApiClient', () => ({
  SelfcareAuthApiMock: {
    oneIdentityCodeExchangeMock: jest.fn(),
  },
}));

process.env.REACT_APP_API_MOCK = 'true';

jest.mock('../../../utils/storage', () => ({
  storageStateOps: {
    read: jest.fn(),
  },
  storageRedirectURIOps: {
    read: jest.fn(),
  },
}));

jest.mock('../../../utils/utils', () => ({
  redirectToErrorPage: jest.fn(),
}));

jest.mock('../../../components/LoadingOverlay', () => ({
  LoadingOverlay: () => <div data-testid="loading-overlay">Loading...</div>,
}));

const originalWindow = { ...window };
const mockAssign = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  Object.defineProperty(window, 'location', {
    value: {
      ...originalWindow.location,
      search: '',
      assign: mockAssign,
    },
    writable: true,
  });
});

describe('OneIdentityAuthCallbackPage', () => {
  test('should redirect to error page when code is missing', () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?state=test-state' },
      writable: true,
    });

    (storageStateOps.read as jest.Mock).mockReturnValue('test-state');

    render(<OneIdentityAuthCallbackPage />);

    expect(redirectToErrorPage).toHaveBeenCalled();
  });

  test('should redirect to error page when state is missing', () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?code=test-code' },
      writable: true,
    });

    render(<OneIdentityAuthCallbackPage />);

    expect(redirectToErrorPage).toHaveBeenCalled();
  });

  test('should redirect to error page when received state does not match stored state', () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?code=test-code&state=wrong-state' },
      writable: true,
    });

    (storageStateOps.read as jest.Mock).mockReturnValue('correct-state');

    render(<OneIdentityAuthCallbackPage />);

    expect(redirectToErrorPage).toHaveBeenCalled();
  });

  test('should show loading overlay when validations pass', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?code=test-code&state=test-state' },
      writable: true,
    });

    (storageStateOps.read as jest.Mock).mockReturnValue('test-state');
    (storageRedirectURIOps.read as jest.Mock).mockReturnValue('https://example.com/callback');

    (SelfcareAuthApiMock.oneIdentityCodeExchangeMock as jest.Mock).mockResolvedValue({
      sessionToken: 'auth-token',
    });

    render(<OneIdentityAuthCallbackPage />);

    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
  });

  test('should call mock API with correct parameters', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?code=test-code&state=test-state' },
      writable: true,
    });

    (storageStateOps.read as jest.Mock).mockReturnValue('test-state');
    (storageRedirectURIOps.read as jest.Mock).mockReturnValue('https://example.com/callback');

    (SelfcareAuthApiMock.oneIdentityCodeExchangeMock as jest.Mock).mockResolvedValue({
      sessionToken: 'auth-token',
    });

    render(<OneIdentityAuthCallbackPage />);

    await waitFor(() => {
      expect(SelfcareAuthApiMock.oneIdentityCodeExchangeMock).toHaveBeenCalledWith({
        code: 'test-code',
        redirectUri: 'https://example.com/callback',
      });
    });
  });

  test('should store token and redirect to success page on successful authentication', async () => {
    // Set up window.location.search with code and state
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?code=test-code&state=test-state' },
      writable: true,
    });

    // Mock stored state and redirect URI
    (storageStateOps.read as jest.Mock).mockReturnValue('test-state');
    (storageRedirectURIOps.read as jest.Mock).mockReturnValue('https://example.com/callback');

    // Mock API call
    (SelfcareAuthApiMock.oneIdentityCodeExchangeMock as jest.Mock).mockResolvedValue({
      sessionToken: 'auth-token',
    });

    render(<OneIdentityAuthCallbackPage />);

    // Wait for the promise to resolve
    await waitFor(() => {
      expect(storageTokenOps.write).toHaveBeenCalledWith('auth-token');
      expect(mockAssign).toHaveBeenCalledWith(ROUTE_LOGIN_SUCCESS);
    });
  });

  test('should redirect to error page when authentication fails', async () => {
    // Set up window.location.search with code and state
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?code=test-code&state=test-state' },
      writable: true,
    });

    // Mock stored state and redirect URI
    (storageStateOps.read as jest.Mock).mockReturnValue('test-state');
    (storageRedirectURIOps.read as jest.Mock).mockReturnValue('https://example.com/callback');

    // Mock API call to fail
    (SelfcareAuthApiMock.oneIdentityCodeExchangeMock as jest.Mock).mockRejectedValue(
      new Error('Authentication failed')
    );

    render(<OneIdentityAuthCallbackPage />);

    // Wait for the promise to reject
    await waitFor(() => {
      expect(redirectToErrorPage).toHaveBeenCalled();
    });
  });

  test('should not call API when redirectURI is missing', () => {
    // Set up window.location.search with code and state
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?code=test-code&state=test-state' },
      writable: true,
    });

    // Mock stored state but return null for redirectURI
    (storageStateOps.read as jest.Mock).mockReturnValue('test-state');
    (storageRedirectURIOps.read as jest.Mock).mockReturnValue(null);

    render(<OneIdentityAuthCallbackPage />);

    // API should not be called
    expect(SelfcareAuthApiMock.oneIdentityCodeExchangeMock).not.toHaveBeenCalled();
  });
});
