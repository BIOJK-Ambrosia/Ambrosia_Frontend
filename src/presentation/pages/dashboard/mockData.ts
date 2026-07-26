import type { TriggerType } from '@/shared/types/recommendation';

export interface DashboardAlert {
  id: string;
  trigger: TriggerType;
  timeAgo: string;
  message: string;
  actionLabel: string;
}

export const DASHBOARD_ALERTS: DashboardAlert[] = [
  {
    id: 'alert-1',
    trigger: 'stock',
    timeAgo: '2 jam lalu',
    message: 'Cabai rawit gudang pusat: 3 hari lagi habis',
    actionLabel: 'Re-stock Sekarang',
  },
  {
    id: 'alert-2',
    trigger: 'macro',
    timeAgo: '5 jam lalu',
    message: 'Peringatan banjir di Jawa Tengah: Potensi gangguan logistik',
    actionLabel: 'Lihat Rute Alternatif',
  },
  {
    id: 'alert-3',
    trigger: 'stock',
    timeAgo: '6 jam lalu',
    message: 'Anomali stok Beras Premium di Regional Barat',
    actionLabel: 'Investigasi',
  },
];

export const PRICE_TREND = {
  bandPath:
    'M16,185 L50,165 L100,170 L150,145 L200,150 L250,125 L300,130 L350,105 L400,110 L450,85 L500,80 L550,55 L600,50 ' +
    'L600,100 L550,105 L500,130 L450,135 L400,160 L350,155 L300,180 L250,175 L200,200 L150,195 L100,220 L50,215 L16,235 Z',
  historicalPoints: '0,240 50,230 100,225 150,215 200,210 250,190',
  p50Points: '16,210 50,190 100,195 150,170 200,175 250,150 300,155 350,130 400,135 450,110 500,105 550,80 600,75',
  todayX: 250,
  xLabels: ['1 Okt', '10 Okt', '20 Okt', '30 Okt', '10 Nov', '20 Nov'],
};

export const VENDOR_SCORECARD = {
  grade: 'A',
  onTimeDelivery: 94,
  productQuality: 88,
};
