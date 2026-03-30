'use client';

import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import { AdminFeedback } from '@/components/admin/AdminFeedback';
import { AdminListCard } from '@/components/admin/AdminListCard';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { EmptyState, LoadingState } from '@/components/admin/AdminStates';
import { FormCard } from '@/components/admin/FormCard';
import { LocalizedInput } from '@/components/admin/LocalizedInput';
import { TagInput } from '@/components/admin/TagInput';
import { deleteSectionItem, fetchSectionData, saveSectionItem } from '@/lib/admin/api';
import { createProjectItem } from '@/lib/admin/factories';
import type { ProjectFormData } from '@/lib/admin/types';

export default function AdminProjectPage() {
  const [items, setItems] = useState<ProjectFormData[]>([]);
  const [editingItem, setEditingItem] = useState<ProjectFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    setLoading(true);
    try {
      const nextItems = await fetchSectionData('project');
      setItems(Array.isArray(nextItems) ? nextItems : []);
    } catch {
      setMessage('Failed to load project entries.');
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
      await saveSectionItem('project', editingItem);
      setEditingItem(null);
      setMessage('Project saved successfully.');
      await loadItems();
    } catch {
      setMessage('Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;

    try {
      await deleteSectionItem('project', id);
      setMessage('Project deleted successfully.');
      await loadItems();
    } catch {
      setMessage('Failed to delete project.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Projects"
        title="Portfolio Projects"
        description="Maintain featured projects, bilingual summaries, tech stack tags, and destination links."
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
              onClick={editingItem ? handleSave : () => setEditingItem(createProjectItem())}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(37,99,235,0.24)] transition hover:bg-blue-700 disabled:opacity-60"
            >
              {editingItem ? <FaSave size={14} /> : <FaPlus size={14} />}
              {editingItem ? (saving ? 'Saving...' : 'Save Project') : 'Add Project'}
            </button>
          </>
        }
      />

      <AdminFeedback message={message} />

      {editingItem ? (
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <FormCard
            title={editingItem._id ? 'Edit Project' : 'New Project'}
            description="Write a clear bilingual summary for the public portfolio."
          >
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

          <FormCard
            title="Links and Stack"
            description="Add stack tags one by one and keep project destinations up to date."
          >
            <TagInput
              label="Tech Stack"
              value={editingItem.techStack}
              onChange={(techStack) => setEditingItem({ ...editingItem, techStack })}
              placeholder="Next.js"
            />
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Project Link</span>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                value={editingItem.link}
                onChange={(event) => setEditingItem({ ...editingItem, link: event.target.value })}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">GitHub</span>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                value={editingItem.github}
                onChange={(event) => setEditingItem({ ...editingItem, github: event.target.value })}
              />
            </label>
          </FormCard>
        </div>
      ) : loading ? (
        <LoadingState label="Loading project entries..." />
      ) : items.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Add your first featured project to start filling the portfolio showcase."
        />
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <AdminListCard
              key={item._id}
              title={item.title.en || 'Untitled project'}
              subtitle={item.description.en || 'No description'}
              meta={item.techStack.join(' • ') || 'No tech stack'}
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
