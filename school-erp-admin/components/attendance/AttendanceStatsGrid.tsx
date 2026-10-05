'use client';

import React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { AttendanceStats } from '@/types/attendance';
import { Users, UserCheck, UserX, Clock, CalendarCheck } from 'lucide-react';

export interface AttendanceStatsGridProps {
  stats: AttendanceStats;
}

export const AttendanceStatsGrid: React.FC<AttendanceStatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatsCard
        title="Class Students"
        value={stats.totalStudents}
        icon={<Users className="w-6 h-6" />}
        color="indigo"
        description="Total in class list"
      />
      <StatsCard
        title="Present Count"
        value={stats.presentCount}
        icon={<UserCheck className="w-6 h-6" />}
        color="emerald"
        description="Attended class"
      />
      <StatsCard
        title="Absent Count"
        value={stats.absentCount}
        icon={<UserX className="w-6 h-6" />}
        color="amber"
        description="Not reported"
      />
      <StatsCard
        title="Late / Half-Day"
        value={stats.lateCount + stats.halfDayCount}
        icon={<Clock className="w-6 h-6" />}
        color="rose"
        description={`${stats.lateCount} Late | ${stats.halfDayCount} Half-day`}
      />
      <StatsCard
        title="Attendance Rate"
        value={`${stats.attendancePercentage}%`}
        icon={<CalendarCheck className="w-6 h-6" />}
        color="sky"
        description="Daily class ratio"
      />
    </div>
  );
};
