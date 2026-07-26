import { create } from 'zustand';
import { HISTORY_ITEMS, RFQ_NOTIFICATIONS } from '@/presentation/pages/vendor-portal/mockData';
import type { HistoryItem, RfqNotification } from '@/presentation/pages/vendor-portal/mockData';

interface VendorSessionState {
  notifications: RfqNotification[];
  history: HistoryItem[];
  dismissNotification: (id: string) => void;
  moveNotificationToHistory: (id: string) => void;
}

export const useVendorSessionStore = create<VendorSessionState>((set, get) => ({
  notifications: RFQ_NOTIFICATIONS,
  history: HISTORY_ITEMS,
  dismissNotification: (id) => {
    set({ notifications: get().notifications.filter((notification) => notification.id !== id) });
  },
  moveNotificationToHistory: (id) => {
    const notification = get().notifications.find((item) => item.id === id);
    if (!notification) return;
    set({
      notifications: get().notifications.filter((item) => item.id !== id),
      history: [
        {
          id: `hist-${Date.now()}`,
          title: notification.title,
          statusLabel: 'Menunggu Keputusan • Baru diajukan',
          statusColorClassName: 'bg-warning',
        },
        ...get().history,
      ],
    });
  },
}));
