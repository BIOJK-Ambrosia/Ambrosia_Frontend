import { useState } from 'react';
import { UncertaintyBandChart } from '@/presentation/components/common/UncertaintyBandChart';
import { MethodologyNotice } from '@/presentation/components/common/MethodologyNotice';
import { FORECAST_CHART_BY_HORIZON, INVENTORY_HEALTH } from './mockData';

const HORIZONS = ['H+7', 'H+30'] as const;
type Horizon = (typeof HORIZONS)[number];

export function DemandForecastingPage() {
  const [horizon, setHorizon] = useState<Horizon>('H+7');
  const chartData = FORECAST_CHART_BY_HORIZON[horizon];

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 space-y-xl overflow-y-auto p-xl">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-display text-primary">Price Forecast & Demand Signal</h2>
            <p className="text-body text-on-surface-variant">Hybrid Predictive Analysis (TFT + Historical Mean)</p>
          </div>
          <div className="flex items-center gap-xl">
            <div className="flex flex-col opacity-50">
              <label className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">
                Commodity
              </label>
              <div className="flex items-center gap-xs text-on-surface">
                <span className="text-body font-bold">Cabai Rawit Merah</span>
                <span className="material-symbols-outlined text-body">lock</span>
              </div>
            </div>
            <div className="flex rounded-lg bg-surface-container p-1">
              {HORIZONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setHorizon(option)}
                  className={`rounded-md px-xl py-1 text-body font-bold transition-all ${
                    horizon === option
                      ? 'border border-outline-variant/20 bg-white text-on-surface shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-md">
          <LegendItem colorClassName="bg-midnight" label="Historical Actuals" rounded="rounded-full" />
          <LegendItem colorClassName="bg-ocean" label="P50 (Median Forecast)" rounded="rounded-full" />
          <div className="flex items-center gap-sm rounded-lg border border-ocean/20 bg-ocean/10 px-md py-sm">
            <div className="h-3 w-6 rounded-sm bg-ocean/25" />
            <span className="text-caption font-bold">P10 - P90 Band</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-outline-variant/20 bg-white p-xl shadow-sm">
          <div className="mb-huge flex items-center justify-between">
            <div className="flex gap-xl">
              <div className="flex flex-col">
                <span className="text-caption font-bold uppercase tracking-widest text-on-surface-variant">
                  Target Window
                </span>
                <span className="text-metric-sm text-midnight">{horizon} Outlook</span>
              </div>
              <div className="h-10 w-px bg-outline-variant/30" />
              <div className="flex flex-col">
                <span className="text-caption font-bold uppercase tracking-widest text-on-surface-variant">
                  Avg. Predicted Price
                </span>
                <span className="text-metric-sm text-midnight">{chartData.avgPredictedPrice}</span>
              </div>
            </div>
            <div className="flex gap-sm">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-xs rounded-full border border-outline-variant/20 bg-surface-container px-sm py-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">cloud</span>
                  <span className="text-caption font-bold">Baseline (Random Walk)</span>
                </div>
                <span className="mt-1 text-[10px] uppercase italic text-on-surface-variant/70">
                  Belum mengalahkan model AI
                </span>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-xs rounded-full bg-ocean px-sm py-1 text-white shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span className="text-caption font-bold">TFT — Unggul signifikan</span>
                </div>
                <span className="mt-1 text-[10px] font-bold uppercase text-ocean">MASE 0.987 (Confidence High)</span>
              </div>
            </div>
          </div>
          <UncertaintyBandChart
            viewBoxWidth={chartData.viewBoxWidth}
            bandPath={chartData.bandPath}
            historicalPoints={chartData.historicalPoints}
            p50Points={chartData.p50Points}
            todayX={chartData.todayX}
            xLabels={chartData.xLabels}
          />
        </div>

        <MethodologyNotice title="Predictive Model Limitation Notice">
          Model accounts for seasonal patterns and historical weather impacts. Unforeseen market policy shifts in
          major hubs may deviate from P50 predictions. Human oversight is recommended for orders exceeding 5,000kg.
        </MethodologyNotice>
      </div>

      <aside className="z-30 flex w-[320px] flex-col gap-xl border-l border-outline-variant/20 bg-white p-xl">
        <div>
          <h3 className="mb-xs text-h3 text-midnight">Inventory Health</h3>
          <p className="text-caption text-on-surface-variant">Real-time status for Jakarta Hub</p>
        </div>

        <div className="rounded-xl border border-outline-variant/30 bg-cloud p-lg">
          <div className="mb-sm flex items-center justify-between">
            <span className="text-caption font-bold text-on-surface-variant">Stock Level</span>
            <span className="text-h3 font-bold text-midnight">{INVENTORY_HEALTH.stockLevelPercent}%</span>
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-outline-variant/20">
            <div className="h-full rounded-full bg-ocean" style={{ width: `${INVENTORY_HEALTH.stockLevelPercent}%` }} />
            <div
              className="absolute top-0 h-full w-0.5 bg-danger/50"
              style={{ left: `${INVENTORY_HEALTH.reorderPointMarkerPercent}%` }}
              title="Reorder Point"
            />
          </div>
          <div className="mt-sm flex justify-between text-[10px] font-bold text-on-surface-variant">
            <span>Low ({INVENTORY_HEALTH.reorderPointMarkerPercent}%)</span>
            <span>Available: {INVENTORY_HEALTH.availableKg.toLocaleString('id-ID')}kg</span>
          </div>
        </div>

        <div className="space-y-md">
          <div className="flex items-center justify-between rounded-lg bg-surface-container p-md">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary">hourglass_top</span>
              <span className="text-body">Hari hingga habis</span>
            </div>
            <span className="text-body font-bold text-midnight">{INVENTORY_HEALTH.daysUntilStockout} hari</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-surface-container p-md">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary">shopping_cart_checkout</span>
              <span className="text-body">Optimal Order Qty</span>
            </div>
            <span className="text-body font-bold text-midnight">{INVENTORY_HEALTH.optimalOrderQtyKg}kg</span>
          </div>
        </div>

        <div className="mt-auto space-y-md rounded-xl border border-outline-variant/30 p-lg">
          <div className="flex flex-col gap-xs">
            <span className="text-caption font-bold uppercase tracking-widest text-on-surface-variant">
              Recommendation
            </span>
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-warning">warning</span>
              <span className="text-body font-bold text-midnight">Hold Purchase</span>
            </div>
            <p className="text-caption leading-tight text-on-surface-variant">
              {INVENTORY_HEALTH.recommendationReason}
            </p>
          </div>
          <div className="h-px w-full bg-outline-variant/30" />
          <div className="flex flex-col gap-sm">
            <div className="flex justify-between text-caption font-bold">
              <span className="text-on-surface-variant">Reorder Point Threshold:</span>
              <span className="text-midnight">{INVENTORY_HEALTH.reorderPointThresholdKg}kg</span>
            </div>
            <button
              className="flex w-full cursor-not-allowed items-center justify-center gap-sm rounded-lg bg-surface-dim py-xl font-bold text-on-surface-variant"
              disabled
              type="button"
            >
              <span className="material-symbols-outlined">block</span>
              Buat Purchase Requisition
            </button>
            <p className="px-md text-center text-[10px] text-on-surface-variant">
              Action is restricted until threshold is reached or manual override is used.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-sm opacity-40">
          <span className="material-symbols-outlined text-body">verified_user</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Ambrosia AI Engine v4.2</span>
        </div>
      </aside>
    </div>
  );
}

function LegendItem({
  colorClassName,
  label,
  rounded,
}: {
  colorClassName: string;
  label: string;
  rounded: string;
}) {
  return (
    <div className="flex items-center gap-sm rounded-lg border border-outline-variant/20 bg-surface-container-high px-md py-sm">
      <span className={`h-3 w-3 ${rounded} ${colorClassName}`} />
      <span className="text-caption font-bold">{label}</span>
    </div>
  );
}
