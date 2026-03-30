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
      <span className="text-sm font-semibold text-slate-700">{label}</span>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-stretch">
          <input
            className="min-w-0 flex-1 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:bg-white"
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
            className="border-l border-slate-200 bg-slate-100 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            Add
          </button>
        </div>
      </div>

      <div className="min-h-16 rounded-2xl border border-slate-200 bg-white p-3">
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-slate-500 transition hover:text-slate-900"
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
