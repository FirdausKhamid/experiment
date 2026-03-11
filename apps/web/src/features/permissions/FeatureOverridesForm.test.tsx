import { fireEvent, render, screen } from '@testing-library/react';
import { FeatureOverridesForm } from './FeatureOverridesForm';

const baseProps = {
  targetType: 'user' as const,
  targetId: 'u1',
  targetLabel: 'User U1',
  featuresOverrideList: [
    {
      feature_id: 1,
      feature_key: 'f1',
      feature_description: 'Feature 1',
      is_allowed: 'default',
    },
  ],
  onPatch: jest.fn().mockResolvedValue(true),
  isPatching: false,
  patchError: null,
};

describe('FeatureOverridesForm', () => {
  it('renders empty state when no features', () => {
    render(
      <FeatureOverridesForm
        {...baseProps}
        featuresOverrideList={[]}
      />,
    );

    expect(
      screen.getByText('No features to configure for this target.'),
    ).toBeInTheDocument();
  });

  it('renders table with feature row', () => {
    render(<FeatureOverridesForm {...baseProps} />);
    expect(screen.getByText('f1')).toBeInTheDocument();
    expect(screen.getByLabelText('Override for f1')).toBeInTheDocument();
  });

  it('calls onPatch with updated values on submit', async () => {
    const onPatch = jest.fn().mockResolvedValue(true);
    render(<FeatureOverridesForm {...baseProps} onPatch={onPatch} />);

    const select = screen.getByLabelText('Override for f1');
    fireEvent.change(select, { target: { value: 'on' } });

    const button = screen.getByRole('button', { name: /save overrides/i });
    fireEvent.click(button);

    expect(onPatch).toHaveBeenCalledWith({
      targetType: 'user',
      targetId: 'u1',
      featureOverrides: [{ feature_id: 1, enabled: true }],
    });
  });
});

