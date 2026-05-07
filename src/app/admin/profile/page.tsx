'use client';

import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormCard } from '@/components/admin/FormCard';
import { LoadingState } from '@/components/admin/AdminStates';
import { LocalizedInput } from '@/components/admin/LocalizedInput';
import { fetchSectionData, saveSectionItem } from '@/lib/admin/api';
import { createProfileData } from '@/lib/admin/factories';
import { notifyError, notifySuccess } from '@/lib/admin/toast';
import type { ProfileFormData } from '@/lib/admin/types';

export default function AdminProfilePage() {
  const [data, setData] = useState<ProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
    try {
      const profile = await fetchSectionData('profile');
      setData(profile ?? createProfileData());
    } catch {
      notifyError('Could not load profile', 'Using a blank profile form instead.');
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

    try {
      await saveSectionItem('profile', data);
      notifySuccess('Profile saved');
    } catch {
      notifyError('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Profile"
        title="Portfolio Profile"
        description="Edit the core identity and contact details used across the portfolio."
        actions={
          <button
            onClick={handleSave}
            disabled={!data || saving}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSave size={14} />
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        }
      />

      {loading || !data ? (
        <LoadingState label="Loading profile settings..." />
      ) : (
        <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <FormCard title="Identity" description="Main copy shown at the top of the public site.">
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

          <FormCard title="Contact" description="Public contact channels and profile links.">
            <div className="grid gap-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white"
                  value={data.email}
                  onChange={(event) => setData({ ...data, email: event.target.value })}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Phone</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white"
                  value={data.phone}
                  onChange={(event) => setData({ ...data, phone: event.target.value })}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">GitHub</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white"
                  value={data.github}
                  onChange={(event) => setData({ ...data, github: event.target.value })}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">LinkedIn</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white"
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
