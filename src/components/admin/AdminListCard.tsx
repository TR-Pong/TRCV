import type { ReactNode } from 'react';

export function AdminListCard({
  title,
  subtitle,
  meta,
  actions,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] lg:flex-row lg:items-center lg:justify-between lg:p-6">
      <div className="space-y-2">
        <div className="text-xl font-outfit font-semibold text-slate-900">{title}</div>
        {subtitle ? <div className="text-sm text-slate-500">{subtitle}</div> : null}
        {meta ? <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{meta}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
