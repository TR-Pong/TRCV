'use client';

import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { AdminFeedback } from '@/components/admin/AdminFeedback';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormCard } from '@/components/admin/FormCard';
import { LoadingState } from '@/components/admin/AdminStates';
import { LocalizedInput } from '@/components/admin/LocalizedInput';
import { fetchSectionData, saveSectionItem } from '@/lib/admin/api';
import { createProfileData } from '@/lib/admin/factories';
import type { ProfileFormData } from '@/lib/admin/types';

export default function AdminProfilePage() {
  const [data, setData] = useState<ProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const profile = await fetchSectionData('profile');
        setData(profile ?? createProfileData());
      } catch {
        setMessage('Failed to load profile data.');
        setData(createProfileData());
      } finally {
        setLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    setMessage('');

    try {
      await saveSectionItem('profile', data);
      setMessage('Profile saved successfully.');
    } catch {
      setMessage('Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Profile Settings"
        title="Portfolio Profile"
        description="Manage the core information that appears at the top of your portfolio, including bilingual content and contact details."
        actions={
          <button
            onClick={handleSave}
            disabled={!data || saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(37,99,235,0.24)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSave size={14} />
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        }
      />

      <AdminFeedback message={message} />

      {loading || !data ? (
        <LoadingState label="Loading profile settings..." />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <FormCard title="Identity" description="Main copy and positioning shown on the public site.">
            <LocalizedInput label="Name" value={data.name} onChange={(value) => setData({ ...data, name: value })} />
            <LocalizedInput label="Role" value={data.role} onChange={(value) => setData({ ...data, role: value })} />
            <LocalizedInput
              label="Bio"
              value={data.bio}
              onChange={(value) => setData({ ...data, bio: value })}
              isTextArea
            />
            <LocalizedInput
              label="Location"
              value={data.location}
              onChange={(value) => setData({ ...data, location: value })}
            />
          </FormCard>

          <FormCard title="Contact Channels" description="Direct links and contact info used across the site.">
            <div className="grid gap-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                  value={data.email}
                  onChange={(event) => setData({ ...data, email: event.target.value })}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Phone</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                  value={data.phone}
                  onChange={(event) => setData({ ...data, phone: event.target.value })}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">GitHub</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                  value={data.github}
                  onChange={(event) => setData({ ...data, github: event.target.value })}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">LinkedIn</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                  value={data.linkedin}
                  onChange={(event) => setData({ ...data, linkedin: event.target.value })}
                />
              </label>
            </div>
          </FormCard>
        </div>
      )}
    </div>
  );
}
