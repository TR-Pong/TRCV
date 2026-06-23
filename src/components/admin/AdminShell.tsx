'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
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
    <div className="admin-workbench min-h-screen">
      <AdminToaster />
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="admin-rail border-b px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:w-[232px] lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
          <div>
            <div>
              <div className="admin-kicker">
                Portfolio system
              </div>
              <h1 className="mt-2 text-xl font-display font-bold">Tana.CV</h1>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:mt-10 lg:grid lg:gap-1 lg:overflow-visible">
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-link group flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-[background-color,color] ${
                    active
                      ? 'is-active'
                      : ''
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="admin-topbar sticky top-0 z-30 border-b px-5 py-3 lg:px-8">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
              <div>
                <div className="admin-kicker">Content</div>
                <div className="mt-0.5 text-lg font-display font-bold">{pageLabel}</div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="admin-secondary-button"
                >
                  <FaSignOutAlt size={14} />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-5 lg:px-8 lg:py-7">{children}</main>
        </div>
      </div>
    </div>
  );
}
