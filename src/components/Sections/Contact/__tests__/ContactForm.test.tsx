import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import ContactForm from '../ContactForm';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

jest.mock('@/libs/translations', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'contact.form.sendMeAMessage': 'Send me a message',
        'contact.form.fields': 'Contact form fields',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.send': 'Send Message',
        'contact.form.sending': 'Sending...',
        'contact.form.success':
          'Thank you! Your message has been sent successfully!',
        'contact.form.placeholder.name': 'Your full name',
        'contact.form.placeholder.subject': 'What is this about?',
        'contact.form.placeholder.message': 'Your message here...',
        'contact.form.name.help': 'Enter your full name',
        'contact.form.email.help': 'Enter a valid email address',
        'contact.form.subject.help': 'Optional subject line',
        'contact.form.message.help': 'Enter your message',
        'contact.form.has': 'This form has ',
        'contact.form.validation.errors': 'validation errors',
        'contact.form.instructions': 'Fill in all required fields',
        'contact.form.help': 'Click to submit the form',
      };
      return map[key] ?? key;
    },
    language: 'en',
    changeLanguage: jest.fn(),
  }),
}));

jest.mock('react-icons/fa', () => ({
  FaPaperPlane: () => <svg data-testid="icon-paper-plane" />,
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VALID_FORM = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Hello there',
  message: 'This is a valid message with enough characters.',
};

// NOTE: getByLabelText(/message/i) matches multiple elements because the form
// has aria-labelledby="contact-form-title" whose text is "Send me a message".
// Use getByRole('textbox', { name: /message/i }) to target only the textarea.
const getMessageField = () => screen.getByRole('textbox', { name: /message/i });

// NOTE: the component renders onBlur={handleFieldBlur} AFTER {...register(...)},
// which overrides react-hook-form's blur handler. Validation therefore only
// runs on form submit. All validation tests trigger via submit.
function clickSubmit() {
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/^name/i), {
    target: { value: VALID_FORM.name },
  });
  fireEvent.change(screen.getByLabelText(/^email/i), {
    target: { value: VALID_FORM.email },
  });
  fireEvent.change(screen.getByLabelText(/^subject/i), {
    target: { value: VALID_FORM.subject },
  });
  fireEvent.change(getMessageField(), {
    target: { value: VALID_FORM.message },
  });
}

// ---------------------------------------------------------------------------
// Unit tests — initial render
// ---------------------------------------------------------------------------

describe('ContactForm — unit tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('renders the form heading', () => {
      render(<ContactForm />);
      expect(screen.getByText('Send me a message')).toBeInTheDocument();
    });

    it('renders all four fields', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^subject/i)).toBeInTheDocument();
      expect(getMessageField()).toBeInTheDocument();
    });

    it('renders the submit button with send icon', () => {
      render(<ContactForm />);
      expect(
        screen.getByRole('button', { name: /send message/i })
      ).toBeInTheDocument();
      expect(screen.getByTestId('icon-paper-plane')).toBeInTheDocument();
    });

    it('renders the skip-link for keyboard navigation', () => {
      render(<ContactForm />);
      expect(screen.getByText('Skip to contact form')).toBeInTheDocument();
    });

    it('form has accessible aria-labelledby linking to heading', () => {
      render(<ContactForm />);
      const form = document.getElementById('contact-form');
      expect(form).toHaveAttribute('aria-labelledby', 'contact-form-title');
    });

    it('does not show success or error banners initially', () => {
      render(<ContactForm />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      // only validation inline alerts, not the banner
      expect(
        screen.queryByRole('alert', { name: /server|network/i })
      ).not.toBeInTheDocument();
    });

    it('shows 0/2000 character count for message initially', () => {
      render(<ContactForm />);
      expect(screen.getByText('0/2000')).toBeInTheDocument();
    });
  });

  describe('accessibility attributes', () => {
    it('required fields have aria-required="true"', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/^name/i)).toHaveAttribute(
        'aria-required',
        'true'
      );
      expect(screen.getByLabelText(/^email/i)).toHaveAttribute(
        'aria-required',
        'true'
      );
      expect(getMessageField()).toHaveAttribute('aria-required', 'true');
    });

    it('required fields start with aria-invalid="false"', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/^name/i)).toHaveAttribute(
        'aria-invalid',
        'false'
      );
      expect(screen.getByLabelText(/^email/i)).toHaveAttribute(
        'aria-invalid',
        'false'
      );
      expect(getMessageField()).toHaveAttribute('aria-invalid', 'false');
    });

    it('submit button has aria-describedby="submit-help"', () => {
      render(<ContactForm />);
      expect(
        screen.getByRole('button', { name: /send message/i })
      ).toHaveAttribute('aria-describedby', 'submit-help');
    });

    it('name input has autocomplete="name"', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/^name/i)).toHaveAttribute(
        'autocomplete',
        'name'
      );
    });

    it('email input has autocomplete="email"', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/^email/i)).toHaveAttribute(
        'autocomplete',
        'email'
      );
    });
  });

  describe('character counter', () => {
    it('updates counter as user types in message field', async () => {
      render(<ContactForm />);
      fireEvent.change(getMessageField(), { target: { value: 'Hello world' } });
      await waitFor(() =>
        expect(screen.getByText('11/2000')).toBeInTheDocument()
      );
    });

    it('updates counter incrementally', async () => {
      render(<ContactForm />);
      const textarea = getMessageField();

      fireEvent.change(textarea, { target: { value: 'Hello' } });
      await waitFor(() =>
        expect(screen.getByText('5/2000')).toBeInTheDocument()
      );

      fireEvent.change(textarea, { target: { value: 'Hello World' } });
      await waitFor(() =>
        expect(screen.getByText('11/2000')).toBeInTheDocument()
      );

      fireEvent.change(textarea, { target: { value: '' } });
      await waitFor(() =>
        expect(screen.getByText('0/2000')).toBeInTheDocument()
      );
    });
  });
});

// ---------------------------------------------------------------------------
// Validation tests
// NOTE: validation fires on submit (not on blur) because onBlur={handleFieldBlur}
// overrides react-hook-form's registered blur handler.
// ---------------------------------------------------------------------------

describe('ContactForm — validation', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it('shows required error for empty name on submit', async () => {
    render(<ContactForm />);
    clickSubmit();
    await waitFor(() =>
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    );
  });

  it('shows min-length error for name with 1 char', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/^name/i), {
      target: { value: 'A' },
    });
    clickSubmit();
    await waitFor(() =>
      expect(
        screen.getByText('Name must be at least 2 characters')
      ).toBeInTheDocument()
    );
  });

  it('shows invalid character error for name containing numbers', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/^name/i), {
      target: { value: 'John123' },
    });
    clickSubmit();
    await waitFor(() =>
      expect(
        screen.getByText('Name contains invalid characters')
      ).toBeInTheDocument()
    );
  });

  it('sets aria-invalid="true" on name field after submit with invalid value', async () => {
    render(<ContactForm />);
    clickSubmit();
    const nameInput = screen.getByLabelText(/^name/i);
    await waitFor(() =>
      expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    );
  });

  it('shows required error for empty email on submit', async () => {
    render(<ContactForm />);
    clickSubmit();
    await waitFor(() =>
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    );
  });

  it('shows invalid format error for bad email', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/^email/i), {
      target: { value: 'not-an-email' },
    });
    clickSubmit();
    await waitFor(() =>
      expect(
        screen.getByText('Please enter a valid email address')
      ).toBeInTheDocument()
    );
  });

  it('sets aria-invalid="true" on email field after submit with invalid value', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/^email/i), {
      target: { value: 'bad-email' },
    });
    clickSubmit();
    await waitFor(() =>
      expect(screen.getByLabelText(/^email/i)).toHaveAttribute(
        'aria-invalid',
        'true'
      )
    );
  });

  it('shows required error for empty message on submit', async () => {
    render(<ContactForm />);
    clickSubmit();
    await waitFor(() =>
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    );
  });

  it('shows min-length error for message with fewer than 10 chars', async () => {
    render(<ContactForm />);
    fireEvent.change(getMessageField(), { target: { value: 'Short' } });
    clickSubmit();
    await waitFor(() =>
      expect(
        screen.getByText('Message must be at least 10 characters')
      ).toBeInTheDocument()
    );
  });

  it('does not show subject error when subject is left empty (optional)', async () => {
    render(<ContactForm />);
    clickSubmit();
    // Wait for other errors to appear so we know validation ran
    await waitFor(() =>
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    );
    expect(screen.queryByText(/subject.*required/i)).not.toBeInTheDocument();
  });

  it('shows error when subject exceeds 200 characters', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/^subject/i), {
      target: { value: 'A'.repeat(201) },
    });
    clickSubmit();
    await waitFor(() =>
      expect(
        screen.getByText('Subject must be less than 200 characters')
      ).toBeInTheDocument()
    );
  });

  it('validation error messages have role="alert"', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/^name/i), {
      target: { value: 'A' },
    });
    clickSubmit();
    await waitFor(() =>
      expect(
        screen.getByText('Name must be at least 2 characters')
      ).toHaveAttribute('role', 'alert')
    );
  });

  it('accepts valid name with hyphens, apostrophes, and dots', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/^name/i), {
      target: { value: "O'Brien-Smith Jr." },
    });
    clickSubmit();
    // Wait for validation to run (other required fields will error)
    await waitFor(() =>
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    );
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Name contains invalid characters')
    ).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Integration tests — submit flow
// ---------------------------------------------------------------------------

describe('ContactForm — integration (submit flow)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls fetch with correct payload on valid submission', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'sent' }),
    });

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/send',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            name: VALID_FORM.name,
            email: VALID_FORM.email,
            subject: VALID_FORM.subject,
            message: VALID_FORM.message,
          }),
        })
      )
    );
  });

  it('shows success banner after successful submission', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() =>
      expect(
        screen.getByText('Thank you! Your message has been sent successfully!')
      ).toBeInTheDocument()
    );
  });

  it('success banner has role="status" and aria-live="polite"', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() => {
      const banner = screen.getByRole('status');
      expect(banner).toBeInTheDocument();
      expect(banner).toHaveAttribute('aria-live', 'polite');
    });
  });

  it('resets form fields to empty after successful submission', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());

    expect(screen.getByLabelText(/^name/i)).toHaveValue('');
    expect(screen.getByLabelText(/^email/i)).toHaveValue('');
    expect(getMessageField()).toHaveValue('');
  });

  it('shows server error message when response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal server error' }),
    });

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() =>
      expect(screen.getByText('Internal server error')).toBeInTheDocument()
    );
  });

  it('falls back to status code message when server returns no error text', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 503,
      json: async () => ({}),
    });

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() =>
      expect(screen.getByText('Server error: 503')).toBeInTheDocument()
    );
  });

  it('error banner has role="alert" and aria-live="assertive"', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Oops' }),
    });

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });
  });

  it('shows network error message when fetch rejects with an Error', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() =>
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument()
    );
  });

  it('shows generic message when fetch throws a non-Error value', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce('unknown failure');

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() =>
      expect(screen.getByText('Network error occurred')).toBeInTheDocument()
    );
  });

  it('disables submit button and shows spinner while submitting', async () => {
    let resolveRequest!: (v: unknown) => void;
    global.fetch = jest.fn().mockReturnValue(
      new Promise(res => {
        resolveRequest = res;
      })
    );

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() => {
      const btn = screen.getByRole('button', { name: /sending/i });
      expect(btn).toBeDisabled();
    });

    expect(screen.getByText('Sending...')).toBeInTheDocument();

    // Resolve and let state settle
    resolveRequest({ ok: true, json: async () => ({}) });
    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
  });

  it('disables all form fields while submitting', async () => {
    let resolveRequest!: (v: unknown) => void;
    global.fetch = jest.fn().mockReturnValue(
      new Promise(res => {
        resolveRequest = res;
      })
    );

    render(<ContactForm />);
    fillValidForm();
    clickSubmit();

    await waitFor(() => expect(screen.getByLabelText(/^name/i)).toBeDisabled());

    expect(screen.getByLabelText(/^email/i)).toBeDisabled();
    expect(getMessageField()).toBeDisabled();

    // Resolve and let state settle
    resolveRequest({ ok: true, json: async () => ({}) });
    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
  });

  it('does not call fetch when the form is submitted with invalid data', async () => {
    global.fetch = jest.fn();

    render(<ContactForm />);
    // Submit without filling any field
    clickSubmit();

    await waitFor(() =>
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    );

    expect(global.fetch).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Integration tests — field interaction after validation
// ---------------------------------------------------------------------------

describe('ContactForm — field interaction', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it('clears name validation error when corrected after submit', async () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/^name/i);

    // Trigger validation via submit
    fireEvent.change(nameInput, { target: { value: 'A' } });
    clickSubmit();

    await waitFor(() =>
      expect(
        screen.getByText('Name must be at least 2 characters')
      ).toBeInTheDocument()
    );

    // Fix the value — reValidateMode: 'onChange' should clear the error
    fireEvent.change(nameInput, { target: { value: 'Alice' } });

    await waitFor(() =>
      expect(
        screen.queryByText('Name must be at least 2 characters')
      ).not.toBeInTheDocument()
    );
  });

  it('clears email validation error when a valid email is entered after submit', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/^email/i);

    fireEvent.change(emailInput, { target: { value: 'bad-email' } });
    clickSubmit();

    await waitFor(() =>
      expect(
        screen.getByText('Please enter a valid email address')
      ).toBeInTheDocument()
    );

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });

    await waitFor(() =>
      expect(
        screen.queryByText('Please enter a valid email address')
      ).not.toBeInTheDocument()
    );
  });

  it('submits successfully when subject is omitted', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/^name/i), {
      target: { value: VALID_FORM.name },
    });
    fireEvent.change(screen.getByLabelText(/^email/i), {
      target: { value: VALID_FORM.email },
    });
    // subject intentionally omitted
    fireEvent.change(getMessageField(), {
      target: { value: VALID_FORM.message },
    });

    clickSubmit();

    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
