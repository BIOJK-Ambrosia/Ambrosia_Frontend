import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';
import { useToastStore } from '@/presentation/stores/toastStore';

describe('Toast', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it('renders nothing when there are no toasts', () => {
    const { container } = render(<Toast />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders a toast message and removes it on click', async () => {
    const user = userEvent.setup();
    useToastStore.getState().showToast('Penawaran terkirim');
    render(<Toast />);

    const toastEl = screen.getByText('Penawaran terkirim');
    expect(toastEl).toBeInTheDocument();

    await user.click(toastEl);

    expect(screen.queryByText('Penawaran terkirim')).not.toBeInTheDocument();
  });
});
