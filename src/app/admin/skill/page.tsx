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
import { createLocalizedField, createSkillItem } from '@/lib/admin/factories';
import type { SkillFormData } from '@/lib/admin/types';

export default function AdminSkillPage() {
  const [items, setItems] = useState<SkillFormData[]>([]);
  const [editingItem, setEditingItem] = useState<SkillFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    setLoading(true);
    try {
      const nextItems = await fetchSectionData('skill');
      setItems(Array.isArray(nextItems) ? nextItems : []);
    } catch {
      setMessage('Failed to load skill categories.');
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
      await saveSectionItem('skill', editingItem);
      setEditingItem(null);
      setMessage('Skills saved successfully.');
      await loadItems();
    } catch {
      setMessage('Failed to save skills.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill category?')) return;

    try {
      await deleteSectionItem('skill', id);
      setMessage('Skill category deleted successfully.');
      await loadItems();
    } catch {
      setMessage('Failed to delete skill category.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Skills"
        title="Skill Collections"
        description="Group related skills together and maintain bilingual labels for every item."
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
              onClick={editingItem ? handleSave : () => setEditingItem(createSkillItem())}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(37,99,235,0.24)] transition hover:bg-blue-700 disabled:opacity-60"
            >
              {editingItem ? <FaSave size={14} /> : <FaPlus size={14} />}
              {editingItem ? (saving ? 'Saving...' : 'Save Skill Group') : 'Add Skill Group'}
            </button>
          </>
        }
      />

      <AdminFeedback message={message} />

      {editingItem ? (
        <FormCard title={editingItem._id ? 'Edit Skill Group' : 'New Skill Group'} description="Create clean skill clusters that are easy to scan on the public portfolio.">
          <LocalizedInput
            label="Category"
            value={editingItem.category}
            onChange={(value) => setEditingItem({ ...editingItem, category: value })}
          />

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-700">Skill Items</div>
                <div className="text-sm text-slate-500">Each item supports English and Thai labels.</div>
              </div>
              <button
                onClick={() => setEditingItem({ ...editingItem, items: [...editingItem.items, createLocalizedField()] })}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Add Skill
              </button>
            </div>

            <div className="space-y-4">
              {editingItem.items.map((item, index) => (
                <div key={`${index}-${item.en}`} className="rounded-[22px] border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-700">Skill {index + 1}</div>
                    <button
                      onClick={() =>
                        setEditingItem({
                          ...editingItem,
                          items: editingItem.items.filter((_, itemIndex) => itemIndex !== index),
                        })
                      }
                      className="rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
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
          </div>
        </FormCard>
      ) : loading ? (
        <LoadingState label="Loading skill groups..." />
      ) : items.length === 0 ? (
        <EmptyState title="No skill groups yet" description="Create your first category to organize portfolio skills." />
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <AdminListCard
              key={item._id}
              title={item.category.en || 'Untitled category'}
              subtitle={`${item.items.length} skills`}
              meta={item.items.map((skill) => skill.en).filter(Boolean).slice(0, 3).join(' • ')}
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
