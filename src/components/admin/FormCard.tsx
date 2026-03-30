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
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
      <div className="mb-5">
        <h3 className="text-lg font-outfit font-semibold text-slate-900">{title}</h3>
        {description ? <p className="mt-2 text-sm text-slate-500">{description}</p> : null}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
