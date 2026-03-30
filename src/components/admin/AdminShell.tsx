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
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white/90 px-5 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur lg:min-h-screen lg:w-[280px] lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
          <div className="flex items-center justify-between lg:block">
            <div>
              <div className="inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                Admin Panel
              </div>
              <h1 className="mt-4 text-2xl font-outfit font-semibold text-slate-900">Tana Admin</h1>
              <p className="mt-2 max-w-[18rem] text-sm text-slate-500">
                Structured editing workspace for your portfolio content.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-500 lg:hidden">
              <FaBars size={16} />
            </div>
          </div>

          <nav className="mt-6 grid gap-2 lg:mt-10">
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-blue-600 text-white shadow-[0_16px_30px_rgba(37,99,235,0.24)]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className={active ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Workspace</div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Keep each section isolated so edits, loading states, and form logic stay easy to maintain.
            </p>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 px-5 py-4 backdrop-blur lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Admin Dashboard</div>
                <div className="mt-1 text-2xl font-outfit font-semibold text-slate-900">{pageLabel}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 sm:block">
                  Portfolio content management
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <FaSignOutAlt size={14} />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="px-5 py-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
