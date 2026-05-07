'use client';

import { toast } from 'gooey-toast';

export function notifySuccess(title: string, description?: string) {
  toast.success({ title, description });
}

export function notifyError(title: string, description?: string) {
  toast.error({ title, description });
}

export function notifyInfo(title: string, description?: string) {
  toast.info({ title, description });
}
