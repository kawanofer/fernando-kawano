import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import SectionTitle from '../index';

describe('SectionTitle', () => {
  it('renders the title text correctly', () => {
    render(<SectionTitle title="Test Section" />);

    expect(screen.getByText('Test Section')).toBeInTheDocument();
  });

  it('renders as an h2 element', () => {
    render(<SectionTitle title="Test Section" />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Section');
  });

  it('handles empty title gracefully', () => {
    render(<SectionTitle title="" />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('');
  });

  it('handles long titles', () => {
    const longTitle =
      'This is a very long title that should still render correctly and maintain all the styling and functionality of the component without any issues';
    render(<SectionTitle title={longTitle} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('handles titles with line breaks', () => {
    const titleWithBreaks = 'Title with\nline breaks';
    render(<SectionTitle title={titleWithBreaks} />);

    // React normalizes whitespace, so check that the heading contains the text
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Title with');
    expect(heading).toHaveTextContent('line breaks');
  });
});
