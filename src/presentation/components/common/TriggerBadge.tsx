import type { TriggerType } from '@/shared/types/recommendation';

const TRIGGER_STYLES: Record<TriggerType, { label: string; className: string; icon: string }> = {
  stock: { label: 'Stock-based', className: 'bg-secondary-container text-on-secondary-container', icon: 'inventory_2' },
  macro: { label: 'Macro-based', className: 'bg-ocean text-midnight', icon: 'cloud' },
};

interface TriggerBadgeProps {
  type: TriggerType;
}

export function TriggerBadge({ type }: TriggerBadgeProps) {
  const style = TRIGGER_STYLES[type];

  return (
    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${style.className}`}>
      <span className="material-symbols-outlined text-[14px]">{style.icon}</span>
      {style.label}
    </span>
  );
}
