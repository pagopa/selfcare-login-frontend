import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import appI18n from 'i18next';
import sharedI18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import { ReleaseFooter } from '../ReleaseFooter';
import { ENV } from '../../utils/env';
import '../../locale';

const originalLocation = window.location;
const assign = vi.fn();

beforeAll(async () => {
  Object.defineProperty(window, 'location', {
    value: { ...originalLocation, assign },
  });
  await sharedI18n.changeLanguage('it');
});

afterAll(() => {
  Object.defineProperty(window, 'location', { value: originalLocation });
  vi.restoreAllMocks();
});

test('uses one i18next instance for the app and shared components', async () => {
  expect(sharedI18n).toBe(appI18n);
  await appI18n.changeLanguage('en');
  expect(sharedI18n.language).toBe('en');
  await appI18n.changeLanguage('it');
});

test.each([{}, { ctrlKey: true }, { metaKey: true }])(
  'preserves the release privacy destination and same-tab click behavior %j',
  async (modifiers) => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<ReleaseFooter />);
    const link = await screen.findByRole('link', { name: /Informativa Privacy/ });
    expect(link).toHaveAttribute('href', ENV.URL_FOOTER.PRIVACY_DISCLAIMER);

    fireEvent.click(link, modifiers);

    expect(assign).toHaveBeenCalledWith(ENV.URL_FOOTER.PRIVACY_DISCLAIMER);
    expect(open).not.toHaveBeenCalled();
  }
);

test('does not intercept the shared terms link', async () => {
  render(<ReleaseFooter />);
  const link = await screen.findByRole('link', { name: /Termini e Condizioni/ });
  expect(link).toHaveAttribute('href', ENV.URL_FOOTER.TERMS_AND_CONDITIONS);
  const event = createEvent.click(link);
  event.preventDefault();
  fireEvent(link, event);
  expect(assign).toHaveBeenCalledWith(ENV.URL_FOOTER.TERMS_AND_CONDITIONS);
});
