'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Calendar as CalendarIcon, UserCheck, ShieldCheck } from 'lucide-react';

export interface WelcomeBannerProps {
  totalStudents: number;
  todayAttendance: number;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ totalStudents, todayAttendance }) => {
  const { user } = useAuth();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white p-6 sm:p-8 shadow-xl shadow-indigo-600/15">
      {/* Subtle Decorative Background Circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-16 right-32 w-40 h-40 bg-violet-400/20 rounded-full blur-lg pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Academic Session 2025-2026
            </span>
            <span className="text-xs text-indigo-100 flex items-center gap-1 opacity-90">
              <CalendarIcon className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good day, {user?.name || user?.email.split('@')[0] || 'Administrator'}! 👋
          </h1>
          <p className="text-sm text-indigo-100 max-w-xl leading-relaxed">
            Welcome to Greenwood School ERP. Here is your institutional overview for today.
          </p>
        </div>

        {/* Quick Summary Pill Chips */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center min-w-[110px]">
            <span className="text-[11px] font-medium text-indigo-200 uppercase tracking-wider block">
              Total Enrolled
            </span>
            <span className="text-xl font-bold text-white mt-0.5 block">{totalStudents}</span>
          </div>

          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center min-w-[110px]">
            <span className="text-[11px] font-medium text-indigo-200 uppercase tracking-wider block">
              Attendance
            </span>
            <span className="text-xl font-bold text-emerald-300 mt-0.5 block">{todayAttendance}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
