'use client';

import type {
  AdminEntityMap,
  AdminSection,
  CollectionItemMap,
  CollectionSection,
  ProfileFormData,
} from '@/lib/admin/types';

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

export async function saveSectionItem(section: 'profile', payload: ProfileFormData): Promise<void>;
export async function saveSectionItem<T extends CollectionSection>(
  section: T,
  payload: CollectionItemMap[T]
): Promise<void>;
export async function saveSectionItem(
  section: AdminSection,
  payload: ProfileFormData | CollectionItemMap[CollectionSection]
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

export async function uploadProjectImage(file: File, previousImageUrl?: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  if (previousImageUrl) {
    formData.append('previousImageUrl', previousImageUrl);
  }

  const response = await fetch('/api/upload/project-image', {
    method: 'POST',
    body: formData,
  });

  if (response.status === 401) {
    redirectToLogin();
    throw new Error('Unauthorized');
  }

  const data = (await response.json()) as { url?: string; error?: string };

  if (!response.ok || !data.url) {
    throw new Error(data.error || 'Failed to upload project image');
  }

  return data.url;
}
