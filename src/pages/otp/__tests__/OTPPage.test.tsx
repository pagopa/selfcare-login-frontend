import { render, screen } from '@testing-library/react';
import OTPPage from '../OTPPage';

test('render OTP page', () => {
  render(<OTPPage />);
  const pageTitle = screen.getByText('Conferma la tua identità');
  expect(pageTitle).toBeDefined();
});
