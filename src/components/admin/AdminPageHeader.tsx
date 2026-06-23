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
    <div className="flex flex-col gap-4 border-b border-[var(--color-admin-rule)] pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <div className="admin-kicker">{eyebrow}</div>
        <h2 className="mt-2 text-3xl font-display font-bold text-[var(--color-admin-ink)]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-admin-muted)]">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
