import type { ReactNode } from 'react';

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 lg:flex-row lg:items-end lg:justify-between lg:p-6">
      <div className="max-w-2xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{eyebrow}</div>
        <h2 className="mt-2 text-2xl font-outfit font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
