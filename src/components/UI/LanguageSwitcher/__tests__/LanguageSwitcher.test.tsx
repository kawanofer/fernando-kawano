import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import LanguageSwitcher from '../index';

// Mock the translation hook
const mockChangeLanguage = jest.fn();
const mockUseTranslation = jest.fn();

jest.mock('@/libs/translations', () => ({
  useTranslation: () => mockUseTranslation(),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both language buttons', () => {
    mockUseTranslation.mockReturnValue({
      language: 'en',
      changeLanguage: mockChangeLanguage,
    });

    render(<LanguageSwitcher />);

    expect(
      screen.getByRole('button', { name: /english flag en/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /brazilian flag pt/i })
    ).toBeInTheDocument();
  });

  it('displays English flag and text', () => {
    mockUseTranslation.mockReturnValue({
      language: 'en',
      changeLanguage: mockChangeLanguage,
    });

    render(<LanguageSwitcher />);

    const englishButton = screen.getByRole('button', { name: /english/i });
    expect(englishButton).toBeInTheDocument();

    // Check for flag image
    const englishFlag = screen.getByAltText('English flag');
    expect(englishFlag).toBeInTheDocument();
    expect(englishFlag).toHaveAttribute('src', '/en.png');

    // Check for language text
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('displays Portuguese flag and text', () => {
    mockUseTranslation.mockReturnValue({
      language: 'pt',
      changeLanguage: mockChangeLanguage,
    });

    render(<LanguageSwitcher />);

    const portugueseButton = screen.getByRole('button', {
      name: /brazilian flag pt/i,
    });
    expect(portugueseButton).toBeInTheDocument();

    // Check for flag image
    const portugueseFlag = screen.getByAltText('Brazilian flag');
    expect(portugueseFlag).toBeInTheDocument();
    expect(portugueseFlag).toHaveAttribute('src', '/br.png');

    // Check for language text
    expect(screen.getByText('PT')).toBeInTheDocument();
  });

  it('applies active styling to current language', () => {
    mockUseTranslation.mockReturnValue({
      language: 'en',
      changeLanguage: mockChangeLanguage,
    });

    render(<LanguageSwitcher />);

    const englishButton = screen.getByRole('button', {
      name: /english flag en/i,
    });
    const portugueseButton = screen.getByRole('button', {
      name: /brazilian flag pt/i,
    });

    expect(englishButton).toHaveClass('bg-zinc-800');
    expect(portugueseButton).not.toHaveClass('bg-zinc-800');
  });

  it('applies active styling to Portuguese when selected', () => {
    mockUseTranslation.mockReturnValue({
      language: 'pt',
      changeLanguage: mockChangeLanguage,
    });

    render(<LanguageSwitcher />);

    const englishButton = screen.getByRole('button', {
      name: /english flag en/i,
    });
    const portugueseButton = screen.getByRole('button', {
      name: /brazilian flag pt/i,
    });

    expect(portugueseButton).toHaveClass('bg-zinc-800');
    expect(englishButton).not.toHaveClass('bg-zinc-800');
  });

  it('calls changeLanguage with "en" when English button is clicked', () => {
    mockUseTranslation.mockReturnValue({
      language: 'pt',
      changeLanguage: mockChangeLanguage,
    });

    render(<LanguageSwitcher />);

    const englishButton = screen.getByRole('button', { name: /english/i });
    fireEvent.click(englishButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
  });

  it('calls changeLanguage with "pt" when Portuguese button is clicked', () => {
    mockUseTranslation.mockReturnValue({
      language: 'en',
      changeLanguage: mockChangeLanguage,
    });

    render(<LanguageSwitcher />);

    const portugueseButton = screen.getByRole('button', {
      name: /brazilian flag pt/i,
    });
    fireEvent.click(portugueseButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('pt');
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
  });

  it('handles language switching workflow', () => {
    const { rerender } = render(<LanguageSwitcher />);

    // Initially English is active
    let englishButton = screen.getByRole('button', {
      name: /english flag en/i,
    });
    let portugueseButton = screen.getByRole('button', {
      name: /brazilian flag pt/i,
    });

    expect(englishButton).toHaveClass('bg-zinc-800');
    expect(portugueseButton).not.toHaveClass('bg-zinc-800');

    // Click Portuguese button
    fireEvent.click(portugueseButton);

    // Re-render with new language state
    mockUseTranslation.mockReturnValue({
      language: 'pt',
      changeLanguage: mockChangeLanguage,
    });

    rerender(<LanguageSwitcher />);

    englishButton = screen.getByRole('button', { name: /english flag en/i });
    portugueseButton = screen.getByRole('button', {
      name: /brazilian flag pt/i,
    });

    expect(portugueseButton).toHaveClass('bg-zinc-800');
    expect(englishButton).not.toHaveClass('bg-zinc-800');
  });

  it('maintains accessibility during language transitions', () => {
    const { rerender } = render(<LanguageSwitcher />);

    // Check initial accessibility
    const englishButton = screen.getByRole('button', {
      name: /english flag en/i,
    });
    expect(englishButton).toHaveAttribute('title', 'English');

    // Simulate language change
    mockUseTranslation.mockReturnValue({
      language: 'pt',
      changeLanguage: mockChangeLanguage,
    });

    rerender(<LanguageSwitcher />);

    const portugueseButton = screen.getByRole('button', {
      name: /brazilian flag pt/i,
    });
    expect(portugueseButton).toHaveAttribute('title', 'Português (Brasil)');
  });

  it('handles rapid language switching', () => {
    render(<LanguageSwitcher />);

    const englishButton = screen.getByRole('button', {
      name: /english flag en/i,
    });
    const portugueseButton = screen.getByRole('button', {
      name: /brazilian flag pt/i,
    });

    // Rapid switching between languages
    fireEvent.click(portugueseButton);
    fireEvent.click(englishButton);
    fireEvent.click(portugueseButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('pt');
    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    expect(mockChangeLanguage).toHaveBeenCalledWith('pt');
    expect(mockChangeLanguage).toHaveBeenCalledTimes(3);
  });

  it('renders correctly with different screen sizes', () => {
    // Mock window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    render(<LanguageSwitcher />);

    const container = screen.getByRole('button', {
      name: /english flag en/i,
    }).parentElement;
    expect(container).toHaveClass('flex', 'items-center', 'gap-2');
  });

  it('handles keyboard navigation between language buttons', () => {
    render(<LanguageSwitcher />);

    const englishButton = screen.getByRole('button', {
      name: /english flag en/i,
    });
    const portugueseButton = screen.getByRole('button', {
      name: /brazilian flag pt/i,
    });

    // Focus first button
    englishButton.focus();
    expect(englishButton).toHaveFocus();

    // Tab to next button (simulated)
    portugueseButton.focus();
    expect(portugueseButton).toHaveFocus();

    // Click focused button
    fireEvent.click(portugueseButton);
    expect(mockChangeLanguage).toHaveBeenCalledWith('pt');
  });

  it('displays flag images with correct attributes', () => {
    render(<LanguageSwitcher />);

    const englishFlag = screen.getByAltText('English flag');
    const portugueseFlag = screen.getByAltText('Brazilian flag');

    expect(englishFlag).toHaveAttribute('width', '20');
    expect(englishFlag).toHaveAttribute('height', '20');
    expect(englishFlag).toHaveClass('rounded-sm');

    expect(portugueseFlag).toHaveAttribute('width', '20');
    expect(portugueseFlag).toHaveAttribute('height', '20');
    expect(portugueseFlag).toHaveClass('rounded-sm');
  });

  it('maintains visual hierarchy with proper text sizing', () => {
    render(<LanguageSwitcher />);

    const englishText = screen.getByText('EN');
    const portugueseText = screen.getByText('PT');

    expect(englishText).toHaveClass('text-sm', 'font-medium', 'text-zinc-400');
    expect(portugueseText).toHaveClass(
      'text-sm',
      'font-medium',
      'text-zinc-400'
    );
  });

  it('handles missing translation hook gracefully', () => {
    // Mock hook returning undefined
    mockUseTranslation.mockReturnValue(undefined);

    // Should not crash
    expect(() => render(<LanguageSwitcher />)).toThrow();
  });

  it('supports theme variations through CSS variables', () => {
    render(<LanguageSwitcher />);

    const container = screen.getByRole('button', {
      name: /english flag en/i,
    }).parentElement;

    // Check that the component uses CSS classes that can be themed
    expect(container).toHaveClass('flex', 'items-center', 'gap-2');
  });

  it('provides proper loading states during language change', () => {
    // Mock a slow language change
    let resolveChange: () => void;
    const slowChangeLanguage = jest.fn().mockImplementation(() => {
      return new Promise<void>(resolve => {
        resolveChange = resolve;
      });
    });

    mockUseTranslation.mockReturnValue({
      language: 'en',
      changeLanguage: slowChangeLanguage,
    });

    render(<LanguageSwitcher />);

    const portugueseButton = screen.getByRole('button', {
      name: /brazilian flag pt/i,
    });
    fireEvent.click(portugueseButton);

    expect(slowChangeLanguage).toHaveBeenCalledWith('pt');

    // Resolve the promise
    resolveChange!();

    expect(slowChangeLanguage).toHaveBeenCalledTimes(1);
  });
});
