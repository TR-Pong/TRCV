export function LoadingState({ label }: { label: string }) {
  return (
    <div className="admin-empty-state px-6 py-14 text-center">
      <div className="mx-auto mb-4 h-1 w-12 bg-[var(--color-admin-accent)]" />
      <div className="text-sm font-medium text-[var(--color-admin-muted)]">{label}</div>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="admin-empty-state px-6 py-14 text-center">
      <div className="text-lg font-display font-bold text-[var(--color-admin-ink)]">{title}</div>
      <p className="mt-2 text-sm leading-6 text-[var(--color-admin-muted)]">{description}</p>
    </div>
  );
}
