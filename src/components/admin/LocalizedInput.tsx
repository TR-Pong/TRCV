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
  const commonClassName = 'admin-input';

  return (
    <fieldset className="admin-field-group p-4">
      <legend className="px-1 text-sm font-semibold text-[var(--color-admin-ink)]">{label}</legend>
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block space-y-2">
          <span className="admin-field-label">English</span>
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
          <span className="admin-field-label">Thai</span>
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
    </fieldset>
  );
}
