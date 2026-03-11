import { render, screen } from '@testing-library/react';
import { LoadingWidget } from './LoadingWidget';

describe('LoadingWidget', () => {
  it('renders with default message and size', () => {
    render(<LoadingWidget />);
    const widget = screen.getByRole('status');
    expect(widget).toBeInTheDocument();
    expect(widget).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders custom message', () => {
    render(<LoadingWidget message="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('renders as popup when popup=true', () => {
    const { container } = render(<LoadingWidget popup message="Popup" />);
    expect(container.querySelector('.loading-popup')).not.toBeNull();
  });
});

