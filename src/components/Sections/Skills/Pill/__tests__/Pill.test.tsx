import React from 'react';

import { render, screen } from '@testing-library/react';
import { DiReact } from 'react-icons/di';

import Pill from '../index';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('Pill', () => {
  it('renders the skill label', () => {
    render(<Pill value="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders an icon when provided', () => {
    render(<Pill value="React" icon={DiReact} />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders a fallback dot when no icon is provided', () => {
    render(<Pill value="Scrum" />);
    const dot = document.querySelector('[data-testid="pill-dot"]');
    expect(dot).toBeInTheDocument();
  });
});
