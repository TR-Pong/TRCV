import type { ReactNode } from 'react';

export function AdminListCard({
  title,
  subtitle,
  meta,
  active = false,
  leading,
  actionsBelow = false,
  actions,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  active?: boolean;
  leading?: ReactNode;
  actionsBelow?: boolean;
  actions?: ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        active ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className={actionsBelow ? 'space-y-3' : 'flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'}>
        <div className="flex items-start gap-3">
          {leading ? <div className="pt-0.5">{leading}</div> : null}
          <div className="space-y-1.5">
            <div className="text-base font-outfit font-semibold text-slate-900">{title}</div>
            {subtitle ? <div className="text-sm text-slate-500">{subtitle}</div> : null}
            {meta ? <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{meta}</div> : null}
          </div>
        </div>
        {actions ? (
          <div className={`flex flex-wrap items-center gap-2 ${actionsBelow ? 'pt-1' : ''}`}>{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
