import { useTranslation } from '@/libs/translations';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaPaperPlane } from 'react-icons/fa';
import * as yup from 'yup';

// Enhanced validation schema with security considerations
const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .matches(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email is too long'),
  subject: yup
    .string()
    .max(200, 'Subject must be less than 200 characters'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = yup.InferType<typeof contactSchema>;

export default function ContactForm() {
  const { t } = useTranslation();

  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error' | 'submitting'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Refs for focus management and accessibility
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // Watch form values for character count
  const messageValue = watch('message', '');

  // Focus management for accessibility
  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      statusRef.current?.focus();
    }
  }, [submitStatus]);

  // Focus first error field when validation errors occur
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const element = formRef.current?.querySelector(`#${firstErrorField}`) as HTMLElement;
      element?.focus();
    }
  }, [errors]);

  // Rate limiting - client-side implementation
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const SUBMIT_COOLDOWN = 5000; // 5 seconds

  const onSubmit = async (data: ContactFormData) => {
    console.log("🚀 Form submission started:", { name: data.name, email: data.email });

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
      const remainingTime = Math.ceil((SUBMIT_COOLDOWN - (now - lastSubmitTime)) / 1000);
      setSubmitStatus('error');
      setErrorMessage(`Please wait ${remainingTime} seconds before submitting again.`);
      return;
    }

    setSubmitStatus('submitting');
    setErrorMessage('');

    // Input sanitization for security
    const sanitizedData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject?.trim() || '',
      message: data.message.trim(),
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Email sent successfully!");
        setSubmitStatus('success');
        setLastSubmitTime(Date.now());
        reset();
      } else {
        console.log("❌ Server error:", result.error);
        setSubmitStatus('error');
        setErrorMessage(result.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("🚨 Network error:", error);
      setSubmitStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
      setErrorMessage(errorMessage);
    }
  };

  const handleFieldFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleFieldBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="max-w-2xl">
      {/* Skip link for keyboard navigation */}
      <a
        href="#contact-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-secondary text-white px-3 py-2 rounded z-50 transition-all duration-200"
      >
        Skip to contact form
      </a>

      <div className="bg-background-2 rounded-lg p-6 sm:p-8">
        <h3
          id="contact-form-title"
          className="text-tertiary mb-6 text-xl font-semibold sm:text-2xl"
        >
          {t('contact.form.sendMeAMessage')}
        </h3>

        {/* Form instructions for screen readers */}
        <div className="sr-only" aria-live="polite">
          <p>
            This contact form has {Object.keys(errors).length > 0 ? `${Object.keys(errors).length} validation errors. ` : ''}
            Fields marked with an asterisk (*) are required.
            Use Tab to navigate between fields and Enter to submit.
          </p>
        </div>

        {/* Success Status */}
        {submitStatus === 'success' && (
          <div
            ref={statusRef}
            className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4"
            role="status"
            aria-live="polite"
            tabIndex={-1}
          >
            <div className="flex items-center">
              <svg
                className="mr-2 h-5 w-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="font-medium text-green-800">
                Thank you! Your message has been sent successfully.
              </p>
            </div>
          </div>
        )}

        {/* Error Status */}
        {submitStatus === 'error' && (
          <div
            ref={statusRef}
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4"
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
          >
            <div className="flex items-center">
              <svg
                className="mr-2 h-5 w-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="font-medium text-red-800">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          id="contact-form"
          aria-labelledby="contact-form-title"
          noValidate
        >
          <fieldset disabled={submitStatus === 'submitting'} className="space-y-6">
            <legend className="sr-only">Contact form fields</legend>

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="text-tertiary mb-2 block text-sm font-medium"
              >
                {t('contact.form.name')} <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                disabled={isSubmitting || submitStatus === 'submitting'}
                className={`bg-background w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.name
                    ? 'border-red-500 focus:ring-red-500'
                    : focusedField === 'name'
                      ? 'border-secondary focus:ring-secondary'
                      : 'border-gray-300 focus:ring-secondary hover:border-gray-200'
                  }`}
                placeholder={t('contact.form.placeholder.name')}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error name-help' : 'name-help'}
                aria-required="true"
                autoComplete="name"
                onFocus={() => handleFieldFocus('name')}
                onBlur={handleFieldBlur}
              />
              <div id="name-help" className="sr-only">
                {t('contact.form.name.help')}
              </div>
              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1 text-sm text-red-500"
                  role="alert"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-tertiary mb-2 block text-sm font-medium"
              >
                {t('contact.form.email')} <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                disabled={isSubmitting || submitStatus === 'submitting'}
                className={`bg-background w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : focusedField === 'email'
                      ? 'border-secondary focus:ring-secondary'
                      : 'border-gray-300 focus:ring-secondary hover:border-gray-200'
                  }`}
                placeholder="your.email@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error email-help' : 'email-help'}
                aria-required="true"
                autoComplete="email"
                onFocus={() => handleFieldFocus('email')}
                onBlur={handleFieldBlur}
              />
              <div id="email-help" className="sr-only"> 
                {t('contact.form.email.help')}
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-500"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="text-tertiary mb-2 block text-sm font-medium"
              >
                {t('contact.form.subject')}
              </label>
              <input
                type="text"
                id="subject"
                {...register('subject')}
                disabled={isSubmitting || submitStatus === 'submitting'}
                className={`bg-background w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.subject
                    ? 'border-red-500 focus:ring-red-500'
                    : focusedField === 'subject'
                      ? 'border-secondary focus:ring-secondary'
                      : 'border-gray-300 focus:ring-secondary hover:border-gray-200'
                  }`}
                placeholder={t('contact.form.placeholder.subject')}
                aria-invalid={errors.subject ? 'true' : 'false'}
                aria-describedby={errors.subject ? 'subject-error subject-help' : 'subject-help'}
                autoComplete="off"
                onFocus={() => handleFieldFocus('subject')}
                onBlur={handleFieldBlur}
              />
              <div id="subject-help" className="sr-only">
                {t('contact.form.subject.help')}
              </div>
              {errors.subject && (
                <p
                  id="subject-error"
                  className="mt-1 text-sm text-red-500"
                  role="alert"
                >
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="message"
                  className="text-tertiary block text-sm font-medium"
                >
                  {t('contact.form.message')} <span className="text-red-500" aria-label="required">*</span>
                </label>
                <span
                  className={`text-xs transition-colors duration-200 ${messageValue.length > 1800
                      ? 'text-yellow-400'
                      : messageValue.length > 1950
                        ? 'text-red-400'
                        : 'text-gray-400'
                    }`}
                  aria-live="polite"
                  aria-label={`Character count: ${messageValue.length} of 2000`}
                >
                  {messageValue.length}/2000
                </span>
              </div>
              <textarea
                id="message"
                {...register('message')}
                disabled={isSubmitting || submitStatus === 'submitting'}
                rows={6}
                className={`bg-background resize-vertical w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.message
                    ? 'border-red-500 focus:ring-red-500'
                    : focusedField === 'message'
                      ? 'border-secondary focus:ring-secondary'
                      : 'border-gray-300 focus:ring-secondary hover:border-gray-200'
                  }`}
                placeholder={t('contact.form.placeholder.message')}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={
                  errors.message ? 'message-error message-help' : 'message-help'
                }
                aria-required="true"
                onFocus={() => handleFieldFocus('message')}
                onBlur={handleFieldBlur}
              />
                <div id="message-help" className="sr-only">
                  {t('contact.form.message.help')}.
                </div>
              {errors.message && (
                <p
                  id="message-error"
                  className="mt-1 text-sm text-red-500"
                  role="alert"
                >
                  {errors.message.message}
                </p>
              )}
            </div>
          </fieldset>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || submitStatus === 'submitting'}
            className="bg-secondary hover:bg-secondary/90 disabled:bg-secondary/50 focus:ring-secondary focus:ring-offset-background-2 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-all duration-200 focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed focus:outline-none"
            aria-describedby="submit-help"
          >
            {isSubmitting || submitStatus === 'submitting' ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>{t('contact.form.sending')}</span>
              </>
            ) : (
              <>
                <FaPaperPlane className="h-4 w-4" aria-hidden="true" />
                <span>{t('contact.form.send')}</span>
              </>
            )}
          </button>
          <div id="submit-help" className="sr-only">
            {t('contact.form.help')}
          </div>
        </form>
      </div>
    </div>
  );
}
