'use client';

import React from 'react';
import Link from 'next/link';
import { UserPlus, CalendarCheck, DollarSign, UserCheck, Bell, BarChart3 } from 'lucide-react';

export const QuickActionsBar: React.FC = () => {
  const actions = [
    {
      title: 'Register Student',
      description: 'Add new student admission record',
      href: '/dashboard/students',
      icon: UserPlus,
      color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400',
    },
    {
      title: 'Mark Attendance',
      description: 'Record today’s class attendance',
      href: '/dashboard/attendance',
      icon: CalendarCheck,
      color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400',
    },
    {
      title: 'Collect Fees',
      description: 'Issue fee receipt & log payment',
      href: '/dashboard/fees',
      icon: DollarSign,
      color: 'bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400',
    },
    {
      title: 'Add Teacher',
      description: 'Register new educator profile',
      href: '/dashboard/teachers',
      icon: UserCheck,
      color: 'bg-violet-50 text-violet-600 hover:bg-violet-100 dark:bg-violet-950/40 dark:text-violet-400',
    },
    {
      title: 'Post Circular',
      description: 'Broadcast notice to parents & staff',
      href: '/dashboard/notices',
      icon: Bell,
      color: 'bg-sky-50 text-sky-600 hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-400',
    },
    {
      title: 'View Reports',
      description: 'Access academic & financial analytics',
      href: '/dashboard/reports',
      icon: BarChart3,
      color: 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400',
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight uppercase text-xs text-slate-500 dark:text-slate-400">
        Quick ERP Actions & Shortcuts
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((act) => (
          <Link
            key={act.title}
            href={act.href}
            className={`p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all hover:-translate-y-0.5 shadow-2xs group flex flex-col justify-between`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 transition-colors ${act.color}`}>
              <act.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {act.title}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {act.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
