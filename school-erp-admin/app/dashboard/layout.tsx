'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ProtectedLayout>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div className="flex-1 overflow-auto">
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedLayout>
  );
}