'use client';

import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import { AdminFeedback } from '@/components/admin/AdminFeedback';
import { AdminListCard } from '@/components/admin/AdminListCard';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { EmptyState, LoadingState } from '@/components/admin/AdminStates';
import { FormCard } from '@/components/admin/FormCard';
import { LocalizedInput } from '@/components/admin/LocalizedInput';
import { deleteSectionItem, fetchSectionData, saveSectionItem } from '@/lib/admin/api';
import { createEducationItem } from '@/lib/admin/factories';
import type { EducationFormData } from '@/lib/admin/types';

export default function AdminEducationPage() {
  const [items, setItems] = useState<EducationFormData[]>([]);
  const [editingItem, setEditingItem] = useState<EducationFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    setLoading(true);
    try {
      const nextItems = await fetchSectionData('education');
      setItems(Array.isArray(nextItems) ? nextItems : []);
    } catch {
      setMessage('Failed to load education records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const handleSave = async () => {
    if (!editingItem) return;

    setSaving(true);
    setMessage('');

    try {
      await saveSectionItem('education', editingItem);
      setEditingItem(null);
      setMessage('Education saved successfully.');
      await loadItems();
    } catch {
      setMessage('Failed to save education.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education item?')) return;

    try {
      await deleteSectionItem('education', id);
      setMessage('Education deleted successfully.');
      await loadItems();
    } catch {
      setMessage('Failed to delete education.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Education"
        title="Academic Background"
        description="Manage institutions, degrees, periods, and bilingual summaries for your academic profile."
        actions={
          <>
            {editingItem ? (
              <button
                onClick={() => setEditingItem(null)}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to List
              </button>
            ) : null}
            <button
              onClick={editingItem ? handleSave : () => setEditingItem(createEducationItem())}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(37,99,235,0.24)] transition hover:bg-blue-700 disabled:opacity-60"
            >
              {editingItem ? <FaSave size={14} /> : <FaPlus size={14} />}
              {editingItem ? (saving ? 'Saving...' : 'Save Education') : 'Add Education'}
            </button>
          </>
        }
      />

      <AdminFeedback message={message} />

      {editingItem ? (
        <FormCard title={editingItem._id ? 'Edit Education' : 'New Education'} description="Use concise academic labels and a short summary for each entry.">
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
      ) : loading ? (
        <LoadingState label="Loading education entries..." />
      ) : items.length === 0 ? (
        <EmptyState title="No education entries yet" description="Add your first degree or certification to get started." />
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <AdminListCard
              key={item._id}
              title={item.institution.en || 'Untitled institution'}
              subtitle={item.degree.en || 'Untitled degree'}
              meta={item.period.en || 'No period'}
              actions={
                <>
                  <button
                    onClick={() => setEditingItem(structuredClone(item))}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <FaPen size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => item._id && handleDelete(item._id)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <FaTrash size={12} />
                    Delete
                  </button>
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
