'use client';

import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaEye, FaEyeSlash, FaPen, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import { AdminModal } from '@/components/admin/AdminModal';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { EmptyState, LoadingState } from '@/components/admin/AdminStates';
import { FormCard } from '@/components/admin/FormCard';
import { LocalizedInput } from '@/components/admin/LocalizedInput';
import { deleteSectionItem, fetchSectionData, reorderSectionItems, saveSectionItem } from '@/lib/admin/api';
import { createLocalizedField, createSkillItem } from '@/lib/admin/factories';
import { notifyError, notifyInfo, notifySuccess } from '@/lib/admin/toast';
import type { SkillFormData } from '@/lib/admin/types';

const primaryButtonClassName =
  'inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60';
const secondaryButtonClassName =
  'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50';
const dangerButtonClassName =
  'inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100';

function normalizeItems(items: SkillFormData[]) {
  return [...items]
    .map((item, index) => ({
      ...item,
      order: typeof item.order === 'number' ? item.order : index,
      enabled: item.enabled ?? true,
    }))
    .sort((left, right) => left.order - right.order);
}

function buildNewSkillItem(items: SkillFormData[]) {
  return {
    ...createSkillItem(),
    order: items.length,
    enabled: true,
  };
}

export default function AdminSkillPage() {
  const [items, setItems] = useState<SkillFormData[]>([]);
  const [editingItem, setEditingItem] = useState<SkillFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const nextItems = await fetchSectionData('skill');
      setItems(normalizeItems(Array.isArray(nextItems) ? nextItems : []));
    } catch {
      notifyError('Could not load skill groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const startNew = () => {
    setEditingItem(buildNewSkillItem(items));
  };

  const startEdit = (item: SkillFormData) => {
    setEditingItem(structuredClone(item));
  };

  const closeModal = () => {
    setEditingItem(null);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    setSaving(true);

    try {
      await saveSectionItem('skill', editingItem);
      notifySuccess('Skill group saved');
      setEditingItem(null);
      await loadItems();
    } catch {
      notifyError('Failed to save skill group');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill category?')) return;

    try {
      await deleteSectionItem('skill', id);
      notifySuccess('Skill group deleted');
      await loadItems();
    } catch {
      notifyError('Failed to delete skill group');
    }
  };

  const persistReorder = async (sourceIndex: number, targetIndex: number) => {
    const reorderedItems = [...items];
    const [movedItem] = reorderedItems.splice(sourceIndex, 1);
    reorderedItems.splice(targetIndex, 0, movedItem);

    const normalized = reorderedItems.map((item, index) => ({ ...item, order: index }));

    setItems(normalized);

    try {
      await reorderSectionItems(
        'skill',
        normalized.filter((item) => item._id).map((item) => ({ id: item._id as string, order: item.order }))
      );
      notifySuccess('Skill order updated');
      await loadItems();
    } catch {
      notifyError('Failed to update skill order');
    }
  };

  const toggleVisibility = async (item: SkillFormData) => {
    const nextItem = { ...item, enabled: !item.enabled };

    try {
      await saveSectionItem('skill', nextItem);
      notifyInfo(nextItem.enabled ? 'Skill group is now visible' : 'Skill group hidden from public page');
      if (editingItem?._id === item._id) {
        setEditingItem(nextItem);
      }
      await loadItems();
    } catch {
      notifyError('Failed to update visibility');
    }
  };

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Skills"
        title="Skill Collections"
        description="Manage groups, visibility, and display order from one compact list."
        actions={
          <button onClick={startNew} className={primaryButtonClassName}>
            <FaPlus size={12} />
            Add Group
          </button>
        }
      />

      {loading ? (
        <LoadingState label="Loading skill groups..." />
      ) : items.length === 0 ? (
        <EmptyState title="No skill groups yet" description="Create your first category to organize portfolio skills." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Order</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Category</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Items</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Status</th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((item, index) => (
                  <tr key={item._id} className="align-top">
                    <td className="px-4 py-4 text-sm font-semibold text-slate-500">#{index + 1}</td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-slate-900">{item.category.en || 'Untitled category'}</div>
                      <div className="mt-1 text-sm text-slate-500">{item.category.th || 'No Thai label'}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">{item.items.length} skills</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.enabled ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
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
        title={editingItem?._id ? 'Edit Skill Group' : 'New Skill Group'}
        description="Create clean clusters that are easy to scan on the public portfolio."
        onClose={closeModal}
      >
        {editingItem ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3">
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

            <FormCard title="Group Details">
              <LocalizedInput
                label="Category"
                value={editingItem.category}
                onChange={(value) => setEditingItem({ ...editingItem, category: value })}
              />
            </FormCard>

            <FormCard title="Skill Items">
              <div className="mb-1 flex items-center justify-between gap-3">
                <div className="text-sm text-slate-500">Each item supports English and Thai labels.</div>
                <button
                  onClick={() => setEditingItem({ ...editingItem, items: [...editingItem.items, createLocalizedField()] })}
                  className={secondaryButtonClassName}
                >
                  Add Skill
                </button>
              </div>

              <div className="space-y-3">
                {editingItem.items.map((item, index) => (
                  <div key={`${index}-${item.en}`} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-700">Skill {index + 1}</div>
                      <button
                        onClick={() =>
                          setEditingItem({
                            ...editingItem,
                            items: editingItem.items.filter((_, itemIndex) => itemIndex !== index),
                          })
                        }
                        className={dangerButtonClassName}
                      >
                        Remove
                      </button>
                    </div>

                    <LocalizedInput
                      label="Skill Label"
                      value={item}
                      onChange={(value) =>
                        setEditingItem({
                          ...editingItem,
                          items: editingItem.items.map((entry, itemIndex) => (itemIndex === index ? value : entry)),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </FormCard>

            <div className="flex justify-end">
              <button onClick={handleSave} disabled={saving} className={primaryButtonClassName}>
                <FaSave size={14} />
                {saving ? 'Saving...' : 'Save Group'}
              </button>
            </div>
          </div>
        ) : null}
      </AdminModal>
    </div>
  );
}
