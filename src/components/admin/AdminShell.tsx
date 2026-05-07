'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaBars,
  FaBriefcase,
  FaFolderOpen,
  FaGraduationCap,
  FaSignOutAlt,
  FaStar,
  FaUser,
} from 'react-icons/fa';
import { AdminToaster } from '@/components/admin/AdminToaster';
import type { AdminSection } from '@/lib/admin/types';

const NAV_ITEMS: { section: AdminSection; label: string; href: string; icon: ReactNode }[] = [
  { section: 'profile', label: 'Profile', href: '/admin/profile', icon: <FaUser size={14} /> },
  { section: 'experience', label: 'Experience', href: '/admin/experience', icon: <FaBriefcase size={14} /> },
  { section: 'education', label: 'Education', href: '/admin/education', icon: <FaGraduationCap size={14} /> },
  { section: 'skill', label: 'Skills', href: '/admin/skill', icon: <FaStar size={14} /> },
  { section: 'project', label: 'Projects', href: '/admin/project', icon: <FaFolderOpen size={14} /> },
];

function getPageLabel(pathname: string) {
  const item = NAV_ITEMS.find(({ href }) => pathname.startsWith(href));
  return item?.label ?? 'Dashboard';
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const pageLabel = getPageLabel(pathname);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-slate-900">
      <AdminToaster />
      <div className="mx-auto flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white px-5 py-4 lg:min-h-screen lg:w-[248px] lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
          <div className="flex items-center justify-between lg:block">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Backoffice
              </div>
              <h1 className="mt-2 text-xl font-outfit font-semibold text-slate-900">Portfolio Admin</h1>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-500 lg:hidden">
              <FaBars size={16} />
            </div>
          </div>

          <nav className="mt-5 grid gap-1.5 lg:mt-8">
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className={active ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/92 px-5 py-3 backdrop-blur lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Backoffice</div>
                <div className="mt-1 text-xl font-outfit font-semibold text-slate-900">{pageLabel}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500 sm:block">
                  Content workspace
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <FaSignOutAlt size={14} />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="px-5 py-5 lg:px-8 lg:py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
