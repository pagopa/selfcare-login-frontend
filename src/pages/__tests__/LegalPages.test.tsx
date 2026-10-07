import { fireEvent, render, screen } from '@testing-library/react';
import PrivacyPolicyPage from '../PrivacyPolicyPage';
import TermsAndConditionsPage from '../TermsAndConditionsPage';
import { ENV } from '../../utils/env';
import '../../locale';

test.each([
  [PrivacyPolicyPage, ENV.OT.TOS_RESOURCE],
  [TermsAndConditionsPage, ENV.OT.RESOURCE_TERMS_AND_CONDITION],
])('retains the legal notice resource and script configuration', async (Page, resource) => {
  const loadNotices = vi.fn();
  vi.stubGlobal('OneTrust', {
    NoticeApi: {
      Initialized: Promise.resolve(),
      LoadNotices: loadNotices,
    },
  });
  const { unmount } = render(<Page />);
  const script = document.getElementById('otprivacy-notice-script');
  expect(script).toHaveAttribute('src', ENV.OT.SRC);
  expect(script).toHaveProperty('settings', ENV.OT.TOKEN);
  if (!script) {
    throw new Error('Missing OneTrust notice script');
  }
  fireEvent.load(script);
  await vi.waitFor(() => expect(loadNotices).toHaveBeenCalledWith([resource]));
  unmount();
  expect(document.getElementById('otprivacy-notice-script')).toBeNull();
});

test('retains the privacy page base target and browser back behavior', () => {
  const base = document.createElement('base');
  document.head.appendChild(base);
  const back = vi.spyOn(history, 'back').mockImplementation(() => undefined);
  const { unmount } = render(<PrivacyPolicyPage />);
  expect(base.getAttribute('href')).toBe('/auth/informativa-privacy');
  expect(base.target).toBe('_self');
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('accesskey', 'b');
  fireEvent.click(button);
  expect(back).toHaveBeenCalledTimes(1);
  unmount();
  base.remove();
  back.mockRestore();
});
