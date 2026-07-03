'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  FaArrowDown,
  FaArrowUp,
  FaEye,
  FaEyeSlash,
  FaPen,
  FaPlus,
  FaSave,
  FaTrash,
} from 'react-icons/fa';
import { AdminModal } from '@/components/admin/AdminModal';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { EmptyState, LoadingState } from '@/components/admin/AdminStates';
import { FormCard } from '@/components/admin/FormCard';
import { LocalizedInput } from '@/components/admin/LocalizedInput';
import { TagInput } from '@/components/admin/TagInput';
import { deleteSectionItem, fetchSectionData, reorderSectionItems, saveSectionItem, uploadProjectImage } from '@/lib/admin/api';
import { createProjectItem } from '@/lib/admin/factories';
import { notifyError, notifyInfo, notifySuccess } from '@/lib/admin/toast';
import type { ProjectFormData } from '@/lib/admin/types';
import {
  createOrderedItem,
  moveOrderedItem,
  normalizeOrderedItems,
  toReorderPayload,
} from '@/features/admin/shared/ordered-items';

const primaryButtonClassName =
  'admin-primary-button';
const secondaryButtonClassName =
  'admin-secondary-button';
const dangerButtonClassName =
  'admin-danger-button';

function normalizeProjectItem(item: ProjectFormData): ProjectFormData {
  return {
    ...item,
    link: item.link ?? '',
    github: item.github ?? '',
    iosLink: item.iosLink ?? '',
    androidLink: item.androidLink ?? '',
    windowsLink: item.windowsLink ?? '',
    macLink: item.macLink ?? '',
    imageUrl: item.imageUrl ?? '',
    techStack: Array.isArray(item.techStack) ? item.techStack : [],
  };
}

function normalizeProjectItems(items: ProjectFormData[]): ProjectFormData[] {
  return normalizeOrderedItems(items.map(normalizeProjectItem));
}
export default function AdminProjectPage() {
  const [items, setItems] = useState<ProjectFormData[]>([]);
  const [editingItem, setEditingItem] = useState<ProjectFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const nextItems = await fetchSectionData('project');
      setItems(normalizeProjectItems(Array.isArray(nextItems) ? nextItems : []));
    } catch {
      notifyError('Could not load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const startNew = () => {
    setEditingItem(createOrderedItem(createProjectItem, items));
  };

  const startEdit = (item: ProjectFormData) => {
    setEditingItem(structuredClone(normalizeProjectItem(item)));
  };

  const closeModal = () => {
    setEditingItem(null);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    setSaving(true);

    try {
      await saveSectionItem('project', editingItem);
      notifySuccess('Project saved');
      setEditingItem(null);
      await loadItems();
    } catch {
      notifyError('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;

    try {
      await deleteSectionItem('project', id);
      notifySuccess('Project deleted');
      await loadItems();
    } catch {
      notifyError('Failed to delete project');
    }
  };

  const persistReorder = async (sourceIndex: number, targetIndex: number) => {
    const normalized = moveOrderedItem(items, sourceIndex, targetIndex);

    setItems(normalized);

    try {
      await reorderSectionItems(
        'project',
        toReorderPayload(normalized)
      );
      notifySuccess('Project order updated');
      await loadItems();
    } catch {
      notifyError('Failed to update project order');
    }
  };

  const toggleVisibility = async (item: ProjectFormData) => {
    const nextItem = { ...item, enabled: !item.enabled };

    try {
      await saveSectionItem('project', nextItem);
      notifyInfo(nextItem.enabled ? 'Project is now visible' : 'Project hidden from public page');
      if (editingItem?._id === item._id) {
        setEditingItem(nextItem);
      }
      await loadItems();
    } catch {
      notifyError('Failed to update visibility');
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!editingItem) return;

    setUploadingImage(true);

    try {
      const imageUrl = await uploadProjectImage(file, editingItem.imageUrl || undefined);
      setEditingItem({ ...editingItem, imageUrl });
      notifyInfo(editingItem._id ? 'Image uploaded. Save to confirm changes.' : 'Image uploaded successfully');
    } catch (error) {
      notifyError(error instanceof Error ? error.message : 'Failed to upload project image');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Projects"
        title="Portfolio Projects"
        description="Manage project order, visibility, imagery, and public-facing content from one list."
        actions={
          <button onClick={startNew} className={primaryButtonClassName}>
            <FaPlus size={12} />
            Add Project
          </button>
        }
      />

      {loading ? (
        <LoadingState label="Loading project entries..." />
      ) : items.length === 0 ? (
        <EmptyState title="No projects yet" description="Add your first featured project to populate the portfolio showcase." />
      ) : (
        <div className="admin-surface overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-indigo-50/60">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-500">Order</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-500">Project</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-500">Stack</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-500">Status</th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((item, index) => (
                  <tr key={item._id} className="align-top">
                    <td className="px-4 py-4 text-sm font-semibold text-slate-500">#{index + 1}</td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-slate-900">{item.title.en || 'Untitled project'}</div>
                      <div className="mt-1 line-clamp-2 text-sm text-slate-500">{item.description.en || 'No description'}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      {item.techStack.length ? item.techStack.slice(0, 3).join(', ') : 'No stack'}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.enabled ? 'admin-status-visible' : 'admin-status-hidden'
                        }`}
                      >
                        {item.enabled ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button
                          onClick={() => void persistReorder(index, index - 1)}
                          disabled={index === 0}
                          className={secondaryButtonClassName}
                        >
                          <FaArrowUp size={12} />
                        </button>
                        <button
                          onClick={() => void persistReorder(index, index + 1)}
                          disabled={index === items.length - 1}
                          className={secondaryButtonClassName}
                        >
                          <FaArrowDown size={12} />
                        </button>
                        <button onClick={() => void toggleVisibility(item)} className={secondaryButtonClassName}>
                          {item.enabled ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                          {item.enabled ? 'Hide' : 'Show'}
                        </button>
                        <button onClick={() => startEdit(item)} className={secondaryButtonClassName}>
                          <FaPen size={12} />
                          Edit
                        </button>
                        <button onClick={() => item._id && handleDelete(item._id)} className={dangerButtonClassName}>
                          <FaTrash size={12} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AdminModal
        open={!!editingItem}
        title={editingItem?._id ? 'Edit Project' : 'New Project'}
        description="Update project content, image, stack, links, and visibility in one place."
        onClose={closeModal}
      >
        {editingItem ? (
          <div className="space-y-4">
            <div className="admin-surface-soft flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3">
              <div className="text-sm text-slate-500">
                Display status:{' '}
                <span className="font-semibold text-slate-700">{editingItem.enabled ? 'Visible' : 'Hidden'}</span>
              </div>
              <button
                onClick={() => setEditingItem({ ...editingItem, enabled: !editingItem.enabled })}
                className={secondaryButtonClassName}
              >
                {editingItem.enabled ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                {editingItem.enabled ? 'Hide on public page' : 'Show on public page'}
              </button>
            </div>

            <FormCard title="Project Content">
              <LocalizedInput
                label="Title"
                value={editingItem.title}
                onChange={(value) => setEditingItem({ ...editingItem, title: value })}
              />
              <LocalizedInput
                label="Description"
                value={editingItem.description}
                onChange={(value) => setEditingItem({ ...editingItem, description: value })}
                isTextArea
              />
            </FormCard>

            <FormCard title="Project Image">
              <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50/35">
                {editingItem.imageUrl ? (
                  <Image
                    src={editingItem.imageUrl}
                    alt={editingItem.title.en || 'Project preview'}
                    width={1200}
                    height={800}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center px-6 text-center text-sm text-slate-400">
                    Upload a project preview image to show this work on the landing page.
                  </div>
                )}
              </div>

              <label className="admin-secondary-button cursor-pointer justify-center px-4 py-3">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      void handleImageUpload(file);
                    }
                    event.currentTarget.value = '';
                  }}
                />
                {uploadingImage ? 'Uploading image...' : editingItem.imageUrl ? 'Replace Image' : 'Upload Image'}
              </label>
            </FormCard>

            <FormCard title="Stack and Links">
              <TagInput
                label="Tech Stack"
                value={editingItem.techStack}
                onChange={(techStack) => setEditingItem({ ...editingItem, techStack })}
                placeholder="Next.js"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Project / Web Link</span>
                  <input
                    className="admin-input"
                    value={editingItem.link}
                    placeholder="https://example.com"
                    onChange={(event) => setEditingItem({ ...editingItem, link: event.target.value })}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700">GitHub</span>
                  <input
                    className="admin-input"
                    value={editingItem.github}
                    placeholder="https://github.com/..."
                    onChange={(event) => setEditingItem({ ...editingItem, github: event.target.value })}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700">iOS Download</span>
                  <input
                    className="admin-input"
                    value={editingItem.iosLink}
                    placeholder="https://apps.apple.com/..."
                    onChange={(event) => setEditingItem({ ...editingItem, iosLink: event.target.value })}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Android Download</span>
                  <input
                    className="admin-input"
                    value={editingItem.androidLink}
                    placeholder="https://play.google.com/..."
                    onChange={(event) => setEditingItem({ ...editingItem, androidLink: event.target.value })}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Windows Download</span>
                  <input
                    className="admin-input"
                    value={editingItem.windowsLink}
                    placeholder="https://.../windows"
                    onChange={(event) => setEditingItem({ ...editingItem, windowsLink: event.target.value })}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Mac Download</span>
                  <input
                    className="admin-input"
                    value={editingItem.macLink}
                    placeholder="https://.../mac"
                    onChange={(event) => setEditingItem({ ...editingItem, macLink: event.target.value })}
                  />
                </label>
              </div>
            </FormCard>

            <div className="admin-modal-actions flex justify-end">
              <button onClick={handleSave} disabled={saving} className={primaryButtonClassName}>
                <FaSave size={14} />
                {saving ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </div>
        ) : null}
      </AdminModal>
    </div>
  );
}



