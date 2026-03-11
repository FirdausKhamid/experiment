import { fireEvent, render, screen } from '@testing-library/react';
import { SideModal } from './SideModal';

describe('SideModal', () => {
  it('returns null when closed', () => {
    const { container } = render(<SideModal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders title, description and children when open', () => {
    render(
      <SideModal
        isOpen
        title="Title"
        description="Description"
        onClose={() => {}}
      >
        <p>Body</p>
      </SideModal>,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    const { container } = render(
      <SideModal isOpen title="Title" onClose={onClose}>
        <p>Body</p>
      </SideModal>,
    );

    const backdrop = container.querySelector('.side-modal-backdrop')!;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });
});

