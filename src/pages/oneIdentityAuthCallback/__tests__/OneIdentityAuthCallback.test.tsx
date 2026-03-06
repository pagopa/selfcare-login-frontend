import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';
import { SelfcareAuthApiMock } from '../../../api/__mocks__/SelfcareAuthApiClient';
import { ROUTE_LOGIN_SUCCESS, ROUTE_OTP } from '../../../utils/constants';
import {
  storageMaskedEmailOps,
  storageRedirectURIOps,
  storageStateOps,
} from '../../../utils/storage';
import { redirectToErrorPage } from '../../../utils/utils';
import OneIdentityAuthCallbackPage from '../OneIdentityAuthCallback';

vi.mock('@pagopa/selfcare-common-frontend/lib/utils/storage', () => ({
  storageTokenOps: {
    write: vi.fn(),
  },
}));

vi.mock('../../../api/__mocks__/SelfcareAuthApiClient', () => ({
  SelfcareAuthApiMock: {
    oneIdentityCodeExchangeMock: vi.fn(),
  },
}));

process.env.VITE_APP_API_MOCK = 'true';

vi.mock('../../../utils/storage', () => ({
  storageStateOps: {
    read: vi.fn(),
  },
  storageRedirectURIOps: {
    read: vi.fn(),
  },
  storageMaskedEmailOps: {
    write: vi.fn(),
  },
  storageOTPSessionUidOps: {
    write: vi.fn(),
  },
}));

vi.mock('../../../utils/utils', () => ({
  redirectToErrorPage: vi.fn(),
}));

vi.mock('@pagopa/selfcare-common-frontend/lib', () => ({
  LoadingOverlayComponent: () => <div data-testid="loading-overlay">Loading...</div>,
}));

const originalWindow = { ...window };
const mockAssign = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

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

    (storageStateOps.read as Mock).mockReturnValue('test-state');

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

    (storageStateOps.read as Mock).mockReturnValue('correct-state');

    render(<OneIdentityAuthCallbackPage />);

    expect(redirectToErrorPage).toHaveBeenCalled();
  });

  test('should show loading overlay when validations pass', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?code=test-code&state=test-state' },
      writable: true,
    });

    (storageStateOps.read as Mock).mockReturnValue('test-state');
    (storageRedirectURIOps.read as Mock).mockReturnValue('https://example.com/callback');

    (SelfcareAuthApiMock.oneIdentityCodeExchangeMock as Mock).mockResolvedValue({
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

    (storageStateOps.read as Mock).mockReturnValue('test-state');
    (storageRedirectURIOps.read as Mock).mockReturnValue('https://example.com/callback');

    (SelfcareAuthApiMock.oneIdentityCodeExchangeMock as Mock).mockResolvedValue({
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
    (storageStateOps.read as Mock).mockReturnValue('test-state');
    (storageRedirectURIOps.read as Mock).mockReturnValue('https://example.com/callback');

    // Mock API call
    (SelfcareAuthApiMock.oneIdentityCodeExchangeMock as Mock).mockResolvedValue({
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
    (storageStateOps.read as Mock).mockReturnValue('test-state');
    (storageRedirectURIOps.read as Mock).mockReturnValue('https://example.com/callback');

    // Mock API call to fail
    (SelfcareAuthApiMock.oneIdentityCodeExchangeMock as Mock).mockRejectedValue(
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
    (storageStateOps.read as Mock).mockReturnValue('test-state');
    (storageRedirectURIOps.read as Mock).mockReturnValue(null);

    render(<OneIdentityAuthCallbackPage />);

    // API should not be called
    expect(SelfcareAuthApiMock.oneIdentityCodeExchangeMock).not.toHaveBeenCalled();
  });

  test('should redirect to otp page when requiredOtp is true in the token exchange response', async () => {
    // Set up window.location.search with code and state
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?code=test-otp-code&state=test-state' },
      writable: true,
    });

    // Mock stored state. Value test-otp-code is used to trigger the oidcExchange response with requiresOtpFlow=true
    (storageStateOps.read as Mock).mockReturnValue('test-otp-code');
    (storageRedirectURIOps.read as Mock).mockReturnValue('https://example.com/callback');
    (storageStateOps.read as Mock).mockReturnValue('test-state');

    (SelfcareAuthApiMock.oneIdentityCodeExchangeMock as Mock).mockResolvedValue({
      requiresOtpFlow: true,
      otpSessionUid: 'otpSessionUidTest',
      maskedEmail: 'mask**Email***@email.comTest',
    });

    render(<OneIdentityAuthCallbackPage />);
    await waitFor(() => {
      expect(storageMaskedEmailOps.write).toHaveBeenCalledWith('mask**Email***@email.comTest');
      expect(mockAssign).toHaveBeenCalledWith(ROUTE_OTP);
    });
  });
});
