export interface RfqNotification {
  id: string;
  icon: string;
  title: string;
  quantity: string;
  due: string;
  location: string;
}

export const RFQ_NOTIFICATIONS: RfqNotification[] = [
  {
    id: 'notif-1',
    icon: 'inventory_2',
    title: 'Biji Kopi Arabica Gayo (Grade A)',
    quantity: '2,500 kg',
    due: '28 Mei 2026',
    location: 'Jakarta Selatan',
  },
  {
    id: 'notif-2',
    icon: 'local_shipping',
    title: 'Gula Kristal Putih (Rafinasi)',
    quantity: '10,000 kg',
    due: '30 Mei 2026',
    location: 'Surabaya Port',
  },
];

export const VENDOR_PERFORMANCE = {
  score: '94.2/100',
  level: 'GOLD',
  onTimeDelivery: 98,
  productQuality: 91,
};

export interface HistoryItem {
  id: string;
  title: string;
  statusLabel: string;
  statusColorClassName: string;
}

export const HISTORY_ITEMS: HistoryItem[] = [
  { id: 'hist-1', title: 'Kontrak Tepung Terigu', statusLabel: 'Dimenangkan • 12 Mei 2026', statusColorClassName: 'bg-success' },
  { id: 'hist-2', title: 'Biji Jagung Pakan', statusLabel: 'Menunggu Keputusan • 18 Mei', statusColorClassName: 'bg-warning' },
];

export const PAYMENT_TERMS_OPTIONS = ['Net 15', 'Net 30', 'Down Payment 50% + Net 30', 'COD (Cash on Delivery)'];
