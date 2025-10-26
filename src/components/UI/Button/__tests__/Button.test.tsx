import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from '../index';

// Mock icon component for testing
const MockIcon = () => <svg data-testid="mock-icon" />;

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  it('renders with custom text', () => {
    render(<Button>Custom Text</Button>);

    expect(
      screen.getByRole('button', { name: /custom text/i })
    ).toBeInTheDocument();
  });

  it('handles onClick event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders with icon', () => {
    render(<Button icon={MockIcon}>Button with Icon</Button>);

    const button = screen.getByRole('button');
    const iconSpan = button.querySelector('span[aria-hidden]');
    expect(iconSpan).toBeInTheDocument();
    expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders icon and text with proper spacing', () => {
    render(<Button icon={MockIcon}>Button with Icon</Button>);

    const icon = screen.getByTestId('mock-icon');
    const textSpan = screen.getByText('Button with Icon');

    expect(icon).toBeInTheDocument();
    expect(textSpan).toHaveClass('ml-2');
  });

  it('renders without icon spacing when no icon provided', () => {
    render(<Button>No Icon Button</Button>);

    const textSpan = screen.getByText('No Icon Button');
    expect(textSpan).not.toHaveClass('ml-2');
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
