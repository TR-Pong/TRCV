'use client';

import { useEffect, type ReactNode } from 'react';

export function AdminModal({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const scrollY = window.scrollY;
    const previousStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    // Fixed positioning prevents iOS Safari from scrolling the page behind the modal.
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = previousStyles.overflow;
      document.body.style.position = previousStyles.position;
      document.body.style.top = previousStyles.top;
      document.body.style.width = previousStyles.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="admin-modal-backdrop fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:px-4 sm:py-6">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="admin-modal-panel relative z-10 flex max-h-[calc(100dvh-env(safe-area-inset-top))] w-full max-w-4xl flex-col overflow-hidden rounded-t-xl border sm:max-h-[90dvh] sm:rounded-xl">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--color-admin-rule)] px-5 py-4 sm:px-6">
          <div>
            <div className="admin-kicker">Editor</div>
            <h3 className="mt-1 text-xl font-display font-bold text-[var(--color-admin-ink)]">{title}</h3>
            {description ? <p className="mt-1 text-sm text-[var(--color-admin-muted)]">{description}</p> : null}
          </div>
          <button
            onClick={onClose}
            className="admin-secondary-button"
          >
            Close
          </button>
        </div>
        <div className="admin-modal-scroll min-h-0 flex-1 overflow-y-auto px-4 pt-5 sm:px-6">{children}</div>
      </div>
    </div>
  );
}
