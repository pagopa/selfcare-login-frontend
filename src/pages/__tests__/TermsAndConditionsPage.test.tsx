import { render } from '@testing-library/react';
import { Mock } from 'vitest';
import { useOneTrustNotice } from '../../hooks/useOneTrustNotice';
import TermsAndConditionsPage from '../TermsAndConditionsPage';

vi.mock('../../hooks/useOneTrustNotice', () => ({
  useOneTrustNotice: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

test('renders the OneTrust notice container using the noticeId returned by the hook', () => {
  (useOneTrustNotice as Mock).mockReturnValue({
    noticeId: '6f92cced-3bd1-4859-9295-baecfc74c64a',
    isBackstage: false,
  });

  render(<TermsAndConditionsPage />);

  expect(
    document.getElementById('otnotice-6f92cced-3bd1-4859-9295-baecfc74c64a')
  ).toBeInTheDocument();
});

test('does not render the language dropdown when reached outside a backstage context', () => {
  (useOneTrustNotice as Mock).mockReturnValue({
    noticeId: '6f92cced-3bd1-4859-9295-baecfc74c64a',
    isBackstage: false,
  });

  render(<TermsAndConditionsPage />);

  expect(document.querySelector('.ot-privacy-notice-language-dropdown-container')).toBeNull();
});

test('renders the language dropdown when reached from a backstage context', () => {
  (useOneTrustNotice as Mock).mockReturnValue({
    noticeId: '6f92cced-3bd1-4859-9295-baecfc74c64a',
    isBackstage: true,
  });

  render(<TermsAndConditionsPage />);

  expect(
    document.querySelector('.ot-privacy-notice-language-dropdown-container')
  ).toBeInTheDocument();
});

test('passes the normal and backstage configs to the hook, with an empty backstage noticeId', () => {
  (useOneTrustNotice as Mock).mockReturnValue({
    noticeId: '6f92cced-3bd1-4859-9295-baecfc74c64a',
    isBackstage: false,
  });

  render(<TermsAndConditionsPage />);

  expect(useOneTrustNotice).toHaveBeenCalledWith(
    expect.anything(),
    expect.objectContaining({ noticeId: '6f92cced-3bd1-4859-9295-baecfc74c64a' }),
    expect.objectContaining({ noticeId: '' })
  );
});
