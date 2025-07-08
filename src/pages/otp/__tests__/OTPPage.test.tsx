import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from '../../../redux/store';
import OTPPage from '../OTPPage';
import OtpInput from '../components/OTPInputFields';
import { SendOTPMail } from '../components/SendOTPMail';

const user = userEvent.setup();
const store = createStore();

const mockSetErrorType = jest.fn();

// Mock window.location.assign
const mockLocationAssign = jest.fn();
Object.defineProperty(window, 'location', {
  value: {
    assign: mockLocationAssign,
  },
  writable: true,
});

describe('OTPPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders OTP page with title', () => {
    render(
      <Provider store={store}>
        <OTPPage />
      </Provider>
    );
    const pageTitle = screen.getByText('Conferma la tua identità');
    expect(pageTitle).toBeInTheDocument();
  });

  test('renders OtpInput component within the page', () => {
    render(
      <Provider store={store}>
        <OTPPage />
      </Provider>
    );
    const otpInputs = screen.getAllByRole('textbox');
    expect(otpInputs).toHaveLength(6);
  });
});

describe('OtpInput Component', () => {
  const defaultProps = {
    setErrorType: mockSetErrorType,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders 6 OTP input fields', () => {
    render(
      <Provider store={store}>
        <OtpInput {...defaultProps} />{' '}
      </Provider>
    );
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  test('accepts only numeric input', async () => {
    render(
      <Provider store={store}>
        <OtpInput {...defaultProps} />{' '}
      </Provider>
    );

    const firstInput = screen.getByLabelText('OTP character 1') as HTMLInputElement;

    // Try to enter a letter - should be rejected
    await user.type(firstInput, 'a');
    expect(firstInput.value).toBe('');

    // Try to enter a number - should be accepted
    await user.type(firstInput, '1');
    expect(firstInput.value).toBe('1');
  });

  test('automatically focuses next input when digit is entered', async () => {
    render(
      <Provider store={store}>
        <OtpInput {...defaultProps} />{' '}
      </Provider>
    );

    const firstInput = screen.getByLabelText('OTP character 1');
    const secondInput = screen.getByLabelText('OTP character 2');
    const thirdInput = screen.getByLabelText('OTP character 3');

    // Type in first input - should move focus to second
    await user.type(firstInput, '1');
    expect(secondInput).toHaveFocus();

    // Type in second input - should move focus to third
    await user.type(secondInput, '2');
    expect(thirdInput).toHaveFocus();
  });

  test('handles backspace correctly - clears current field first', async () => {
    render(
      <Provider store={store}>
        <OtpInput {...defaultProps} />{' '}
      </Provider>
    );

    const firstInput = screen.getByLabelText('OTP character 1');
    const secondInput = screen.getByLabelText('OTP character 2');

    // Fill first input and move to second
    await user.type(firstInput, '1');
    await user.type(secondInput, '2');

    // Focus back on second input and press backspace
    secondInput.focus();
    await user.keyboard('{Backspace}');

    // Second input should be cleared
    expect(secondInput).toHaveValue('');
    expect(firstInput).toHaveValue('1');
  });

  test('handles backspace on empty field - moves to previous field and clears it', async () => {
    render(
      <Provider store={store}>
        <OtpInput {...defaultProps} />{' '}
      </Provider>
    );

    const firstInput = screen.getByLabelText('OTP character 1');
    const secondInput = screen.getByLabelText('OTP character 2');

    // Fill first input and move to second
    await user.type(firstInput, '1');
    expect(secondInput).toHaveFocus();

    // Press backspace on empty second field
    await user.keyboard('{Backspace}');

    // Should move focus back to first input and clear it
    expect(firstInput).toHaveFocus();
    expect(firstInput).toHaveValue('');
  });

  test('handles paste operation - fills multiple fields with numeric data', async () => {
    render(
      <Provider store={store}>
        <OtpInput {...defaultProps} />{' '}
      </Provider>
    );

    const firstInput = screen.getByLabelText('OTP character 1');

    await user.click(firstInput);

    fireEvent.paste(firstInput, {
      clipboardData: {
        getData: (type: string) => (type === 'Text' ? '123456' : ''),
      },
    });

    expect(screen.getByLabelText('OTP character 1')).toHaveValue('1');
    expect(screen.getByLabelText('OTP character 2')).toHaveValue('2');
    expect(screen.getByLabelText('OTP character 3')).toHaveValue('3');
    expect(screen.getByLabelText('OTP character 4')).toHaveValue('4');
    expect(screen.getByLabelText('OTP character 5')).toHaveValue('5');
    expect(screen.getByLabelText('OTP character 6')).toHaveValue('6');
  });

  test('filters non-numeric characters from pasted data', async () => {
    render(
      <Provider store={store}>
        <OtpInput {...defaultProps} />{' '}
      </Provider>
    );

    const firstInput = screen.getByLabelText('OTP character 1');

    await user.click(firstInput);

    // Paste mixed content with letters and numbers
    fireEvent.paste(firstInput, {
      clipboardData: {
        getData: (type: string) => (type === 'Text' ? '1a2b3c4d' : ''),
      },
    });

    // Should only fill with numeric characters
    expect(screen.getByLabelText('OTP character 1')).toHaveValue('1');
    expect(screen.getByLabelText('OTP character 2')).toHaveValue('2');
    expect(screen.getByLabelText('OTP character 3')).toHaveValue('3');
    expect(screen.getByLabelText('OTP character 4')).toHaveValue('4');
    expect(screen.getByLabelText('OTP character 5')).toHaveValue('');
    expect(screen.getByLabelText('OTP character 6')).toHaveValue('');
  });

  test('has proper accessibility attributes', () => {
    render(
      <Provider store={store}>
        <OtpInput {...defaultProps} />{' '}
      </Provider>
    );

    // Check that all inputs have proper aria-labels
    for (let i = 1; i <= 6; i++) {
      const input = screen.getByLabelText(`OTP character ${i}`);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'tel');
      expect(input).toHaveAttribute('maxLength', '1');
    }
  });

  test('Handle error case for worng otp filled', async () => {
    render(
      <Provider store={store}>
        <OtpInput {...defaultProps} />{' '}
      </Provider>
    );

    const firstInput = screen.getByLabelText('OTP character 1');

    await user.click(firstInput);

    fireEvent.paste(firstInput, {
      clipboardData: {
        getData: (type: string) => (type === 'Text' ? '111666' : ''),
      },
    });
  });
});

describe('SendOTPMail component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <SendOTPMail errorType="expiredOtp" />
      </Provider>
    );
    expect(getByText('Richiedi un nuovo codice')).toBeInTheDocument();
  });

  test('disables button when timer is active', () => {
    const { getByText } = render(
      <Provider store={store}>
        <SendOTPMail errorType="expiredOtp" />
      </Provider>
    );
    const button = getByText('Richiedi un nuovo codice');
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });
});
