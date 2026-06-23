'use client';

import type {
  AdminEntityMap,
  AdminSection,
  CollectionItemMap,
  CollectionSection,
  ProfileFormData,
} from '@/lib/admin/types';
import { adminApiRequest } from '@/features/admin/shared/http';

export async function fetchSectionData<T extends AdminSection>(section: T): Promise<AdminEntityMap[T]> {
  return adminApiRequest<AdminEntityMap[T]>(`/api/cv/${section}`, {
    cache: 'no-store',
    fallbackError: `Failed to fetch ${section}`,
  });
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
  const body = isProfile
    ? payload
    : (() => {
        const { _id, ...rest } = record;
        return method === 'PUT' ? { ...rest, id: _id } : rest;
      })();

  await adminApiRequest(`/api/cv/${section}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    fallbackError: `Failed to save ${section}`,
  });
}

export async function deleteSectionItem(section: CollectionSection, id: string): Promise<void> {
  await adminApiRequest(`/api/cv/${section}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    fallbackError: `Failed to delete ${section}`,
  });
}

export async function reorderSectionItems(
  section: Extract<CollectionSection, 'skill' | 'project'>,
  items: Array<{ id: string; order: number }>
): Promise<void> {
  await adminApiRequest(`/api/cv/${section}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
    fallbackError: `Failed to reorder ${section}`,
  });
}

export async function uploadProjectImage(file: File, previousImageUrl?: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  if (previousImageUrl) {
    formData.append('previousImageUrl', previousImageUrl);
  }

  const data = await adminApiRequest<{ url: string }>('/api/upload/project-image', {
    method: 'POST',
    body: formData,
    fallbackError: 'Failed to upload project image',
  });

  return data.url;
}
