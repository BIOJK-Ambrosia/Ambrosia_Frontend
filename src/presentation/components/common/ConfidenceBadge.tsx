import type { ConfidenceLevel } from '@/shared/types/recommendation';

const CONFIDENCE_STYLES: Record<ConfidenceLevel, { label: string; className: string; icon: string }> = {
  high: { label: 'High', className: 'bg-success/10 text-success', icon: 'verified' },
  medium: { label: 'Med', className: 'bg-warning/10 text-warning', icon: 'warning' },
  low: { label: 'Low', className: 'bg-danger/10 text-danger', icon: 'error' },
};

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  percentage: number;
}

export function ConfidenceBadge({ level, percentage }: ConfidenceBadgeProps) {
  const style = CONFIDENCE_STYLES[level];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${style.className}`}
    >
      <span className="material-symbols-outlined text-[12px]">{style.icon}</span>
      {style.label} {percentage}%
    </span>
  );
}
