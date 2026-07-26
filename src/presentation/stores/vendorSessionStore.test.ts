import { beforeEach, describe, expect, it } from 'vitest';
import { useVendorSessionStore } from './vendorSessionStore';
import { HISTORY_ITEMS, RFQ_NOTIFICATIONS } from '@/presentation/pages/vendor-portal/mockData';

describe('useVendorSessionStore', () => {
  beforeEach(() => {
    useVendorSessionStore.setState({ notifications: RFQ_NOTIFICATIONS, history: HISTORY_ITEMS });
  });

  it('seeds notifications and history from vendor-portal mock data', () => {
    expect(useVendorSessionStore.getState().notifications).toHaveLength(2);
    expect(useVendorSessionStore.getState().history).toHaveLength(2);
  });

  it('removes a notification on dismiss', () => {
    useVendorSessionStore.getState().dismissNotification('notif-1');

    expect(useVendorSessionStore.getState().notifications.map((n) => n.id)).toEqual(['notif-2']);
  });

  it('moves a notification into history', () => {
    useVendorSessionStore.getState().moveNotificationToHistory('notif-1');

    const state = useVendorSessionStore.getState();
    expect(state.notifications.map((n) => n.id)).toEqual(['notif-2']);
    expect(state.history[0]).toMatchObject({
      title: 'Biji Kopi Arabica Gayo (Grade A)',
      statusLabel: 'Menunggu Keputusan • Baru diajukan',
      statusColorClassName: 'bg-warning',
    });
    expect(state.history).toHaveLength(3);
  });

  it('does nothing when moving an unknown notification id', () => {
    useVendorSessionStore.getState().moveNotificationToHistory('does-not-exist');

    const state = useVendorSessionStore.getState();
    expect(state.notifications).toHaveLength(2);
    expect(state.history).toHaveLength(2);
  });
});
