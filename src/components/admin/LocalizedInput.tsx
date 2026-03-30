import type { LocalizedFieldValue } from '@/lib/admin/types';

export function LocalizedInput({
  label,
  value,
  onChange,
  isTextArea = false,
}: {
  label: string;
  value: LocalizedFieldValue;
  onChange: (next: LocalizedFieldValue) => void;
  isTextArea?: boolean;
}) {
  const commonClassName =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white';

  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
      <div className="mb-4 text-sm font-semibold text-slate-700">{label}</div>
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">English</span>
          {isTextArea ? (
            <textarea
              className={`${commonClassName} min-h-[120px] resize-y`}
              value={value.en}
              onChange={(event) => onChange({ ...value, en: event.target.value })}
            />
          ) : (
            <input
              type="text"
              className={commonClassName}
              value={value.en}
              onChange={(event) => onChange({ ...value, en: event.target.value })}
            />
          )}
        </label>

        <label className="block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Thai</span>
          {isTextArea ? (
            <textarea
              className={`${commonClassName} min-h-[120px] resize-y`}
              value={value.th}
              onChange={(event) => onChange({ ...value, th: event.target.value })}
            />
          ) : (
            <input
              type="text"
              className={commonClassName}
              value={value.th}
              onChange={(event) => onChange({ ...value, th: event.target.value })}
            />
          )}
        </label>
      </div>
    </div>
  );
}
