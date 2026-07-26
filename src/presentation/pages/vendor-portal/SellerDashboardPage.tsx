import { Link } from 'react-router-dom';
import { SummaryCard } from '@/presentation/components/common/SummaryCard';
import { useVendorSessionStore } from '@/presentation/stores/vendorSessionStore';
import { VENDOR_PERFORMANCE } from './mockData';

export function SellerDashboardPage() {
  const notifications = useVendorSessionStore((state) => state.notifications);
  const history = useVendorSessionStore((state) => state.history);

  const wonContractsCount = history.filter((item) => item.statusLabel.startsWith('Dimenangkan')).length;

  return (
    <main className="space-y-gutter p-gutter">
      <div className="grid grid-cols-1 gap-xl md:grid-cols-4">
        <SummaryCard label="Skor Vendor" value={VENDOR_PERFORMANCE.score} badge={`LEVEL ${VENDOR_PERFORMANCE.level}`} />
        <SummaryCard label="RFQ Pending" value={notifications.length} />
        <SummaryCard label="Kontrak Dimenangkan" value={wonContractsCount} />
        <SummaryCard label="On-time Delivery" value={`${VENDOR_PERFORMANCE.onTimeDelivery}%`} />
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-2">
        <div className="rounded-xl border border-surface-variant bg-white p-xl shadow-sm">
          <div className="mb-lg flex items-center justify-between">
            <h3 className="text-h3 text-primary">Notifikasi RFQ Terbaru</h3>
            <Link className="text-caption font-bold text-ocean" to="/vendor/portal">
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-md">
            {notifications.slice(0, 2).map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-md rounded-lg border border-surface-variant/30 bg-surface-container-low p-md"
              >
                <span className="material-symbols-outlined text-primary">{notification.icon}</span>
                <div className="flex-grow">
                  <p className="text-caption font-bold text-primary">{notification.title}</p>
                  <p className="text-[11px] text-on-surface-variant">
                    Quantity: {notification.quantity} • Due: {notification.due}
                  </p>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <p className="text-caption text-on-surface-variant">Tidak ada notifikasi RFQ baru.</p>
            )}
          </div>
          <Link
            className="mt-xl flex w-full items-center justify-center gap-sm rounded-lg bg-primary py-3 font-bold text-on-primary shadow-sm transition-all hover:opacity-90"
            to="/vendor/portal"
          >
            <span className="material-symbols-outlined">send</span>
            Submit Penawaran Baru
          </Link>
        </div>

        <div className="flex flex-col gap-xl">
          <div className="rounded-xl border border-surface-variant bg-white p-xl shadow-sm">
            <div className="mb-lg flex items-center justify-between">
              <h4 className="text-h3 text-primary">Histori Transaksi Terbaru</h4>
              <button className="text-caption font-bold text-ocean" type="button">
                Lihat Semua
              </button>
            </div>
            <div className="space-y-md">
              {history.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-md rounded-lg border border-surface-variant/30 bg-surface-container-low p-md"
                >
                  <div className={`h-10 w-2 rounded-full ${item.statusColorClassName}`} />
                  <div className="flex-grow">
                    <p className="truncate text-caption font-bold text-primary">{item.title}</p>
                    <p className="text-[11px] text-on-surface-variant">{item.statusLabel}</p>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex aspect-[2/1] flex-col justify-end overflow-hidden rounded-xl border border-surface-variant bg-gradient-to-br from-primary to-ocean p-xl shadow-sm">
            <p className="text-body font-bold text-white">Trend Pasar Kopi Arabica</p>
            <p className="text-caption text-white/70">Prediksi kenaikan 4.2% minggu depan</p>
          </div>
        </div>
      </div>
    </main>
  );
}
