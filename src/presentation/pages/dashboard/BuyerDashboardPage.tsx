import { useState } from 'react';
import { SummaryCard } from '@/presentation/components/common/SummaryCard';
import { UncertaintyBandChart } from '@/presentation/components/common/UncertaintyBandChart';
import { MethodologyNotice } from '@/presentation/components/common/MethodologyNotice';
import { TriggerBadge } from '@/presentation/components/common/TriggerBadge';
import { RecommendationCard } from '@/presentation/components/common/RecommendationCard';
import { useToastStore } from '@/presentation/stores/toastStore';
import { DASHBOARD_ALERTS, PRICE_TREND, VENDOR_SCORECARD } from './mockData';

function ChartLegendItem({ colorClassName, label }: { colorClassName: string; label: string }) {
  return (
    <div className="flex items-center gap-xs rounded border border-outline-variant px-2 py-1">
      <div className={`h-3 w-3 ${colorClassName}`} />
      <span className="text-[10px]">{label}</span>
    </div>
  );
}

export function BuyerDashboardPage() {
  const [alerts, setAlerts] = useState(DASHBOARD_ALERTS);
  const [recommendationDismissed, setRecommendationDismissed] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  function handleAlertAction(alertId: string, actionLabel: string) {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
    showToast(`${actionLabel} dicatat`);
  }

  return (
    <section className="flex-1 space-y-xl p-xl">
      <div className="grid grid-cols-1 gap-xl md:grid-cols-4">
        <SummaryCard label="Estimasi Penghematan" value="Rp 12.4M" trend={{ direction: 'up', label: '5%' }} />
        <SummaryCard label="Alert Aktif" value="Prioritas Tinggi" valueClassName="text-danger" badge="3 ALERTS" />
        <SummaryCard label="PR Menunggu Approval" value="12" />
        <SummaryCard
          label="Coverage Model"
          value="85%"
          footer={
            <div className="mt-sm h-2 w-full overflow-hidden rounded-full bg-surface-container">
              <div className="h-full w-[85%] rounded-full bg-success" />
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-3">
        <div className="rounded-xl bg-surface-container-lowest p-xl shadow-md shadow-primary/[0.06] lg:col-span-2">
          <div className="mb-huge flex items-center justify-between">
            <div>
              <h3 className="text-h3 text-primary">Tren Harga: Cabai Rawit Merah</h3>
              <p className="text-caption text-on-surface-variant">Estimasi pergerakan harga 30 hari kedepan</p>
            </div>
            <div className="flex gap-sm">
              <ChartLegendItem colorClassName="bg-primary" label="Actual" />
              <ChartLegendItem colorClassName="bg-secondary" label="P50 Median" />
            </div>
          </div>
          <UncertaintyBandChart
            bandPath={PRICE_TREND.bandPath}
            historicalPoints={PRICE_TREND.historicalPoints}
            p50Points={PRICE_TREND.p50Points}
            todayX={PRICE_TREND.todayX}
            xLabels={PRICE_TREND.xLabels}
          />
          <div className="mt-xl">
            <MethodologyNotice title="Catatan Metodologi">
              Prediksi menggunakan model ARIMA-LSTM hibrida. Area biru muda mewakili interval kepercayaan 80%
              (P10-P90). Akurasi historis pada komoditas ini: 92%.
            </MethodologyNotice>
          </div>
        </div>

        <div className="flex h-full flex-col rounded-xl bg-surface-container-lowest p-xl shadow-md shadow-primary/[0.06] lg:col-span-1">
          <h3 className="mb-xl text-h3 text-primary">Alert Terbaru</h3>
          <div className="flex-1 space-y-md">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-lg border-l-4 border-secondary bg-surface-container p-md transition-colors hover:bg-surface-container-high"
              >
                <div className="mb-xs flex items-center justify-between">
                  <TriggerBadge type={alert.trigger} />
                  <span className="text-[10px] font-medium text-outline">{alert.timeAgo}</span>
                </div>
                <p className="text-body font-medium text-on-surface">{alert.message}</p>
                <button
                  className="mt-sm text-caption font-bold text-secondary hover:underline"
                  type="button"
                  onClick={() => handleAlertAction(alert.id, alert.actionLabel)}
                >
                  {alert.actionLabel}
                </button>
              </div>
            ))}
            {alerts.length === 0 && <p className="text-caption text-on-surface-variant">Tidak ada alert aktif.</p>}
          </div>
          <div className="mt-xl border-t border-outline-variant pt-xl">
            <button
              className="flex w-full items-center justify-center gap-md rounded-lg bg-secondary py-3 font-bold text-on-secondary shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
              type="button"
              onClick={() => showToast('Purchase Requisition dibuat (dummy)')}
            >
              <span className="material-symbols-outlined">add_circle</span>
              Buat Purchase Requisition
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-xl md:grid-cols-2">
        {!recommendationDismissed && (
          <RecommendationCard
            narrative={
              <>
                Berdasarkan tren kenaikan harga cabai rawit yang diprediksi mencapai puncak dalam{' '}
                <span className="font-bold">14 hari ke depan</span>, kami menyarankan untuk melakukan pengadaan{' '}
                <span className="font-bold">20% lebih awal</span> untuk mengamankan harga P50 saat ini. Strategi ini
                berpotensi menghemat biaya sebesar <span className="font-bold text-success">Rp 450 Juta</span>.
              </>
            }
            actions={
              <>
                <button
                  type="button"
                  className="rounded-full bg-success px-3 py-1 text-[10px] font-bold text-white"
                  onClick={() => showToast('Rekomendasi diterima')}
                >
                  ACCEPT SUGGESTION
                </button>
                <button
                  type="button"
                  className="rounded-full bg-outline px-3 py-1 text-[10px] font-bold text-white"
                  onClick={() => setRecommendationDismissed(true)}
                >
                  DISMISS
                </button>
              </>
            }
          />
        )}

        <div className="flex items-center gap-xl rounded-xl bg-surface-container-lowest p-xl shadow-md shadow-primary/[0.06]">
          <div className="flex-1">
            <h4 className="mb-xs text-h3 text-primary">Status Vendor Scorecard</h4>
            <p className="mb-md text-caption text-on-surface-variant">Kualitas pengiriman rata-rata minggu ini</p>
            <div className="space-y-sm">
              <div className="flex justify-between text-[11px] font-medium">
                <span>Ketepatan Waktu</span>
                <span className="tabular-nums">{VENDOR_SCORECARD.onTimeDelivery}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                <div className="h-full bg-success" style={{ width: `${VENDOR_SCORECARD.onTimeDelivery}%` }} />
              </div>
              <div className="flex justify-between pt-1 text-[11px] font-medium">
                <span>Kualitas Produk</span>
                <span className="tabular-nums">{VENDOR_SCORECARD.productQuality}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                <div className="h-full bg-warning" style={{ width: `${VENDOR_SCORECARD.productQuality}%` }} />
              </div>
            </div>
          </div>
          <div className="relative h-24 w-24">
            <svg className="h-full w-full -rotate-90 transform">
              <circle className="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" />
              <circle
                className="text-primary"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeDasharray="251.2"
                strokeDashoffset="25.12"
                strokeWidth="8"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-h3 font-bold text-primary">{VENDOR_SCORECARD.grade}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
