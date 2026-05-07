'use client';

import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import { AdminModal } from '@/components/admin/AdminModal';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { EmptyState, LoadingState } from '@/components/admin/AdminStates';
import { FormCard } from '@/components/admin/FormCard';
import { LocalizedInput } from '@/components/admin/LocalizedInput';
import { deleteSectionItem, fetchSectionData, saveSectionItem } from '@/lib/admin/api';
import { createExperienceItem, createLocalizedField } from '@/lib/admin/factories';
import { notifyError, notifySuccess } from '@/lib/admin/toast';
import type { ExperienceFormData } from '@/lib/admin/types';

const primaryButtonClassName =
  'inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60';
const secondaryButtonClassName =
  'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50';
const dangerButtonClassName =
  'inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100';

export default function AdminExperiencePage() {
  const [items, setItems] = useState<ExperienceFormData[]>([]);
  const [editingItem, setEditingItem] = useState<ExperienceFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const nextItems = await fetchSectionData('experience');
      setItems(Array.isArray(nextItems) ? nextItems : []);
    } catch {
      notifyError('Could not load experience');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const startNew = () => {
    setEditingItem(createExperienceItem());
  };

  const startEdit = (item: ExperienceFormData) => {
    setEditingItem(structuredClone(item));
  };

  const closeModal = () => {
    setEditingItem(null);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    setSaving(true);

    try {
      await saveSectionItem('experience', editingItem);
      notifySuccess('Experience saved');
      setEditingItem(null);
      await loadItems();
    } catch {
      notifyError('Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience item?')) return;

    try {
      await deleteSectionItem('experience', id);
      notifySuccess('Experience deleted');
      await loadItems();
    } catch {
      notifyError('Failed to delete experience');
    }
  };

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Experience"
        title="Career Timeline"
        description="Manage roles and accomplishments in the same compact table workflow."
        actions={
          <button onClick={startNew} className={primaryButtonClassName}>
            <FaPlus size={12} />
            Add Role
          </button>
        }
      />

      {loading ? (
        <LoadingState label="Loading experience entries..." />
      ) : items.length === 0 ? (
        <EmptyState title="No experience yet" description="Create your first role to start building the timeline." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Company</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Role</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Period</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Points</th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((item) => (
                  <tr key={item._id} className="align-top">
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-slate-900">{item.company.en || 'Untitled company'}</div>
                      <div className="mt-1 text-sm text-slate-500">{item.company.th || 'No Thai label'}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{item.title.en || 'Untitled role'}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">{item.period.en || 'No period'}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">{item.description.length} points</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap justify-end gap-2">
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
        title={editingItem?._id ? 'Edit Role' : 'New Role'}
        description="Keep each role concise and outcome-focused."
        onClose={closeModal}
      >
        {editingItem ? (
          <div className="space-y-4">
            <FormCard title="Role Details">
              <LocalizedInput
                label="Job Title"
                value={editingItem.title}
                onChange={(value) => setEditingItem({ ...editingItem, title: value })}
              />
              <LocalizedInput
                label="Company"
                value={editingItem.company}
                onChange={(value) => setEditingItem({ ...editingItem, company: value })}
              />
              <LocalizedInput
                label="Period"
                value={editingItem.period}
                onChange={(value) => setEditingItem({ ...editingItem, period: value })}
              />
            </FormCard>

            <FormCard title="Description Points">
              <div className="mb-1 flex items-center justify-between gap-3">
                <div className="text-sm text-slate-500">Short bullet-style accomplishments.</div>
                <button
                  onClick={() =>
                    setEditingItem({
                      ...editingItem,
                      description: [...editingItem.description, createLocalizedField()],
                    })
                  }
                  className={secondaryButtonClassName}
                >
                  Add Point
                </button>
              </div>

              <div className="space-y-3">
                {editingItem.description.map((description, index) => (
                  <div key={`${index}-${description.en}`} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-700">Point {index + 1}</div>
                      <button
                        onClick={() =>
                          setEditingItem({
                            ...editingItem,
                            description: editingItem.description.filter((_, itemIndex) => itemIndex !== index),
                          })
                        }
                        className={dangerButtonClassName}
                      >
                        Remove
                      </button>
                    </div>

                    <LocalizedInput
                      label="Content"
                      value={description}
                      onChange={(value) =>
                        setEditingItem({
                          ...editingItem,
                          description: editingItem.description.map((item, itemIndex) =>
                            itemIndex === index ? value : item
                          ),
                        })
                      }
                      isTextArea
                    />
                  </div>
                ))}
              </div>
            </FormCard>

            <div className="flex justify-end">
              <button onClick={handleSave} disabled={saving} className={primaryButtonClassName}>
                <FaSave size={14} />
                {saving ? 'Saving...' : 'Save Experience'}
              </button>
            </div>
          </div>
        ) : null}
      </AdminModal>
    </div>
  );
}
