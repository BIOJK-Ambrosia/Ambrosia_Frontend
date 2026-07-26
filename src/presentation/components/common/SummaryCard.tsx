import type { ReactNode } from 'react';

interface SummaryCardProps {
  label: string;
  value: ReactNode;
  valueClassName?: string;
  trend?: { direction: 'up' | 'down'; label: string };
  badge?: string;
  footer?: ReactNode;
}

export function SummaryCard({ label, value, valueClassName, trend, badge, footer }: SummaryCardProps) {
  return (
    <div className="relative flex flex-col justify-between rounded-xl bg-surface-container-lowest p-xl shadow-md shadow-primary/[0.06]">
      {badge && (
        <span className="absolute right-xl top-xl rounded-full bg-danger px-2 py-0.5 text-[10px] font-bold tracking-wide text-on-primary">
          {badge}
        </span>
      )}
      <div>
        <span className="text-caption font-medium uppercase tracking-wider text-on-surface-variant">{label}</span>
        <div className="mt-sm flex items-baseline gap-sm">
          <h2 className={`text-metric-sm tabular-nums text-on-surface ${valueClassName ?? ''}`}>{value}</h2>
          {trend && (
            <span
              className={`flex items-center gap-0.5 text-caption font-bold ${
                trend.direction === 'up' ? 'text-success' : 'text-danger'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {trend.direction === 'up' ? 'arrow_upward' : 'arrow_downward'}
              </span>
              {trend.label}
            </span>
          )}
        </div>
      </div>
      {footer}
    </div>
  );
}
