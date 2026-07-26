import type { ReactNode } from 'react';
import type { RecommendationVerdict } from '@/shared/types/recommendation';

const VERDICT_STYLES: Record<RecommendationVerdict, { label: string; badgeClassName: string; boxClassName: string }> = {
  accept: {
    label: 'Accept',
    badgeClassName: 'bg-success text-white',
    boxClassName: 'bg-success/10',
  },
  negotiate: {
    label: 'Negotiate',
    badgeClassName: 'bg-warning text-white',
    boxClassName: 'bg-warning/10',
  },
  reject: {
    label: 'Reject',
    badgeClassName: 'bg-danger text-white',
    boxClassName: 'bg-danger/10',
  },
  pending: {
    label: 'Pending',
    badgeClassName: 'bg-surface-container-high text-on-surface-variant',
    boxClassName: 'bg-surface-container-high',
  },
};

interface RecommendationCardProps {
  /** Omit when the panel is a proactive suggestion rather than a classified verdict. */
  verdict?: RecommendationVerdict;
  narrative: ReactNode;
  variant?: 'panel' | 'compact';
  title?: string;
  actions?: ReactNode;
}

export function RecommendationCard({
  verdict = 'pending',
  narrative,
  variant = 'panel',
  title = 'Gemini AI Recommendation',
  actions,
}: RecommendationCardProps) {
  const style = VERDICT_STYLES[verdict];

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-md rounded-lg px-lg py-2 ${style.boxClassName}`}>
        <span className="material-symbols-outlined text-on-surface">auto_awesome</span>
        <div>
          <span className="block text-label-medium font-bold uppercase text-on-surface">{style.label}</span>
          <p className="text-caption leading-tight text-on-surface-variant">{narrative}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-secondary-container p-xl shadow-md shadow-primary/[0.06]">
      <div className="mb-md flex items-center gap-md">
        <span className="material-symbols-outlined text-on-secondary-container">psychology</span>
        <h4 className="text-h3 text-on-secondary-container">{title}</h4>
      </div>
      <div className="rounded-lg border border-white/40 bg-white/50 p-md backdrop-blur-sm">
        <p className="text-body leading-relaxed text-on-secondary-container">{narrative}</p>
        {actions && <div className="mt-md flex gap-sm">{actions}</div>}
      </div>
    </div>
  );
}
