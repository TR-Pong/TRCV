'use client';

import type { AdminEntityMap, AdminSection, CollectionSection } from '@/lib/admin/types';

function redirectToLogin() {
  window.location.href = '/admin/login';
}

export async function fetchSectionData<T extends AdminSection>(section: T): Promise<AdminEntityMap[T]> {
  const response = await fetch(`/api/cv/${section}`, { cache: 'no-store' });

  if (response.status === 401) {
    redirectToLogin();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${section}`);
  }

  return response.json() as Promise<AdminEntityMap[T]>;
}

export async function saveSectionItem<T extends AdminSection>(
  section: T,
  payload: T extends 'profile' ? AdminEntityMap[T] : AdminEntityMap[T][number]
): Promise<void> {
  const isProfile = section === 'profile';
  const record = payload as { _id?: string };
  const method = isProfile || record._id ? 'PUT' : 'POST';
  const body = isProfile ? payload : method === 'PUT' ? { ...record, id: record._id } : payload;

  const response = await fetch(`/api/cv/${section}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    redirectToLogin();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`Failed to save ${section}`);
  }
}

export async function deleteSectionItem(section: CollectionSection, id: string): Promise<void> {
  const response = await fetch(`/api/cv/${section}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (response.status === 401) {
    redirectToLogin();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`Failed to delete ${section}`);
  }
}
