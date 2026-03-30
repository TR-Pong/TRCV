export function LoadingState({ label }: { label: string }) {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-sm font-medium text-slate-500">
      {label}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="text-lg font-outfit font-semibold text-slate-900">{title}</div>
      <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
    </div>
  );
}
