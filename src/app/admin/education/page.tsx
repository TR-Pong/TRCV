'use client';

import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import { AdminModal } from '@/components/admin/AdminModal';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { EmptyState, LoadingState } from '@/components/admin/AdminStates';
import { FormCard } from '@/components/admin/FormCard';
import { LocalizedInput } from '@/components/admin/LocalizedInput';
import { deleteSectionItem, fetchSectionData, saveSectionItem } from '@/lib/admin/api';
import { createEducationItem } from '@/lib/admin/factories';
import { notifyError, notifySuccess } from '@/lib/admin/toast';
import type { EducationFormData } from '@/lib/admin/types';

const primaryButtonClassName =
  'admin-primary-button';
const secondaryButtonClassName =
  'admin-secondary-button';
const dangerButtonClassName =
  'admin-danger-button';

export default function AdminEducationPage() {
  const [items, setItems] = useState<EducationFormData[]>([]);
  const [editingItem, setEditingItem] = useState<EducationFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const nextItems = await fetchSectionData('education');
      setItems(Array.isArray(nextItems) ? nextItems : []);
    } catch {
      notifyError('Could not load education');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const startNew = () => {
    setEditingItem(createEducationItem());
  };

  const startEdit = (item: EducationFormData) => {
    setEditingItem(structuredClone(item));
  };

  const closeModal = () => {
    setEditingItem(null);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    setSaving(true);

    try {
      await saveSectionItem('education', editingItem);
      notifySuccess('Education saved');
      setEditingItem(null);
      await loadItems();
    } catch {
      notifyError('Failed to save education');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education item?')) return;

    try {
      await deleteSectionItem('education', id);
      notifySuccess('Education deleted');
      await loadItems();
    } catch {
      notifyError('Failed to delete education');
    }
  };

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Education"
        title="Academic Background"
        description="Manage education entries in the same compact table workflow."
        actions={
          <button onClick={startNew} className={primaryButtonClassName}>
            <FaPlus size={12} />
            Add Entry
          </button>
        }
      />

      {loading ? (
        <LoadingState label="Loading education entries..." />
      ) : items.length === 0 ? (
        <EmptyState title="No education entries yet" description="Add your first degree or certification to get started." />
      ) : (
        <div className="admin-surface overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-indigo-50/60">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-500">Institution</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-500">Degree</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-500">Period</th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((item) => (
                  <tr key={item._id} className="align-top">
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-slate-900">{item.institution.en || 'Untitled institution'}</div>
                      <div className="mt-1 text-sm text-slate-500">{item.institution.th || 'No Thai label'}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-slate-700">{item.degree.en || 'Untitled degree'}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">{item.period.en || 'No period'}</td>
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
        title={editingItem?._id ? 'Edit Education' : 'New Education'}
        description="Use short, scannable academic labels and a concise summary."
        onClose={closeModal}
      >
        {editingItem ? (
          <div className="space-y-4">
            <FormCard title="Education Details">
              <LocalizedInput
                label="Degree"
                value={editingItem.degree}
                onChange={(value) => setEditingItem({ ...editingItem, degree: value })}
              />
              <LocalizedInput
                label="Institution"
                value={editingItem.institution}
                onChange={(value) => setEditingItem({ ...editingItem, institution: value })}
              />
              <LocalizedInput
                label="Period"
                value={editingItem.period}
                onChange={(value) => setEditingItem({ ...editingItem, period: value })}
              />
              <LocalizedInput
                label="Description"
                value={editingItem.description}
                onChange={(value) => setEditingItem({ ...editingItem, description: value })}
                isTextArea
              />
            </FormCard>

            <div className="admin-modal-actions flex justify-end">
              <button onClick={handleSave} disabled={saving} className={primaryButtonClassName}>
                <FaSave size={14} />
                {saving ? 'Saving...' : 'Save Education'}
              </button>
            </div>
          </div>
        ) : null}
      </AdminModal>
    </div>
  );
}
