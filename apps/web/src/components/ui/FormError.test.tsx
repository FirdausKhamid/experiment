import { render, screen } from '@testing-library/react';
import { FormError } from './FormError';

const failure = {
  _isFailure: true,
  type: 'API_ERROR',
  statusCode: 400,
  message: 'Something went wrong',
} as any;

describe('FormError', () => {
  it('renders nothing when error is null', () => {
    const { container } = render(<FormError error={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders message string', () => {
    render(<FormError error={failure} />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders first message when array', () => {
    const arrayFailure = { ...failure, message: ['first', 'second'] } as any;
    render(<FormError error={arrayFailure} />);
    expect(screen.getByText('first')).toBeInTheDocument();
  });
});

