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
import { createExperienceItem, createLocalizedField } from '@/lib/admin/factories';
import type { ExperienceFormData } from '@/lib/admin/types';

export default function AdminExperiencePage() {
  const [items, setItems] = useState<ExperienceFormData[]>([]);
  const [editingItem, setEditingItem] = useState<ExperienceFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    setLoading(true);
    try {
      const nextItems = await fetchSectionData('experience');
      setItems(Array.isArray(nextItems) ? nextItems : []);
    } catch {
      setMessage('Failed to load experience records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const startNew = () => {
    setEditingItem(createExperienceItem());
    setMessage('');
  };

  const startEdit = (item: ExperienceFormData) => {
    setEditingItem(structuredClone(item));
    setMessage('');
  };

  const handleSave = async () => {
    if (!editingItem) return;

    setSaving(true);
    setMessage('');

    try {
      await saveSectionItem('experience', editingItem);
      setEditingItem(null);
      setMessage('Experience saved successfully.');
      await loadItems();
    } catch {
      setMessage('Failed to save experience.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience item?')) return;

    try {
      await deleteSectionItem('experience', id);
      setMessage('Experience deleted successfully.');
      await loadItems();
    } catch {
      setMessage('Failed to delete experience.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Experience"
        title="Career Timeline"
        description="Add, edit, and maintain bilingual role descriptions for your portfolio timeline."
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
              onClick={editingItem ? handleSave : startNew}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(37,99,235,0.24)] transition hover:bg-blue-700 disabled:opacity-60"
            >
              {editingItem ? <FaSave size={14} /> : <FaPlus size={14} />}
              {editingItem ? (saving ? 'Saving...' : 'Save Experience') : 'Add Experience'}
            </button>
          </>
        }
      />

      <AdminFeedback message={message} />

      {editingItem ? (
        <FormCard title={editingItem._id ? 'Edit Experience' : 'New Experience'} description="Keep role details concise and easy to scan in both languages.">
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

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-700">Description Points</div>
                <div className="text-sm text-slate-500">Add bullet-style accomplishments for this role.</div>
              </div>
              <button
                onClick={() =>
                  setEditingItem({ ...editingItem, description: [...editingItem.description, createLocalizedField()] })
                }
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Add Point
              </button>
            </div>

            <div className="space-y-4">
              {editingItem.description.map((description, index) => (
                <div key={`${index}-${description.en}`} className="rounded-[22px] border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-700">Point {index + 1}</div>
                    <button
                      onClick={() =>
                        setEditingItem({
                          ...editingItem,
                          description: editingItem.description.filter((_, itemIndex) => itemIndex !== index),
                        })
                      }
                      className="rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
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
          </div>
        </FormCard>
      ) : loading ? (
        <LoadingState label="Loading experience entries..." />
      ) : items.length === 0 ? (
        <EmptyState title="No experience yet" description="Start by adding your first role to populate this section." />
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <AdminListCard
              key={item._id}
              title={item.company.en || 'Untitled company'}
              subtitle={item.title.en || 'Untitled role'}
              meta={item.period.en || 'No period'}
              actions={
                <>
                  <button
                    onClick={() => startEdit(item)}
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
