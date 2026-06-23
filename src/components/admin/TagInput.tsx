'use client';

import { useState } from 'react';

export function TagInput({
  value,
  onChange,
  label = 'Tags',
  placeholder = 'Add a tag',
}: {
  value: string[];
  onChange: (next: string[]) => void;
  label?: string;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState('');

  const addTag = () => {
    if (draft === '') {
      return;
    }

    if (value.includes(draft)) {
      setDraft('');
      return;
    }

    onChange([...value, draft]);
    setDraft('');
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <span className="text-sm font-semibold text-[var(--color-admin-ink)]">{label}</span>

      <div className="overflow-hidden rounded-md border border-[var(--color-admin-rule)] bg-[var(--color-admin-panel)]">
        <div className="flex items-stretch">
          <input
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-[var(--color-admin-ink)] outline-none placeholder:text-[var(--color-admin-muted)] focus:bg-[var(--color-admin-accent-soft)]"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                addTag();
              }
            }}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={addTag}
            className="border-l border-[var(--color-admin-rule)] px-5 py-3 text-sm font-semibold text-[var(--color-admin-accent)] transition-colors hover:bg-[var(--color-admin-accent-soft)]"
          >
            Add
          </button>
        </div>
      </div>

      <div className="min-h-16 rounded-md border border-[var(--color-admin-rule)] bg-[var(--color-admin-panel)] p-3">
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-admin-accent-soft)] px-3 py-1.5 text-sm font-medium text-[var(--color-admin-ink)]"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-[var(--color-admin-accent)] transition-colors hover:text-[var(--color-admin-ink)]"
                aria-label={`Remove ${tag}`}
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
