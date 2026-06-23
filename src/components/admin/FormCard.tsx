import type { ReactNode } from 'react';

export function FormCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-surface p-4 sm:p-5">
      <div className="mb-5 border-b border-[var(--color-admin-rule)] pb-4">
        <h3 className="text-lg font-display font-bold text-[var(--color-admin-ink)]">{title}</h3>
        {description ? <p className="mt-1.5 text-sm text-[var(--color-admin-muted)]">{description}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
