import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useToastStore } from './toastStore';

describe('useToastStore', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds a toast with a default success variant', () => {
    useToastStore.getState().showToast('Saved');

    expect(useToastStore.getState().toasts).toEqual([
      { id: expect.any(Number), message: 'Saved', variant: 'success' },
    ]);
  });

  it('adds a toast with an explicit variant', () => {
    useToastStore.getState().showToast('Failed', 'error');

    expect(useToastStore.getState().toasts[0].variant).toBe('error');
  });

  it('removes a toast when dismissed', () => {
    useToastStore.getState().showToast('Saved');
    const { id } = useToastStore.getState().toasts[0];

    useToastStore.getState().dismissToast(id);

    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('auto-dismisses a toast after the duration elapses', () => {
    vi.useFakeTimers();
    useToastStore.getState().showToast('Saved');

    expect(useToastStore.getState().toasts).toHaveLength(1);

    vi.advanceTimersByTime(3000);

    expect(useToastStore.getState().toasts).toHaveLength(0);
  });
});
