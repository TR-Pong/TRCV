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
    <div className="flex flex-col gap-5 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] lg:flex-row lg:items-end lg:justify-between lg:p-8">
      <div className="max-w-2xl">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">{eyebrow}</div>
        <h2 className="mt-3 text-3xl font-outfit font-semibold text-slate-900">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
