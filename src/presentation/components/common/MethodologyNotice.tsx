import type { ReactNode } from 'react';

interface MethodologyNoticeProps {
  title: string;
  children: ReactNode;
}

export function MethodologyNotice({ title, children }: MethodologyNoticeProps) {
  return (
    <div className="flex items-start gap-md rounded-lg border border-primary/20 bg-powder p-md shadow-sm shadow-primary/[0.04]">
      <span className="material-symbols-outlined text-primary">info</span>
      <div>
        <p className="text-caption font-bold text-primary">{title}</p>
        <p className="text-caption text-primary/80">{children}</p>
      </div>
    </div>
  );
}
